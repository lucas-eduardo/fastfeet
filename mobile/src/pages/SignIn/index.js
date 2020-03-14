import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Image, ActivityIndicator } from 'react-native';

import { signInRequest } from '../../store/modules/auth/actions';

import logo from '../../assets/logo.png';

import Background from '../../components/Background';

import { Container, Form, FormInput, Button, Text } from './styles';

export default function SignIn() {
  const [id, setId] = useState('');
  const loading = useSelector(state => state.auth.loading);

  const dispatch = useDispatch();

  function handleSubmit(value) {
    dispatch(signInRequest(value));
  }

  return (
    <Background>
      <Container>
        <Image source={logo} />
        <Form>
          <FormInput
            placeholder="Informe seu ID de cadastro"
            onChangeText={setId}
          />

          <Button onPress={() => handleSubmit(id)}>
            {loading ? (
              <ActivityIndicator size="small" color="#fff" />
            ) : (
              <Text>Entrar no sistema</Text>
            )}
          </Button>
        </Form>
      </Container>
    </Background>
  );
}
