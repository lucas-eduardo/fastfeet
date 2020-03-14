import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity, View } from 'react-native';
import { format, parseISO } from 'date-fns';
import Icon from 'react-native-vector-icons/MaterialIcons';

import {
  Container,
  Background,
  Content,
  Card,
  CardHeader,
  CardTitle,
  CardBody,
  Label,
  Text,
  Actions,
  Button,
  Separator,
  ButtonText,
  TwoRows,
} from './styles';

export default function Detail({ navigation }) {
  const delivery = navigation.getParam('delivery');

  const dateWithdrawal = useMemo(
    () => format(parseISO(delivery.start_date), 'dd / MM / yyyy'),
    [delivery.start_date]
  );

  const deliveryDate = useMemo(
    () =>
      delivery.end_date
        ? format(parseISO(delivery.end_date), 'dd / MM / yyyy')
        : '- - / - - / - -',
    [delivery.end_date]
  );

  const status = useMemo(() => {
    if (delivery.end_date) {
      return 'Concluído';
    }
    if (delivery.canceled_at) {
      return 'Cancelado';
    }
    return 'Pendente';
  }, [delivery.end_date, delivery.canceled_at]);

  return (
    <Container>
      <Background />
      <Content>
        <Card>
          <CardHeader>
            <Icon name="local-shipping" size={22} color="#7D40E7" />
            <CardTitle>Informações da entrega</CardTitle>
          </CardHeader>
          <CardBody>
            <Label firstItem>Destinatário</Label>
            <Text>{delivery.recipient.name}</Text>

            <Label>Endereço de entrega</Label>
            <Text>
              {delivery.recipient.street}, {delivery.recipient.number},{' '}
              {delivery.recipient.city} - {delivery.recipient.state},{' '}
              {delivery.recipient.zip_code}
            </Text>

            <Label>Produto</Label>
            <Text>{delivery.product}</Text>
          </CardBody>
        </Card>

        <Card>
          <CardHeader>
            <Icon name="event" size={22} color="#7D40E7" />
            <CardTitle>Situação da entrega</CardTitle>
          </CardHeader>
          <CardBody>
            <Label firstItem>Status</Label>
            <Text>{status}</Text>

            <TwoRows>
              <View>
                <Label>Data de retirada</Label>
                <Text>{dateWithdrawal}</Text>
              </View>

              <View>
                <Label>Data de entrega</Label>
                <Text>{deliveryDate}</Text>
              </View>
            </TwoRows>
          </CardBody>
        </Card>

        {!delivery.end_date && (
          <Actions>
            <Button
              onPress={() =>
                navigation.navigate('SendProblem', { id: delivery.id })
              }
            >
              <Icon name="highlight-off" size={22} color="#E74040" />
              <ButtonText>Informar Problema</ButtonText>
            </Button>
            <Separator />
            <Button
              onPress={() =>
                navigation.navigate('Problems', {
                  id: delivery.id,
                  key: delivery.key,
                })
              }
            >
              <Icon name="info" size={22} color="#E7BA40" />
              <ButtonText>Visualizar Problemas</ButtonText>
            </Button>
            <Separator />
            <Button
              onPress={() =>
                navigation.navigate('Confirm', { id: delivery.id })
              }
            >
              <Icon name="check-circle" size={22} color="#7D40E7" />
              <ButtonText>Confirmar Entrega</ButtonText>
            </Button>
          </Actions>
        )}
      </Content>
    </Container>
  );
}

Detail.propTypes = {
  navigation: PropTypes.shape().isRequired,
};

Detail.navigationOptions = ({ navigation }) => ({
  title: 'Detalhes da encomenda',
  headerLeft: () => (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate('Dashboard');
      }}
    >
      <Icon name="chevron-left" size={20} color="#fff" />
    </TouchableOpacity>
  ),
});
