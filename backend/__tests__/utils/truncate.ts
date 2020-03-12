/* eslint-disable */
import database from '../../src/database/index';

export default function truncate() {
  return Promise.all(
    Object.keys(database.connection.models).map(model =>
      database.connection.models[model].destroy({
      truncate: true,
      force: true,
      })
    )
  );
}
