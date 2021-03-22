module.exports = {
  query: `
    results(category: String, type: String, subcategory: [String], fromDate: Date, toDate: Date): [Result]
  `,
  mutaion: `
    insertResult(input: Input): Result
    updateResult(input: Input): Result
    updateCategory: Result
  `,
  results: `
    type Result {
      _id: String,
      date: Date,
      type: String
      category: String
      subcategory: String
      title: String
      reference: String
      url: String
      product: [String]
      remark: String
      roi: Boolean
      value: Int
      region: String
      country: String
      rep: String
      remark2: String
    }
  `,
};
