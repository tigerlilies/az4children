
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {id: 1, Firstname: 'John', Lastname: 'Super', Email: 'johnsuper@gmail.com', Password: '123'},
        {id: 2, Firstname: 'Jane', Lastname: 'User', Email: 'janeuser@gmail.com', Password: '1234'},
        {id: 3, Firstname: 'Tom', Lastname: 'Su', Email: 'tomsu@gmail.com', Password: '12345'}
      ]);
    });
};
