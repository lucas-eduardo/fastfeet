import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { GiPlainCircle } from 'react-icons/gi';
import { MdEdit, MdDeleteForever } from 'react-icons/md';
import ReactLoading from 'react-loading';

import api from '../../../../services/api';
import history from '../../../../services/history';

import Title from '../../../../components/Title';
import Search from '../../../../components/Search';
import Button from '../../../../components/BtnRegister';
import Table from '../../../../components/Table';
import THead from '../../../../components/TableHead';
import TBody from '../../../../components/TableBody';
import Initials from '../../../../components/Initials';
import DropDown from '../../../../components/DropDown';

import { Wrapper, Header, Alert, Info, Loading } from './styles';

export default function List() {
  const [deliverysMan, setDeliverysMan] = useState([]);
  const [deliveryManName, setDeliveryManName] = useState('');
  const [deliveryManId, setDeliveruManId] = useState();
  const [showAlert, setShowAlert] = useState(false);
  const [loading, setLoading] = useState(true);

  async function loadDeliveryMans(param) {
    setLoading(true);
    const response = await api.get('deliverymans', { params: param });

    const data = response.data.map(item => {
      const initials = item.name
        .split(' ')
        .map(n => n[0])
        .join('');

      return {
        ...item,
        showMenu: false,
        initials: initials.slice(0, 2),
      };
    });

    setDeliverysMan(data);
    setLoading(false);
  }

  useEffect(() => {
    loadDeliveryMans();
  }, []);

  function handleMenu(id) {
    const newBbj = deliverysMan.map(item => {
      if (item.id === id) {
        item.showMenu = !item.showMenu;
      } else {
        item.showMenu = false;
      }
      return item;
    });

    setDeliverysMan(newBbj);
  }

  function handleAlertDelete({ id, name }) {
    setDeliverysMan(
      deliverysMan.map(item => {
        item.showMenu = false;
        return item;
      })
    );

    setDeliveryManName(name);
    setDeliveruManId(id);
    setShowAlert(true);
  }

  async function handleDelete(id) {
    setShowAlert(false);
    try {
      await api.delete(`deliverymans/${id}`);
      const index = deliverysMan.findIndex(item => item.id === id);
      const newDeliverysMan = deliverysMan;
      newDeliverysMan.splice(index, 1);
      setDeliverysMan(newDeliverysMan);
      toast.success(
        `O entregador ${deliveryManName} foi excluido com sucesso!`
      );
    } catch (error) {
      toast.error(
        `Ocorreu um erro inesperado para excluir o entregador ${deliveryManName}, tente novamente mais tarde`
      );
    }
  }

  async function handleSearch(text) {
    if (text.length >= 3) {
      const param = { q: text };
      loadDeliveryMans(param);
    } else {
      loadDeliveryMans();
    }
  }

  return (
    <Wrapper>
      <Title title="Gerenciando entregadores" />

      <Header>
        <Search titleSearch="entregadores" fn={handleSearch} />
        <Button url="cadastrar" />
      </Header>

      {deliverysMan.length > 0 && !loading && (
        <Table>
          <>
            <THead>
              <>
                <li>ID</li>
                <li>Foto</li>
                <li>Nome</li>
                <li>Email</li>
                <li>Ações</li>
              </>
            </THead>

            <TBody>
              <>
                {deliverysMan.length > 0 &&
                  deliverysMan.map(delivery => (
                    <ul key={delivery.id}>
                      <li>#{delivery.id}</li>
                      <li>
                        {delivery.avatar && (
                          <img
                            src={delivery.avatar.url}
                            alt={delivery.initials}
                          />
                        )}

                        {!delivery.avatar && (
                          <Initials initial={delivery.initials} />
                        )}
                      </li>
                      <li>{delivery.name}</li>
                      <li>{delivery.email}</li>
                      <li>
                        <div
                          className="actions"
                          onClick={() => handleMenu(delivery.id)}
                        >
                          <GiPlainCircle size={5} color="#666666" />
                          <GiPlainCircle size={5} color="#666666" />
                          <GiPlainCircle size={5} color="#666666" />
                        </div>

                        <DropDown showMenu={delivery.showMenu}>
                          <>
                            <button
                              type="button"
                              onClick={() =>
                                history.push(`editar/${delivery.id}`)
                              }
                            >
                              <MdEdit size={15} color="#4D85EE" /> Editar
                            </button>
                            <button
                              type="button"
                              onClick={() => handleAlertDelete(delivery)}
                            >
                              <MdDeleteForever size={15} color="#DE3B3B" />{' '}
                              Excluir
                            </button>
                          </>
                        </DropDown>
                      </li>
                    </ul>
                  ))}
              </>
            </TBody>
          </>
        </Table>
      )}

      {deliverysMan.length === 0 && !loading && (
        <Info>Nenhum entregador cadastrado no momento!</Info>
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
              Tem certeza que deseja excluir o entregador{' '}
              <span>{deliveryManName}</span>?
            </h3>
          </div>
          <div className="actions">
            <button
              type="button"
              className="accept"
              onClick={() => handleDelete(deliveryManId)}
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
    </Wrapper>
  );
}
