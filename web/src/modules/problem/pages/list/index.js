import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { GiPlainCircle } from 'react-icons/gi';
import { MdEdit, MdDeleteForever } from 'react-icons/md';
import ReactLoading from 'react-loading';

import Title from '../../../../components/Title';
import Table from '../../../../components/Table';
import THead from '../../../../components/TableHead';
import TBody from '../../../../components/TableBody';
import DropDown from '../../../../components/DropDown';

import api from '../../../../services/api';

import { Wrapper, Modal, Alert, Info, Loading } from './styles';

export default function List() {
  const [problems, setProblems] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [loading, setLoading] = useState(true);
  const [description, setDescription] = useState('');
  const [productName, setProductName] = useState('');
  const [packageId, setPackageId] = useState('');

  async function loadProblems() {
    setLoading(true);
    const { data } = await api.get('deliverys');

    setProblems(
      data.map(problem => ({
        ...problem,
        showMenu: false,
        canceled: !!problem.delivery.canceled_at,
      }))
    );
    setLoading(false);
  }

  useEffect(() => {
    loadProblems();
  }, []);

  useEffect(() => {
    window.onclick = ({ target }) => {
      if (showModal && target.id === 'modal') {
        setShowModal(false);
      }
    };
  }, [showModal]);

  function handleMenu(id) {
    const newBbj = problems.map(item => {
      if (item.id === id) {
        item.showMenu = !item.showMenu;
      } else {
        item.showMenu = false;
      }
      return item;
    });

    setProblems(newBbj);
  }

  function handlePreview(text) {
    setProblems(
      problems.map(item => {
        item.showMenu = false;
        return item;
      })
    );
    setShowModal(!showModal);
    setDescription(text);
  }

  function handleAlertCancelled(product, id) {
    setProblems(
      problems.map(item => {
        item.showMenu = false;
        return item;
      })
    );

    setProductName(product);
    setPackageId(id);
    setShowAlert(true);
  }

  async function handleCancelled(id) {
    await api.delete(`problem/${id}/cancel-delivery`);
    setShowAlert(false);
    loadProblems();
    toast.success(`A encomenda ${productName} foi cancelada com sucesso!`);
  }

  return (
    <Wrapper>
      <Title title="Problemas na entrega" />
      {problems.length > 0 && !loading && (
        <Table>
          <>
            <THead>
              <>
                <li>Encomenda</li>
                <li>Problema</li>
                <li>Ações</li>
              </>
            </THead>

            <TBody>
              <>
                {problems.map(problem => (
                  <ul key={problem.id}>
                    <li>#{problem.delivery.id}</li>
                    <li>{problem.description}</li>
                    <li>
                      <div
                        className="actions"
                        onClick={() => handleMenu(problem.id)}
                      >
                        <GiPlainCircle size={5} color="#666666" />
                        <GiPlainCircle size={5} color="#666666" />
                        <GiPlainCircle size={5} color="#666666" />
                      </div>

                      <DropDown showMenu={problem.showMenu}>
                        <>
                          <button
                            type="button"
                            onClick={() => handlePreview(problem.description)}
                          >
                            <MdEdit size={15} color="#4D85EE" /> Visualizar
                          </button>
                          {!problem.canceled && (
                            <button
                              type="button"
                              onClick={() =>
                                handleAlertCancelled(
                                  problem.delivery.product,
                                  problem.delivery_id
                                )
                              }
                            >
                              <MdDeleteForever size={15} color="#DE3B3B" />{' '}
                              Cancelar
                            </button>
                          )}
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

      {problems.length === 0 && !loading && (
        <Info>Nenhum problema cadastrado no momento!</Info>
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

      <Modal showModal={showModal}>
        <div>
          <div>
            <h3>Visualizar problema</h3>
            <p>{description}</p>
          </div>
        </div>
      </Modal>

      <Alert showAlert={showAlert}>
        <div>
          <div className="title">
            <h3>
              Tem certeza que deseja cancelar a encomenda{' '}
              <span>{productName}</span>?
            </h3>
          </div>
          <div className="actions">
            <button
              type="button"
              className="accept"
              onClick={() => handleCancelled(packageId)}
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
