import styled from 'styled-components';

export const Wrapper = styled.ul`
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
