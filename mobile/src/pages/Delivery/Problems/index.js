import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity, Alert } from 'react-native';
import { format, parseISO } from 'date-fns';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Spinner from 'react-native-loading-spinner-overlay';

import api from '../../../services/api';

import {
  Container,
  Background,
  Content,
  Title,
  Problem,
  Description,
  Date,
  NotRegister,
  TextNotRegister,
} from './styles';

export default function Problems({ navigation }) {
  const [problems, setProblems] = useState([]);
  const [loading, setLoading] = useState(true);

  const key = navigation.getParam('key');
  const idDelivery = navigation.getParam('id');

  async function loadProblems(id) {
    setLoading(true);
    try {
      const { data } = await api.get(`delivery/${id}/problems`);
      setProblems(data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      Alert.alert(
        'Erro inesperado',
        'Ocorreu um erro inesperado para recuperar os problemas, tente novamente mais tarde'
      );
      navigation.goBack();
    }
  }

  useEffect(() => {
    loadProblems(idDelivery);
  }, [idDelivery]);

  return (
    <Container>
      <Background />
      <Content>
        <Title>Encomenda {key}</Title>
        <Spinner
          visible={loading}
          animation="fade"
          overlayColor="rgba(0,0,0,0.8)"
          textContent="Carregando problemas"
          textStyle={{ color: '#fff' }}
        />
        {problems.length < 1 && !loading && (
          <NotRegister>
            <TextNotRegister>
              Não existem problemas para serem exebidos
            </TextNotRegister>
          </NotRegister>
        )}
        {problems.map(item => (
          <Problem key={item.id}>
            <Description>{item.description}</Description>
            <Date>{format(parseISO(item.createdAt), 'dd/MM/yyyy')}</Date>
          </Problem>
        ))}
      </Content>
    </Container>
  );
}

Problems.propTypes = {
  navigation: PropTypes.shape().isRequired,
};

Problems.navigationOptions = ({ navigation }) => ({
  title: 'Visualizar problemas',
  headerLeft: () => (
    <TouchableOpacity
      onPress={() => {
        navigation.goBack();
      }}
    >
      <Icon name="chevron-left" size={20} color="#fff" />
    </TouchableOpacity>
  ),
});
