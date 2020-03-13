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
import DropDown from '../../../../components/DropDown';

import { Wrapper, Header, Alert, Info, Loading } from './styles';

export default function List() {
  const [recipients, setRecipients] = useState([]);
  const [recipientName, setRecipientName] = useState('');
  const [recipientId, setRecipientId] = useState();
  const [showAlert, setShowAlert] = useState(false);
  const [loading, setLoading] = useState(false);

  async function loadRecipients(param) {
    setLoading(true);
    const response = await api.get('recipients', { params: param });

    const data = response.data.map(item => {
      return {
        ...item,
        showMenu: false,
        address: `${item.street}, ${item.number}, ${item.city} - ${item.state}`,
      };
    });

    setRecipients(data);
    setLoading(false);
  }

  useEffect(() => {
    loadRecipients();
  }, []);

  function handleMenu(id) {
    const newBbj = recipients.map(item => {
      if (item.id === id) {
        item.showMenu = !item.showMenu;
      } else {
        item.showMenu = false;
      }
      return item;
    });

    setRecipients(newBbj);
  }

  function handleAlertDelete({ id, name }) {
    setRecipients(
      recipients.map(item => {
        item.showMenu = false;
        return item;
      })
    );

    setRecipientName(name);
    setRecipientId(id);
    setShowAlert(true);
  }

  async function handleDelete(id) {
    setShowAlert(false);
    try {
      await api.delete(`recipients/${id}`);
      const index = recipients.findIndex(item => item.id === id);
      const newRecipients = recipients;
      newRecipients.splice(index, 1);
      setRecipients(newRecipients);
      toast.success(
        `O destinatário ${recipientName} foi excluido com sucesso!`
      );
    } catch (error) {
      toast.error(`Não foi possível excluir o destinatário ${recipientName}!`);
    }
  }

  async function handleSearch(text) {
    if (text.length >= 3) {
      const param = { q: text };
      loadRecipients(param);
    } else {
      loadRecipients();
    }
  }

  return (
    <Wrapper>
      <Title title="Gerenciando destinatários" />

      <Header>
        <Search titleSearch="destinatários" fn={handleSearch} />
        <Button url="cadastrar" />
      </Header>

      {recipients.length > 0 && !loading && (
        <Table>
          <>
            <THead>
              <>
                <li>ID</li>
                <li>Nome</li>
                <li>Endereço</li>
                <li>Ações</li>
              </>
            </THead>

            <TBody>
              <>
                {recipients.map(recipient => (
                  <ul key={recipient.id}>
                    <li>#{recipient.id}</li>
                    <li>{recipient.name}</li>
                    <li>{recipient.address}</li>
                    <li>
                      <div
                        className="actions"
                        onClick={() => handleMenu(recipient.id)}
                      >
                        <GiPlainCircle size={5} color="#666666" />
                        <GiPlainCircle size={5} color="#666666" />
                        <GiPlainCircle size={5} color="#666666" />
                      </div>

                      <DropDown showMenu={recipient.showMenu}>
                        <>
                          <button
                            type="button"
                            onClick={() =>
                              history.push(`editar/${recipient.id}`)
                            }
                          >
                            <MdEdit size={15} color="#4D85EE" /> Editar
                          </button>
                          <button
                            type="button"
                            onClick={() => handleAlertDelete(recipient)}
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

      {recipients.length === 0 && !loading && (
        <Info>Nenhum destinatário cadastrado no momento!</Info>
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
              Tem certeza que deseja excluir o destinatário{' '}
              <span>{recipientName}</span>?
            </h3>
          </div>
          <div className="actions">
            <button
              type="button"
              className="accept"
              onClick={() => handleDelete(recipientId)}
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
