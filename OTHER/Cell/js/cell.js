'use strict';

function Cell(posX, posY, energy, space) {
  var self = this;

  this.posX = posX;
  this.posY = posY;
  this.energy = energy;
  this.space = space;

  this.space[this.posY][this.posX] = 'Q';

  this.lookArr = [];
  this.bestFood = 0;

  this.foodCordX = 0;
  this.foodCordY = 0;

  function findBestFood() {
    var filteredLookArr = self.lookArr.filter(function(v) {
      return !isNaN(v);
    });
    if (filteredLookArr.length > 0) {
      self.bestFood = Math.max.apply(0, filteredLookArr);
    } else {
      self.bestFood = 0;
    }
  }

  function getBestFoodCord() {
    var indexOfBestFood = self.lookArr.indexOf(self.bestFood.toString());

    switch (indexOfBestFood) {
      case 0:
        self.foodCordX = self.posX - 1;
        self.foodCordY = self.posY - 1;
        break;
      case 1:
        self.foodCordX = self.posX;
        self.foodCordY = self.posY - 1;
        break;
      case 2:
        self.foodCordX = self.posX + 1;
        self.foodCordY = self.posY - 1;
        break;
      case 3:
        self.foodCordX = self.posX - 1;
        self.foodCordY = self.posY;
        break;
      case 4:
        self.foodCordX = self.posX + 1;
        self.foodCordY = self.posY;
        break;
      case 5:
        self.foodCordX = self.posX - 1;
        self.foodCordY = self.posY + 1;
        break;
      case 6:
        self.foodCordX = self.posX;
        self.foodCordY = self.posY + 1;
        break;
      case 7:
        self.foodCordX = self.posX + 1;
        self.foodCordY = self.posY + 1;
        break;
      case -1:

        switch (parseInt(Math.random() * 4)) {
          case 0:
            self.foodCordX = self.posX + Math.round(Math.random());
            self.foodCordY = self.posY + Math.round(Math.random());
            break;
          case 1:
            self.foodCordX = self.posX - Math.round(Math.random());
            self.foodCordY = self.posY - Math.round(Math.random());
            break;
          case 2:
            self.foodCordX = self.posX + Math.round(Math.random());
            self.foodCordY = self.posY - Math.round(Math.random());
            break;
          case 3:
            self.foodCordX = self.posX - Math.round(Math.random());
            self.foodCordY = self.posY + Math.round(Math.random());
            break;
        }
    }
  }

  function look() {
    self.lookArr.push(self.space[self.posY - 1][self.posX - 1]);
    self.lookArr.push(self.space[self.posY - 1][self.posX]);
    self.lookArr.push(self.space[self.posY - 1][self.posX + 1]);

    self.lookArr.push(self.space[self.posY][self.posX - 1]);
    self.lookArr.push(self.space[self.posY][self.posX + 1]);

    self.lookArr.push(self.space[self.posY + 1][self.posX - 1]);
    self.lookArr.push(self.space[self.posY + 1][self.posX]);
    self.lookArr.push(self.space[self.posY + 1][self.posX + 1]);
  }

  this.console = function() {
    console.log('Поле: ', self.space);
    console.log('Массив сканирования: ', self.lookArr);
    console.log('Лучшая еда: ', self.bestFood);
    console.log('Енергия: ', self.energy);

    console.log('Идекс лучшей еды в массиве сканирования: ',
        self.lookArr.indexOf(self.bestFood.toString()));

    console.log('Координаты лучшей еды: [', self.foodCordX, ', ',
        self.foodCordY, ']');
  };

  function move() {
    self.space[self.posY][self.posX] = '-';
    self.space[self.foodCordY][self.foodCordX] = 'Q';

    self.posY = self.foodCordY;
    self.posX = self.foodCordX;

    self.energy += self.bestFood;
    self.lookArr = [];
    self.bestFood = 0;
    self.foodCordX = 0;
    self.foodCordY = 0;
  }

  function checkAlive() {
    self.energy -= 1;  // Снижение енергии на 1 за ход
    if (self.energy === 0) self.energy = "DEAD";
  }

  this.live = function() {
    look();            // Сканирует область в радиусе одной клетки
    findBestFood();    // Находит лучшую еду и записывает в переменную self.bestFood
    getBestFoodCord(); // Записывает координаты еда self.foodCordX и self.foodCordX
    move();            // Передвигает клетку
    checkAlive();
  };
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
     [ '4', '-', 'X', '4', '-', '-', '-', '3', '-', '1' ] ];

*/

var firstSpace = [
  ['-', '-', '-', '-', '-', '-', '-', '-', '-', '-'],
  ['-', '-', '-', '-', '-', '-', '-', '-', '-', '-'],
  ['-', '-', '-', '-', '-', '-', '-', '-', '-', '-'],
  ['-', '-', '-', '-', '-', '-', '-', '-', '-', '-'],
  ['-', '-', '-', '-', '-', '-', '-', '-', '-', '-']];

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
    ['-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-']];

var cell = new Cell(15, 6, 1, secondSpace);
cell.console();