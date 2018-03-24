import delay from './delay';


const authors = [
  {
    id: 'william-shakespeare',
    firstName: 'William',
    lastName: 'Shakespeare'
  },
  {
    id: 'jk-rowling',
    firstName: 'JK',
    lastName: 'Rowling'
  },
  {
    id: 'oliver-twist',
    firstName: 'Oliver',
    lastName: 'Twist'
  }
];

const generateId = (author) => {
  return author.firstName.toLowerCase() + '-' + author.lastName.toLowerCase();
};

class AuthorApi {
  static getAllAuthors() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(Object.assign([], authors));
      }, delay);
    });
  }

  static saveAuthor(author) {
	author = Object.assign({}, author);
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const minAuthorNameLength = 3;
        if (author.firstName.length < minAuthorNameLength) {
          reject(`First Name must be at least ${minAuthorNameLength} characters.`);
        }

        if (author.lastName.length < minAuthorNameLength) {
          reject(`Last Name must be at least ${minAuthorNameLength} characters.`);
        }

        if (author.id) {
          const existingAuthorIndex = authors.findIndex(a => a.id === author.id);
          authors.splice(existingAuthorIndex, 1, author);
        } else {
          author.id = generateId(author);
          authors.push(author);
        }

        resolve(author);
      }, delay);
    });
  }

  static deleteAuthor(authorId) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const indexOfAuthorToDelete = authors.findIndex(author => author.id === authorId);
        authors.splice(indexOfAuthorToDelete, 1);
        resolve();
      }, delay);
    });
  }
}

export default AuthorApi;
