const connection = require('../database/connections');

module.exports = {
  async create(req,res){
    const { id } = req.body;

    const result = await connection('ongs')
    .select('name')
    .where('id', id)
    .first();

    if (!result){
      return res.status(400).json({error: "no ong found this id"});
    }
    
    return res.json(result);
  }
}