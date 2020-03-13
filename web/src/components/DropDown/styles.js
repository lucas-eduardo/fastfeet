import styled from 'styled-components';
import { darken } from 'polished';

export const Wrapper = styled.div`
  cursor: default;
  width: 150px;
  position: absolute;
  z-index: 1;
  top: 0;
  margin-top: 50px;
  box-shadow: 0px 0px 2px #00000026;
  background: #ffffff 0% 0% no-repeat padding-box;
  border-radius: 4px;

  display: ${props => (props.showMenu ? 'flex' : 'none')};
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
  padding: 15px 10px;

  button {
    width: 100%;
    color: #999999;
    font-size: 1.143rem;
    transition: color 0.2s;
    border-bottom: 1px solid #eeeeee;
    padding-top: 6px;
    padding-bottom: 6px;

    display: flex;
    align-items: center;

    > svg {
      margin-right: 8px;
    }

    &:hover {
      color: ${darken(0.08, '#999999')};
    }

    &:first-child {
      padding-top: 0;
    }

    &:last-child {
      border-bottom: 0;
      padding-bottom: 0;
    }
  }

  &::before {
    content: '';
    width: 0px;
    height: 0;
    border-left: 7px solid transparent;
    position: absolute;
    border-right: 7px solid transparent;
    border-bottom: 9px solid #e0e0e087;
    display: block;
    margin-left: 56px;
    top: -9px;
  }
`;
