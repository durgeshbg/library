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
