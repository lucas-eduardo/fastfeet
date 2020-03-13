import styled from 'styled-components';
import { darken } from 'polished';

export const Wrapper = styled.div`
  width: 100%;
  min-height: 100vh;
`;

export const Header = styled.div`
  width: 100%;
  height: 64px;
  background: #ffffff;
  border: 1px solid #dddddd;
  padding: 20px 30px;

  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const Left = styled.div`
  display: flex;
  align-items: center;

  img {
    width: 135px;
    height: 26px;
  }

  ul {
    display: flex;
    align-items: center;
    justify-content: center;

    li,
    a {
      margin-right: 31px;
      text-transform: uppercase;
      color: #999999;
      font-size: 1.071rem;
      font-weight: 700;
      cursor: pointer;
      transition: color 0.2s;

      &:hover {
        color: ${darken(0.1, '#999999')};
      }

      &.active {
        color: #444444;
      }

      &:last-child {
        margin-right: 0;
      }
    }
  }
`;

export const Division = styled.div`
  width: 1px;
  height: 32px;
  background: #dddddd;
  margin: 0 30px;
`;

export const Right = styled.div`
  font-size: 1rem;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  strong {
    color: #666666;
  }

  button {
    color: #de3b3b;

    &:hover {
      color: ${darken(0.1, '#de3b3b')};
    }
  }
`;

export const Container = styled.div`
  width: 100%;
  height: 100vh;
  background: #f5f5f5;
  padding: 34px 120px;
`;
