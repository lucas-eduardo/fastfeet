import { Platform } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import styled from 'styled-components/native';

export const Container = styled.KeyboardAvoidingView.attrs({
  enabled: Platform.OS === 'ios',
  behavior: 'padding',
})`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: 0 35px;
`;

export const Form = styled.View`
  align-self: stretch;
  margin-top: 50px;
`;

export const FormInput = styled.TextInput.attrs({
  placeholderTextColor: '#999999',
  paddingHorizontal: 20,
  paddingVertical: 13,
  keyboardType: 'numeric',
})`
  height: 45px;
  margin-top: 37px;
  background: #fff;
  border-radius: 4px;
  border: 1px solid #dddddd;
`;

export const Button = styled(RectButton)`
  margin-top: 14px;
  height: 45px;
  background: #82bf18;
  border-radius: 4px;
  align-items: center;
  justify-content: center;
`;

export const Text = styled.Text`
  color: #fff;
  font-weight: bold;
  font-size: 16px;
`;
