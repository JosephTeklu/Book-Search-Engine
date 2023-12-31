import {gql} from "@apollo/client";

// send {"email": "", "password": ""}
export const LOGIN_USER = gql`
    mutation Mutation($email: String!, $password: String!) {
        login(email: $email, password: $password) {
        token
            user {
                _id
                username
                email
                bookCount
                savedBooks {
                    authors
                    description
                    bookId
                    image
                    link
                    title
                }
            }
        }
    }  
`;

// send {"username": "", "email": "", "password", ""}
export const ADD_USER = gql`
    mutation Mutation($username: String!, $email: String!, $password: String!) {
        addUser(username: $username, email: $email, password: $password) {
        token
            user {
                _id
                username
                email
                bookCount
                savedBooks {
                    authors
                    description
                    bookId
                    image
                    link
                    title
                }
            }
        }
    }
`;

// send 
// {
// "newBook": {
//     "bookId": "",
//     "authors": [],
//     "title": "",
//     "description":"",
//     "image": "",
//     "link": ""
//   }
// }

export const SAVE_BOOK = gql`
    mutation Mutation($newBook: InputBook!) {
        saveBook(newBook: $newBook) {
            _id
            username
            email
            bookCount
            savedBooks {
                authors
                description
                bookId
                image
                link
                title
            }
        }
    }
`;

export const REMOVE_BOOK = gql`
mutation Mutation($bookId: ID!) {
    removeBook(bookId: $bookId) {
      _id
      username
      email
      bookCount
      savedBooks {
        authors
        description
        bookId
        image
        link
        title
      }
    }
  }
`;