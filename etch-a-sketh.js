const canvas = document.getElementById("paint-container");
const colorPicker = document.getElementById("color-picker")
const gridSizeInput = document.getElementById("grid-size-input")
const fragment = document.createDocumentFragment()
let gridElement

const actionButton = document.querySelectorAll("#button-container button")

function createGrid(size) {

    if (size >= 0 && size <= 100) {

        gridSizeInput.style.backgroundColor = "white"

        for (let n = 0; n < size * size; n++) {
            const div = document.createElement("div")
            fragment.appendChild(div)
        }
    
        canvas.replaceChildren(fragment)
        canvas.style.gridTemplateColumns = `repeat(${size}, 1fr)`
        canvas.style.gridTemplateRows = `repeat(${size}, 1fr)`
        gridElement = document.querySelectorAll("#paint-container div")
        gridElement.forEach(div => {
            div.addEventListener("mouseover", colorizeGridElement)
        })

    } else {
        gridSizeInput.style.backgroundColor = "red"
    }
}

function colorizeGridElement() {
    this.style.backgroundColor = colorPicker.value
}

createGrid(12)

gridSizeInput.addEventListener("input", () => {
    createGrid(gridSizeInput.value)
})

actionButton.forEach(button => {
    if (button.textContent !== "Clear") {
    button.addEventListener("click", function() {
        button.classList.toggle("pressed")
    }) }
});

/* function changeMouseEvent() {
    gridElement.forEach(div => {
        div.removeEventListener("click", colorizeGridElement)
    })  

    gridElement.forEach(div => {
        div.addEventListener("mouseover", colorizeGridElement)
    })    
} */