/* eslint-disable object-curly-newline */
import { getHours, getMinutes, getDay, parseISO } from 'date-fns';
import scheduleModel from '../models/schedule.model';
import daysConstant from '../../constants/days.constant';

class VerifyRegisterDataPackage {
  async run({ start_date }) {
    const keyDay = getDay(parseISO(start_date));

    const schedule = await scheduleModel.findOne({
      where: { day: daysConstant(keyDay) },
    });

    if (!schedule) {
      throw new Error('Date not allowed to pick up order');
    }

    const hourStartDate = getHours(parseISO(start_date));
    const minuteStartDate = getMinutes(parseISO(start_date));

    const availableTimes = schedule.hours.split(';');
    const verify = availableTimes.map((time: string) => {
      const [hour, minute] = time.split(':');
      return (
        Number(hour) === hourStartDate && minuteStartDate >= Number(minute)
      );
    });

    if (!verify.includes(true)) {
      throw new Error('Time not allowed');
    }
  }
}

export default new VerifyRegisterDataPackage();
