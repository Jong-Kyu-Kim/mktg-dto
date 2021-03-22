const jwt = require('jsonwebtoken');
const { GraphQLScalarType } = require('graphql');
const { Kind } = require('graphql/language');
const moment = require('moment');
const query = require('./query/dto');
const mutation = require('./mutation/dto');
const puppeteer = require('puppeteer');

//const inspect = require('util').inspect;
// const crypto = require('crypto');

module.exports = {
  Date: new GraphQLScalarType({
    name: 'Date',
    description: 'Date custom scalar type',
    parseValue(value) { // value from the client
      return new Date(value); 
    },
    serialize(value) { // value sent to the client
      return moment(value).format('YYYY-MM-DD');
    },
    parseLiteral(ast) {
      if (ast.kind === Kind.INT) {
        return new Date(ast.value) // ast value is always in string format
      }
      return null;
    },
  }),

  Query: {
    user: (obj, args, ctx) => {
      if (ctx.token) {
        const decoded = jwt.verify(ctx.token, 'secret');
        const user =  {
          id: decoded.id,
          dept: decoded.dept,
          name: decoded.name
        }        
        console.log(user);
        return user;
      }
    },
    ...query,
  },

  Mutation: {
    signinUser: async(obj, args, ctx) => {
      const browser = await puppeteer.launch({
        //headless: false,
        args: [
          '--headless',
          '--disable-gpu',
          '--hide-scrollbars',
          '--mute-audio'
        ]
      });
      const [page] = await browser.pages();
  
      page.setRequestInterception(true);
      page.on('request', (request) => {
        if (request.url().indexOf('_layouts') >= 0 || request.url().indexOf('_catalogs') >= 0 || request.url().indexOf('ScriptResource') >= 0) {
          request.abort();
        }
        else {
          request.continue();
        }
      });
  
      await page.authenticate({
        username: `${args.id}@fasoo.com`,
        password: args.password
      });
  
      try {
        await page.goto('https://luke30.fasoo.com');
  
        const data = await page.$('.userInfo');
        const evalData = await page.evaluate(({ textContent }) => textContent, data);
        const splitData = evalData.split(' ').filter(text => text !== '' && text !== '\n').map(text => text.replace('\n', ''));
        const userInfo = {
          id: splitData[5],
          dept: splitData[0],
          name: splitData[1]
        }
  
        if (userInfo.dept.substr(0,2) === 'GS' || userInfo.dept.substr(0,2) === 'NS' || userInfo.dept.substr(0,2) === 'AM' || userInfo.dept.substr(0,2) === 'AE' || userInfo.dept === '사업전략팀' || userInfo.dept === '컨설팅사업팀') {
          await ctx.cookie(jwt.sign(userInfo, 'secret', { expiresIn: '12h' }));
        }
  
        await browser.close();
        return await userInfo;
      }
  
      catch(err) {
        await browser.close();
        return await null;
      }

      // const {id, password} = args;
      // const {cookie, users} = ctx;

      // return await users.findOne({ id, password }).then(user => {
      //   if (user) {
      //     cookie(jwt.sign({ id, name: user.name }, 'secret', { expiresIn: '12h' }));
      //     return user.name;
      //   }

      //   return null;
      // })
    },

    signoutUser: async(obj, args, ctx) => {
      ctx.clearCookie();
      return null;
    },


    updateUser: async(obj, args, ctx) => (
      await ctx.users.updateOne( { id: args.id }, { $set: args } )
    ),

    ...mutation
  }
}