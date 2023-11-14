const myLibrary = [
    { title: 'Title 1', author: 'Author 1', pages: 458, hasRead: true },
    { title: 'Title 2', author: 'Author 2', pages: 274, hasRead: false },
    { title: 'Title 3', author: 'Author 3', pages: 374, hasRead: false },
    { title: 'Title 4', author: 'Author 4', pages: 668, hasRead: true },
    { title: 'Title 5', author: 'Author 5', pages: 901, hasRead: true },
    { title: 'Title 6', author: 'Author 6', pages: 569, hasRead: false },
];

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

function logBooks() {
    const container = document.querySelector('.container');
    container.innerHTML = '';
    myLibrary.forEach((book) => {
        const card = document.createElement('div');
        card.classList.add('card');
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

document.querySelector('form').addEventListener('submit', (e) => {
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
});

logBooks();
