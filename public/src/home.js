function getTotalBooksCount(books) {
  //returns length of books array
  return books.length;
}

function getTotalAccountsCount(accounts) {
  // returns length of accounts array
  return accounts.length;
}

function getBooksBorrowedCount(books) {
  // filtered through array to see if book in borrows array has been returned if not returns the amount that is still out
  return books.filter((book) => !book.borrows[0].returned).length;
}

function getMostCommonGenres(books) {
  // Creates an object to store the genre count
  const genreCount = {};
  books
    // used .filter() method to filter out undefined or false items from array
    .filter((book) => book && book.genre)
    .forEach((book) => {
      // iterated over each book once done filtering then split them into coresponding arrays for genre
      const genres = book.genre.split(", ");
      genres.forEach((genre) => {
        genreCount[genre] = (genreCount[genre] || 0) + 1;
      });
    });
  //Convert the object to an array of objects
  const genreArray = Object.entries(genreCount).map(([name, count]) => ({
    name,
    count,
  }));
  //Sorts array in common to least common
  genreArray.sort((a, b) => b.count - a.count);
  //Returned the top five genres of the array
  return genreArray.slice(0, 5);
}

// helper function that sorts books into array based on the times it was borowed 
function sortByBorrowCount(books){
  return books.slice().sort((a, b) => b.borrows.length - a.borrows.length)
}

function getMostPopularBooks(books) {
  // Sorts books in array based on the times the book was borrowed
  // updated to include the use of a helper function comment above matches the line below
  const sortedBooks = sortByBorrowCount(books)

  // creates an array with the count and name key for each book
  const result = sortedBooks
    .slice(0, 5)
    .map((book) => ({ count: book.borrows.length, name: book.title }));

  return result;
}

function getMostPopularAuthors(books, authors) {
  // created array to store the borrow count for the authors
  const authorsBorrowCount = {};
  // iterated through each book
  books.forEach((book) => {
    // finds the matching authorid
    const author = authors.find((author) => author.id === book.authorId);
    // if author is found it updates the borrow count
    if (author) {
      //insures full name is displayed properly then updates authorsBorrowCount to the length of the borrows array for specifed book
      const authorsName = `${author.name.first} ${author.name.last}`;
      authorsBorrowCount[authorsName] =
        (authorsBorrowCount[authorsName] || 0) + book.borrows.length;
    }
  });
  // converts the object to an array of objects with the name and count keys
  const result = Object.entries(authorsBorrowCount).map(([name, count]) => ({
    name,
    count,
  }));
  // sorts the array similar to the others in decending order
  result.sort((a, b) => b.count - a.count);
  // returns array as long as less than 5 in array
  return result.slice(0, 5);
}

module.exports = {
  getTotalBooksCount,
  getTotalAccountsCount,
  getBooksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};
