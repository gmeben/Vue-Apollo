import { users } from "./db";

function getRandomInt(max) {
    return Math.floor(Math.random() * max) + 1
}

function makeDefaultPassword() {
    const ints = 8 
    let sequence = ``
    for (let x = 1; x <= ints; x++){
      sequence += `${getRandomInt(1000)}`
      if (x !== ints) {
        sequence += `-`
      }
    }
    return sequence
}

const resolvers = {
    Query: {
        user: (parent, { id }, context, info) => {
            return users.find(user => user.id == id);
        },
        users: (parent, args, context, info) => {
            return users;
        }
    },
    Mutation: {
        createUser: (parent, {id, name, email, age, local_password}, context, info) => {
            if (!local_password) {
                local_password = makeDefaultPassword()
            }
            const newUser = {
                id, 
                name, 
                primary_email, 
                age, 
                local_password
            };
            users.push(newUser);
            return newUser;
        },
        updateUser: (parent, {id, name, email, age}, context, info) => {
            let newUser = users.find(user => user.id == id);
            newUser.name = name;
            newUser.primary_email = email;
            newUser.age = age;
            return newUser;
        },
        updateUserEmail: (parent, {id, email}, context, info) => {
            let newUser = users.find(user => user.id == id)
            newUser.primary_email = email
            return newUser
        },
        deleteUser: (parent, {id}, context, info) => {
            const userIndex = users.findIndex(user => user.id == id);
            if (userIndex === -1) {
                throw new Error("User not found.");
            }
            const deletedUsers = users.splice(userIndex, 1);
            return deletedUsers[0];
        }
    }

};

export default resolvers;
