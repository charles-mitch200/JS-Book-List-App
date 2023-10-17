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
    const books = Store.getBook();
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

  static deleteBook(el) {
    if (el.classList.contains("delete")) {
      el.parentElement.parentElement.remove();
    }
  }

  static showAlert(message, className) {
    const div = document.createElement("div");
    div.className = `alert alert-${className}`;
    div.appendChild(document.createTextNode(message));
    const container = document.querySelector(".container");
    const formElem = document.querySelector("#book-form");
    container.insertBefore(div, formElem);

    // Alert to vanish after 3 seconds
    setTimeout(() => {
      document.querySelector(".alert").remove();
    }, 3000);
  }

  static clearFields() {
    document.querySelector("#title").value = "";
    document.querySelector("#author").value = "";
    document.querySelector("#isbn").value = "";
  }
}

// Store Class: Handles Storage
class Store {
  static getBook() {
    let books;

    if (localStorage.getItem("books") === null) {
      books = [];
    } else {
      books = JSON.parse(localStorage.getItem("books"));
    }

    return books;
  }

  static addBook(book) {
    const books = Store.getBook();
    books.push(book);
    localStorage.setItem("books", JSON.stringify(books));
  }

  static removeBook(isbn) {
    const books = Store.getBook();

    books.forEach((book, index) => {
      if (book.isbn === isbn) {
        books.splice(index, 1);
      }
    });

    // Updat local storage when you delete
    localStorage.setItem("books", JSON.stringify(books));
  }
}

// Event: Display Books
document.addEventListener("DOMContentLoaded", UI.displayBooks);

// Event: Add a Book
document.querySelector("#book-form").addEventListener("submit", (e) => {
  // Prevent default behavior of forms
  e.preventDefault();

  // Get from values
  const title = document.querySelector("#title").value;
  const author = document.querySelector("#author").value;
  const isbn = document.querySelector("#isbn").value;

  // Validate
  if (title === "" || author === "" || isbn === "") {
    UI.showAlert("Please fill in all required fields!", "danger");
  } else {
    // Instantiate a new book
    const book = new Book(title, author, isbn);

    //  Add book to list and display it
    UI.addBookToList(book);

    // Add book to store
    Store.addBook(book);

    // Show success message
    UI.showAlert("Book addded succefully!", "success");

    //  Clear fields
    UI.clearFields();
  }
});

// Event: Remove a Book (from UI and local storage)
// Using event propagation
document.querySelector("#book-list").addEventListener("click", (e) => {
  // Delete book from UI
  UI.deleteBook(e.target);

  // Delete book from local Storage
  Store.removeBook(e.target.parentElement.previousElementSibling.textContent);

  // Show success delete message
  UI.showAlert("Book deleted succefully!", "success");
});
