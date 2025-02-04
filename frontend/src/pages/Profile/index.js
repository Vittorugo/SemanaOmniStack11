import React, {useState,useEffect} from 'react';
import './style.css';
import LogoImg from '../../assets/logo.svg';
import { Link, useHistory } from 'react-router-dom';
import {FiPower, FiTrash2} from 'react-icons/fi';
import api from '../../services/api';

function Profile(){
  const ongId = localStorage.getItem('ongId');
  const ongName = localStorage.getItem('ongName');
  const [incidentes, setIncidents] = useState([]);
  const history = useHistory();
  useEffect(()=> {
    api.get('/profile', {
      headers:{
        Authorization: ongId,
      }
    }).then(response => {
      setIncidents(response.data);
    })
  }, [ongId]);

  async function handleDeleteIncident(id){
    try{
      await api.delete(`/incidents/${id}`, {
        headers: {
          Authorization: ongId,
        }
      });
      setIncidents(incidentes.filter(incident => incident.id !== id));
    } catch(err){
      alert('Erro ao deletar caso. Tente novamente!')
    }
  }

  function handleLogout(){
    localStorage.clear();
    history.push('/');
  }

  return (
    <div className="profile-container">
      <header>
        <img src={LogoImg} alt="Be The Hero"/>
        <span>Bem vindo, {ongName}</span>

        <Link className="button" to="/incident/new">Cadastrar novo caso</Link>
        <button onClick={handleLogout} type="button">
          <FiPower size={18} color="#E02041"/>
        </button>
      </header>

      <h1>Casos cadastrados</h1>
      <ul>
        {incidentes.map(incident => {
          return (
            <li key={incident.id}>
              <strong>CASO:</strong>
              <p>{incident.title}</p>

              <strong>DESCRIÇÃO:</strong>
              <p>{incident.description}</p>

              <strong>VALOR:</strong>
              <p>{Intl.NumberFormat('pt-BR',{ style: 'currency', currency: 'BRL'}).format(incident.value)}</p>

              <button onClick={()=> handleDeleteIncident(incident.id)} type="button">
                <FiTrash2 size={20} color="#a8a8b3"/>
              </button>
            </li>
          );
        })}    
      </ul>
    </div>
  );
}


export default Profile;