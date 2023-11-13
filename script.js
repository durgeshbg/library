const myLibrary = [];

function Book(title, author, pages, hasRead) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.hasRead = hasRead;
}

function addBookToLibrary() {
    const book = new Book('Title', 'Book author', 76, true);
    myLibrary.push(book);
    myLibrary.forEach((book) => {
        console.log(book.title);
    });
    console.log(myLibrary);
}
addBookToLibrary();
