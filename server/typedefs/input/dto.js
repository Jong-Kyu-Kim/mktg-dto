module.exports = `
  input Input {
    _id: String
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
`;
