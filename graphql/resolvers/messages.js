const { UserInputError, AuthenticationError, PubSub } = require('apollo-server');
const { Op } = require('sequelize');

const pubsub = new PubSub()

const { User, Message } = require('../../models');

module.exports = {
  Query: {
    getMessages: async (parent, { from }, { user }) => {
      try {
        if (!user) throw new AuthenticationError('unauthenticated');

        const otherUser = await User.findOne({
          where: { username: from }
        })
        if (!otherUser) throw new UserInputError('User not found')

        const usernames = [user.username, otherUser.username]

        console.log(usernames);

        const messages = await Message.findAll({
          where: {
            from: { [Op.in]: usernames },
            to: { [Op.in]: usernames }
          },
          order: [['createdAt', 'DESC']]
        })

        return messages;
      } catch (err) {
        throw err
      }
    }
  },
  Mutation: {
    sendMessage: async (parent, { to, content }, { user }) => {
      try {
        if (!user) throw new AuthenticationError('unauthenticated');

        const recipient = await User.findOne({ where: { username: to } })

        if (!recipient) {
          throw new UserInputError('User not found')
        } else if (recipient.username === user.username) {
          throw new UserInputError('You cant message yourself')
        }

        if (content.trim() === '') {
          throw new UserInputError('Message is empty')
        }

        const message = await Message.create({
          from: user.username,
          to,
          content,
        })

        pubsub.publish('NEW_MESSAGE', { newMessage: message })

        return message;
      } catch (err) {
        throw err;
      }
    }
  },
  Subscription: {
    newMessage: {
      subscribe: () => pubsub.asyncIterator(['NEW_MESSAGE'])
    }
  }
};
