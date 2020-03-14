import { Alert } from 'react-native';
import { takeLatest, call, put, all } from 'redux-saga/effects';

import api from '../../../services/api';

import { signInSuccess, signFailure } from './actions';

export function* signIn({ payload }) {
  try {
    const { id } = payload;

    const { data } = yield call(api.get, `deliverymans/${id}`);
    const user = {
      name: data.name,
      email: data.email,
      avatar: data.avatar.url,
      createdAt: data.createdAt,
    };

    yield put(signInSuccess(data.id, user));
  } catch (error) {
    Alert.alert(
      'Falha na autenticação',
      'Houve um erro no login, verifique seus dados'
    );
    yield put(signFailure());
  }
}

export default all([takeLatest('@auth/SIGN_IN_REQUEST', signIn)]);
