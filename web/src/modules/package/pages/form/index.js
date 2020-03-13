import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import ReactLoading from 'react-loading';
import { Form, Input } from '@rocketseat/unform';
import * as Yup from 'yup';

import { MdChevronLeft, MdCheck } from 'react-icons/md';

import api from '../../../../services/api';
import history from '../../../../services/history';

import Title from '../../../../components/Title';

import { Wrapper, Header, Container, Loading } from './styles';

const schema = Yup.object().shape({
  recipient: Yup.string().required('O nome do destinatário é obrigatório'),
  deliveryMan: Yup.string().required('O nome do entregador é obrigatório'),
  product: Yup.string().required('O nome do produto é obrigatório'),
});

export default function FormPage({ match }) {
  const [recipients, setRecipients] = useState([]);
  const [notRecipient, setNotRecipient] = useState(false);
  const [notDelivery, setNotDelivery] = useState(false);
  const [deliverys, setDeliverys] = useState([]);
  const [loading, setLoading] = useState(false);
  const [textLoading, setLoadingText] = useState('Cadastrando encomenda');
  const [recipient, setRecipient] = useState('');
  const [recipientId, setRecipientId] = useState('');
  const [delivery, setDelivery] = useState('');
  const [deliveryId, setDeliveryId] = useState('');
  const [productName, setProductName] = useState('');
  const [textHeader, setTextHeader] = useState('Cadastro de encomenda');

  useEffect(() => {
    async function loadPackage(id) {
      const response = await api.get(`packages/${id}`);
      setRecipient(response.data.recipient.name);
      setRecipientId(response.data.recipient.id);

      setDelivery(response.data.deliveryman.name);
      setDeliveryId(response.data.deliveryman.id);

      setProductName(response.data.product);
    }
    if (match.params.id) {
      setTextHeader('Editar encomenda');
      setLoadingText('Atualizando dados');
      loadPackage(match.params.id);
    }
  }, [match.params]);

  async function handleSearchRecipient(text) {
    if (text && text.length >= 3) {
      const response = await api.get('recipients', {
        params: {
          q: text,
        },
      });
      setRecipients(response.data);
      if (response.data.length) {
        setNotRecipient(false);
      } else {
        setNotRecipient(true);
      }
    } else {
      setRecipients([]);
      setNotRecipient(false);
    }
  }

  async function handleSearchDeliveryMan(text) {
    if (text && text.length >= 3) {
      const response = await api.get('deliverymans', {
        params: {
          q: text,
        },
      });
      setDeliverys(response.data);
      if (response.data.length) {
        setNotDelivery(false);
      } else {
        setNotDelivery(true);
      }
    } else {
      setDeliverys([]);
      setNotDelivery(false);
    }
  }

  async function handleSubmit({ product }) {
    setLoading(true);
    const data = {
      recipient_id: recipientId,
      deliveryman_id: deliveryId,
      product,
    };

    try {
      if (match.params.id) {
        await api.put(`packages/${match.params.id}`, data);
        toast.success('A edição foi feita com sucesso');
      } else {
        await api.post('packages', data);
        history.push('lista');
      }

      setLoading(false);
    } catch (error) {
      setLoading(false);
      toast.error('Ocorreu um erro inesperado, tente novamente mais tarde!');
    }
  }

  return (
    <Wrapper>
      <Form
        noValidate
        autoComplete="off"
        schema={schema}
        onSubmit={handleSubmit}
      >
        <Header>
          <Title title={textHeader} />

          <div>
            <Link to="/">
              <div>
                <div className="icon">
                  <MdChevronLeft size={20} color="#FFFFFF" />
                </div>
                Voltar
              </div>
            </Link>

            <button type="submit">
              <div>
                <div className="icon">
                  <MdCheck size={20} color="#FFFFFF" />
                </div>
                Salvar
              </div>
            </button>
          </div>
        </Header>
        <Container>
          <div>
            {loading && (
              <Loading>
                <ReactLoading
                  type="spinningBubbles"
                  color="#7d40e7"
                  height="25px"
                  width="25px"
                />

                <span className="loading">{textLoading}</span>
              </Loading>
            )}
            {!loading && (
              <>
                <div className="two-inputs">
                  <div>
                    <label htmlFor="recipient">Destinatário</label>
                    <Input
                      name="recipient"
                      id="recipient"
                      value={recipient}
                      placeholder="Ludwig van Beethoven"
                      onChange={v => {
                        setRecipient(v.target.value);
                        handleSearchRecipient(v.target.value);
                      }}
                    />
                    {notRecipient && (
                      <span>Insira um destinatário existente</span>
                    )}
                    {recipients.length > 0 && (
                      <ul>
                        {recipients.map(item => (
                          <li key={item.id}>
                            <button
                              type="button"
                              onClick={() => {
                                setRecipient(item.name);
                                setRecipientId(item.id);
                                setRecipients([]);
                              }}
                            >
                              {item.name}
                            </button>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                  <div>
                    <div>
                      <label htmlFor="deliveryMan">Entregador</label>
                      <Input
                        name="deliveryMan"
                        id="deliveryMan"
                        value={delivery}
                        placeholder="John Doe"
                        onChange={v => {
                          setDelivery(v.target.value);
                          handleSearchDeliveryMan(v.target.value);
                        }}
                      />
                      {notDelivery && (
                        <span>Insira um entregador existente</span>
                      )}
                      {deliverys.length > 0 && (
                        <ul>
                          {deliverys.map(item => (
                            <li key={item.id}>
                              <button
                                type="button"
                                onClick={() => {
                                  setDelivery(item.name);
                                  setDeliveryId(item.id);
                                  setDeliverys([]);
                                }}
                              >
                                {item.name}
                              </button>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </div>
                </div>

                <div>
                  <label htmlFor="product">Nome do produto</label>
                  <Input
                    name="product"
                    id="product"
                    value={productName}
                    onChange={v => {
                      setProductName(v.target.value);
                    }}
                    placeholder="Yamaha SX7"
                  />
                </div>
              </>
            )}
          </div>
        </Container>
      </Form>
    </Wrapper>
  );
}

FormPage.propTypes = {
  match: PropTypes.shape().isRequired,
};
