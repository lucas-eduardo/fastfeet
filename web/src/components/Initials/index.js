import React from 'react';
import PropTypes from 'prop-types';

import { Wrapper } from './styles';

export default function Initials({ initial }) {
  return <Wrapper>{initial}</Wrapper>;
}

Initials.propTypes = {
  initial: PropTypes.string.isRequired,
};
