import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';

export const Container = styled.SafeAreaView`
  flex: 1;

  justify-content: center;
  align-items: center;
  padding: 0 35px;
`;

export const Avatar = styled.View`
  width: 137px;
  height: 137px;

  background: #f4effc;
  border-radius: 137px;

  justify-content: center;
  align-items: center;

  margin-bottom: 40px;
`;

export const Initial = styled.Text`
  color: #a28fd0;
  font-size: 60px;
`;

export const Image = styled.Image`
  width: 137px;
  height: 137px;
  border-radius: 137px;
`;

export const Content = styled.View`
  align-self: stretch;
`;

export const Label = styled.Text`
  font-size: 12px;
  color: #666666;
`;

export const Text = styled.Text`
  font-size: 22px;
  font-weight: bold;
  color: #444444;
  margin-bottom: 15px;
`;

export const Logout = styled(RectButton)`
  margin-top: 15px;
  background: #e74040;
  height: 45px;
  border-radius: 4px;
  align-items: center;
  justify-content: center;
`;

export const TextButton = styled.Text`
  color: #fff;
  font-weight: bold;
  font-size: 16px;
`;
