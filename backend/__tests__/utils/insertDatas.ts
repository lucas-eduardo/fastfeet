/* eslint-disable */
import bcrypt from 'bcryptjs';
import database from '../../src/database/index';

export default function truncate() {

  return Promise.all(
    Object.keys(database.connection.models).map(model => {
      if (model === 'User') {
        database.connection.models['User'].create({
          name: 'Distruidora FastFeet',
          email: 'admin@fastfeet.com',
          password_hash: bcrypt.hashSync('123456', 8),
          created_at: new Date(),
          updated_at: new Date(),
        });
      }

      if (model === 'Schedule') {
        database.connection.models['Schedule'].bulkCreate([
          {
            day: 'segunda',
            hours:
              '08:00;09:00;10:00;11:00;12:00;13:00;14:00;15:00;16:00;17:00;18:00',
            created_at: new Date(),
            updated_at: new Date(),
          },
          {
            day: 'terça',
            hours:
              '08:00;09:00;10:00;11:00;12:00;13:00;14:00;15:00;16:00;17:00;18:00',
            created_at: new Date(),
            updated_at: new Date(),
          },
          {
            day: 'quarta',
            hours:
              '08:00;09:00;10:00;11:00;12:00;13:00;14:00;15:00;16:00;17:00;18:00',
            created_at: new Date(),
            updated_at: new Date(),
          },
          {
            day: 'quinta',
            hours:
              '08:00;09:00;10:00;11:00;12:00;13:00;14:00;15:00;16:00;17:00;18:00',
            created_at: new Date(),
            updated_at: new Date(),
          },
          {
            day: 'sexta',
            hours:
              '08:00;09:00;10:00;11:00;12:00;13:00;14:00;15:00;16:00;17:00;18:00',
            created_at: new Date(),
            updated_at: new Date(),
          },
        ]);
      }
    })
  );
}
