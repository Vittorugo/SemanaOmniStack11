import React, { useState } from 'react';
import './style.css';
import LogoImg from '../../assets/logo.svg';
import {FiArrowLeft} from 'react-icons/fi';
import { Link, useHistory } from 'react-router-dom';
import api from '../../services/api';

function Register(){
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [whatsapp, setWhatsApp] = useState('');
  const [cidade, setCidade] = useState('');
  const [uf, setUF] = useState('');

  const history = useHistory();

  async function handleRegister(e){
    e.preventDefault();
    const data = {
      name,
      email,
      whatsapp,
      cidade,
      uf
    };

    try{
      const response = await api.post('/ongs',data); // /ongs
      alert(`Seu ID de acesso: ${response.data.id}`);
      history.push('/');
    } catch (err){
      alert("Erro ao cadastrar");
    } 
  }
  return(
    <div className="register-container">
      <div className="content">
        <section>
          <img src={LogoImg} alt="Be The Hero" />
          <h1>Cadastro</h1>
          <p>Faça seu cadastro, entre na plataforma e ajude pessoas a encontrarem os casos da sua ONG.</p>
          <Link className="back-link" to="/">
            <FiArrowLeft size={16} color="#E02041"/>
            Voltar para o logon
          </Link>      
        </section>
        <form>
          <input 
            placeholder="Nome da ONG"
            value={name}
            onChange={e => setName(e.target.value)}/>
          <input 
            type="email" 
            placeholder="E-mail"
            value={email}
            onChange={e => setEmail(e.target.value)} />
          <input 
            placeholder="WhatsApp"
            value={whatsapp}
            onChange={e => setWhatsApp(e.target.value)}/>
          
          <div className="input-group">
            <input 
              placeholder="Cidade"
              value={cidade}
              onChange={e => setCidade(e.target.value)}/>
            <input 
              placeholder="UF" 
              style={{ width: 80}}
              value={uf}
              onChange={e => setUF(e.target.value)}/>
          </div>
          <button onClick={handleRegister} className="button" type="submit"> Cadastrar</button>
        </form>
      </div>
    </div>
  );
}

export default Register;