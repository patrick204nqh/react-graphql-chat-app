const { User } = require('../models');

module.exports = {
  Query: {
    getUsers: async () => {
      try {
        const users = await User.findAll()
        return users
      } catch (err) {
        console.error(err);
      }
    }
  },
  Mutation: {
    register: async (_, args) => {
      const { username, email, password, confirmPassword } = args;

      try {
        // TODO: Validate input data

        // TODO: Check if username / email exists

        // TODO: Hash password

        // TODO: Create user
        const user = await User.create({
          username, email, password
        })
        // TODO: Return user
        return user;
      } catch (err) {
        console.log(err);
        throw err;
      }
    }
  }
};
