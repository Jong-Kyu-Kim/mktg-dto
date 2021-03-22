const mongoose = require('mongoose');

module.exports = {
  insertResult: async (obj, args, ctx) => {
    console.log(args);
    const _id = new mongoose.mongo.ObjectId();
    return await ctx.results.create({ ...args.input, _id });
  },

  updateResult: async (obj, args, ctx) => {
    console.log(args);
    return await ctx.results.updateOne({ _id: args.input._id }, { $set: args.input });
  },
};
