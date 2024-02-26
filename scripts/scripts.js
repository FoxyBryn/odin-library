const myLibrary = [];
const addBookBtn = document.querySelector('.add-book');
const inputForm = document.querySelector('form');
const emptyLibrary = document.querySelector('.empty-library');
const dialog = document.querySelector('.book-input');

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

function addBookToLibrary() {
    const title = document.querySelector('#title').value;
    const author = document.querySelector('#author').value;
    const pages = document.querySelector('#pages').value;
    const read = document.querySelector('#read').checked;

    const newBook = new Book(title, author, pages, read);
    myLibrary.push(newBook);
    dialog.close();
    displayLibrary();
}

function displayLibrary() {
    const bookContainer = document.querySelector('.book-container');

    bookContainer.innerHTML = '';

    const template = document.querySelector('.book-card');

    myLibrary.forEach(function(book) {
        const card = template.content.cloneNode(true);

        card.querySelector('.book-title').textContent = book.title;
        card.querySelector('.book-author').textContent += book.author;
        card.querySelector('.book-pages').textContent += book.pages;
        card.querySelector('.book-read').checked = book.read;

        bookContainer.appendChild(card);
    });
}

addBookBtn.addEventListener('click', () => {
    dialog.showModal();
    emptyLibrary.style.display = 'none';
});