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
    createUser: (parent, { id, email, password }, context, info) => {
      if (!password) {
        password = makeDefaultPassword();
      }
      const newUser = {
        id,
        name,
        email,
        password,
      };
      users.push(newUser);
      return newUser;
    },
    updateUser: (parent, { id, email, password }, context, info) => {
      let newUser = users.find((user) => user.id == id);
      newUser.primary_email = email;
      newUser.password = password;
      return newUser;
    },
    updateUserEmail: (parent, { id, email }, context, info) => {
      let newUser = users.find((user) => user.id == id);
      newUser.primary_email = email;
      return newUser;
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
