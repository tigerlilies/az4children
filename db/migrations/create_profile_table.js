
exports.up = function(knex, Promise) {
  return knex.schema.createTable('profiles', function(table){
    //All fields
    table.increments();
    table.string('firstname').notNullable();
    table.string('lastname').notNullable();
    // table.string('photo_url');
    // use string for age?
    table.string('age').notNullable();
    table.string('gender').notNullable();
    //Text or string(< 255) for summary?
    table.string('summary').notNullable();
    table.string('characteristic1').notNullable();
    table.string('characteristic2').notNullable();
    table.string('characteristic3').notNullable();
    table.string('need1').notNullable();
    table.string('need2').notNullable();
    table.string('need3').notNullable();
    //These below items may be changed/updated often
    table.string('placement').notNullable();
    table.string('placement_phone').notNullable();
    table.string('placement_email').notNullable();
    table.string('zone').notNullable();
    //Track a date of creation/udate
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at').defaultTo(knex.fn.now());
    //Don't forget about how to count days from creation date
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('profiles');
};
