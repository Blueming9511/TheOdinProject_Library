// Select the save button element
let saveButton = document.querySelector('.save')

// Create an empty array to store books
const library = []

// Define the Book constructor
function Book (title, author, cover, isRead) {
  this.title = title
  this.author = author
  this.cover = cover
  this.isRead = isRead
}

// Handle cover image selection
let cover
const fileInputCover = document.querySelector('#Cover')
fileInputCover.addEventListener('change', () => {
  const reader = new FileReader()
  reader.readAsDataURL(fileInputCover.files[0])
  reader.addEventListener('load', () => {
    cover = reader.result
  })
})

// Auto generate Book ID
function generateID () {
  return Math.floor(Math.random() * 10000000)
}

function clearForm () {
  document.querySelector('#Title').value = ''
  document.querySelector('#Author').value = ''
  document.querySelector('#Cover').value = ''
}
function addBookToLibrary () {
  const title = document.getElementById('Title').value
  const author = document.getElementById('Author').value

  // const book = new Book(title, author, cover, false)

  let book = {
    id: generateID(),
    title: title,
    author: author,
    cover: cover,
    isRead: false
  }

  library.push(book)
  console.log(library)
  reload(book)
  clearForm()
}

function reload (book) {
  bookItem = `
      <div class="card text-start id ="${book.id}">
        <img class="card-img-top" src="${book.cover}" alt="Title" />
        <div class="card-body">
          <h4 class="card-title">${book.title}</h4>
          <p class="card-text">${book.author}</p>
          <div class="btn-section">
          <button type="button" data-id = "${book.id}" class="btn btn-outline-danger isRead"> Not read yet</button>
          <box-icon name='trash' data-id = "${book.id}" class="remove"></box-icon>
      </div>        </div>
      </div>
    `
  document.querySelector('.library').innerHTML += bookItem
}

$(document).on('click', '.remove', function (e) {
  e.stopPropagation() // Prevent click propagation (optional)
  let bookID = $(this).data('id')
  let bookIndex = library.findIndex(book => book.id == bookID)

  library.splice(bookIndex, 1)
  $(this).closest('.card').remove() // Target closest card element
})

$(document).on('click', '.isRead', function (e) {
  e.stopPropagation() // Prevent click propagation (optional)
  let bookID = $(this).data('id')
  let bookIndex = library.findIndex(book => book.id == bookID)
  let book = library[bookIndex]
  book.isRead = !book.isRead
  library[bookIndex] = book

  if (book.isRead == true) {
    $(this).removeClass('btn-outline-danger')
    $(this).addClass('btn-outline-success')
    $(this).text('Read')
  } else {
    $(this).removeClass('btn-outline-success')
    $(this).addClass('btn-outline-danger')
    $(this).text('Not read yet')
  }

  console.log(library)
})

// IMPLEMENTATION
saveButton.addEventListener('click', addBookToLibrary)
