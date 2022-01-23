
async function main() {
    let response = await fetch('http://localhost:3001/listBooks');

    let books = await response.json();

    books.forEach(renderBook);

}

function renderBook(book) {
    let root = document.querySelector('#root')

    let li = document.createElement('li')
    li.textContent = book.title
    //creates list of the book titles from the db.json

    let quantityInput = document.createElement('input')
    quantityInput.value = book.quantity
    //enters the default quantity of books that currently exists in db.json into the input field as a starter value that can be changed

    let saveButton = document.createElement('button')
    saveButton.textContent = 'Save'
    //creates a save button

    //event listener for the saveButton to update the books quantity in db.json
    saveButton.addEventListener('click', () => {
        fetch('http://localhost:3001/updateBook', {
            method: 'PATCH',
            headers: {
                    'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: book.id,
                quantity: quantityInput.value
            })
        })
    })

    li.append(quantityInput, saveButton)

    root.append(li)
}

main();
