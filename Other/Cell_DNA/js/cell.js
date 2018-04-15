//@ts-check
'use strict'

function Cell(posY, posX, dna, field) {
  this.posY = posY
  this.posX = posX
  this.dna = dna

  field[this.posY][this.posX] = 'Q' // Устанавливает 'Q' в заданные координаты

  function live(dna) {
    for (let i = 0; i < dna.length; i++) {
			const element = dna[i]
			
		}
  }

  this.console = function () { // Функция выводит информацию в консоль
    console.clear() // Чистит консоль
    console.log(`Текущие координаты клетки: [${this.posX}, ${this.posY}]`); // Печатает текущие координаты клетки
    console.log(field); // Печатает поле

  }
}

let firstField = [
  [0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0],
]

let cell = new Cell(0, 0, [0], firstField)
cell.console()
