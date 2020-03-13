import api from '../../../../services/api';

const handleSubmit = async ({ name, email, file, idUser }) => {
  try {
    if (file) {
      const data = new FormData();
      data.append('file', file);

      const response = await api.post('files', data);

      const { id: avatar_id } = response.data;

      return {
        avatar_id,
        name,
        email,
        id: idUser,
      };
    }

    return {
      name,
      email,
      id: idUser,
    };
  } catch (error) {
    throw new Error('Error register image');
  }
};

const createDeliveryMan = async ({ name, email, avatar_id }) => {
  try {
    await api.post('deliverymans', { name, email, avatar_id });
  } catch (error) {
    throw new Error('Error register delivery man');
  }
};

const updateDeliveryMan = async ({ name, email, avatar_id, id }) => {
  try {
    await api.put(`deliverymans/${id}`, { name, email, avatar_id });
  } catch (error) {
    throw new Error('Error update delivery man');
  }
};

export default {
  handleSubmit,
  createDeliveryMan,
  updateDeliveryMan,
};
