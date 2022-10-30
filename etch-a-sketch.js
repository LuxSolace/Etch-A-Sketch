const canvas = document.getElementById("paint-container")
const gridSizeInput = document.getElementById("grid-size-input")
const colorPicker = document.getElementById("color-picker")
const palette = document.querySelectorAll("#palette div")

const penBtn = document.getElementById("pen-btn")
const eraserBtn = document.getElementById("eraser-btn")
const bucketBtn = document.getElementById("bucket-btn")
const pickerBtn = document.getElementById("picker-btn")

const randomBtn = document.getElementById("random-btn")

const toolsBtn = document.querySelectorAll("#tools input")
const paramBtn = document.querySelectorAll("#button-container button")

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
            div.addEventListener("click", modifyGridElement)
        })

    } else {
        gridSizeInput.style.backgroundColor = "red"
    }
}

createGrid(12)

gridSizeInput.addEventListener("input", () => {
    createGrid(gridSizeInput.value)
})

function modifyGridElement() {

    if (penBtn.classList.contains("pressed") && !randomBtn.classList.contains("pressed")) {
      this.style.backgroundColor = colorPicker.value
    } else if (penBtn.classList.contains("pressed") && randomBtn.classList.contains("pressed")) {
        this.style.backgroundColor = rgb2hex(`rgb(${getRandomNumber()}, ${getRandomNumber()}, ${getRandomNumber()})`)
    } else if (eraserBtn.classList.contains("pressed")) {
        this.style.backgroundColor = "white"
    } else if (bucketBtn.classList.contains("pressed")) {
        gridElement.forEach(element => {
        element.style.backgroundColor = colorPicker.value
        }) 
    } else if (pickerBtn.classList.contains("pressed")) {
        if (this.style.backgroundColor != "") {
            colorPicker.value = rgb2hex(this.style.backgroundColor)
        } else {
            colorPicker.value = rgb2hex("rgb(255, 255, 255)")
        }
    }
}

function clearCanvas() {
    gridElement.forEach(div => {
        div.style.backgroundColor = "rgb(255, 255, 255)"
    })
}

function toggleGrid() {
    canvas.classList.toggle("grid")
}

toolsBtn.forEach(button => {
    button.addEventListener("click", togglePressed)
})

function togglePressed() {
    if (!this.classList.contains("pressed")) {

        toolsBtn.forEach(button => {
            button.classList.remove("pressed")
        })

        this.classList.add("pressed")
    }
}

paramBtn.forEach(button => {
    if (button.textContent !== "Clear") {
    button.addEventListener("click", function() {
        button.classList.toggle("pressed")
    }) }
})

function getRandomNumber() {
    return Math.floor(Math.random() * 255 + 1)
}

const rgb2hex = (rgb) => `#${rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/).slice(1).map(n => parseInt(n, 10).toString(16).padStart(2, '0')).join('')}`

palette.forEach(div => {
    div.addEventListener("click", () => {
        colorPicker.value = rgb2hex(div.style.backgroundColor)
    })
})