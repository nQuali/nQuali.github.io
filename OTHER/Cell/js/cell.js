// @ts-check
'use strict'

function Cell(posX, posY, energy, space) {
  var self = this

  this.posX = posX
  this.posY = posY
  this.energy = energy
  this.space = space

  this.space[this.posY][this.posX] = 'Q'

  this.lookArr = []
  this.lookArrCord = []
  this.foodCord = []
  this.bestFood = 0;

  // Старая функция получния координаты лучшей еды
  function __OLD__getBestFoodCord() {
    var indexOfBestFood = self.lookArr.indexOf(self.bestFood.toString())

    switch (indexOfBestFood) {
      case 0:
        self.foodCordX = self.posX - 1
        self.foodCordY = self.posY - 1
        break
      case 1:
        self.foodCordX = self.posX
        self.foodCordY = self.posY - 1
        break
      case 2:
        self.foodCordX = self.posX + 1
        self.foodCordY = self.posY - 1
        break
      case 3:
        self.foodCordX = self.posX - 1
        self.foodCordY = self.posY
        break
      case 4:
        self.foodCordX = self.posX + 1
        self.foodCordY = self.posY
        break
      case 5:
        self.foodCordX = self.posX - 1
        self.foodCordY = self.posY + 1
        break
      case 6:
        self.foodCordX = self.posX
        self.foodCordY = self.posY + 1
        break
      case 7:
        self.foodCordX = self.posX + 1
        self.foodCordY = self.posY + 1
        break
      case -1:

        switch (Math.floor(Math.random() * 4)) {
          case 0:
            self.foodCordX = self.posX + Math.round(Math.random())
            self.foodCordY = self.posY + Math.round(Math.random())
            break
          case 1:
            self.foodCordX = self.posX - Math.round(Math.random())
            self.foodCordY = self.posY - Math.round(Math.random())
            break
          case 2:
            self.foodCordX = self.posX + Math.round(Math.random())
            self.foodCordY = self.posY - Math.round(Math.random())
            break
          case 3:
            self.foodCordX = self.posX - Math.round(Math.random())
            self.foodCordY = self.posY + Math.round(Math.random())
            break
        }
    }
  }

  // Сканирует область в радиусе одной клетки
  function look() {
    self.lookArrCord = [
      [self.posY - 1, self.posX - 1],
      [self.posY - 1, self.posX],
      [self.posY - 1, self.posX + 1],
      [self.posY, self.posX - 1],
      [self.posY, self.posX + 1],
      [self.posY + 1, self.posX - 1],
      [self.posY + 1, self.posX],
      [self.posY + 1, self.posX + 1]
    ]
  }

  // Опеделяет, что находится в радиусе сканирования
  function findItems() {
    var filteredLookArrCord = self.lookArrCord.filter(e => e.every(e => e >= 0));

    for (let i = 0; i < filteredLookArrCord.length; i++) {
      self.lookArr.push(space[filteredLookArrCord[i][0]][filteredLookArrCord[i][1]])
    }
  }

  // Находит наибольшую еду и кладет ее в переменную self.bestFood
  function findbestFood() {
    self.bestFood = Math.max.apply(0, self.lookArr.filter(e => +e))
  }

  // Находит координату еды
  function findBestFoodCord() {
    self.foodCord = self.lookArrCord[self.lookArr.indexOf(self.bestFood + '')]
  }

  // Передвигает клетку к еде, изменяет текущие координаты, добавляет энергию
  function move() {
    self.space[self.posY][self.posX] = '-'
    self.space[self.foodCord[0]][self.foodCord[1]] = 'Q'

    self.posY = self.foodCord[0]
    self.posX = self.foodCord[1]

    self.energy += self.bestFood
  }

  // Снижает энергию и проверяет не закончилась ли она
  function checkDeath() {
    self.energy -= 1 // Снижение енергии на 1 за ход
    if (self.energy === 0) self.energy = "DEAD"
  }

  // Очищает переменные
  function clearInfo() {
    self.lookArr = []
    self.lookArrCord = []
    self.foodCord = []
    self.bestFood = 0;
  }

  // Выводит данные в консоль
  this.console = function () {
    console.log('Поле: ', self.space)
    console.log('Массив сканирования: ', self.lookArr)
    console.log('Координаты лучшей еды: ', self.foodCord)
    console.log('Текущая энергия: ', self.energy)
  }

  // Запускаяет 1 жизненный круг
  this.live = function () {
    look()
    findItems()
    findbestFood()
    findBestFoodCord()
    move()
    checkDeath()
    clearInfo()
  }
}

