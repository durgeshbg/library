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
    myLibrary.forEach((book) => {
        const card = document.createElement('div');
        card.classList.add('card');
        for (const key in book) {
            if (key == 'hasRead') {
                let content = book[key] ? 'read' : 'not read yet';
                card.innerHTML += `<button class=${key}>has ${content}</button>`;
                if (book[key]) card.classList.toggle('read');
            } else card.innerHTML += `<div class="${key}">${book[key]}</div>`;
        }
        container.appendChild(card);
    });
}
logBooks();
