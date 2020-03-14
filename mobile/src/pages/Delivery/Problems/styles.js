import styled from 'styled-components/native';

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

export const Title = styled.Text`
  color: #fff;
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 11px;
`;

export const Problem = styled.View`
  width: 335px;
  border-radius: 4px;
  background: #fff;
  height: 55px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 19px 11px 19px 19px;
  margin-bottom: 15px;
`;

export const Description = styled.Text`
  color: #999999;
  font-size: 16px;
`;

export const Date = styled.Text`
  color: #c1c1c1;
  font-size: 12px;
`;

export const NotRegister = styled(Problem)`
  padding: 20px;
  background: #cce5ff;
`;

export const TextNotRegister = styled.Text`
  color: #004085;
`;
