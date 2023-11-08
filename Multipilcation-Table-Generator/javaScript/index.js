function createTable() {

    // clear any error messeages
    // clear table
    clearTable();
    clearError();

    // get rows and columns from input and check if valid
    var minRow = document.getElementById('min-row');
    minRow.style.backgroundColor = "#fff";
    var maxCol = document.getElementById('max-col');
    maxCol.style.backgroundColor = "#fff";
    var maxRow = document.getElementById('max-row');
    maxRow.style.backgroundColor = "#fff";
    var minCol = document.getElementById('min-col');
    minCol.style.backgroundColor = "#fff";
    

    

    if(checkInput(minRow, maxRow, minCol, maxCol) > 0) {
        clearInput();
        return;
    }
    // seperate row an column amounts from the values for the table
    var totalRows = (maxRow.value) - (minRow.value);
    var totalCols = (maxCol.value) - (minCol.value);
    console.log(totalCols);

    //create first row and column
    var table; 
    var cell;
    var row;

    table = document.getElementById("mult-table");
    var thead;

    thead = document.createElement("thead");
    table.appendChild(thead);

    var headerRow = document.createElement("tr");
    table.appendChild(headerRow);

    // fill top of table
    for (var i = 0; i <= totalCols + 1; i++) {
        var th = document.createElement("th");
        if (i > 0) {
            th.textContent = (parseInt(i, 10) + parseInt(minRow.value,10) - 1);
            th.classList.add("cell");
            th.style.position = "sticky";
            th.style.top = "0";
            headerRow.appendChild(th);
        } else {
            th.textContent = " ";
            headerRow.appendChild(th);
        }
    }

    var tableBody = document.createElement("tbody");
    table.appendChild(tableBody);
    // fill the rows with cells
    for(var i = 1; i <= totalRows+1; i++){
        row = document.createElement("tr");
        tableBody.appendChild(row);
        th = document.createElement("th");
        th.textContent = parseInt(i, 10) + parseInt(minCol.value, 10) - 1;
        th.classList.add("cell");
        th.style.position = "sticky";
        th.style.left = "0";
        row.appendChild(th);
        
        for(var j = 1; j <= totalCols+1; j++) {
            console.log("Row: " + i + "Cell: " + j);
            // (0,0) location
            cell = document.createElement("td");
            // (n,0) row  
            // everything else, perfrom multiplcation, and style based on even or odd values
            var value = (parseInt(j,10) + parseInt(minCol.value, 10) - 1) * (parseInt(minRow.value, 10) + parseInt(i, 10) - 1);
            cell.textContent = (value);
            if (j % 2 === 0){
                cell.classList.add("evenCell");
            } else {
                cell.classList.add("oddCell");
            }
            row.appendChild(cell);
             
        }
    }
    clearInput();
}

function checkInput(minRow, maxRow, minCol, maxCol) {
    var inputErrors = 0;
    
    if (minRow.value === "") {
        errorMessage("Invalid input for minimum row.\n", minRow);
        inputErrors++;
    }
    
    if (parseInt(minRow.value, 10) > 200 || parseInt(minRow.value, 10) < -200) {
        errorMessage("Invalid: min row can't be greater than 200 or less than -200", minRow);
        inputErrors++;
    } 

    console.log("MaxRow: " + maxRow.value);
    if(maxRow.value === "" || parseInt(maxRow.value, 10) < parseInt(minRow.value, 10) ) {
        errorMessage("Invalid input for max row.", maxRow);
        inputErrors++;
    }
    
    if (parseInt(maxRow.value,10) > 200 || parseInt(maxRow.value,10) < -200) {
        errorMessage("Invalid: max row can't be greater than 200 or less than -200", maxRow);
        inputErrors++;
    }

    console.log("MinRow: " + parseInt(minRow,10));
    if (minCol.value === "") {
        errorMessage("Invalid input for minimum column.\n", minCol);
        inputErrors++;
    }
    
    if (parseInt(minCol.value, 10) > 200 || parseInt(minCol.value, 10) < -200) {
        errorMessage("Invalid: min column can't be greater than 200 or less than -200", minCol);
        inputErrors++;
    } 

    if(maxCol.value === "" || parseInt(maxCol.value, 10) < parseInt(minCol.value, 10)) {
        errorMessage("Invalid input for max column.\n", maxCol);
        inputErrors++;
    }
    
    if (parseInt(maxCol.value,10) > 200 || parseInt(maxCol.value,10) < -200) {
        errorMessage("Invalid: max column can't be greater than 200 or less than -200", maxCol);
        inputErrors++;
    }

    return inputErrors;
}

function clearTable() {
    // destroy all nodes found under mult-table
    var node = document.getElementById("mult-table");
    node.querySelectorAll('*').forEach(n => n.remove());
}

function clearError() {
    
    // remove everything associated with invalid-Input
    var error = document.getElementById("invalid-Input");
    if(error.children.length > 0) {
        error.innerHTML = "";
        error.classList.remove("error-msg");   
    } else {
        console.log("No input errors to be found");
    }
}

function clearInput() {
    // replace text with empty characters
    var item = document.getElementById('max-col');
    item.value = "";
    item = document.getElementById('min-row');
    item.value = "";
    item = document.getElementById('max-row');
    item.value = "";
    item = document.getElementById('min-col');
    item.value = "";
}

function errorMessage(error, inputBox) {
    // given a messaage generate an error message under the invalid-Input
    const para = document.createElement("p");
    const node = document.createTextNode(error);
    para.appendChild(node);
    const element = document.getElementById("invalid-Input");
    element.appendChild(para); 
    element.classList.add("error-msg");

    // highlight input box
    inputBox.style.backgroundColor = "yellow";
}

// give callback method and event to the listener
// code is executed upon press of button with .btn ID
document.querySelector(".btn").addEventListener("click", createTable);