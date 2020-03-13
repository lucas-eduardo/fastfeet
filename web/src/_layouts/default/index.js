import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';

import { signOut } from '../../store/modules/auth/actions';

import logo from '../../assets/logo-header.svg';

import { Wrapper, Header, Left, Division, Right, Container } from './styles';

export default function Default({ children }) {
  const dispatch = useDispatch();

  function handleSignOut() {
    dispatch(signOut());
  }

  return (
    <Wrapper>
      <Header>
        <Left>
          <img src={logo} alt="FastFeet" />
          <Division />
          <ul>
            <li>
              <NavLink to="/encomendas" activeClassName="active">
                Encomendas
              </NavLink>
            </li>
            <li>
              <NavLink to="/entregadores" activeClassName="active">
                Entregadores
              </NavLink>
            </li>
            <li>
              <NavLink to="/destinatarios" activeClassName="active">
                Destinatários
              </NavLink>
            </li>
            <li>
              <NavLink to="/problemas" activeClassName="active">
                Problemas
              </NavLink>
            </li>
          </ul>
        </Left>
        <Right>
          <strong>Admin FastFeet</strong>
          <button type="button" onClick={handleSignOut}>
            sair do sistema
          </button>
        </Right>
      </Header>

      <Container>{children}</Container>
    </Wrapper>
  );
}

Default.propTypes = {
  children: PropTypes.element.isRequired,
};
