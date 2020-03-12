/* eslint-disable arrow-parens */
/* eslint-disable comma-dangle */
const bcrypt = require('bcryptjs');

module.exports = {
  up: QueryInterface => {
    const insert = QueryInterface.bulkInsert(
      'users',
      [
        {
          name: 'Distruidora FastFeet',
          email: 'admin@fastfeet.com',
          password_hash: bcrypt.hashSync('123456', 8),
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    );
    return insert;
  },

  down: () => {},
};
