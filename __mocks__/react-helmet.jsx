import React from 'react';
// prettyFormat comes with Jest
// https://github.com/facebook/jest/blob/master/packages/pretty-format/README.md
// eslint-disable-next-line
import prettyFormat from 'pretty-format';

const Helmet = props => (
  <div>
    Helmet Mock
    {
      prettyFormat(props)
    }
  </div>
);

export default Helmet;
