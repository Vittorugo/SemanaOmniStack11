const crypto = require('crypto');
const connection = require('../database/connections');

module.exports = {

  async list(req, res){
    const ongs = await connection('ongs').select('*'); 
    return res.json(ongs);
  },

  async create(req, res) {
    const {name, email, whatsapp, cidade, uf} = req.body;
  
    const id = crypto.randomBytes(4).toString('HEX'); // gera 4 bytes de caracteres especiais e converte para hex
  
    await connection('ongs').insert({
      id,
      name,
      email,
      whatsapp,
      cidade,
      uf,
    });
    
    return res.json({ id });
  }
};
