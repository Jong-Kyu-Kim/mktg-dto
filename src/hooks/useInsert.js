import { gql } from 'apollo-boost';
import { useMutation } from '@apollo/react-hooks';
import { query } from './useQuery';

const useInsert = (input, filter) => {
  const [insertResult, { error, data }] = useMutation(
    gql`
      mutation($input: Input) {
        insertResult(input: $input) {
          __typename
        }
      }
    `,
    {
      variables: {
        input,
      },
      // update: (proxy) => {
      //   const queryData = proxy.readQuery({
      //     query,
      //     variables: filter,
      //   });

      //   proxy.writeQuery({
      //     query,
      //     data: {
      //       ...queryData,
      //       results: queryData.results.concat({
      //         ...queryData.results[0], // id 중복
      //         ...input,
      //       }),
      //     },
      //     variables: filter,
      //   });
      // },
    }
  );

  return [insertResult];
};

export default useInsert;
