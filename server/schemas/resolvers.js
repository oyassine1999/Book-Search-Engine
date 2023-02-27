const { User } = require("../models");

const resolvers = {
  Query: {
    // Get a single user by ID
    user: async (parent, { _id }) => {
      return User.findById(_id);
    },
    // Get all users
    users: async () => {
      return User.find();
    },
  },
  Mutation: {
    // Create a new user
    createUser: async (parent, { username, email }) => {
      return User.create({ username, email });
    },

    // Save a book to user's list of saved books
    saveBook: async (parent, { userId, book }) => {
      const user = await User.findByIdAndUpdate(
        userId,
        { $push: { savedBooks: book } },
        { new: true }
      );
      return user.savedBooks;
    },

    // Remove a book from user's list of saved books
    deleteBook: async (parent, { userId, bookId }) => {
      const user = await User.findByIdAndUpdate(
        userId,
        { $pull: { savedBooks: { bookId } } },
        { new: true }
      );
      return user.savedBooks;
    },
  },
};

module.exports = resolvers;
