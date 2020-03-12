/* eslint-disable prettier/prettier */
import mailLib from '../../libs/mail';

class AssignerOrderJob {
  get key() {
    return 'AssignerOrder';
  }

  async handle({ data }) {
    const { dataEmail } = data;

    await mailLib.sendEmail({
      to: `${dataEmail.deliveryman.name} <${dataEmail.deliveryman.email}>`,
      subject: 'Nova encomenda',
      template: 'assignedOrder',
      context: {
        deliveryMan: dataEmail.deliveryman.name,
        product: dataEmail.product,
        name: dataEmail.recipient.name,
        street: dataEmail.recipient.street,
        number: dataEmail.recipient.number,
        complement: dataEmail.recipient.complement,
        state: dataEmail.recipient.state,
        city: dataEmail.recipient.city,
        zip_code: dataEmail.recipient.zip_code,
      },
    });
  }
}

export default new AssignerOrderJob();
