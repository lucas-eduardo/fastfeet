import React, { useState, useEffect, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { parseISO, format } from 'date-fns';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { withNavigationFocus } from 'react-navigation';
import Spinner from 'react-native-loading-spinner-overlay';

import { signOut } from '../../store/modules/auth/actions';

import api from '../../services/api';

import {
  Container,
  Header,
  Avatar,
  Initial,
  Image,
  ContentHeader,
  ContentHeaderText,
  Welcome,
  Name,
  Logout,
  Content,
  List,
  Heading,
  Title,
  Filters,
  Pending,
  HandedOut,
  TextFilter,
  Card,
  CardHeader,
  CardTitle,
  CardBody,
  TimeLine,
  Line,
  Ellipses,
  Ellipse,
  TextLine,
  CardFooter,
  Info,
  Label,
  Text,
  Details,
  DetailText,
  NotRegister,
  TextNotRegister,
} from './styles';

function Dashboard({ isFocused, navigation }) {
  const [packages, setPackages] = useState([]);
  const [isConcluded, setIsConcluded] = useState(false);
  const [loading, setLoading] = useState(true);

  const user = useSelector(state => state.user);
  const idUser = useSelector(state => state.auth.id);
  const dispatch = useDispatch();

  const initial = useMemo(
    () =>
      user.name
        .split(' ')
        .map(n => n[0])
        .join(''),
    [user.name]
  );

  async function loadPackages(id, concluded) {
    setLoading(true);
    const { data } = await api.get(`deliveryman/${id}/deliveries`, {
      params: {
        isConcluded: concluded,
        isCanceled: false,
      },
    });
    let key = 1;

    setPackages(
      data.map(item => {
        const obj = {
          ...item,
          key: key < 10 ? `0${key}` : key,
          awaitingWithdrawal: !item.start_date,
          delivered: !!item.end_date,
        };
        key += 1;
        return obj;
      })
    );
    setLoading(false);
  }

  useEffect(() => {
    loadPackages(idUser, isConcluded);
  }, [isFocused, idUser, isConcluded]);

  useEffect(() => {
    loadPackages(idUser, isConcluded);
  }, [idUser, isConcluded]);

  function handleLogout() {
    dispatch(signOut());
  }

  return (
    <Container>
      <Spinner
        visible={loading}
        animation="fade"
        overlayColor="rgba(0,0,0,0.8)"
        textContent="Carregando dados"
        textStyle={{ color: '#fff' }}
      />
      <Header>
        <Avatar>
          {user.avatar ? (
            <Image source={{ uri: user.avatar }} />
          ) : (
            <Initial>{initial}</Initial>
          )}
        </Avatar>
        <ContentHeader>
          <ContentHeaderText>
            <Welcome>Bem vindo de volta,</Welcome>
            <Name>{user.name}</Name>
          </ContentHeaderText>
          <Logout onPress={handleLogout}>
            <Icon name="exit-to-app" size={25} color="#E74040" />
          </Logout>
        </ContentHeader>
      </Header>
      <Content>
        <Heading>
          <Title>Entregas</Title>
          <Filters>
            <Pending onPress={() => setIsConcluded(false)}>
              <TextFilter active={!isConcluded}>Pendentes</TextFilter>
            </Pending>
            <HandedOut onPress={() => setIsConcluded(true)}>
              <TextFilter active={isConcluded}>Entregues</TextFilter>
            </HandedOut>
          </Filters>
        </Heading>
        {packages.length < 1 && (
          <NotRegister>
            <TextNotRegister>
              Não existem dados para serem exibos
            </TextNotRegister>
          </NotRegister>
        )}

        <List
          data={packages}
          keyExtractor={item => String(item.id)}
          renderItem={({ item }) => (
            <Card>
              <CardHeader>
                <Icon name="local-shipping" size={22} color="#7D40E7" />
                <CardTitle>Encomenda {item.key}</CardTitle>
              </CardHeader>
              <CardBody>
                <TimeLine>
                  <Ellipses>
                    <Line />
                    <>
                      <Ellipse complete={!item.awaitingWithdrawal}>
                        <TextLine>Aguardando Retirada</TextLine>
                      </Ellipse>
                      <Ellipse complete={!item.awaitingWithdrawal}>
                        <TextLine>Retirada</TextLine>
                      </Ellipse>
                      <Ellipse complete={item.delivered}>
                        <TextLine>Entregue</TextLine>
                      </Ellipse>
                    </>
                  </Ellipses>
                </TimeLine>
              </CardBody>
              <CardFooter>
                <Info>
                  <Label>Data</Label>
                  <Text>{format(parseISO(item.start_date), 'dd/MM/yyyy')}</Text>
                </Info>
                <Info>
                  <Label>Cidade</Label>
                  <Text>{item.recipient.city}</Text>
                </Info>
                <Info>
                  <Details
                    onPress={() =>
                      navigation.navigate('Detail', { delivery: item })
                    }
                  >
                    <DetailText>Ver detalhes</DetailText>
                  </Details>
                </Info>
              </CardFooter>
            </Card>
          )}
        />
      </Content>
    </Container>
  );
}

function TabBarIcon({ tintColor }) {
  return <Icon name="menu" size={20} color={tintColor} />;
}

Dashboard.navigationOptions = {
  tabBarLabel: 'Entregas',
  tabBarIcon: TabBarIcon,
};

Dashboard.propTypes = {
  isFocused: PropTypes.bool.isRequired,
  navigation: PropTypes.shape.isRequired,
};

TabBarIcon.propTypes = {
  tintColor: PropTypes.string.isRequired,
};

export default withNavigationFocus(Dashboard);
