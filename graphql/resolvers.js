module.exports = {
  Query: {
    getUsers: () => {
      const users = [
        {
          username: 'kevin',
          email: 'test@kevin.co.uk'
        },
        {
          username: 'robert',
          email: 'test@robert.co.uk'
        }
      ]

      return users
    }
  },
};
