const connection = require('../database/connections');

module.exports = {

  async list(req, res){
    const { page = 1 } = req.query;

    const [count] = await connection('incidents').count();
    
    const result = await connection('incidents')
    .join('ongs', 'ongs.id', '=','incidents.ong_id')
    .limit(5)
    .offset((page - 1) * 5)
    .select(['incidents.*',
      'ongs.name',
      'ongs.email',
      'ongs.whatsapp',
      'ongs.cidade',
      'ongs.uf']);

    res.header('X-Total-Count', count['count(*)']);
    return res.json(result);
  },

  async create( req, res) {
    const { title, description, whatsapp, value} = req.body;
    const ong_id = req.headers.authorization;
    
    const result = await connection('incidents').insert({
      title,
      description,
      value,
      ong_id
    });
  
    const id = result[0];
    
    return res.json({ id });
  },

  async delete(req, res){
    const { id } = req.params;
    const ong_id = req.headers.authorization;

    const incidents = await connection('incidents')
      .where('id', id)
      .select('ong_id')
      .first();
    
    if (incidents.ong_id !== ong_id){
      return res.status(401).json({ error: "not delet incidents id"})
    }

    await connection('incidents').where('id',id).delete();

    return res.status(204).send();
  }
};