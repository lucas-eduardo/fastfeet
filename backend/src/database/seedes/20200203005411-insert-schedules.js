/* eslint-disable arrow-parens */
/* eslint-disable comma-dangle */
module.exports = {
  up: QueryInterface => {
    const insert = QueryInterface.bulkInsert(
      'schedules',
      [
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
      ],
      {}
    );
    return insert;
  },

  down: () => {},
};
