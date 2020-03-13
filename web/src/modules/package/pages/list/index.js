import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { MdRemoveRedEye, MdEdit, MdDeleteForever } from 'react-icons/md';
import ReactLoading from 'react-loading';
import { GiPlainCircle } from 'react-icons/gi';
import { parseISO, format } from 'date-fns';

import history from '../../../../services/history';

import Title from '../../../../components/Title';
import Search from '../../../../components/Search';
import Button from '../../../../components/BtnRegister';

import api from '../../../../services/api';

import {
  Wrapper,
  Header,
  Table,
  THead,
  TBody,
  Initials,
  Status,
  Menu,
  Modal,
  Info,
  Alert,
  Loading,
} from './styles';

export default function List() {
  const [packages, setPackages] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [loading, setLoading] = useState(true);
  const [recipient, setRecipient] = useState({});
  const [datesRecipient, setDatesRecipient] = useState({});
  const [imageSignature, setImageSignature] = useState('');
  const [productName, setProductName] = useState('');
  const [productId, setProductId] = useState('');

  async function loadPackages(param) {
    setLoading(true);
    const response = await api.get('packages', { params: param });

    const data = response.data.map(item => {
      let statusText = '';
      let canceled = false;
      let delivered = false;
      let pending = false;

      const initials = item.deliveryman.name
        .split(' ')
        .map(n => n[0])
        .join('');

      if (item.canceled_at) {
        statusText = 'Cancelado';
        canceled = true;
      } else if (item.end_date) {
        statusText = 'Entregue';
        delivered = true;
      } else {
        statusText = 'Pendente';
        pending = true;
      }

      item.start_date = item.start_date
        ? format(parseISO(item.start_date), 'dd/MM/yyyy')
        : null;
      item.end_date = item.end_date
        ? format(parseISO(item.end_date), 'dd/MM/yyyy')
        : null;

      return {
        ...item,
        showMenu: false,
        initials,
        statusText,
        canceled,
        delivered,
        pending,
      };
    });

    setPackages(data);
    setLoading(false);
  }

  useEffect(() => {
    loadPackages();
  }, []);

  useEffect(() => {
    window.onclick = ({ target }) => {
      if (showModal && target.id === 'modal') {
        setShowModal(false);
      }
    };
  }, [showModal]);

  function handleMenu(id) {
    const newBbj = packages.map(item => {
      if (item.id === id) {
        item.showMenu = !item.showMenu;
      } else {
        item.showMenu = false;
      }
      return item;
    });

    setPackages(newBbj);
  }

  function handlePreview(info) {
    setPackages(
      packages.map(item => {
        item.showMenu = false;
        return item;
      })
    );
    setShowModal(!showModal);
    setRecipient(info.recipient);
    setDatesRecipient({ start: info.start_date, end: info.end_date });
    setImageSignature(info.signature ? info.signature.url : '');
  }

  function handleAlertDelete({ product, id }) {
    setPackages(
      packages.map(item => {
        item.showMenu = false;
        return item;
      })
    );

    setProductName(product);
    setProductId(id);
    setShowAlert(true);
  }

  async function handleDelete(id) {
    setShowAlert(false);
    try {
      await api.delete(`packages/${id}`);
      const index = packages.findIndex(item => item.id === id);
      const newPackages = packages;
      newPackages.splice(index, 1);
      setPackages(newPackages);
      toast.success(`O produto ${productName} foi excluido com sucesso!`);
    } catch (error) {
      toast.error(
        `Ocorreu um erro inesperado para excluir o produto ${productName}, tente novamente mais tarde`
      );
    }
  }

  async function handleSearch(text) {
    if (text.length >= 3) {
      const param = { q: text };
      loadPackages(param);
    } else {
      loadPackages();
    }
  }

  return (
    <Wrapper>
      <Title title="Gerenciando encomendas" />

      <Header>
        <Search titleSearch="encomedas" fn={handleSearch} />
        <Button url="cadastrar" />
      </Header>
      {packages.length > 0 && !loading && (
        <Table>
          <THead>
            <li>ID</li>
            <li>Destinatário</li>
            <li>Entregador</li>
            <li>Cidade</li>
            <li>Estado</li>
            <li>Status</li>
            <li>Ações</li>
          </THead>
          <TBody>
            {packages.map(item => (
              <ul key={item.id}>
                <li>#{item.id}</li>
                <li>{item.recipient.name}</li>
                <li>
                  <Initials
                    canceled={item.canceled}
                    delivered={item.delivered}
                    pending={!item.pending}
                  >
                    {item.initials}
                  </Initials>
                  <span>{item.deliveryman.name}</span>
                </li>
                <li>{item.recipient.city}</li>
                <li>{item.recipient.state}</li>
                <li>
                  <Status
                    canceled={item.canceled}
                    delivered={item.delivered}
                    pending={!item.pending}
                  >
                    <span>{item.statusText}</span>
                  </Status>
                </li>
                <li>
                  <div className="actions" onClick={() => handleMenu(item.id)}>
                    <GiPlainCircle size={5} color="#666666" />
                    <GiPlainCircle size={5} color="#666666" />
                    <GiPlainCircle size={5} color="#666666" />
                  </div>

                  <Menu showMenu={item.showMenu}>
                    <button type="button" onClick={() => handlePreview(item)}>
                      <MdRemoveRedEye size={15} color="#8E5BE8" /> Visualizar
                    </button>
                    <button
                      type="button"
                      onClick={() => history.push(`editar/${item.id}`)}
                    >
                      <MdEdit size={15} color="#4D85EE" /> Editar
                    </button>
                    <button
                      type="button"
                      onClick={() => handleAlertDelete(item)}
                    >
                      <MdDeleteForever size={15} color="#DE3B3B" /> Excluir
                    </button>
                  </Menu>
                </li>
              </ul>
            ))}
          </TBody>
        </Table>
      )}

      {packages.length === 0 && !loading && (
        <Info>Nenhuma encomenda cadastrada no momento!</Info>
      )}

      {loading && (
        <Loading>
          <ReactLoading
            type="spinningBubbles"
            color="#7d40e7"
            height="25px"
            width="25px"
          />

          <span>Carregando</span>
        </Loading>
      )}

      <Alert showAlert={showAlert}>
        <div>
          <div className="title">
            <h3>
              Tem certeza que deseja excluir o produto{' '}
              <span>{productName}</span>?
            </h3>
          </div>
          <div className="actions">
            <button
              type="button"
              className="accept"
              onClick={() => handleDelete(productId)}
            >
              Sim
            </button>
            <button
              type="button"
              className="reject"
              onClick={() => setShowAlert(false)}
            >
              Não
            </button>
          </div>
        </div>
      </Alert>

      <Modal showModal={showModal}>
        <div>
          <div>
            <h3>Informações da encomenda</h3>

            <span>
              {recipient.street}, {recipient.number}
            </span>
            <span>
              {recipient.city} - {recipient.state}
            </span>
            <span>{recipient.zip_code}</span>
          </div>

          {(datesRecipient.start || datesRecipient.end) && (
            <div>
              <h3>Datas</h3>
              {datesRecipient.start && (
                <strong>
                  Retirada: <span>{datesRecipient.start}</span>
                </strong>
              )}
              {datesRecipient.end && (
                <strong>
                  Entrega: <span>{datesRecipient.end}</span>
                </strong>
              )}
            </div>
          )}

          {imageSignature && (
            <div>
              <h3>Assinatura do destinatário</h3>
              <div>
                <img src={imageSignature} alt="Assinatura" />
              </div>
            </div>
          )}
        </div>
      </Modal>
    </Wrapper>
  );
}
