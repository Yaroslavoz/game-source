const startBtn = document.querySelector('#start')

const screens = document.querySelectorAll('.screen')

const board = document.querySelector('#board')

const timeList = document.querySelector('#time-list')
const timeEl = document.querySelector('#time')
const colors = ['#FF4000', '#50B2C0', '#CBEF43', '#B6174B', '#F3FFC6', 
'#01FDF6', '#CBBAED', '#FB5012', '#E9DF00', '#03FCBA'
]

let time = 0
let score = 0

startBtn.addEventListener('click', (event) => {
  event.preventDefault()
  screens[0].classList.add('up')
})

timeList.addEventListener('click', event =>{
  if(event.target.classList.contains('time-btn')){
    time = parseInt(event.target.getAttribute('data-time'))
    startGame()
  }
})

board.addEventListener('click', event => {
  if(event.target.classList.contains('circle')){
    score++
    event.target.remove()
    createRandomCircle()
  }
})

function startGame() {
  board.innerHTML = ''
  timeEl.parentNode.classList.remove('hide')
  
  createRandomCircle()
  screens[1].classList.add('up')
  setInterval(decreaseTime, 1000)
  setTimeout(time)
}

function decreaseTime(){
  if(time === 0){
    finishGame()
  } else {
    let current = --time
    if(current < 10){
      current = `0${current}`
    }
    setTime(current)
  }
  
}
function setTime(value){
  timeEl.innerHTML = `00:${value}`
}

function finishGame(){
  timeEl.parentNode.classList.add('hide')
  board.innerHTML = `<h1>Your score is: <span class="primary"> ${score}</span></h1>`
  const buttonNew = document.createElement('button')
  buttonNew.classList.add('time-btn')
  buttonNew.innerHTML = `Start again`
  buttonNew.addEventListener('click', (event) => {
    event.preventDefault()
    time = 0
    score = 0
    screens[1].classList.remove('up')
  })
  board.append(buttonNew)
}

function createRandomCircle(){
  const circle = document.createElement('div')
  const {width, height} = board.getBoundingClientRect()
  const size = getRandomNumber(10, 40)
  const x = getRandomNumber(0, width - size)
  const y = getRandomNumber(0, height - size)

  circle.classList.add('circle')
  setColor(circle)
  circle.style.width = `${size}px`
  circle.style.height = `${size}px`
  circle.style.top = `${y}px`
  circle.style.left = `${x}px`

  board.append(circle)
}

function getRandomNumber(min, max){
  return Math.round(Math.random() * (max - min) + min)
}
function getRandomColor() {
  const index = Math.floor(Math.random() * colors.length)
  return colors[index]
}
function setColor(element) {
  const color = getRandomColor()
  element.style.backgroundColor = color
  element.style.boxShadow = `0 0 2px ${color}, 0 0 10px ${color}`
}
