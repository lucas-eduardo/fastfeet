import React from 'react';
import PropTypes from 'prop-types';

import Routes from './routes';

import { Wrapper } from './styles';

export default function Problem({ match }) {
  return (
    <Wrapper>
      <Routes path={match.path} />
    </Wrapper>
  );
}

Problem.propTypes = {
  match: PropTypes.shape().isRequired,
};
