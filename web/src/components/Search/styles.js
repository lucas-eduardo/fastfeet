import styled from 'styled-components';

export const Input = styled.div`
  width: 237px;
  height: 36px;
  background: #fff;
  border: 1px solid #dddddd;
  border-radius: 4px;
  padding: 9px 0 9px 16px;

  display: flex;
  align-items: center;

  svg {
    margin-right: 8px;
  }

  input {
    width: 100%;
    padding-right: 19px;
    border: 0;
    background: none;

    &::placeholder {
      color: #999999;
    }
  }
`;
