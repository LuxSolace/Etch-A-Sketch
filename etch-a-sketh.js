const canvas = document.getElementById("paint-container");
const colorPicker = document.getElementById("color-picker")
const gridSizeInput = document.getElementById("grid-size-input")
const palette = document.querySelectorAll("#palette div")
const actionButton = document.querySelectorAll("#button-container button")
const toolsButton = document.querySelectorAll("#tools input")
const penBtn = document.getElementById("penBtn")

const fragment = document.createDocumentFragment()
let gridElement

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
    if (penBtn.classList == "pressed") {
    this.style.backgroundColor = colorPicker.value
    }    
}

createGrid(12)

gridSizeInput.addEventListener("input", () => {
    createGrid(gridSizeInput.value)
})

function togglePressedStyle(target) {
    target.forEach(button => {
        if (button.textContent !== "Clear") {
        button.addEventListener("click", function() {
            button.classList.toggle("pressed")
        }) }
    });
}

togglePressedStyle(actionButton)
togglePressedStyle(toolsButton)

function toggleGrid() {
    canvas.classList.toggle("grid")
}

function clearCanvas() {
    gridElement.forEach(div => {
        div.style.backgroundColor = "white"
    })
}

const rgb2hex = (rgb) => `#${rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/).slice(1).map(n => parseInt(n, 10).toString(16).padStart(2, '0')).join('')}`

 palette.forEach(div => {
     div.addEventListener("click", () => {
         colorPicker.value = rgb2hex(div.style.backgroundColor)
     })
})
 