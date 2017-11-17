
exports.up = function(knex, Promise) {
  return knex.schema.createTable('profiles', function(table){
    //All fields
    table.increments();
    table.string('Firstname').notNullable();
    table.string('Lastname').notNullable();
    table.string('PhotoURL');
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
    //Track a date of creation/udate
    table.timestamp('Created_at').defaultTo(knex.fn.now());
    table.timestamp('Updated_at').defaultTo(knex.fn.now());
    //Don't forget about how to count days from creation date
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('profiles');
};
