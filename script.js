const myLibrary = [];

function Book(title, author, pages, hasRead) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.hasRead = hasRead ? 'read' : 'not read yet';
    this.info = function () {
        return `${this.title} by ${this.author}, ${this.pages} pages, has ${this.hasRead}.`;
    };
}

function addBookToLibrary() {
    // do stuff here
}
