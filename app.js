// Book Class: Represents a Book
class Book {
  constructor(title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
  }
}

// UI Class: Handle UI tasks
class UI {
  // Loops over the stored books and displays them on the page
  static displayBooks() {
    const storedBooks = [
      {
        title: "Book1",
        author: "Mitchy Mitch",
        isbn: 73684,
      },
      {
        title: "Book2",
        author: "Mitchy Reign",
        isbn: 64826,
      },
    ];

    const books = storedBooks;
    books.forEach((book) => {
      UI.addBookToList(book);
    });
  }

  // Adds books to the table
  static addBookToList(book) {
    const list = document.querySelector("#book-list");
    const row = document.createElement("tr");
    row.innerHTML = `
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.isbn}</td>
        <td><a href="#" class="btn btn-danger btn-sm delete">X</a></td>
        `;
    list.appendChild(row);
  }
}

// Store Class: Handles Storage

// Event: Display Books
document.addEventListener("DOMContentLoaded", UI.displayBooks);

// Event: Add a Book
document.querySelector('#book-form').addEventListener('submit', (e) => {
    // Prevent default behavior of forms
    e.preventDefault()

    // Get from values
    const title = document.querySelector('#title').value;
    const author = document.querySelector('#author').value;
    const isbn = document.querySelector('#isbn').value;

    // Instantiate a new book
    const book = new Book(title, author, isbn)

    //  Add book to list and display it
    UI.addBookToList(book);

    //  Clear fields
})

// Event: Remove a Book (from UI and local storage)
