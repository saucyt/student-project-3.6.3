function findAccountById(accounts, id) {
  // used .find() method to find matching account id
  return accounts.find((account) => account.id === id);
}

function sortAccountsByLastName(accounts) {
  // copies then sorts array alphabetically
  return accounts.slice().sort((a, b) => {
    // takes the last names from the accounts array then converts to lowercase
    const lastNameA = a.name.last.toLowerCase();
    const lastNameB = b.name.last.toLowerCase();
    // checks and confirms the order for the names
    if (lastNameA < lastNameB) {
      return -1;
    } else if (lastNameA > lastNameB) {
      return 1;
    } else {
      return 0;
    }
  });
}

function getTotalNumberOfBorrows(account, books) {
  //.reduce() method to count total number of borrows
  return books.reduce((totalBorrows, book) => {
    // cross refrence if the acount id is found in the borrows array for each book
    const hasBorrowed = book.borrows.some((borrow) => borrow.id === account.id);
    // if borrowed the number is incremented into the totalBorrows count
    return totalBorrows + (hasBorrowed ? 1 : 0);
  }, 0);
}

function getBooksPossessedByAccount(account, books, authors) {
  // used .filter() method to filter out the book with the matching accountId then assigns to booksWithAuthors
  const booksWithAuthors = books
    .filter((book) =>
      book.borrows.some(
        (borrow) => borrow.id === account.id && !borrow.returned
      )
    )
    // iterated over each book in array then finds the author with matching id
    .map((book) => {
      const author = authors.find((author) => author.id === book.authorId);
      return {
        // created a new object for each book using the spread operator then assigns appropriate values
        ...book,
        author: {
          id: author.id,
          name: {
            first: author.name.first,
            last: author.name.last,
          },
        },
      };
    });

  return booksWithAuthors;
}
// .toLowerCase was used to avoid case sensitive issues

module.exports = {
  findAccountById,
  sortAccountsByLastName,
  getTotalNumberOfBorrows,
  getBooksPossessedByAccount,
};
