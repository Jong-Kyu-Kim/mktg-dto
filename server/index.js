const express = require('express');
const app = express();
const path = require('path');

const port = parseInt(process.env.PORT, 10) || 4000;
// const dev = process.env.NODE_ENV !== 'production';

const connect = require('./connect');

const mongoose = require('mongoose');
const models = require('./models');
const http = require('http');

const cookieParser = require('cookie-parser');
// const helmet = require('helmet');
const fetch = require('node-fetch');

const { ApolloServer } = require('apollo-server-express');
const typeDefs = require('./typedefs');
const resolvers = require('./resolvers');
const morgan = require('morgan');
const parseString = require('xml2js').parseString;

const moment = require('moment');
const nodemailer = require('nodemailer');

mongoose
  .connect(connect.mongodb, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('> Connected to mongodb server'))
  .catch((error) => console.log(error));

app.set('secret', 'mKtg');
//app.use(bodyParser.json());
app.use(morgan('common')); // common combined dev short
//app.use(helmet());
app.use(cookieParser());
app.use(express.static(__dirname + '/../dist'));

const apollo = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req, res }) => ({
    // token: req.headers.authorization.substr(7) || req.cookies.token,
    token: req.cookies.user,
    cookie: (token) => res.cookie('user', token, { httpOnly: true }), // secure: true
    clearCookie: () => res.clearCookie('user', { httpOnly: true }),
    results: mongoose.model('result', models.results),
    users: mongoose.model('user', models.user),
  }),
});

apollo.applyMiddleware({ app, path: '/graphql' });

const get = (url) =>
  app.get(url, (req, res) => {
    res.sendFile(path.resolve(__dirname + '/..', 'dist/dto.html'));
  });

get('/dto');
get('/dto/dashboard');
get('/dto/roi');
get('/dto/homepage');
get('/dto/pr');
get('/dto/sns');
get('/dto/ad');
get('/dto/promotion');
get('/dto/event');
get('/dto/eventg');
get('/dto/newsletter');
get('/dto/clevel');
get('/dto/materials');
get('/dto/inbound');
get('/dto/inboundg');
get('/dto/video');
get('/dto/webtoon');
get('/dto/award');

app.get('/dto/stock', (req, res) => {
  fetch('http://asp1.krx.co.kr/servlet/krx.asp.XMLSise?code=150900')
    .then((res) => res.text())
    .then((body) => {
      parseString(body, function (err, result) {
        res.send(result);
      });
    });
});

app.listen(port, (err) => {
  if (err) throw err;
  console.log(`> Ready on http://localhost:${port}`);
});

// setInterval(() => {
//   if (
//     new Date().getDay() === 5 &&
//     new Date().getHours() === 9 &&
//     new Date().getMinutes() === 30
//   ) {
//     mongoose
//       .model('result', models.results)
//       .aggregate([
//         { $match: { category: 'Inbound' } },
//         { $match: { subcategory: '-' } },
//         {
//           $match: {
//             $or: [{ remark: '견적 문의' }, { remark: '제품 소개 요청' }],
//           },
//         },
//         { $match: { rep: '' } },
//         {
//           $match: {
//             date: {
//               $gte: new Date(moment().startOf('isoWeek').subtract(3, 'days')),
//               $lte: new Date(moment().endOf('isoWeek').subtract(3, 'days')),
//             },
//           },
//         },
//       ])
//       .then((data) => {
//         const lastWeekCount = data.length;

//         mongoose
//           .model('result', models.results)
//           .aggregate([
//             { $match: { category: 'Inbound' } },
//             { $match: { subcategory: '-' } },
//             {
//               $match: {
//                 $or: [{ remark: '견적 문의' }, { remark: '제품 소개 요청' }],
//               },
//             },
//             { $match: { rep: '확인중' } },
//             {
//               $match: {
//                 date: {
//                   $gte: new Date('2021-01-01'),
//                   $lte: new Date(
//                     moment().startOf('isoWeek').subtract(4, 'days'),
//                   ),
//                 },
//               },
//             },
//           ])
//           .then((data) => {
//             const longTimeCount = data.length;

//             if (lastWeekCount || longTimeCount) {
//               const transporter = nodemailer.createTransport({
//                 pool: true,
//                 host: 'mail.fasoo.com',
//                 auth: {
//                   user: 'newsletter',
//                   pass: 'fasoo2020',
//                 },
//                 // tls: {
//                 //   rejectUnauthorize: false,
//                 // },
//                 maxConnections: 1,
//                 // maxMessages: 10,
//               });

//               const mailOptions = {
//                 from: 'Henrick Jang <hsjang@fasoo.com>',
//                 to: 'jhseong@fasoo.com',
//                 cc: '	william@fasoo.com, cwsgood@fasoo.com',
//                 bcc: 'hsjang@fasoo.com, eternal206@fasoo.com',
//                 //to: 'hsjang@fasoo.com, eternal206@fasoo.com',
//                 subject: '인바운드 확인 알람 메일',
//                 html: `
// <html>
//   <head></head>
//   <body>
//     ${
//       lastWeekCount
//         ? `<p>확인이 필요한 인바운드 문의가 <strong>${lastWeekCount}건</strong> 있습니다.<p>`
//         : ''
//     }
//     ${
//       longTimeCount
//         ? `<p>장기간 확인중으로 남아있는 항목이 <strong>${longTimeCount}건</strong> 있습니다 <p>`
//         : ''
//     }
//     ${
//       longTimeCount
//         ? data.reduce(
//             (string, data) =>
//               string +
//               `<p>* ${moment(data.date).format('YYYY-MM-DD')} ${
//                 data.title
//               }</p>`,
//             '',
//           )
//         : ''
//     }
//     <a href="https://mktg.fasoo.com/dto">확인하러 가기</a>
//   </body>
// </html>
//             `,
//                 //text: ''
//               };

//               transporter.sendMail(mailOptions, (err, res) => {
//                 if (err) {
//                   console.log(err);
//                   //console.log('failed...');
//                 } else {
//                   console.log('succeed...');
//                 }
//                 transporter.close();
//               });
//             }
//           });
//       });
//   }
// }, 60000);
