import { gql } from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks';

export const query = gql`
  query($category: String, $type: String, $subcategory: [String], $fromDate: Date, $toDate: Date) {
    user {
      id
      dept
      name
    }
    results(category: $category, type: $type, subcategory: $subcategory, fromDate: $fromDate, toDate: $toDate) {
      _id
      date
      type
      category
      subcategory
      title
      reference
      url
      product
      remark
      roi
      value
      region
      country
      rep
      remark2
    }
  }
`;

export default (variables) => {
  const { loading, error, data, fetchMore, refetch, networkStatus } = useQuery(query, { variables });

  return [loading, data, refetch];
};
