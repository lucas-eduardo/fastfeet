import React from 'react';
import PropTypes from 'prop-types';

import { Wrapper } from './styles';

export default function Auth({ children }) {
  return <Wrapper>{children}</Wrapper>;
}

Auth.propTypes = {
  children: PropTypes.element.isRequired,
};
