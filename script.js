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
  let data = new FormData(e.target);
  hasRead = data.get('hasRead') == 'true' ? true : false;
  const book = new Book(
    data.get('title'),
    data.get('author'),
    data.get('pages'),
    hasRead
  );
  Book.addBookToLibrary(book);
  e.target.reset();
  dialog.close();
  renderBooks();
  e.preventDefault();
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
    card.innerHTML = "<button class='delete'>&#x1F5D1;</button>";
    for (let key in book) {
      if (key == 'hasRead') {
        let content = book[key] ? 'not read yet' : 'read';
        card.innerHTML += `<button class=${key}>${content}</button>`;
        card.lastElementChild.addEventListener('click', (e) => {
          card.classList.toggle('read');
          book[key] = !book[key];
          e.target.textContent = book[key] ? 'not read yet' : 'read';
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