/*
   X ----- стена
   - ----- пустая ячейка
   Q ----- персонаж
   1 - 4 - энергия


   [ [ '-', '-', '1', '-', '-', '2', 'X', '-', '-', '-' ],
     [ '-', '3', '-', '1', '-', '-', 'X', '-', '-', '-' ],
     [ '-', '-', 'X', '-', 'Q', '-', 'X', '-', '2', '-' ],
     [ '-', '4', 'X', '-', '-', '4', '-', '-', '-', '-' ],
     [ '4', '-', 'X', '4', '-', '-', '-', '3', '-', '1' ] ]

*/

var firstSpace = [
  ['-', '-', '-', '-', '-', '-', '-', '-', '-', '-'],
  ['-', '-', '-', '-', '-', '-', '-', '-', '-', '-'],
  ['-', '-', '-', '-', '-', '-', '-', '-', '-', '-'],
  ['-', '-', '-', '-', '-', '-', '-', '-', '-', '-'],
  ['-', '-', '-', '-', '-', '-', '-', '-', '-', '-']
]

var secondSpace = [
  ['-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-'],
  ['-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-'],
  ['-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-'],
  ['-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '3', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-'],
  ['-', '-', '-', '-', '-', '-', '-', '-', '-', '2', '-', '-', '4', '-', '-', '3', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-'],
  ['-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '4', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-'],
  ['-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '3', '-', '-', '-', '-', '1', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-'],
  ['-', '-', '-', '-', '-', '-', '-', '-', '-', '4', '2', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-'],
  ['-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '4', '-', '-', '1', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-'],
  ['-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '2', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-'],
  ['-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-'],
  ['-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '4', '-', '3', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-'],
  ['-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-'],
  ['-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-'],
  ['-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-'],
  ['-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-'],
  ['-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-']
]

var thirdSpace = [
  ['-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-'],
  ['-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-'],
  ['-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-'],
  ['-', '-', '3', '1', '-', '3', '2', '-', '3', '-', '-', '-', '-', '3', '-', '-', '-', '-'],
  ['-', '-', '-', '-', '-', '-', '-', '-', '-', '2', '-', '-', '4', '-', '-', '3', '-', '-'],
  ['-', '-', '-', '-', '-', '-', '2', '-', '-', '-', '-', '-', '-', '-', '4', '-', '-', '-'],
  ['-', '-', '2', '-', '-', '-', '-', '4', '-', '-', '-', '3', '-', '-', '-', '-', '1', '-'],
  ['-', '-', '-', '-', '2', '-', '-', '-', '-', '4', '2', '-', '-', '-', '-', '-', '-', '-'],
  ['-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '4', '-', '-', '1', '-', '-'],
  ['-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '2', '-'],
  ['-', '-', '1', '-', '-', '-', '4', '-', '-', '-', '4', '-', '-', '-', '-', '-', '-', '-'],
  ['-', '-', '-', '-', '3', '-', '-', '-', '3', '-', '-', '-', '-', '4', '-', '3', '-', '-'],
  ['-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-'],
  ['-', '-', '-', '4', '-', '-', '4', '-', '4', '-', '-', '-', '-', '-', '-', '-', '-', '-'],
  ['-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-'],
  ['-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-'],
  ['-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-']
]

var cell = new Cell(8, 6, 1, thirdSpace)
cell.console()