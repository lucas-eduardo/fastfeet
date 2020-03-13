import React from 'react';
import PropTypes from 'prop-types';

import H2 from './styles';

export default function Title({ title }) {
  return <H2>{title}</H2>;
}

Title.propTypes = {
  title: PropTypes.string.isRequired,
};
