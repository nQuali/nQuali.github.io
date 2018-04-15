'use strict'

let space = [
  [0, 2, 2, 8],
  [4, 2, 2, 0],
  [0, 16, 0, 0],
  [0, 0, 0, 0]
]

let rand = [2, 4]

function add() {
  while (true) {
		let rnd1 = Math.floor(Math.random() * 4)
		let rnd2 = Math.floor(Math.random() * 4)
    if (!space[rnd1][rnd2]) {
      space[rnd1][rnd2] = rand[Math.floor(Math.random() * 2)]
      break
    }
  }
}

function left() {
  let tmp_space = [
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0]
  ]

  let tmp_space2 = [
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0]
  ]

  for (let i = 0; i < 4; i++) {

    let x = 0;
    for (let j = 0; j < 4; j++) {
      if (space[i][j]) {
        tmp_space[i][x] = space[i][j]
        x++
      } else {
        continue
      }
    }

    let y = 3
    for (let j = 0; j < y; j++) {
      if (tmp_space[i][j] == tmp_space[i][j + 1]) {
        tmp_space[i][j] *= 2
        tmp_space[i][j + 1] = 0
        y -= 1
      }
    }

    let z = 0;
    for (let j = 0; j < 4; j++) {
      if (tmp_space[i][j]) {
        tmp_space2[i][z] = tmp_space[i][j]
        z++
      } else {
        continue
      }
    }
  }

  space = tmp_space2
  add()
}

function right() {
  let tmp_space = [
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0]
  ]

  let tmp_space2 = [
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0]
  ]

  for (let i = 0; i < 4; i++) {

    let x = 3;
    for (let j = 3; j > -1; j--) {
      if (space[i][j]) {
        tmp_space[i][x] = space[i][j]
        x -= 1
      } else {
        continue
      }
    }

    let y = 0
    for (let j = 3; j > y; j--) {
      if (tmp_space[i][j] == tmp_space[i][j - 1]) {
        tmp_space[i][j] *= 2
        tmp_space[i][j - 1] = 0
        y++
      }
    }

    let z = 3;
    for (let j = 3; j > -1; j--) {
      if (tmp_space[i][j]) {
        tmp_space2[i][z] = tmp_space[i][j]
        z -= 1
      } else {
        continue
      }
    }
  }

  space = tmp_space2
  add()
}

function up() {
  let rev_space = [
    [space[0][0], space[1][0], space[2][0], space[3][0]],
    [space[0][1], space[1][1], space[2][1], space[3][1]],
    [space[0][2], space[1][2], space[2][2], space[3][2]],
    [space[0][3], space[1][3], space[2][3], space[3][3]]
  ]

  let tmp_space = [
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0]
  ]

  let tmp_space2 = [
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0]
  ]

  for (let i = 0; i < 4; i++) {

    let x = 0;
    for (let j = 0; j < 4; j++) {
      if (rev_space[i][j]) {
        tmp_space[i][x] = rev_space[i][j]
        x++
      } else {
        continue
      }
    }

    let y = 3
    for (let j = 0; j < y; j++) {
      if (tmp_space[i][j] == tmp_space[i][j + 1]) {
        tmp_space[i][j] *= 2
        tmp_space[i][j + 1] = 0
        y -= 1
      }
    }

    let z = 0;
    for (let j = 0; j < 4; j++) {
      if (tmp_space[i][j]) {
        tmp_space2[i][z] = tmp_space[i][j]
        z++
      } else {
        continue
      }
    }
  }

  space = [
    [tmp_space2[0][0], tmp_space2[1][0], tmp_space2[2][0], tmp_space2[3][0]],
    [tmp_space2[0][1], tmp_space2[1][1], tmp_space2[2][1], tmp_space2[3][1]],
    [tmp_space2[0][2], tmp_space2[1][2], tmp_space2[2][2], tmp_space2[3][2]],
    [tmp_space2[0][3], tmp_space2[1][3], tmp_space2[2][3], tmp_space2[3][3]]
  ]
  add()
}

function down() {
  let rev_space = [
    [space[0][0], space[1][0], space[2][0], space[3][0]],
    [space[0][1], space[1][1], space[2][1], space[3][1]],
    [space[0][2], space[1][2], space[2][2], space[3][2]],
    [space[0][3], space[1][3], space[2][3], space[3][3]]
  ]

  let tmp_space = [
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0]
  ]

  let tmp_space2 = [
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0]
  ]

  for (let i = 0; i < 4; i++) {

    let x = 3;
    for (let j = 3; j > -1; j--) {
      if (rev_space[i][j]) {
        tmp_space[i][x] = rev_space[i][j]
        x -= 1
      } else {
        continue
      }
    }

    let y = 0
    for (let j = 3; j > y; j--) {
      if (tmp_space[i][j] == tmp_space[i][j - 1]) {
        tmp_space[i][j] *= 2
        tmp_space[i][j - 1] = 0
        y++
      }
    }

    let z = 3;
    for (let j = 3; j > -1; j--) {
      if (tmp_space[i][j]) {
        tmp_space2[i][z] = tmp_space[i][j]
        z -= 1
      } else {
        continue
      }
    }
  }

  space = [
    [tmp_space2[0][0], tmp_space2[1][0], tmp_space2[2][0], tmp_space2[3][0]],
    [tmp_space2[0][1], tmp_space2[1][1], tmp_space2[2][1], tmp_space2[3][1]],
    [tmp_space2[0][2], tmp_space2[1][2], tmp_space2[2][2], tmp_space2[3][2]],
    [tmp_space2[0][3], tmp_space2[1][3], tmp_space2[2][3], tmp_space2[3][3]]
  ]
  add()
}
