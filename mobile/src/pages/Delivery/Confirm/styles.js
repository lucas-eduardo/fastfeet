import styled, { css } from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';
import { RNCamera } from 'react-native-camera';

export const Container = styled.SafeAreaView`
  flex: 1;
`;

export const Background = styled.View`
  background: #7d40e7;
  height: 140px;
`;

export const Content = styled.View`
  align-items: center;
  top: -73px;
`;

export const CaptureImage = styled.View`
  width: 335px;
  height: 445px;
  max-height: 445px;
  min-height: 445px;
  margin-bottom: 11px;
`;

export const Camera = styled(RNCamera)`
  width: 100%;
  height: 100%;
  max-height: 445px;
  min-height: 445px;
  align-items: center;
`;

export const Image = styled.ImageBackground`
  width: 335px;
  height: 445px;
  max-height: 445px;
  min-height: 445px;
  margin-bottom: 11px;
`;

export const Actions = styled.View`
  ${props =>
    !props.isCamera &&
    css`
      height: 445px;
    `};

  ${props =>
    props.isCamera &&
    css`
      top: -80;
    `};
  align-items: center;
  justify-content: flex-end;
`;

export const ButtonCamera = styled(RectButton)`
  background: rgba(0, 0, 0, 0.3);
  width: 61px;
  height: 61px;
  border-radius: 30px;
  align-items: center;
  justify-content: center;
  margin-bottom: 33px;
`;

export const Button = styled.TouchableOpacity`
  width: 335px;
  height: 45px;
  background: #7d40e7;
  ${props =>
    props.disabled &&
    css`
      background: rgba(125, 64, 231, 0.2);
    `}
  border-radius: 4px;
  align-items: center;
  justify-content: center;
`;

export const Text = styled.Text`
  font-size: 16px;
  color: #fff;
  font-weight: bold;
`;
