
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        { email: 'johnsuper@gmail.com', password: '123'},
        { email: 'janeuser@gmail.com', password: '1234'},
        { email: 'tomsu@gmail.com', password: '12345'}
      ]);
    });
};
