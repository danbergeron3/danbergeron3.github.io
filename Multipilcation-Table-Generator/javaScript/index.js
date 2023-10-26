function createTable() {
    // clear any error messeages
    // clear table
    clearTable();
    clearError();
    // minRow, maxRow, minCol, maxCol
    // get rows and columns from input and check if valid
    var minRow = document.getElementById('min-row').value;
    console.log("MinRow: " + parseInt(minRow,10));
    if (parseInt(minRow,10) === "") {
        errorMessage("Invalid input for minimum row.");
        clearInput();
        return;
    }
    var maxRow = document.getElementById('max-row').value;
    console.log("MaxRow: " + maxRow);
    if(parseInt(maxRow, 10) < parseInt(minRow, 10)|| parseInt(maxRow,10) === "") {
        errorMessage("Invalid input for max row.");
        clearInput();
        return;
    }
    var minCol = document.getElementById('min-col').value;
    if (parseInt(minCol,10) === "") {
        errorMessage("Invalid input for minimum column.");
        clearInput();
        return;
    }
    var maxCol = document.getElementById('max-col').value;
    if(parseInt(maxCol, 10) < parseInt(minCol, 10) || parseInt(maxCol,10) === "") {
        errorMessage("Invalid input for max column.");
        clearInput();
        return;
    }
    
    // seperate row an column amounts from the values for the table

    var totalRows = maxRow - minRow;
    var totalCols = maxCol - minCol;
    console.log(totalCols);
    //create first row and column

    var table; 
    var cell;
    // fill the rows with cells
    for(var i = 0; i <= totalRows + 1; i++){
        table = document.getElementById("mult-table").insertRow(i);
        for(var j = 0; j <= totalCols + 1; j++) {
            // 0 spot
            cell = table.insertCell(j);
            if(i === 0 && j === 0) {
                cell.innerHTML = " ";
                cell.classList.add("null-cell");
            }
            // top bar
            else if (i === 0 && j > 0) {
                cell.innerHTML = parseInt(j, 10) + parseInt(minCol, 10) - 1;
                cell.classList.add("cell");
                
            }
            // side bar 
            else if (j === 0 && i > 0){ 

                cell.innerHTML = parseInt(i, 10) + parseInt(minRow,10) - 1;
                cell.classList.add("cell");
            } 
            // everything else
            else {
                var value = (parseInt(j,10) + parseInt(minCol, 10) - 1) * (parseInt(minRow, 10) + parseInt(i, 10) - 1);
                cell.innerHTML = value;
                if (j % 2 === 0){
                    cell.classList.add("evenCell");
                } else {
                    cell.classList.add("oddCell");
                }
            }   
        }
    }
    // Select the table element
    table = document.getElementById("mult-table");

    // Loop through the rows and add a CSS class to each row
    for (var i = 0; i < table.rows.length; i++) {
        table.rows[i].classList.add(".row");
    }
    
    clearInput();
}

function clearTable() {
    var node = document.getElementById("mult-table");
    node.querySelectorAll('*').forEach(n => n.remove());
}

function clearError() {

    var error = document.getElementById("invalid-Input");
    if(error.children.length > 0) {
        error.innerHTML = "";
        error.classList.remove("error-msg");   
    } else {
        console.log("No input errors to be found");
    }
}

function clearInput() {
    var item = document.getElementById('max-col');
    item.value = "";
    item = document.getElementById('min-row');
    item.value = "";
    item = document.getElementById('max-row');
    item.value = "";
    item = document.getElementById('min-col');
    item.value = "";
}

function errorMessage(error) {
    const para = document.createElement("p");
    const node = document.createTextNode(error);
    para.appendChild(node);
    const element = document.getElementById("invalid-Input");
    element.appendChild(para); 
    element.classList.add("error-msg");
}
document.querySelector(".btn").addEventListener("click", createTable);
 
 