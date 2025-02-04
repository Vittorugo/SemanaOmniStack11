
exports.up = function(knex) {
  return knex.schema.createTable('ongs', function(table){
    table.string('id').primary();
    table.string('name').notNullable();
    table.string('email').notNullable();
    table.string('whatsapp').notNullable();
    table.string('cidade').notNullable();
    table.string('uf',2).notNullable(); // sabemos que uf só tem 2 caracteres então adicionamos esse segundo parametro
  });
};

exports.down = function(knex) {
  knex.schema.dropTable('ongs');
};
