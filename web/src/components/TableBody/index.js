import React from 'react';
import PropTypes from 'prop-types';

import { Wrapper } from './styles';

export default function TableBody({ children }) {
  return <Wrapper>{children}</Wrapper>;
}

TableBody.propTypes = {
  children: PropTypes.element.isRequired,
};
