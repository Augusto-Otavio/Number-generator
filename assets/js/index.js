const btnDraw = document.getElementById("button-draw")
const min = document.getElementById("min-number")
const max = document.getElementById("max-number")
const drawCount = document.getElementById("quantity-number")
const noRepeat = document.getElementById("do-not-repeat-number")
const resultContainer = document.getElementById("result-numbers")
const contentForm = document.getElementById("content-form")

btnDraw.onclick = (event) => {
  event.preventDefault()

  const minNumber = Number(min.value)
  const maxNumber = Number(max.value)
  const drawCountNumber = Number(drawCount.value)
  const noRepeatChecked = noRepeat.checked

  let result 

  if(noRepeatChecked) {
    result = drawNumberNoRepeat(drawCountNumber, minNumber, maxNumber)
  } else {
    result = drawNumber(drawCountNumber, minNumber, maxNumber)
  }

  showResult(result)

  contentForm.classList.add("hidden")
}

function drawNumber(drawCount, min, max) {
  const result = []

  for(let i = 0; i < drawCount; i++) {
    const resultDraw = Math.floor(Math.random() * (max - min + 1)) + min
    result.push(resultDraw)
  }

  return result
}

function drawNumberNoRepeat(drawCount, min, max) {
  const result = []

  if(drawCount > (max - min + 1)) {
    alert("Quantidade maior que o intervalo disponível")

    return []
  }

  while(result.length < drawCount) {
    const resultDraw = Math.floor(Math.random() * (max - min + 1)) + min
    
    if(!result.includes(resultDraw)) {
      result.push(resultDraw)
    }
  }

  return result
}

function showResult(numbers) {
  resultContainer.innerHTML = ""

  const header = document.createElement("header")

  const spanTitle = document.createElement("span")
  spanTitle.classList.add("label-large")
  spanTitle.textContent = "RESULTADO DO SORTEIO"

  const resultName = document.createElement("span")
  resultName.classList.add("overline")
  resultName.textContent = "1º RESULTADO"

  header.append(spanTitle, resultName)
  resultContainer.appendChild(header)

    const containerNumbers = document.createElement("div")
    containerNumbers.classList.add("container-numbers")
  
  numbers.forEach((number, index) => {

    const card = document.createElement("div")
    card.classList.add("number-card")

    const numberSlot = document.createElement("div")
    numberSlot.classList.add("number-slot")

    const valueNumber = document.createElement("span")
    valueNumber.classList.add("number-result")
    valueNumber.textContent = number

    const delay = index * 2.6
    card.style.animationDelay = `${delay}s`
    valueNumber.style.animationDelay = `${delay}s`

    numberSlot.append(card, valueNumber)
    containerNumbers.appendChild(numberSlot)
  });

  resultContainer.appendChild(containerNumbers)
}
