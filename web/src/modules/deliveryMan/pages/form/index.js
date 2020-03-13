import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import { Form, Input } from '@rocketseat/unform';
import ReactLoading from 'react-loading';
import { Link } from 'react-router-dom';
import { MdChevronLeft, MdCheck, MdImage } from 'react-icons/md';
import * as Yup from 'yup';

import api from '../../../../services/api';
import history from '../../../../services/history';

import Title from '../../../../components/Title';

import Service from './services';

import { Wrapper, Header, Container, Loading } from './styles';

const schema = Yup.object().shape({
  name: Yup.string().required('O nome do é obrigatório'),
  email: Yup.string()
    .email('Insira um e-mail valido')
    .required('O e-mail é obrigatório'),
});

export default function FormPage({ match }) {
  const [file, setFile] = useState();
  const [loading, setLoading] = useState(false);
  const [textLoading, setLoadingText] = useState('Cadastrando entregador');
  const [url, setUrl] = useState('');
  const [deliveryName, setDeliveryName] = useState('');
  const [deliveryEmail, setDeliveryEmail] = useState('');
  const [textHeader, setTextHeader] = useState('Cadastro de entregador');

  useEffect(() => {
    async function loadPackage(id) {
      const { data } = await api.get(`deliverymans/${id}`);

      if (data.avatar) {
        setUrl(data.avatar.url);
      }
      setDeliveryName(data.name);
      setDeliveryEmail(data.email);
    }
    if (match.params.id) {
      setTextHeader('Editar entregador');
      setLoadingText('Atualizando dados');
      loadPackage(match.params.id);
    }
  }, [match.params]);

  useEffect(() => {
    if (file) {
      setUrl(window.URL.createObjectURL(file));
    }
  }, [file]);

  async function handleSubmit({ name, email }) {
    setLoading(true);
    try {
      const obj = await Service.handleSubmit({
        name,
        email,
        file,
        idUser: match.params.id,
      });

      if (obj.id) {
        await Service.updateDeliveryMan(obj);
        setLoading(false);
        return toast.success('Entregador atualizado com sucesso!');
      }

      await Service.createDeliveryMan(obj);
      setLoading(false);
      return history.push('lista');
    } catch (error) {
      setLoading(false);
      return toast.error(
        'Ocorreu um erro inesperado, tente novamente mais tarde!'
      );
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
            <Link to="/entregadores/lista">
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
          <div className="form">
            {loading && (
              <Loading className="loading">
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
                <div className="img">
                  <div>
                    <label htmlFor="file">
                      {url && <img src={url} alt="" />}

                      {!url && (
                        <>
                          <MdImage size={40} color="#DDDDDD" />
                          <p>Adicionar foto</p>
                        </>
                      )}
                    </label>
                    <Input
                      hidden
                      type="file"
                      name="file"
                      id="file"
                      onChange={e => setFile(e.target.files[0])}
                    />
                  </div>
                </div>
                <div>
                  <div>
                    <label htmlFor="name">Nome</label>
                    <Input
                      name="name"
                      id="name"
                      value={deliveryName}
                      onChange={e => setDeliveryName(e.target.value)}
                      placeholder="John Doe"
                    />
                  </div>

                  <div>
                    <label htmlFor="email">Email</label>
                    <Input
                      name="email"
                      id="email"
                      value={deliveryEmail}
                      onChange={e => setDeliveryEmail(e.target.value)}
                      placeholder="example@rocketseat.com"
                    />
                  </div>
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
