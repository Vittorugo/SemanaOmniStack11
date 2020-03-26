const connection = require('../database/connections');

module.exports = {
  async list(req, res) {
    const ong_id = req.headers.authorization;

    const result = await connection('incidents')
    .select('*')
    .where('ong_id',ong_id)

    res.json(result);
  }
};