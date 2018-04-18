window.addEventListener('load', () => {

  let field = document.querySelector('.field')
  let status = document.querySelector('.status')
	
  function clearSpace() {
    let z, node = field;
    while (z = node.lastChild) {
      node.removeChild(z);
    }
  }

  function drawSpace() {
    for (let i = 0; i < 4; i++) {
      let row = field.appendChild(document.createElement('div'))
      row.className = 'row'
      for (let j = 0; j < 4; j++) {
        let cell = row.appendChild(document.createElement('div'))
        cell.className = 'cell'
        cell.innerText = space[i][j] || ''
        if (space[i][j]) {
          cell.className += ' n-' + space[i][j]
        }
      }
    }
  }

  function game_draw_and_check() {
    clearSpace()
    drawSpace()
  }

  window.onkeydown = (e) => {
    if (e.keyCode == 37) { // left
      left()
      game_draw_and_check()
    }

    if (e.keyCode == 38) { // up
      up()
      game_draw_and_check()
    }

    if (e.keyCode == 39) { // right
      right()
      game_draw_and_check()
    }

    if (e.keyCode == 40) { // down
      down()
      game_draw_and_check()
    }
  }

  drawSpace()
})
