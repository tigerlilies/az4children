
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('profiles').del()
    .then(function () {
      // Inserts seed entries
      return knex('profiles').insert([
        {id: 1, Firstname: 'John', Lastname: 'Doe', Age: '10', Gender: 'Boy', Summary: 'John loves dogs. And he wants to become a baseball player', Characteristic1:'Love baseball', Characteristic2:'Pizza', Characteristic3: 'Rescue animals', Need1:'People who can play baseball together', Need2:'Volunteer at Rescue animals', Need3:'How to make own pizza',Placement:'Suzy Doe', Placement_Phone:'602-XXX-50XX', Placement_Email:'suzydoe@gmail.com', Zone:'South', Created_at:'2017-11-1', Updated_at:'2017-11-11'},
        {id: 2, Firstname: 'Jane', Lastname: 'Doe', Age: '15', Gender: 'Girl', Summary: 'Jane loves cats. And she wants to become a chef', Characteristic1:'Cooking', Characteristic2:'Soccer', Characteristic3: 'Programming', Need1:'People who can teach coding', Need2:'Learn how to bake cakes', Need3:'Play soccer together',Placement:'Richard Foo', Placement_Phone:'602-XXX-40XX', Placement_Email:'kangaroo@gmail.com', Zone:'North', Created_at:'2017-10-1', Updated_at:'2017-11-9'},
      ]);
    });
};
