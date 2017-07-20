// // get an instance of mongoose and mongoose.Schema
// var mongoose = require('mongoose');
// var Schema = mongoose.Schema;
//
// // set up a mongoose model and pass it using module.exports
// module.exports = mongoose.model('User', new Schema({
//     name: String,
//     password: String,
//     admin: Boolean
// }));

// Sample user for dev
const users = [
  {
    _id: '1',
    name: { first: 'matin', last: 'suara'},
    email: 'hafbau@yahoo.com',
    password: 'password'
  }
]

module.exports = {
  authenticate: ({ email, password }) => users.find(user => user.email == email && user.password == password),

  create: (newUser) => {
    if (newUser && newUser.email && newUser.password) {
      newUser._id = (users.length + 1).toString();
      newUser.lastActive = Date.now();

      users.push(newUser);
      return newUser;
    }
  },

  find: (query) => filterOrFind(users, query),

  findOne: (query) => filterOrFind(users, query, 'find'),

  remove: (query) => {
    const keys = query && Object.keys(query);
    if (!keys || !keys.length) users = [];

    users = users.filter(user => {
      return keys.reduce((result, key) => result && user[key] != query[key], true)
    })
  },
  // updates or saves new
  save: (user) => {
    if (users.find(u => u._id === user._id)) {
      return users.splice(Number(user._id) - 1, 1, user); // this should be done with indexOf
    }
    return users.push(user);
  }
}

function filterOrFind(collections, query, option = 'filter') {
  const keys = query && Object.keys(query);
  if (!keys || !keys.length) return collections;

  return Array.prototype[option].call(collections, collection => {
    return keys.reduce((result, key) => result && collection[key] == query[key], true)
  })
}

// class User {
//   constructor(users) {
//     this.users = users;
//   }
//
//   static authenticate({ email, password}) {
//     this.users.find(user => user.email == email && user.password == password)
//   }
//
//   static create() {
//     if (newUser && newUser.email && newUser.password) {
//       newUser._id = (users.length + 1).toString();
//       newUser.lastActive = Date.now();
//
//       users.push(newUser);
//       return newUser;
//     }
//   }
//
//   static find(query) {
//     return filterOrFind(this.users, query)
//   }
//
//   static findOne(query) {
//     return filterOrFind(this.users, query, 'find')
//   }
//
//   static save(user) {
//     if (this.users.find(u => u._id === user._id)) {
//       return this.users.splice(Number(user._id) - 1, 1, user); // this should be done with indexOf
//     }
//     return this.users.push(user);
//   }
//
// }
