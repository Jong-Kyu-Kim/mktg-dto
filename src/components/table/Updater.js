import React from 'react';
import useUpdate from '../../hooks/useUpdate';

// interface Updater {
//   type: 'activity' | 'effect';
//   refetch: any;
// }

const Updater = ({ input, initUpdate, filter }) => {
  const [updateResult] = useUpdate(input, filter);

  return (
    <button
      onClick={(e) => {
        initUpdate();
        updateResult();
      }}
    >
      <span>확인</span>
    </button>
  );
};

export default Updater;
