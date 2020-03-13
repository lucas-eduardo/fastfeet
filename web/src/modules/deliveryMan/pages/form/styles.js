import styled from 'styled-components';
import { darken } from 'polished';

export const Wrapper = styled.div`
  width: 100%;
  height: 100%;

  form .form {
    width: 909px;
    display: flex;
    flex-direction: column;

    .img {
      width: 100%;
      height: 100%;

      display: flex;
      align-items: center;
      justify-content: center;

      div {
        width: 150px;
        height: 150px;
        border: 1px dashed #dddddd;
        border-radius: 50%;

        label {
          width: 100%;
          height: 100%;
          cursor: pointer;

          img {
            width: 100%;
            height: 100%;
            background: #dddddd;
            border: 1px dashed #dddddd;
            border-radius: 50%;
          }

          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;

          > p {
            color: #dddddd;
            font-weight: 700;
            font-size: 1.143rem;
            text-align: center;
            white-space: nowrap;
          }
        }
      }
    }

    div:not(.img):not(.loading) {
      display: flex;
      flex-direction: column;

      label {
        color: #444444;
        font-size: 1rem;
        font-weight: 900;
      }

      div {
        margin-bottom: 18px;

        &:last-child {
          margin-bottom: 0;
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

      input {
        width: 100%;
        height: 45px;
        padding: 12px 15px;
        font-size: 1.143rem;
        margin-top: 9px;

        &::placeholder {
          color: #999999;
        }

        &:focus {
          border: 1px solid #7d40e7;
        }
      }
    }
  }
`;

export const Header = styled.div`
  display: flex;
  align-items: center;

  > div {
    width: 100%;
    height: 100%;
    margin-bottom: 34px;

    display: flex;
    align-items: center;
    justify-content: flex-end;

    a,
    button {
      width: 112px;
      height: 36px;
      border-radius: 4px;
      color: #fff;
      text-transform: uppercase;
      font-size: 1rem;
      font-weight: 900;
      padding: 9px 0;

      & > div {
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;

        & > div.icon {
          margin-right: 2px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
      }
    }

    a {
      background: #cccccc;
      margin-right: 16px;
      transition: background 0.2s;

      &:hover {
        background: ${darken(0.1, '#cccccc')};
      }
    }

    button {
      background: #7d40e7;
      transition: background 0.2s;

      &:hover {
        background: ${darken(0.05, '#7d40e7')};
      }
    }
  }
`;

export const Container = styled.div`
  width: 100%;
  height: 100%;
  min-height: 220px;
  background: #fff;
  border-radius: 4px;
  padding: 32px 30px;

  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Loading = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: center;

  > span.loading {
    color: #7d40e7;
    font-size: 1.429rem;
    margin-left: 10px;

    &:before {
      content: '';
    }
  }
`;
