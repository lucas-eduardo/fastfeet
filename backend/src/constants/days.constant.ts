export default (key: number) => {
  const days = [];

  days[0] = 'domingo';
  days[1] = 'segunda';
  days[2] = 'terça';
  days[3] = 'quarta';
  days[4] = 'quinta';
  days[5] = 'sexta';
  days[6] = 'sabado';

  return days[key];
};
