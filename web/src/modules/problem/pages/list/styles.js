import styled from 'styled-components';
import { darken } from 'polished';

export const Wrapper = styled.div`
  width: 100%;
  height: 100%;

  > div {
    grid-template-columns: 1fr 5fr 0fr;
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
      text-transform: uppercase;
      margin-bottom: 4px;
    }

    p {
      width: 397px;
      color: #666666;
    }

    display: flex;
    flex-direction: column;
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
