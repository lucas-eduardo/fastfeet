import React from 'react';
import PropTypes from 'prop-types';

import { Wrapper } from './styles';

export default function Table({ children }) {
  return <Wrapper>{children}</Wrapper>;
}

Table.propTypes = {
  children: PropTypes.element.isRequired,
};
