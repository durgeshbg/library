class Book {
  static myLibrary = [];
  constructor(title, author, pages, hasRead = false) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.hasRead = hasRead;
  }
  static addBookToLibrary(book) {
    this.myLibrary.push(book);
  }
  static deleteBook(id) {
    this.myLibrary.splice(id);
  }
}

function handleSubmit(e) {
  const title = document.querySelector('#title');
  const author = document.querySelector('#author');
  const pages = document.querySelector('#pages');
  const hasRead = document.querySelector('#hasRead').checked;

  showError('', title);
  showError('', author);
  showError('', pages);

  if (!title.checkValidity()) showError(title.validationMessage, title);
  else if (!author.checkValidity()) showError(author.validationMessage, author);
  else if (!pages.checkValidity()) showError(pages.validationMessage, pages);
  else {
    const book = new Book(title.value, author.value, pages.value, hasRead);
    Book.addBookToLibrary(book);
    e.target.reset();
    dialog.close();
    renderBooks();
  }
  e.preventDefault();
}

function showError(error, elem) {
  const target = elem.nextElementSibling;
  target.textContent = error;
  target.display = 'block';
}

function deleteBook(e) {
  let id = e.target.parentElement.id;
  Book.deleteBook(id);
  renderBooks();
}

function renderBooks() {
  const container = document.querySelector('.container');
  container.innerHTML = '';
  Book.myLibrary.forEach((book, i) => {
    const card = document.createElement('div');
    card.classList.add('card');
    card.setAttribute('id', i);
    card.innerHTML = "<button class='delete'>&#10060;</button>";
    for (let key in book) {
      if (key == 'hasRead') {
        let content = book[key] ? '&#128213;' : '&#128214;';
        card.innerHTML += `<button class=${key}>${content}</button>`;
        card.lastElementChild.addEventListener('click', (e) => {
          card.classList.toggle('read');
          book[key] = !book[key];
          e.target.innerHTML = book[key] ? '&#128213;' : '&#128214;';
        });
        if (book[key]) card.classList.toggle('read');
      } else card.innerHTML += `<div class="${key}">${book[key]}</div>`;
    }
    card.firstChild.addEventListener('click', deleteBook);
    container.appendChild(card);
  });
}

const dialog = document.querySelector('dialog');
document.querySelector('.add').addEventListener('click', () => dialog.showModal());
document.querySelector('.close').addEventListener('click', () => dialog.close());

document.querySelector('form').addEventListener('submit', handleSubmit);
renderBooks();
