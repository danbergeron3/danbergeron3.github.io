/*Daniel Bergeron
daniel_bergeron1@student.uml.edu
source: Class notes, Jquery links in directions*/

var tableIdNum = 1;

jQuery.validator.setDefaults({
  debug: true,
  success: "valid"
  });
$(document).ready(function () {

      // add default values
      $("#input1").val(0); 
      $("#input2").val(0); 
      $("#input3").val(0); 
      $("#input4").val(0); 

      // validate form
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
              required: false,
              number: true,
              range: [-100, 100]
          },

          input2: {
              required: false,
              number: true,
              range: [-100, 100]
          },

          input3: {
              required: false,
              number: true,
              range: [-100, 100]
          },

          input4: {
              required: false,
              number: true,
              range: [-100, 100]
          }
      }
  });

  // Automatically submit the form when all fields are valid
  // this section is also for the syncs of slider and input
  $("#inputForm input").on("input", function () {
    // Synchronize input1 with slider1
    $("#input1").on("input", function () {
      if($('#input1').valid()) {
        var inputValue = parseInt($(this).val()) || 0;
        if(inputValue > 100 || inputValue < -100) {
          return;
        }

        $("#slider1").slider("value", inputValue);
        clearTable();
        createTable(inputValue, 
          $('#slider2').slider("option", "value"), 
          $('#slider3').slider("option", "value"), 
          $('#slider4').slider("option", "value"));
        }
    });

  // Synchronize input2 with slider2
  $("#input2").on("input", function () {
    if($('#input2').valid()) {
      var inputValue = parseInt($(this).val()) || 0;
      if(inputValue > 100 || inputValue < -100) {
        return;
      }
      $("#slider2").slider("value", inputValue);

      clearTable();
      createTable($('#slider1').slider("option", "value"), 
        inputValue, 
        $('#slider3').slider("option", "value"), 
        $('#slider4').slider("option", "value"));
      }
  });

  // Synchronize input3 with slider3
  $("#input3").on("input", function () {
    if($('#input1').valid()) {
      var inputValue = parseInt($(this).val()) || 0;
      if(inputValue > 100 || inputValue < -100) {
        return;
      }
      $("#slider3").slider("value", inputValue);
      
      clearTable();
      createTable($('#slider1').slider("option", "value"), 
        $('#slider2').slider("option", "value"), 
        inputValue, 
        $('#slider4').slider("option", "value"));
    }
  });

  // Synchronize input4 with slider4
  $("#input4").on("input", function () {
    if($('#input1').valid()) {
      var inputValue = parseInt($(this).val()) || 0;
      if(inputValue > 100 || inputValue < -100) {
        return;
      }
      $("#slider4").slider("value", inputValue);
      
      clearTable();
      createTable($('#slider1').slider("option", "value"), 
        $('#slider2').slider("option", "value"), 
        $('#slider3').slider("option", "value"), 
        inputValue);
    }
  });
  });
  
});

