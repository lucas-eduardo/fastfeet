import React from 'react';
import PropTypes from 'prop-types';
import { MdSearch } from 'react-icons/md';

import { Input } from './styles';

export default function Search({ titleSearch, fn }) {
  return (
    <Input>
      <MdSearch size={16} color="#999999" />
      <input
        type="text"
        placeholder={`Buscar por ${titleSearch}`}
        onChange={v => fn(v.target.value)}
      />
    </Input>
  );
}

Search.propTypes = {
  titleSearch: PropTypes.string.isRequired,
  fn: PropTypes.func.isRequired,
};
