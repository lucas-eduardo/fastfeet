import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { MdAdd } from 'react-icons/md';

import { Wrapper } from './styles';

export default function BtnRegister({ url }) {
  return (
    <Wrapper>
      <Link to={url}>
        <MdAdd size={16} color="#fff" />
        Cadastrar
      </Link>
    </Wrapper>
  );
}

BtnRegister.propTypes = {
  url: PropTypes.string.isRequired,
};
