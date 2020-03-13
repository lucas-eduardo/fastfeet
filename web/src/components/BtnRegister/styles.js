import styled from 'styled-components';
import { darken } from 'polished';

export const Wrapper = styled.div`
  width: 142px;
  height: 36px;

  a {
    width: 100%;
    height: 100%;
    color: #fff;
    font-weight: 777;
    text-transform: uppercase;
    border-radius: 4px;
    background: #7d40e7;

    display: flex;
    align-items: center;
    justify-content: center;

    svg {
      margin-right: 7px;
    }

    &:hover {
      background: ${darken(0.05, '#7d40e7')};
    }
  }
`;
