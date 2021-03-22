import { gql } from 'apollo-boost';
import { useMutation } from '@apollo/react-hooks';
import { query } from './useQuery';

const useUpdate = (input, filter) => {
  const [updateResult] = useMutation(
    gql`
      mutation($input: Input) {
        updateResult(input: $input) {
          __typename
        }
      }
    `,
    {
      variables: {
        input,
      },
      update: (proxy) => {
        const data = proxy.readQuery({
          query,
          variables: filter,
        });

        proxy.writeQuery({
          query,
          data: {
            ...data,
            results: data.results.map((item) => (item._id === input._id ? { ...item, ...input } : item)),
          },
          variables: filter,
        });
      },
    }
  );

  return [updateResult];
};

export default useUpdate;
