const canvas = document.getElementById("paint-container");
const colorPicker = document.getElementById("color-picker")
const fragment = document.createDocumentFragment()
let gridElement

function createGrid(size) {
    for (let n = 0; n < size * size; n++) {
        const div = document.createElement("div")
        fragment.appendChild(div)
    }

    canvas.replaceChildren(fragment)
    canvas.style.gridTemplateColumns = `repeat(${size}, 1fr)`
    canvas.style.gridTemplateRows = `repeat(${size}, 1fr)`
    gridElement = document.querySelectorAll("#paint-container div")
}

createGrid(2)

function colorizeGridElement() {
    this.style.backgroundColor = colorPicker.value
}

gridElement.forEach(div => {
    div.addEventListener("mouseover", colorizeGridElement)
})

/* function changeMouseEvent() {
    gridElement.forEach(div => {
        div.removeEventListener("click", colorizeGridElement)
    })  

    gridElement.forEach(div => {
        div.addEventListener("mouseover", colorizeGridElement)
    })    
} */