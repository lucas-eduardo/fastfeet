import React from 'react';
import PropTypes from 'prop-types';

import { Wrapper } from './styles';

export default function DropDown({ showMenu, children }) {
  return <Wrapper showMenu={showMenu}>{children}</Wrapper>;
}

DropDown.propTypes = {
  showMenu: PropTypes.bool.isRequired,
  children: PropTypes.element.isRequired,
};
