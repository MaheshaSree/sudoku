function solve(matrix) {
  var i, j, b, digit;
  for (i = 0; i <= 8; i++) {
    for (j = 0; j <= 8; j++) {
      if (!matrix[i][j]) {
        for (digit = 1; digit <= 9; digit++) {
          if (insert(matrix, i, j, digit)) {
            matrix[i][j] = digit;
            b = solve(matrix);
            if (b) { return true; }
            matrix[i][j] = 0;
          }
        }
        return false;
      }
    }
  }
  return true;
}

function insert(matrix, i, j, digit) {
  var a, b;
  for (a = 0; a <= 8; a++) {
    if (a != i && matrix[a][j] == digit) {
      return false;
    }
  }
  for (a = 0; a <= 8; a++) {
    if (a != j && matrix[i][a] == digit) {
      return false;
    }
  }
  var y = Math.floor((i / 3)) * 3,
      x = Math.floor((j / 3)) * 3;
  for (a = 0; a < 3; a++) {
    for (b = 0; b < 3; b++) {
      if (a != i && b != j && matrix[y + a][x + b] == digit) {
        return false;
      }
    }
  }
  return true;
}

function test() {
  var form = document.querySelector('form#sudoku'),
      matrix,
      holder = [],
      i, j, k, z;
  for (i = 0; i < 81; i++) {
    holder[i] = form[i].value;
    matrix = [];
    k = -1;
    for (j = 0; j < holder.length; j++) {
      if (j % 9 === 0) {
        k++;
        matrix[k] = [];        
      }
      matrix[k].push(holder[j]);
    }
  }

  solve(matrix);

  z = 0;
  for (i = 0; i < matrix.length; i++) {
    for (j = 0; j < matrix[i].length; j++) {  
      form[z].value = matrix[i][j];
      z++;
    }
  }
}

function sudokuTable() {
  var i, j, tr, td, input,
      table = document.querySelector('form#sudoku table'),
      tbody = document.createElement('tbody');
  table.appendChild(tbody);
  for (i = 0; i < 9; i++) {
    tr = document.createElement('tr');
    tbody.appendChild(tr);
    for (j = 0; j < 9; j++) {            
      td = document.createElement('td');
      tr.appendChild(td);
      input = document.createElement('input');
      input.type = 'text';
      input.size = 1;
      td.appendChild(input);
    }
  }
  document.querySelector('input[value=Solve]')
    .addEventListener('click', test);
}

sudokuTable();