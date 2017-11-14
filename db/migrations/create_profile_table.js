
exports.up = function(knex, Promise) {
  return knex.schema.createTable('profile', function(table){
    //All fields
    table.increments();
    table.string('Firstname').notNullable();
    table.string('Lastname').notNullable();
    // use string for age?
    table.string('Age').notNullable();
    table.string('Gender').notNullable();
    //Text or string(< 255) for summary?
    table.string('Summary').notNullable();
    table.string('Characteristic1').notNullable();
    table.string('Characteristic2').notNullable();
    table.string('Characteristic3').notNullable();
    table.string('Need1').notNullable();
    table.string('Need2').notNullable();
    table.string('Need3').notNullable();
    //These below items may be changed/updated often
    table.string('Placement').notNullable();
    table.string('Placement_Phone').notNullable();
    table.string('Placement_Email').notNullable();
    table.string('Zone').notNullable();
    //Track a date of creation
    table.timestamp('created_at').defaultTo(knex.fn.now());
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('profile');
};
