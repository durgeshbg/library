const myLibrary = [];

function Book(title, author, pages, hasRead) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.hasRead = hasRead;
}

function addBookToLibrary(title, author, pages, hasRead) {
    const book = new Book(title, author, pages, hasRead);
    myLibrary.push(book);
}

function handleSubmit(e) {
    const formData = new FormData(e.target);
    const book = {};
    formData.forEach((value, key) => {
        if (key == 'hasRead') book[key] = value == 'true' ? true : false;
        book[key] = value;
    });
    addBookToLibrary(
        book['title'],
        book['author'],
        book['pages'],
        book['hasRead']
    );
    e.target.reset();
    dialog.close();
    logBooks();
    e.preventDefault();
}

function deleteBook(e) {
    e.target.parentElement.remove();
}

function logBooks() {
    const container = document.querySelector('.container');
    container.innerHTML = '';
    myLibrary.forEach((book) => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.innerHTML = "<button class='delete'>&#x1F5D1;</button>";
        for (const key in book) {
            if (key == 'hasRead') {
                let content = book[key] ? 'not read yet' : 'read';
                card.innerHTML += `<button class=${key}>has ${content}</button>`;
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
document
    .querySelector('.add')
    .addEventListener('click', () => dialog.showModal());
document
    .querySelector('.close')
    .addEventListener('click', () => dialog.close());

document.querySelector('form').addEventListener('submit', handleSubmit);
logBooks();
