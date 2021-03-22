import React from 'react';
import useInsert from '../../hooks/useInsert';

import loadable from '@loadable/component';
const AddOutlined = loadable(() => import('@material-ui/icons/AddOutlined'));

// interface Inserter {
//   inputEl?: any;
//   options: string[];
//   type: 'activity' | 'effect';
//   refetch: any;
// }

const Inserter = ({ input, initInput, refetch, filter }) => {
  const [insertResult] = useInsert(input, filter);
  return (
    <button
      // disabled={!!_id}
      onClick={() => {
        insertResult().then(() => {
          initInput();
          refetch();
        });
      }}
    >
      <span>
        <AddOutlined />
      </span>
    </button>
  );
};

export default Inserter;
