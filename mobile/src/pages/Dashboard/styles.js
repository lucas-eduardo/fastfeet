import styled, { css } from 'styled-components/native';

export const Container = styled.SafeAreaView`
  flex: 1;

  padding: 20px 35px 0 35px;
`;

export const Header = styled.View`
  flex-direction: row;

  align-items: center;
`;

export const Avatar = styled.View`
  width: 68px;
  height: 68px;

  background: #f4effc;
  border-radius: 68px;

  justify-content: center;
  align-items: center;

  margin-right: 12px;
`;

export const Image = styled.Image`
  width: 68px;
  height: 68px;
  border-radius: 68px;
`;

export const Initial = styled.Text`
  color: #a28fd0;
  font-size: 31px;
`;

export const ContentHeader = styled.View`
  flex: 1;
  flex-direction: row;

  justify-content: space-between;
  align-items: center;
`;

export const ContentHeaderText = styled.View`
  flex-direction: column;
`;

export const Welcome = styled.Text`
  font-size: 12px;
  color: #666666;
`;

export const Name = styled.Text`
  font-size: 22px;
  font-weight: bold;
  color: #444444;
`;

export const Logout = styled.TouchableOpacity`
  width: 50px;
  height: 50px;

  justify-content: center;
  align-items: center;
`;

export const Content = styled.View`
  margin-top: 21px;
`;

export const List = styled.FlatList.attrs({
  showsVerticalScrollIndicator: false,
})``;

export const Heading = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const Title = styled.Text`
  font-size: 22px;
  font-weight: bold;
  color: #444444;
`;

export const Filters = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const Pending = styled.TouchableOpacity`
  margin-right: 15px;
  align-items: center;
  justify-content: center;
  height: 30px;
`;

export const HandedOut = styled.TouchableOpacity``;

export const TextFilter = styled.Text`
  font-size: 12px;
  font-weight: bold;
  color: ${props => (props.active ? '#7D40E7' : '#999999')};
  ${props =>
    props.active &&
    css`
      border-style: solid;
      border-bottom-color: #7d40e7;
      border-bottom-width: 1px;
    `}
`;

export const Card = styled.View`
  border: 1px solid #0000001a;
  border-radius: 4px;
  margin-top: 9px;
  margin-bottom: 28px;
`;

export const CardHeader = styled.View`
  padding: 12px 0 24px 20px;
  flex-direction: row;
  align-items: center;
`;

export const CardTitle = styled.Text`
  font-size: 14px;
  font-weight: bold;
  color: #7d40e7;
  margin-left: 10px;
`;

export const CardBody = styled.View`
  padding: 0 21px 6px 21px;
  align-items: center;
`;

export const TimeLine = styled.View`
  width: 288px;
  height: 44px;
  align-items: center;
  position: relative;
`;

export const Line = styled.View`
  position: absolute;
  width: 245px;
  height: 1px;
  background: #7d40e7;
`;

export const Ellipses = styled.View`
  width: 250px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const Ellipse = styled.View`
  width: 9px;
  height: 9px;
  background: ${props => (props.complete ? '#7d40e7' : '#fff')};
  border: 1px solid #7d40e7;
  border-radius: 9px;
  align-items: center;
`;

export const TextLine = styled.Text`
  margin-top: 10px;
  width: 44px;
  text-align: center;
  font-size: 8px;
`;

export const CardFooter = styled.View`
  height: 64px;
  background: #f8f9fd;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 20px 21px;
  border-bottom-left-radius: 4px;
  border-bottom-right-radius: 4px;
`;

export const Info = styled.View`
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
`;

export const Label = styled.Text`
  font-size: 8px;
  font-weight: bold;
  color: #999999;
`;

export const Text = styled.Text`
  font-size: 12px;
  font-weight: bold;
  color: #444444;
`;

export const Details = styled.TouchableOpacity``;

export const DetailText = styled.Text`
  color: #7d40e7;
  font-size: 12px;
  font-weight: bold;
`;

export const NotRegister = styled.View`
  width: 100%;
  height: 51px;
  align-content: center;
  justify-content: center;
  border-radius: 4px;
  padding: 20px;
  background: #cce5ff;
`;

export const TextNotRegister = styled.Text`
  color: #004085;
`;
