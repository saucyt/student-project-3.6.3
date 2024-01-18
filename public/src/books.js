function findAuthorById(authors, id) {
  // assigned value of matching author id to author then returns it
  const author = authors.find((author) => author.id === id);
  return author;
}

function findBookById(books, id) {
  // assigned value of matching book id to book then returns it
  const book = books.find((book) => book.id === id);
  return book;
}

function partitionBooksByBorrowedStatus(books) {
  // assigned empty arrays to values
  const borrowed = [];
  const returned = [];
  // iterated through each book
  for (const book of books) {
    // checked if book has a borrows array and makes sure that its not empty
    if (book.borrows && book.borrows.length > 0) {
      const firstTransaction = book.borrows[0];
      // checked if the first transaction exist then retrieves the returned property from the first transaction
      if (firstTransaction) {
        const isReturned = firstTransaction.returned;
        // pushes the books into the corresponding arrays
        isReturned ? returned.push(book) : borrowed.push(book);
      }
    }
  }
  return [borrowed, returned];
}

function getBorrowersForBook(book, accounts) {
  const borrowers = [];
  // iterates through the book borrows aray
  for (const borrowData of book.borrows) {
    // ac is abreviation for account
    // used the .find() method to find the matching account id
    const account = accounts.find((ac) => ac.id === borrowData.id);

    const borrower = {
      // spread properties of account
      ...account,
      // adds the returned from the current transaction
      returned: borrowData.returned,
    };
    // adds the borrower to the borrowers array
    borrowers.push(borrower);
    // checks if array has reached 10, if so the loop is broken
    if (borrowers.length >= 10) {
      break;
    }
  }
  return borrowers;
}

module.exports = {
  findAuthorById,
  findBookById,
  partitionBooksByBorrowedStatus,
  getBorrowersForBook,
};
