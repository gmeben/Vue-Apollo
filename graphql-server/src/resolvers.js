import { users } from "./db";

/**
 * @param {Number} max
 */
function getRandomInt(max) {
  return Math.floor(Math.random() * max) + 1;
}

/**
 * @param {Number} ints
 */
function makeDefaultPassword(ints = 8) {
  let sequence = ``;
  for (let x = 1; x <= ints; x++) {
    sequence += `${getRandomInt(1000)}`;
    if (x !== ints) {
      sequence += `-`;
    }
  }
  return sequence;
}

const resolvers = {
  Query: {
    user: (parent, { id }, context, info) => {
      return users.find((user) => user.id == id);
    },
    users: (parent, args, context, info) => {
      return users;
    },
  },
  Mutation: {
    createUser: (parent, { id, primary_email, password }, context, info) => {
      if (!password) {
        password = makeDefaultPassword();
      }
      const newUser = {
        id,
        primary_email,
        password,
      };
      users.push(newUser);
      return newUser;
    },
    updateUser: (parent, { id, email, password }, context, info) => {
      let user = users.find((user) => user.id == id);
      user.primary_email = email;
      user.password = password;
      return user;
    },
    updateUserEmail: (parent, { id, email }, context, info) => {
      let user = users.find((user) => user.id == id);
      user.primary_email = email;
      return user;
    },
    updateUserPassword: (parent, { id, password }, context, info) => {
      let user = users.find((user) => user.id == id);
      user.password = password;
      return user;
    },
    deleteUser: (parent, { id }, context, info) => {
      const userIndex = users.findIndex((user) => user.id == id);
      if (userIndex === -1) {
        throw new Error("User not found.");
      }
      const deletedUser = users.splice(userIndex, 1);
      return deletedUser[0];
    },
  },
};

export default resolvers;
