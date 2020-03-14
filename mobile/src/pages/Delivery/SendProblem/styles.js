import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';

export const Container = styled.SafeAreaView`
  flex: 1;
`;

export const Background = styled.View`
  background: #7d40e7;
  height: 140px;
`;

export const Content = styled.View`
  align-items: center;
  top: -70px;
`;

export const Form = styled.View`
  width: 335px;
`;

export const Input = styled.TextInput.attrs({
  multiline: true,
  textAlignVertical: 'top',
  placeholder: 'Inclua aqui o problema que ocorreu na entrega.',
  placeholderTextColor: '#999999',
})`
  background: #fff;
  border-radius: 4px;
  padding: 20px;
  height: 300px;
  font-size: 16px;
`;

export const Button = styled(RectButton)`
  background: #7d40e7;
  height: 45px;
  border-radius: 4px;
  margin-top: 20px;
  align-items: center;
  justify-content: center;
`;

export const Text = styled.Text`
  color: #fff;
  font-size: 16px;
  font-weight: bold;
`;
