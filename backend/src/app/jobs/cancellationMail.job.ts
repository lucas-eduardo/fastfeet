/* eslint-disable prettier/prettier */
import { format, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt-BR';

import mailLib from '../../libs/mail';

class CancellationMailJob {
  get key() {
    return 'CancellationMail';
  }

  async handle({ data }) {
    const { packageData } = data;

    await mailLib.sendEmail({
      to: `${packageData.deliveryman.name} <${packageData.deliveryman.email}>`,
      subject: 'Encomenda cancelada',
      template: 'cancellation',
      context: {
        deliveryMan: packageData.deliveryman.name,
        product: packageData.product,
        name: packageData.recipient.name,
        date: format(
          parseISO(packageData.canceled_at),
          "'dia' dd 'de' MMMM', às' H:mm'h'",
          {
            locale: pt,
          },
        ),
      },
    });
  }
}

export default new CancellationMailJob();
