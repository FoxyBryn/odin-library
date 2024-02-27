const myLibrary = [];
const addBookBtn = document.querySelector('.add-book');
const inputForm = document.querySelector('form');
const cancelBtns = document.querySelectorAll('.cancel');
const emptyLibrary = document.querySelector('.empty-library');
const dialog = document.querySelector('.book-input');
const editDialog = document.querySelector('.book-edit')

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

    if(myLibrary.length > 0) {
        emptyLibrary.style.display = 'none';
    }

    dialog.close();
    displayLibrary();
}

function displayLibrary() {
    const bookContainer = document.querySelector('.book-container');
    bookContainer.innerHTML = '';

    const template = document.querySelector('.book-card');

    myLibrary.forEach(function(book, index) {
        const card = template.content.cloneNode(true);

        card.querySelector('.book-title').textContent = book.title;
        card.querySelector('.book-author').textContent += book.author;
        card.querySelector('.book-pages').textContent += book.pages;

        const readCheckbox =card.querySelector('.book-read');
        readCheckbox.checked = book.read;

        readCheckbox.addEventListener('change', () => {
            toggleReadStatus(index);
        });

        const editBookBtn = card.querySelector('.edit-book');
        editBookBtn.addEventListener('click', () => {
            editBook(index);
        });

        const deleteBookBtn = card.querySelector('.delete-book');
        deleteBookBtn.addEventListener('click', () => {
            removeBook(index);
        });

        bookContainer.appendChild(card);
    });
}

function editBook(index) {
    const book = myLibrary[index];
    document.querySelector('#editIndex').value = index;
    document.querySelector('#editTitle').value = book.title;
    document.querySelector('#editAuthor').value = book.author;
    document.querySelector('#editPages').value = book.pages;
    document.querySelector('#editRead').checked = book.read;
    editDialog.showModal();
}

document.querySelector('#editBookForm').addEventListener('submit', (event) => {
    event.preventDefault();
    const index = document.querySelector('#editIndex').value;
    myLibrary[index] = {
        title: document.querySelector('#editTitle').value,
        author: document.querySelector('#editAuthor').value,
        pages: document.querySelector('#editPages').value,
        read: document.querySelector('#editRead').checked
    };
    editDialog.close();
    displayLibrary();
});

function removeBook(index) {
    myLibrary.splice(index, 1);
    displayLibrary();

    if (myLibrary.length === 0) {
        emptyLibrary.style.display = 'flex';
    }
}

function toggleReadStatus(index) {
    myLibrary[index].read = !myLibrary[index].read;
    displayLibrary();
}

addBookBtn.addEventListener('click', () => {
    dialog.showModal();
});

inputForm.addEventListener('submit', (event) => {
    event.preventDefault();
    addBookToLibrary();
    inputForm.reset();
});

cancelBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        inputForm.reset();
        dialog.close();
        editDialog.close();
    });
});

document.addEventListener('click', (event) => {
    if (!event.target.contains(dialog)) return;
    inputForm.reset();
    dialog.close();
});

document.addEventListener('click', (event) => {
    if (!event.target.contains(editDialog)) return;
    inputForm.reset();
    editDialog.close();
});

// Test Book
function addTestBook() {
    const testBook = new Book("Wildwood Dancing", "Juliet Marillier", 370, true);
    myLibrary.push(testBook);
    if(myLibrary.length > 0) {
        emptyLibrary.style.display = 'none';
    }
    displayLibrary();
}
addTestBook();