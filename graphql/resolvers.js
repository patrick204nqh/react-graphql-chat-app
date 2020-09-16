const bcrypt = require('bcryptjs');
const { UserInputError, AuthenticationError } = require('apollo-server');
const jwt = require('jsonwebtoken');

const { User } = require('../models');
const { JWT_SECRET } = require('../config/env.json');

module.exports = {
  Query: {
    getUsers: async () => {
      try {
        const users = await User.findAll()
        return users
      } catch (err) {
        console.error(err);
      }
    },
    login: async (_, args) => {
      const { username, password } = args;
      let errors = {};

      try {
        if (username.trim() === '') errors.username = 'username must not be empty';
        if (password.trim() === '') errors.password = 'password must not be empty';

        if (Object.keys(errors).length > 0) {
          throw new UserInputError('bad input', { errors });
        }

        const user = await User.findOne({
          where: { username }
        })

        if (!user) {
          errors.username = 'User not found';
          throw new UserInputError('user not found', { errors });
        }

        const correctPassword = await bcrypt.compare(password, user.password);

        if (!correctPassword) {
          errors.password = 'Password is incorrect';
          throw new AuthenticationError('password is incorrect', { errors });
        }

        const token = jwt.sign({ username }, JWT_SECRET, { expiresIn: 60 * 60 });

        user.token = token;

        return {
          ...user.toJSON(),
          createdAt: user.createdAt.toISOString(),
          token
        };
      } catch (err) {
        console.log(err);
        throw err
      }
    }
  },
  Mutation: {
    register: async (_, args) => {
      let { username, email, password, confirmPassword } = args;
      let errors = {};

      try {
        // TODO: Validate input data
        if (email.trim() === '') errors.email = 'Email must not be empty';
        if (username.trim() === '') errors.username = 'Username must not be empty';
        if (password.trim() === '') errors.password = 'Password must not be empty';
        if (confirmPassword.trim() === '') errors.confirmPassword = 'Repeat password must not be empty';

        if (password !== confirmPassword) errors.confirmPassword = 'Password must match';

        // TODO: Check if username / email exists
        // const userByUsername = await User.findOne({ where: { username } })
        // const userByEmail = await User.findOne({ where: { email } })

        // if (userByUsername) errors.username = 'Username is taken';
        // if (userByEmail) errors.email = 'Email is taken';

        if (Object.keys(errors).length > 0) {
          throw errors
        }

        // TODO: Hash password
        password = await bcrypt.hash(password, 6);

        // TODO: Create user
        const user = await User.create({
          username, email, password
        })

        // TODO: Return user
        return user;
      } catch (err) {
        console.log(err);
        if (err.name === 'SequelizeUniqueConstraintError') {
          err.errors.forEach(e => (errors[e.path] = `${e.path} is already taken`))
        } else if (err.name === 'SequelizeValidationError') {
          err.errors.forEach(e => (errors[e.path] = e.message))
        }
        throw new UserInputError('Bad input', { errors });
      }
    }
  }
};
