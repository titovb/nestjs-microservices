db.auth('root', 'welcome');
db = db.getSiblingDB('test-db');

// roles & users creation
db.createRole({
  role: 'postMicroPermissions',
  roles: [],
  privileges: [{
    resource: {db: 'test-db', collection: 'post'},
    actions: ['find', 'insert', 'update']
  }]
});

db.createRole({
  role: 'userMicroPermissions',
  roles: [],
  privileges: [{
    resource: {db: 'test-db', collection: 'user'},
    actions: ['find', 'insert']
  }]
});

db.createUser({
  user: 'post-micro',
  pwd: 'dTFG7chAxvaVn7sC',
  roles: ['postMicroPermissions']
});

db.createUser({
  user: 'user-micro',
  pwd: 'WnV7Z3TKRg8khvar',
  roles: ['userMicroPermissions'],
});

// posts seed
db.post.createIndex({users: 1});

const posts = [];
for (let i = 0; i < 500; i++) {
  posts.push({imageUrl: `https://fakeimg.pl/300/?text=Post${i + 1}`, users: []});
}

db.post.insertMany(posts, {ordered: false});

// users seed
db.user.createIndex({email: 1}, {unique: true});

const users = [];
for (let i = 0; i < 50; i++) {
  users.push({email: `email${i + 1}@email.com`});
}

db.user.insertMany(users, {ordered: false});
