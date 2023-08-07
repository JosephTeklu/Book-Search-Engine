const { AuthenticationError } = require("apollo-server-express");
const { User} = require("../models");
const { signToken } = require("../utils/auth");

const resolvers = {
    Query: {
        // grabs the current user logged in
        me: async (parent, args, context) => {
            if (context.user) {return await User.findOne({ _id: context.user._id }).select('-__v -password');}
            //if the searched user is not found send auth error with message
            throw new AuthenticationError("need to be logged in");
        },
    },
    Mutation: {
        // add the new user with the send information and return the signed token and the new user schema
        addUser: async (parent, args) => {
            const user = await User.create(args);
            const token = signToken(user);
            return { token, user };
        },
        // save the new book to the user's savedBooks array
        saveBook: async (parent, { newBook }, context) => {
            if (context.user) {
            return await User.findByIdAndUpdate(
                { _id: context.user._id },
                { $push: { savedBooks: newBook }},
                { new: true }
            );
            }
            throw new AuthenticationError('You need to be logged in!');
        },
        // remove the sent book from the current user's savedBooks array
        removeBook: async (parent, { bookId }, context) => {
            if (context.user) {
            return await User.findByIdAndUpdate(
                { _id: context.user._id },
                { $pull: { savedBooks: { bookId }}},
                { new: true }
            );
            }
            throw new AuthenticationError('You need to be logged in!');
        },
        login: async (parent, { email, password }) => {
            // find the user with the given username
            const user = await User.findOne({username});
            // if the user does not exist send message "Incorrect username or password"
            if(!user){return json({message: "Incorrect username or password"})}

            // check the sent password with the user's saved password
            const checkPsswd = await user.isCorrectPassword(password);
            // if the user does not exist send message "Incorrect username or password"
            if(!checkPsswd){return json({message: "Incorrect username or password"})}

            // sign the token
            const token = signToken(user);
            // return the user's token and the found user
            return {token, user};
        }
    },
};

module.exports = resolvers;