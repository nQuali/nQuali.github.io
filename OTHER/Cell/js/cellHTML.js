// @ts-check
'use strict';

window.addEventListener('load', function () {

  var space = document.querySelector('.space');

  var btnNextStep = document.querySelector('.panel').
  appendChild(document.createElement('button'));
  btnNextStep.className = 'btnNextStep';
  btnNextStep.innerText = 'NEXT';

  var html = document.querySelector('html');
  html.style.fontSize = cell.space[0].length / 4 + 'px';

  var status = document.querySelector('.status');

  var energyBar = status.appendChild(document.createElement('div'));
  energyBar.className = 'energyBar';
  energyBar.innerText = cell.energy;

  function drawSpace() {
    for (var i = 0; i < cell.space.length; i++) {
      var rowCell = space.appendChild(document.createElement('div'));
      rowCell.className = 'rowCell';
      for (var j = 0; j < cell.space[i].length; j++) {
        var emptyCell = rowCell.appendChild(document.createElement('div'));
        emptyCell.className = 'emptyCell';
        emptyCell.innerText = cell.space[i][j];
      }
    }
  }

  //function clearSpace() {
  //  for (var i = 0; i < cell.space.length; i++) {
  //    var rowCell = document.querySelector('.rowCell');
  //    space.removeChild(rowCell);
  //  }
  //}

  function clearSpace() {
    var z, node = space;
    while (z = node.lastChild) {
      node.removeChild(z);
    }
  }


  function stopLive() {
    if (cell.energy === 'DEAD')
      btnNextStep.removeEventListener('click', moveListener);
  }

  function moveListener() {
    cell.live();
    // cell.console();
    clearSpace();
    drawSpace();
    energyBar.innerText = cell.energy;
    stopLive();
  }

  btnNextStep.addEventListener('click', moveListener);

  drawSpace();
});