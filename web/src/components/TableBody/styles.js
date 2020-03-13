import styled from 'styled-components';

export const Wrapper = styled.div`
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

      img {
        width: 35px;
        height: 35px;
        border-radius: 50%;
        background: #f4effc;
      }

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
