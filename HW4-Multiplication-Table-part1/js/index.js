/*Daniel Bergeron
daniel_bergeron1@student.uml.edu
source: Class notes, Jquery links in directions*/


jQuery.validator.setDefaults({
    debug: true,
    success: "valid"
});
// validation form
$(document).ready(function () {
        $( "#inputForm" ).validate({
            errorPlacement: function(label, element) {
            label.addClass('error-msg');
            label.insertAfter(element);
            },
            unhighlight: function(element, errorClass, validClass) {
                $(element).siblings('.error-msg').remove();
            },
            
        rules: {
            input1: {
                required: true,
                number: true,
                range: [-200, 200]
            },

            input2: {
                required: true,
                number: true,
                range: [-200, 200]
            },

            input3: {
                required: true,
                number: true,
                range: [-200, 200]
            },

            input4: {
                required: true,
                number: true,
                range: [-200, 200]
            }
        }
    });
    // Automatically submit the form when all fields are valid
    $("#inputForm input").on("input", function () {
        if ($("#inputForm").valid()) {
            // Form is valid, submit it
             // clear any error messeages
            // clear table
            clearTable();
            createTable();
            // Uncomment the line below if you want to perform a traditional form submission
            // $("#inputForm").submit();
        } else {
            clearTable();
        }
    });
    
});
function createTable() {

    // get rows 
    var input1 = document.getElementById('input1');
    input1.style.backgroundColor = "#fff";
    var input2 = document.getElementById('input2');
    input2.style.backgroundColor = "#fff";

    // columns 
    var input3 = document.getElementById('input3');
    input3.style.backgroundColor = "#fff";
    var input4 = document.getElementById('input4');
    input4.style.backgroundColor = "#fff";
    
    // decide who is max and who is min for row and col
    var maxRow = 0;
    var minRow = 0;
    if (parseInt(input1.value, 10) >= parseInt(input2.value, 10)) {
        maxRow = parseInt(input1.value, 10);
        minRow = parseInt(input2.value, 10);
    } else {
        maxRow = parseInt(input2.value, 10);
        minRow = parseInt(input1.value, 10);
    }
    
    var maxCol = 0;
    var minCol = 0;
    if (parseInt(input3.value, 10) >= parseInt(input4.value, 10)) {
        maxCol = input3.value;
        minCol = input4.value;
    } else {
        maxCol = input4.value;
        minCol = input3.value;
    }
   
    // seperate row an column amounts from the values for the table
    var totalRows = parseInt(maxRow,10) - parseInt(minRow, 10);
    var totalCols = parseInt(maxCol,10) - parseInt(minCol, 10);

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
    for (var i = 0; i <= parseInt(totalCols + 1, 10); i++) {
        var th = document.createElement("th");
        if (i > 0) {
            th.textContent = (parseInt(i, 10) + parseInt(minCol, 10) - 1);
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
        // add row
        row = document.createElement("tr");
        tableBody.appendChild(row);

        // add th to begining of each row
        th = document.createElement("th");
        th.textContent = parseInt(i, 10) + parseInt(minRow, 10) - 1;
        th.classList.add("cell");
        th.style.position = "sticky";
        th.style.left = "0";
        row.appendChild(th);
        
        for(var j = 1; j <= totalCols+1; j++) {
            // console.log("Row: " + i + "Cell: " + j);
            // (0,0) location
            cell = document.createElement("td");
            // (n,0) row  
            // everything else, perfrom multiplcation, and style based on even or odd values
            var value = (parseInt(j,10) + parseInt(minCol, 10) - 1) * (parseInt(minRow, 10) + parseInt(i, 10) - 1);
            
            cell.textContent = (value);
            if (j % 2 === 0){
                cell.classList.add("evenCell");
            } else {
                cell.classList.add("oddCell");
            }
            row.appendChild(cell);
             
        }
    }
}

function clearTable() {
    // destroy all nodes found under mult-table
    var node = document.getElementById("mult-table");
    node.querySelectorAll('*').forEach(n => n.remove());
}


