const myLibrary = [];
const container = document.querySelector('#books');
const openDialog = document.querySelector('.dialog_open');
const closeDialog = document.querySelector('.dialog_close');
const addButton = document.querySelector('.add_book');
const dialog = document.querySelector('dialog');
const overlay = document.querySelector('.overlay');
const title = document.querySelector('input[name="title"');
const author = document.querySelector('input[name="author"');
const pages = document.querySelector('input[name="pages"');
const image = document.querySelector('input[name="image"');

addButton.addEventListener('click', (e) => {
  e.preventDefault();

  addBook(title.value, author.value, pages.value, image.value);
  title.value = '';
  author.value = '';
  pages.value = '';
  image.value = '';
  overlay.style.display = 'none';
  dialog.close();
});
openDialog.addEventListener('click', (e) => {
  e.preventDefault();
  overlay.style.display = 'block';
  dialog.show();
});
closeDialog.addEventListener('click', (e) => {
  e.preventDefault();
  title.value = '';
  author.value = '';
  pages.value = '';
  image.value = '';
  overlay.style.display = 'none';
  dialog.close();
});

class Book {
  constructor(title, author, pages, image) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = true;
    this.image = image;
  }
  info() {
    return `${this.title} by ${this.author}, ${this.pages} pages, ${
      this.read ? 'has been read' : 'not read yet'
    }`;
  }
}

Book.prototype.toggleRead = function () {
  this.read = !this.read;
};

function addBook(title, author, pages, image) {
  const book = new Book(title, author, pages, image);
  myLibrary.push(book);
  showBooks();
}

function showBooks() {
  container.innerHTML = '';
  for (let i = 0; i < myLibrary.length; i++) {
    createBook(myLibrary[i], i);
  }
}

function createBook(book, id) {
  const element = document.createElement('div');
  const button = document.createElement('button');
  button.textContent = 'Unread';
  element.classList.add('book');
  button.classList.add('book_btn');

  /* HTML*/
  element.innerHTML = `
  <img src="${book.image}" alt="" />
  <h3>${book.title}</h3>
  <small>by ${book.author}</small>
  <p>${book.pages} pages</p>
  `;

  button.addEventListener('click', (e) => {
    e.preventDefault();
    const el = e.currentTarget;
    const getBook = myLibrary[id];
    getBook.toggleRead();
    el.textContent = !getBook.read ? 'Read' : 'Unread';
  });

  element.append(button);
  container.append(element);
}

addBook('Pride and Prejudice', 'Jane Austen', 279, './covers/pride.jpg');
addBook('To Kill a Mockingbird', 'Harper Lee', 281, './covers/mockingbird.jpg');
addBook('1984', 'George Orwell', 328, './covers/1984.jpg');
addBook('The Great Gatsby', 'F. Scott Fitzgerald', 180, './covers/gatsby.jpg');
addBook('Moby Dick', 'Herman Melville', 585, './covers/moby.jpg');
