import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import ReactLoading from 'react-loading';
import { Form, Input } from '@rocketseat/unform';
import { MdChevronLeft, MdCheck } from 'react-icons/md';
import * as Yup from 'yup';

import api from '../../../../services/api';
import history from '../../../../services/history';

import Title from '../../../../components/Title';

import { Wrapper, Header, Container, Loading } from './styles';

const schema = Yup.object().shape({
  name: Yup.string().required('O nome do é obrigatório'),
  street: Yup.string().required('A rua é obrigatório'),
  number: Yup.number().required('O número é obrigatório'),
  complement: Yup.string('Precisa ser um texto'),
  city: Yup.string().required('A cidade é obrigatória'),
  state: Yup.string().required('O estado é obrigarótio'),
  zip_code: Yup.string().required('O CEP é obrigatório'),
});

export default function FormPage({ match }) {
  const [name, setName] = useState('');
  const [street, setStreet] = useState('');
  const [number, setNumber] = useState(0);
  const [complement, setComplement] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [textHeader, setTextHeader] = useState('Cadastro de destinatário');
  const [loading, setLoading] = useState(false);
  const [textLoading, setLoadingText] = useState('Cadastrando destinatário');

  useEffect(() => {
    async function loadPackage(id) {
      const { data } = await api.get(`recipients/${id}`);

      setName(data.name);
      setStreet(data.street);
      setNumber(data.number);
      setComplement(data.complement);
      setCity(data.city);
      setState(data.state);
      setZipCode(data.zip_code);
    }
    if (match.params.id) {
      setTextHeader('Editar destinatário');
      setLoadingText('Atualizando dados');
      loadPackage(match.params.id);
    }
  }, [match.params]);

  async function handleSubmit(data) {
    setLoading(true);
    try {
      if (match.params.id) {
        await api.put(`recipients/${match.params.id}`, data);
        toast.success('A edição foi feita com sucesso');
      } else {
        await api.post('recipients', data);
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
            <Link to="/destinatarios/lista">
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
            <div className="form">
              <div>
                <label htmlFor="name">Nome</label>
                <Input
                  type="text"
                  placeholder="Ludwig van Beethoven"
                  value={name}
                  id="name"
                  name="name"
                  onChange={e => setName(e.target.value)}
                />
              </div>
              <div className="three">
                <div className="street">
                  <label htmlFor="street">Rua</label>
                  <Input
                    type="text"
                    placeholder="Rua Beethoven"
                    value={street}
                    id="street"
                    name="street"
                    onChange={e => setStreet(e.target.value)}
                  />
                </div>
                <div className="number">
                  <label htmlFor="number">Número</label>
                  <Input
                    type="number"
                    placeholder="1729"
                    value={number}
                    id="number"
                    onChange={e => setNumber(e.target.value)}
                    name="number"
                  />
                </div>

                <div className="complement">
                  <label htmlFor="complement">Complemento</label>
                  <Input
                    type="text"
                    value={complement}
                    id="complement"
                    name="complement"
                    onChange={e => setComplement(e.target.value)}
                  />
                </div>
              </div>
              <div className="three">
                <div className="city">
                  <label htmlFor="city">Cidade</label>
                  <Input
                    type="text"
                    placeholder="Diadema"
                    value={city}
                    id="city"
                    name="city"
                    onChange={e => setCity(e.target.value)}
                  />
                </div>
                <div className="state">
                  <label htmlFor="state">Estado</label>
                  <Input
                    type="text"
                    placeholder="São Paulo"
                    value={state}
                    id="state"
                    name="state"
                    onChange={e => setState(e.target.value)}
                  />
                </div>
                <div className="cep">
                  <label htmlFor="zip_code">CEP</label>
                  <Input
                    type="text"
                    placeholder="09960-580"
                    value={zipCode}
                    id="zip_code"
                    name="zip_code"
                    onChange={e => setZipCode(e.target.value)}
                  />
                </div>
              </div>
            </div>
          )}
        </Container>
      </Form>
    </Wrapper>
  );
}

FormPage.propTypes = {
  match: PropTypes.shape().isRequired,
};
