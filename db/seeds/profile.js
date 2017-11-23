exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('profiles').del().then(function() {
    // Inserts seed entries
    return knex('profiles').insert([
      {
        id: 1,
        firstname: 'John',
        lastname: 'Doe',
        photo_url: 'https://s3.us-east-2.amazonaws.com/g54capstone/person-placeholder.png',
        age: '10',
        gender: 'M',
        summary: 'John loves dogs. And he wants to become a baseball player',
        characteristic1: 'Love baseball',
        characteristic2: 'Pizza',
        characteristic3: 'Rescue animals',
        need1: 'People who can play baseball together',
        need2: 'Volunteer at Rescue animals',
        need3: 'How to make own pizza',
        placement: 'Suzy Doe',
        placement_phone: '602-123-5011',
        placement_email: 'suzydoe@gmail.com',
        zone: 'South',
        created_at: '2017-11-1',
        updated_at: '2017-11-11'
      }, {
        id: 2,
        firstname: 'Jane',
        lastname: 'Doe',
        photo_url: 'https://s3.us-east-2.amazonaws.com/g54capstone/person-placeholder.png',
        age: '15',
        gender: 'F',
        summary: 'Jane loves cats. And she wants to become a chef',
        characteristic1: 'Cooking',
        characteristic2: 'Soccer',
        characteristic3: 'Programming',
        need1: 'People who can teach coding',
        need2: 'Learn how to bake cakes',
        need3: 'Play soccer together',
        placement: 'Richard Foo',
        placement_phone: '602-222-4000',
        placement_email: 'kangaroo@gmail.com',
        zone: 'North',
        created_at: '2017-10-1',
        updated_at: '2017-11-9'
      }
    ]);
  });
};
