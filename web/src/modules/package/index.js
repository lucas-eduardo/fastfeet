import React from 'react';
import PropTypes from 'prop-types';

import Routes from './routes';

import { Wrapper } from './styles';

export default function Package({ match }) {
  return (
    <Wrapper>
      <Routes path={match.path} />
    </Wrapper>
  );
}

Package.propTypes = {
  match: PropTypes.shape().isRequired,
};
