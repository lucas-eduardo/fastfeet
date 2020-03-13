import React from 'react';
import PropTypes from 'prop-types';

import { Wrapper } from './styles';

export default function TableHead({ children }) {
  return <Wrapper>{children}</Wrapper>;
}

TableHead.propTypes = {
  children: PropTypes.element.isRequired,
};
