const type = require('./type/dto');
const input = require('./input/dto');

module.exports = `
  scalar Date
  
  type Query {    
    user: User 
    ${type.query}
  }

  type Mutation {    
    updateUser(id: String, password: String): User    
    signinUser(id: String, password: String): User
    signoutUser: String
    ${type.mutaion}
  }

  type User {
    _id: String
    id: String
    password: String
    dept: String
    name: String
  }

  ${type.results}

  ${input}
`;