// callback for the sliders
$(function() {

    // Initialize the slider
    $("#slider1").slider({
      min: -100,
      max: 100,
      value: 0, // Initial value
      step: 1,
      slide: function(event, ui) {

        // Update the value display
        $("#slider1-value").text(ui.value);
        $("#input1").val(ui.value);

        // create table 
        clearTable();
        createTable(ui.value, 
            $('#slider2').slider("option", "value"), 
            $('#slider3').slider("option", "value"),
            $('#slider4').slider("option", "value"));
      }
    });
  });

  $(function() {
    // Initialize the slider
    $("#slider2").slider({
      min: -100,
      max: 100,
      value: 0, // Initial value
      
      slide: function(event, ui) {
        // Update the value display
        $("#slider2-value").text(ui.value);
        $("#input2").val(ui.value);

        // create table 
        clearTable();
        createTable($('#slider1').slider("option", "value"), 
            ui.value, 
            $('#slider3').slider("option", "value"),
            $('#slider4').slider("option", "value"));
      }
    });
  });

  $(function() {
    // Initialize the slider
    $("#slider3").slider({
      min: -100,
      max: 100,
      value: 0, // Initial value
      slide: function(event, ui) {
        // Update the value display
        $("#slider3-value").text(ui.value);
        $("#input3").val(ui.value);
        // create table 
        clearTable();
        createTable($('#slider1').slider("option", "value"), 
            $('#slider2').slider("option", "value"), 
            ui.value,
            $('#slider4').slider("option", "value"));
      }
    });
  });

  $(function() {
    // Initialize the slider
    $("#slider4").slider({
      min: -100,
      max: 100,
      value: 0, // Initial value
      slide: function(event, ui) {
        // Update the value display
        $("#slider4-value").text(ui.value);
        $("#input4").val(ui.value);
        // create table 
        clearTable();
        createTable($('#slider1').slider("option", "value"), 
            $('#slider2').slider("option", "value"), 
            $('#slider3').slider("option", "value"), 
            ui.value);
      }
    });
  });

  $( function() {
    $( "#tabs" ).tabs();
  } );
  
  $(document).ready(function() {
        let tabNum = 0;

        // tab limit 
        $(".btn").on("click", function() {
        // This function will be executed when the button is clicked
        if ($("#tabs").find("li").length > 6) {
          return;
        }
        console.log("Button clicked!");

        // reveal remvoe button 
        $(".btn-2").show("inline-block");
        $(".hidden").show("inline-block");
        $(".tab-container").show("inline");
        // Add tab
        tabNum = tabNum + 1;
        addTab("tabs" + tabNum, "Table-" + tabNum,  $("#mult-table").clone());
        });

         // Event handler for close button
        $("#tab-nav").on("click", ".ui-icon-close", function () {
          var tabId = $(this).closest("li").remove().attr("aria-controls");
          $("#" + tabId).remove();
         
          if ($("#tabs").find("li").length < 2) {
            $(".btn-2").hide();
          }
          $("#tabs").tabs("refresh");
        });

        // Event handler for remove selected tabs button
        $("#remove-selected").on("click", function () {
          $("#tab-nav input[type=checkbox]:checked").each(function () {
            removeTab($(this).closest("li"));
          });
        });

        $("#btn-2").on("click", function () {
          console.log("remove clicked!");
          $("#tab-nav input[type=checkbox]:checked").each(function () {
            removeTab($(this).closest("li"));
          });

          if ($("#tabs").find("li").length < 2) {
            $(".btn-2").hide();
          }
        });
    });

function addTab(tabId, tabTitle, tabContent) {
    
    // Add a new tab to the tab navigation
    //$("#tab-nav").append('<li><a href="#' + tabId + '">' + tabTitle + '</a></li>');
    $("#tab-nav").append(
      '<li><input type="checkbox">' +
        '<a href="#' +
        tabId +
        '">' +
        tabTitle +
        '</a><span class="ui-icon ui-icon-close" role="presentation">Remove Tab</span></li>'
    );
    // Add the corresponding tab content
    $("#" + tabId).empty();

    $("#tabs").append('<div id="' + tabId + '">'+ '</div>');
    $("#" + tabId).append(tabContent); // Append the cloned table
    // Refresh the tabs widget to update the changes

    // Apply CSS styles to make the tab content scrollable
    $("#" + tabId).css({
      'height': '70vh',
      'max-height': '70vh',
      'overflow-x': 'scroll',
      'overflow-y': 'scroll'
    });

    $("#tabs").tabs("refresh"); 

  }

  function removeTab(tabElement) {
    var tabId = tabElement.remove().attr("aria-controls");
    $("#" + tabId).remove();
    $("#tabs").tabs("refresh");
  }

function createTable(input1, input2, input3, input4) {
    
    // decide who is max and who is min for row and col
    var maxRow = 0;
    var minRow = 0;
    if (parseInt(input1, 10) >= parseInt(input2, 10)) {
        maxRow = input1;
        minRow = input2;
    } else {
        maxRow = input2;
        minRow = input1;
    }
    
    var maxCol = 0;
    var minCol = 0;
    if (parseInt(input3, 10) >= parseInt(input4, 10)) {
        maxCol = input3;
        minCol = input4;
    } else {
        maxCol = input4;
        minCol = input3;
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
    var div = document.createElement("div");

    tableIdNum++;
    div.id = "myDiv" + tableIdNum.toString();
    table.appendChild(div);

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
       
        // add a row
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
