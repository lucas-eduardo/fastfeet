import React, { useState, useRef } from 'react';
import { TouchableOpacity, Alert } from 'react-native';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Spinner from 'react-native-loading-spinner-overlay';

import api from '../../../services/api';

import image from '../../../assets/image.png';

import {
  Container,
  Background,
  Content,
  CaptureImage,
  Image,
  Camera,
  Actions,
  ButtonCamera,
  Button,
  Text,
} from './styles';

export default function Confirm({ navigation }) {
  const [showCamera, setShowCamera] = useState(false);
  const [takeImage, setTakeImage] = useState('');
  const [dataImage, setDataImage] = useState({});
  const [loading, setLoading] = useState(false);

  const idUser = useSelector(state => state.auth.id);
  const idDelivery = navigation.getParam('id');

  const camera = useRef(null);

  async function takePicture() {
    const data = await camera.current.takePictureAsync({
      quality: 0.5,
      base64: true,
    });

    setTakeImage(data.uri);
    setDataImage(data);
    setShowCamera(false);
  }

  async function handleSubmit() {
    setLoading(true);
    try {
      const data = new FormData();
      data.append('file', {
        uri: dataImage.uri,
        name: 'signature.jpg',
        type: 'image/jpeg',
      });
      const response = await api.post('files', data);

      await api.put(`deliveryman/${idUser}/deliveries/${idDelivery}`, {
        signature_id: response.data.id,
      });

      setLoading(false);
      navigation.navigate('Dashboard');
    } catch (error) {
      setLoading(false);
      Alert.alert(
        'Erro inesperado',
        'Ocorreu um erro inesperado para concluir a entrega do produto'
      );
    }
  }

  return (
    <Container>
      <Background />
      <Content>
        <Spinner
          visible={loading}
          animation="fade"
          overlayColor="rgba(0,0,0,0.8)"
          textContent="Concluindo entrega"
          textStyle={{ color: '#fff' }}
        />
        {showCamera ? (
          <CaptureImage>
            <Camera
              ref={camera}
              type={Camera.Constants.Type.back}
              autoFocus={Camera.Constants.AutoFocus.on}
              flashMode={Camera.Constants.FlashMode.off}
            />

            <Actions isCamera={showCamera}>
              <ButtonCamera onPress={() => takePicture()}>
                <Icon name="photo-camera" size={25} color="#fff" />
              </ButtonCamera>
            </Actions>
          </CaptureImage>
        ) : (
          <>
            <Image source={takeImage ? { uri: takeImage } : image}>
              <Actions>
                <ButtonCamera onPress={() => setShowCamera(true)}>
                  <Icon name="photo-camera" size={25} color="#fff" />
                </ButtonCamera>
              </Actions>
            </Image>
            <Button disabled={!takeImage} onPress={handleSubmit}>
              <Text>Enviar</Text>
            </Button>
          </>
        )}
      </Content>
    </Container>
  );
}

Confirm.propTypes = {
  navigation: PropTypes.shape().isRequired,
};

Confirm.navigationOptions = ({ navigation }) => ({
  title: 'Confirmar entrega',
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
