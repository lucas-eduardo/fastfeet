import styled from 'styled-components';
import { darken } from 'polished';

export const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  background: #7d40e7;

  display: flex;
  justify-content: center;
  align-items: center;

  form {
    width: 360px;
    background: #fff;
    box-shadow: 0px 0px 10px #0003;
    border-radius: 4px;
    padding: 60px 30px;

    display: flex;
    flex-direction: column;
    align-items: center;

    img {
      width: 260px;
      height: 45px;
      margin-bottom: 40px;
    }

    div {
      display: flex;
      flex-direction: column;

      label {
        color: #444444;
        font-size: 1rem;
        text-transform: uppercase;
        font-weight: 600;
        margin-bottom: 9px;
      }

      input {
        width: 300px;
        height: 45px;
        padding: 12px 0 12px 15px;
        background: #ffffff;
        border: 1px solid #dddddd;
        border-radius: 4px;
        font-size: 1.143rem;

        &::placeholder {
          color: #999;
        }

        &:focus {
          border: 1px solid #7d40e7;
        }
      }

      span {
        color: #dc3545;
        margin-top: 5px;
        font-size: 0.8571rem;

        &:before {
          content: '*';
          margin-right: 3px;
        }
      }

      & + div {
        margin-top: 15px;
      }
    }

    div.container-button {
      width: 300px;
      height: 45px;
      margin-top: 15px;
      button {
        width: 100%;
        height: 100%;
        background: #7d40e7;
        border-radius: 4px;
        color: #fff;
        font-weight: 600;
        font-size: 1.143rem;
        transition: background 0.2s;

        &:hover {
          background: ${darken(0.08, '#7d40e7')};
        }
      }
    }
  }
`;
