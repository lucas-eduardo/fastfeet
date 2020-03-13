import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Input } from '@rocketseat/unform';
import * as Yup from 'yup';

import { signInRequest } from '../../store/modules/auth/actions';

import logo from '../../assets/logo.png';

const schema = Yup.object().shape({
  email: Yup.string()
    .email('Insira um e-mail válido')
    .required('O e-mail é obrigatório'),
  password: Yup.string().required('A senha é obrigatória'),
});

export default function SignIn() {
  const dispatch = useDispatch();
  const loading = useSelector(state => state.auth.loading);

  function handleSubmit({ email, password }) {
    dispatch(signInRequest(email, password));
  }

  return (
    <>
      <Form
        noValidate
        autoComplete="off"
        schema={schema}
        onSubmit={handleSubmit}
      >
        <img src={logo} alt="FastFeet" />
        <div>
          <label htmlFor="email">Seu e-mail</label>
          <Input
            type="text"
            name="email"
            id="email"
            placeholder="exemplo@email.com"
          />
        </div>
        <div>
          <label htmlFor="password">Sua senha</label>
          <Input
            type="password"
            name="password"
            id="password"
            placeholder="*************"
          />
        </div>

        <div className="container-button">
          <button type="submit">
            {loading ? 'Carregando...' : 'Entrar no sistema'}
          </button>
        </div>
      </Form>
    </>
  );
}
