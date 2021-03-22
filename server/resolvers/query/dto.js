module.exports = {
  results: async (obj, args, ctx) => {
    const { category, subcategory, type, fromDate, toDate } = args;

    // const $and = [
    //   { type: 'activity' },
    //   { product: { $not: { $size: 0 } }},
    //   { date: { $gte: fromDate, $lte: toDate } }
    // ]

    console.log(args);

    return await ctx.results
      .find({
        $and: [
          category ? { category } : {},
          // subcategory && subcategory.length ? { subcategory } : {},
          { type },
          { date: { $gte: fromDate, $lte: toDate } },
        ],
      })
      .sort({ date: -1, _id: -1 });
  },
};
