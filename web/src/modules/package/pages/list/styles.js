import styled from 'styled-components';
import { darken } from 'polished';

export const Wrapper = styled.div`
  width: 100%;
  height: 100%;
`;

export const Header = styled.div`
  margin-bottom: 22px;

  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const Table = styled.div`
  display: grid;
  grid-template-columns: 90px 2fr 2fr 2fr 2fr 2fr 0fr;
`;

export const THead = styled.ul`
  display: contents;

  li {
    margin-bottom: 14px;
    text-align: left;
    font-size: 1.143rem;
    font-weight: 700;
    color: #444444;

    &:first-child {
      padding-left: 25px;
    }

    &:last-child {
      padding-right: 25px;
    }
  }
`;

export const TBody = styled.div`
  display: contents;

  ul {
    margin-bottom: 21px;
    height: 57px;
    padding: 20px 25px;
    display: contents;

    li {
      width: 100%;
      background: #fff;
      height: 57px;
      margin-bottom: 21px;
      color: #666666;
      font-size: 1.043rem;

      display: flex;
      align-items: center;

      div.actions {
        width: 50px;
        height: 50px;
        cursor: pointer;

        display: flex;
        align-items: center;
        justify-content: center;

        > svg {
          &:first-child {
            margin-right: 2px;
          }
          &:last-child {
            margin-left: 2px;
          }
        }
      }

      &:first-child {
        padding-left: 25px;
        border-radius: 4px 0 0 4px;
      }

      &:last-child {
        padding-right: 25px;
        margin-bottom: 0;
        align-items: center;
        justify-content: center;
        position: relative;
        border-radius: 0 4px 4px 0;
      }
    }
  }
`;

export const Initials = styled.span`
  width: 35px;
  height: 35px;
  background: ${props => {
    if (props.canceled) return '#FFEEF1';
    if (props.delivered) return '#EBFBFA';
    if (props.pending) return '#FCF4EE';
    return '#F4EFFC';
  }};
  border-radius: 50%;
  color: ${props => {
    if (props.canceled) return '#CC7584';
    if (props.delivered) return '#83CEC9';
    if (props.pending) return '#CB946C';
    return '#A28FD0';
  }};
  margin-right: 5px;
  text-transform: uppercase;

  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Status = styled.div`
  width: 60%;
  height: 25px;
  background: ${props => {
    if (props.canceled) return '#FAB0B0';
    if (props.delivered) return '#BAD2FF';
    if (props.pending) return '#F0F0DF';
    return '#DFF0DF';
  }};
  border-radius: 12px;

  display: flex;
  align-items: center;
  justify-content: center;

  span {
    font-weight: 700;
    font-size: 1rem;
    color: ${props => {
      if (props.canceled) return '#DE3B3B';
      if (props.delivered) return '#4D85EE';
      if (props.pending) return '#C1BC35';
      return '#2CA42B';
    }};
  }

  &:before {
    content: '';
    width: 10px;
    height: 10px;
    background: ${props => {
      if (props.canceled) return '#DE3B3B';
      if (props.delivered) return '#4D85EE';
      if (props.pending) return '#C1BC35';
      return '#2CA42B';
    }};
    border-radius: 50%;
    margin: 0 6px;
  }
`;

export const Menu = styled.div`
  cursor: default;
  width: 150px;
  height: 120px;
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

export const Modal = styled.div.attrs({
  id: 'modal',
})`
  display: ${props => (props.showModal ? 'flex' : 'none')};
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background: rgba(0, 0, 0, 0.7);
  justify-content: center;
  align-items: center;

  > div {
    width: 450px;
    height: 353px;
    background: #ffffff;
    padding: 25px;
    box-shadow: 0px 0px 10px #00000033;
    border-radius: 4px;

    h3 {
      color: #444444;
      font-size: 1rem;
      font-weight: 900;
      margin-bottom: 4px;
    }

    span,
    strong > span {
      color: #666666;
      font-weight: 400;
      font-size: 1.143rem;
      margin-bottom: 5px;

      &:last-child {
        margin-bottom: 0;
      }
    }

    strong {
      color: #444444;
      font-size: 1.143rem;
      font-weight: 700;
    }

    display: flex;
    flex-direction: column;

    div {
      margin-bottom: 21px;

      display: flex;
      flex-direction: column;

      &:last-child {
        margin-bottom: 0;
      }

      > div {
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-top: 23px;

        img {
          width: 234px;
          height: 41px;
        }
      }
    }
  }
`;

export const Alert = styled.div`
  display: ${props => (props.showAlert ? 'flex' : 'none')};
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgba(0, 0, 0, 0.5);
  justify-content: center;
  align-items: center;

  > div {
    width: 550px;
    border-radius: 4px;
    background: #fff;
    padding: 20px;
    box-shadow: 0px 0px 2px #000;

    display: flex;
    flex-direction: column;
    align-items: center;

    div {
      &.title {
        display: flex;
        align-items: center;
        justify-content: center;
        color: #333;
        font-size: 1.143rem;
        font-weight: 900;
        text-align: center;

        span {
          font-size: 1rem;
          color: #999;
        }
      }

      &.actions {
        margin-top: 21px;
        width: 250px;
        padding: 5px;

        display: flex;
        flex-direction: row;
        justify-content: space-between;

        button {
          width: 80px;
          height: 40px;
          color: #fff;
          font-weight: 900;
          border-radius: 4px;
          transition: background 0.2s;

          &.accept {
            background: #28a745;

            &:hover {
              background: ${darken(0.08, '#28a745')};
            }
          }

          &.reject {
            background: #dc3545;

            &:hover {
              background: ${darken(0.08, '#dc3545')};
            }
          }
        }
      }
    }
  }
`;

export const Info = styled.div`
  color: #0c5460;
  font-size: 1.143rem;
  font-weight: 900;
  background-color: #d1ecf1;
  border-color: #bee5eb;
  border-radius: 4px;
  padding: 12px 20px;

  display: flex;
  align-items: center;
`;

export const Loading = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: center;

  span {
    color: #7d40e7;
    font-size: 1.429rem;
    margin-left: 10px;
  }
`;
