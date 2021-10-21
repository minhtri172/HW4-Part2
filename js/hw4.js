/*
    File: hw4.js
    GUI Assigment: Using the jQuery Plugin/UI with Your Dynamic Table - PART 2: jQuery UI Slider and Tab Widgets
    Minh Le, Umass Lowell Computer Science, minhtri_le@student.uml.edu
    Copyright (C) 2021 by Minh Le. 
    Updated by ML on October 20, 2021 at 7:00pm
*/

$(document).ready(function ($) {
    // Hide remove part
    $("#removed").hide();
    $("#myTabs").hide();

    // Select square values from sliders
    // Reference from :https://jqueryui.com/slider/#custom-handle
    var handleFCol = $("#custom-handle-fCol");
    var handleECol = $("#custom-handle-eCol");
    var handleFRow = $("#custom-handle-fRow");
    var handleERow = $("#custom-handle-eRow");

    // Slider for start column
    $("#fColSlider").slider({
        min: -50,
        max: 50,
        create: function () {
            handleFCol.text($(this).slider("value"));
        },
        slide: function (event, ui) {
            $("#fCol").val(ui.value); // get value from slider and set it to fCol input
            handleFCol.text(ui.value); // get value from slider and set it to square box in slider
            updateTable(); // update the table
        }
    });

    // Display value from input to slider
    $("#fCol").keyup(function () {
        var fCol = $("#fCol").val(); // get first column value
        if (fCol >= -50 && fCol <= 50) { // measure the box values in the slider is in the range[-50, 50]
            $("#fColSlider").slider("value", fCol); // set value from textbox to slider
            handleFCol.text(fCol); // set value to the box values in the slider
            updateTable(); // update the table
        }
    });

    // Same thing for 3 values left
    // Slider for end column
    $("#eColSlider").slider({
        min: -50,
        max: 50,
        create: function () {
            handleECol.text($(this).slider("value"));
        },
        slide: function (event, ui) {
            $("#eCol").val(ui.value);
            handleECol.text(ui.value);
            updateTable();
        }
    });

    // Display value from input to slider
    $("#eCol").keyup(function () {
        var eCol = $("#eCol").val();
        if (eCol >= -50 && eCol <= 50) {
            $("#eColSlider").slider("value", eCol);
            handleECol.text(eCol);
            updateTable();
        }
    });

    // Slider for start row
    $("#fRowSlider").slider({
        min: -50,
        max: 50,
        create: function () {
            handleFRow.text($(this).slider("value"));
        },
        slide: function (event, ui) {
            $("#fRow").val(ui.value);
            handleFRow.text(ui.value);
            updateTable();
        }
    });

    // Display value from input to slider
    $("#fRow").keyup(function () {
        var fRow = $("#fRow").val();
        if (fRow >= -50 && fRow <= 50) {
            $("#fRowSlider").slider("value", fRow);
            handleFRow.text(fRow);
            updateTable();
        }
    });

    // Slider for end row
    $("#eRowSlider").slider({
        min: -50,
        max: 50,
        create: function () {
            handleERow.text($(this).slider("value"));
        },
        slide: function (event, ui) {
            $("#eRow").val(ui.value);
            handleERow.text(ui.value);
            updateTable();
        }
    });

    // Display value from input to slider
    $("#eRow").keyup(function () {
        var eRow = $("#eRow").val();
        if (eRow >= -50 && eRow <= 50) {
            $("#eRowSlider").slider("value", eRow);
            handleERow.text(eRow);
            updateTable();
        }
    });

    // Add new method to validation
    // Measure the input is an integer
    $.validator.addMethod("integerNumber", function (value, element) {
        return Number.isInteger(Number(value));
    }, "Please enter an integer number.");

    // Validation form create table
    // Re-used part-1
    $("#createTableForm").validate({
        rules: {
            fCol: {
                required: true,
                number: true,
                range: [-50, 50],
                integerNumber: true
            },
            eCol: {
                required: true,
                number: true,
                range: [-50, 50],
                integerNumber: true
            },
            fRow: {
                required: true,
                number: true,
                range: [-50, 50],
                integerNumber: true
            },
            eRow: {
                required: true,
                number: true,
                range: [-50, 50],
                integerNumber: true
            }
        },
        messages: {
            fCol: {
                required: "Please enter a start column number.",
                number: "Please enter a number.",
                range: "Please enter a number between -50 and 50."
            },
            eCol: {
                required: "Please enter a end column number.",
                number: "Please enter a number.",
                range: "Please enter a number between -50 and 50."
            },
            fRow: {
                required: "Please enter a start row number.",
                number: "Please enter a number.",
                range: "Please enter a number between -50 and 50."
            },
            eRow: {
                required: "Please enter a end row number.",
                number: "Please enter a number.",
                range: "Please enter a number between -50 and 50."
            }
        }
    });

    // This variable uses to create tabs
    // It must be global to measure
    // There is no mess up index, if a user deletes tab
    var NUM_TABS = 1; // index of each tabs

    // Button generate (Create Table)
    $("#btnGen").click(function () {
        // Display tab
        // Reference from: https://stackoverflow.com/questions/300078/jquery-ui-tabs-how-to-get-currently-selected-tab-index
        // Reference from: https://stackoverflow.com/questions/4864620/how-to-use-jquery-to-select-a-dropdown-option
        $("#myTabs").tabs({
            // This function will be called, if the tab is active
            activate: function (event, ui) {
                // Get values from tab (value from tag <a>) and set them back to the form
                var data = $(".ui-state-active a").text();
                //console.log(data);

                // Check if the data is null or not
                if (data != "") {
                    var currentTab = $("#myTabs").tabs("option", "active"); // get index of current tab
                    //console.log(currentTab);

                    // Set selected for <select>
                    var numOfOptions = $("#tabs option").length; // number of <option> in <select>
                    //console.log(numOfOptions);

                    var i;
                    // This code measure display true for one option and false for the rest
                    for (i = 0; i < numOfOptions; i++) {
                        // If i equal to currentTab, set True to option; otherwise, set False to option
                        if (i == currentTab) {
                            $("option:eq(" + i + ")").prop("selected", true);
                        } else {
                            $("option:eq(" + i + ")").prop("selected", false);
                        }
                    }

                    // https://stackoverflow.com/questions/1862130/strip-all-non-numeric-characters-from-string-in-javascript
                    // Remove non-numeric
                    data = data.replace(/[^\d .-]/g, '');
                    //console.log(data);
                    values = data.split(" "); // split by space
                    //console.log(values);
                    
                    // After I debug the value "values", I saw the index of 4 values is 1, 2, 4, and 5
                    var fCol = values[1]; // first column
                    var eCol = values[2]; // end column
                    var fRow = values[4]; // first row
                    var eRow = values[5]; // end row

                    // Set values to inputs
                    $("#fCol").val(fCol);
                    $("#eCol").val(eCol);
                    $("#fRow").val(fRow);
                    $("#eRow").val(eRow);

                    // Set values to sliders
                    $("#fColSlider").slider("option", "value", fCol);
                    handleFCol.text(fCol);
                    $("#eColSlider").slider("option", "value", eCol);
                    handleECol.text(eCol);
                    $("#fRowSlider").slider("option", "value", fRow);
                    handleFRow.text(fRow);
                    $("#eRowSlider").slider("option", "value", eRow);
                    handleERow.text(eRow);
                }
            }
        });

        // Close icon: removing the tab on click
        // Reference from: https://jqueryui.com/tabs/#manipulation
        $("#myTabs").tabs().on("click", "span.ui-icon-close", function () {
            var panelId = $(this).closest("li").remove().attr("aria-controls");
            //console.log(panelId);
            var index = panelId.split("-");
            index = index[1]; // index of the tab

            // Remove the tab
            $("#" + panelId).remove();

            // remove values on select tag
            $("#tabs option[value='" + index + "']").remove();
            $("#myTabs").tabs("refresh");
        });

        // Check if the form is valid
        var formValid = $("#createTableForm").valid();

        if (formValid) {
            // If form valid, display control part
            $("#removed").show();
            $("#myTabs").show();

            // Get data from inputs
            var fCol = $("#fCol").val();
            var eCol = $("#eCol").val();
            var fRow = $("#fRow").val();
            var eRow = $("#eRow").val();

            // Setup to create multiple tabs
            // Create li
            $("#myTabs .ui-tabs-nav").append(
                "<li><a href='#tab-" + NUM_TABS + "'>" + "Columns: [" + fCol + ", " + eCol + "]"
                + ", Rows: [" + fRow + ", " + eRow + "]" +
                "</a><span class='ui-icon ui-icon-close' role='presentation'>Remove Tab</span></li>"
            );

            // Create div.tab
            $("#myTabs").append("<div id='tab-" + NUM_TABS + "'></div>");
            // refresh after adding new items
            $("#myTabs").tabs("refresh");

            // Create checkboxes
            $("#tabs").append("<option value='" + NUM_TABS + "'>" + "Columns: [" + fCol + ", " + eCol + "]"
                + ", Rows: [" + fRow + ", " + eRow + "]" + "</option>");


            // Check if the data not null
            if (fCol != "" && eCol != "" && fRow != "" && eRow != "") {

                // convert string to numbers
                fCol = parseInt(fCol);
                eCol = parseInt(eCol);
                fRow = parseInt(fRow);
                eRow = parseInt(eRow);

                // Create the table
                createTable(fCol, eCol, fRow, eRow, -1);
                
                // Active a tab
                var tab = $(".ui-tabs-nav li").length;
                //console.log(tab); 
                $("#myTabs").tabs({
                    active: (tab - 1)
                });
                NUM_TABS++;
            }
        }
    });

    // Remove tabs
    $("#btnRemove").click(function () {
        var indexTabs = $("#tabs").val(); // index of tab (it can be a value or an array)
        //console.log(indexTabs);
        var i;

        for (i = 0; i < indexTabs.length; i++) {
            var valueIndexTab = parseInt(indexTabs[i]); // Get index of tab
            $("#myTabs").find(".ui-tabs-nav li[aria-labelledby='ui-id-" + valueIndexTab + "']").remove(); // find tab and remove
            $("#tabs option[value='" + valueIndexTab + "']").remove(); // remove it from select tag
            $("#tab-" + indexTabs[i]).remove(); // remove tab that contains the table
            $("#myTabs").tabs("refresh"); // refresh the tab after remove it
        }

        // if there is no data on select tag
        if ($("#tabs option").length == 0) {
            // hide remove part
            $("#removed").hide();
            $("#myTabs").hide();

            // Remove values from the form
            $("#fCol").val([]);
            $("#eCol").val([]);
            $("#fRow").val([]);
            $("#eRow").val([]);

            handleFCol.text("0");
            handleECol.text("0");
            handleFRow.text("0");
            handleERow.text("0");

            $("#fColSlider").slider("option", "value", 0);
            $("#eColSlider").slider("option", "value", 0);
            $("#fRowSlider").slider("option", "value", 0);
            $("#eRowSlider").slider("option", "value", 0);
        }
    });

    // Update values when select a <option>
    $("#tabs").change(function (e) {
        // Note: tab index from the select maybe different from tab index from the tabs
        // This is because the user can delete any tab, so it messes up the serial of index
        var tabIndex = $("#tabs").val(); // get index of tab from the select tag
        var posTab = e.target.selectedIndex;; // get index of tab from the tabs

        //console.log(tabIndex);
        //console.log(posTab);
        // If there is value from select tag
        if (tabIndex.length == 1) {
            var data = $("option[value='" + tabIndex + "']").html(); // get data from the option
            var values = [];

            // Set a tab is active if the user select a option from the select tag
            $("#myTabs").tabs({
                active: posTab
            });

            // https://stackoverflow.com/questions/1862130/strip-all-non-numeric-characters-from-string-in-javascript
            // Remove non-numeric
            data = data.replace(/[^\d .-]/g, '');
            //console.log(data);
            values = data.split(" ");
            //console.log(values);
            var fCol = values[1];
            var eCol = values[2];
            var fRow = values[4];
            var eRow = values[5];

            // Set values to inputs
            $("#fCol").val(fCol);
            $("#eCol").val(eCol);
            $("#fRow").val(fRow);
            $("#eRow").val(eRow);   

            // Set values to sliders
            $("#fColSlider").slider("option", "value", fCol);
            handleFCol.text(fCol);
            $("#eColSlider").slider("option", "value", eCol);
            handleECol.text(eCol);
            $("#fRowSlider").slider("option", "value", fRow);
            handleFRow.text(fRow);
            $("#eRowSlider").slider("option", "value", eRow);
            handleERow.text(eRow);
        }
    });

    // unselect a option
    $("#btnUnselected").click(function () {
        // https://stackoverflow.com/questions/39245967/how-to-unselect-options-in-select-using-jquery/39246137
        $("option").prop("selected", false)
        for (var i = 0; i < 2; i++) {
            $("#myTabs").tabs({
                active: false,
                collapsible: true
            });
        }

        $("#fCol").val([]);
        $("#eCol").val([]);
        $("#fRow").val([]);
        $("#eRow").val([]);

        handleFCol.text("0");
        handleECol.text("0");
        handleFRow.text("0");
        handleERow.text("0");

        $("#fColSlider").slider("option", "value", 0);
        $("#eColSlider").slider("option", "value", 0);
        $("#fRowSlider").slider("option", "value", 0);
        $("#eRowSlider").slider("option", "value", 0);
    });

    // Update table
    function updateTable() {
        // Delete error message
        if ($("#update-error").length != 0) {
            $("#update-error").remove();
        }

        // Update table
        var tabIndex = $("#tabs").val(); // get the tab index from the select tag
        //console.log("option value:" + tabIndex);

        // check if the tab is activated
        var activated = $(".ui-tabs-nav li[aria-selected='true']");
        //console.log(activated);

        // activated != 0 means the tabs is active
        if (activated.length != 0) {
            if (tabIndex.length <= 1) {
                // Check if the form is valid
                var formValid = $("#createTableForm").valid();

                if (tabIndex == "" && formValid) {
                    var id = $(".ui-tabs-nav li[aria-selected='true'] a").attr("id"); // get id of the tab
                    //console.log(id);
                    if (id != null) {
                        var tabId = id.split("-"); // split by "-" to get the id (ui-id-*)
                        tabId = tabId[2]; // get the tab index
                        tabIndex = tabId;
                    }
                }

                if (formValid) {
                    // Get data from inputs
                    var fCol = $("#fCol").val();
                    var eCol = $("#eCol").val();
                    var fRow = $("#fRow").val();
                    var eRow = $("#eRow").val();

                    // Check if the data not null
                    if (fCol != "" && eCol != "" && fRow != "" && eRow != "" && tabIndex != "") {
                        // convert string to numbers
                        fCol = parseInt(fCol);
                        eCol = parseInt(eCol);
                        fRow = parseInt(fRow);
                        eRow = parseInt(eRow);

                        // Update tab display
                        $("a#ui-id-" + tabIndex).html(
                            "Columns: [" + fCol + ", " + eCol + "]" + ", Rows: [" + fRow + ", " + eRow + "]"
                        );

                        // Update select tag
                        $("option[value='" + tabIndex + "']").html(
                            "Columns: [" + fCol + ", " + eCol + "]" + ", Rows: [" + fRow + ", " + eRow + "]"
                        );

                        // Create the table
                        //console.log(tabIndex);
                        createTable(fCol, eCol, fRow, eRow, tabIndex);
                    }
                }
            } else {
                // Display error when user choose multiple tabs to update
                $("#removed").append("<p id='update-error'>Please choose only one tab to update the table.</p>");
            }
        }
    }

    // Create the table
    // Re-used from part-1
    function createTable(x1, x2, y1, y2, update) {

        //console.log("inside create table\n");
        //console.log(x1);
        //console.log(x2);
        //console.log(y1);
        //console.log(y2);
        //console.log(NUM_TABS);
        // Create containers

        // Update == -1 means create table, != -1 means update the table
        if (update != -1) {
            var temp = NUM_TABS; // save tab index
            NUM_TABS = update; // set update tab index from the selection
        }

        $("#tab-" + NUM_TABS).append("<div id='container" + NUM_TABS + "'></div>");

        // Adding css to containers
        $("#container" + NUM_TABS).css({
            "margin-top": "50px",
            "overflow": "auto",
            "max-width": "772px",
            "max-height": "341px",
            "margin": "10px auto 10px auto"
        });

        // Delete table
        if ($("#myTable" + NUM_TABS).length != 0) {
            $("#myTable" + NUM_TABS).remove();
        }

        // Create multiple tables
        $("#container" + NUM_TABS).append("<table id='myTable" + NUM_TABS + "'></table>")

        // create rows
        var i, j, tr_index;
        tr_index = 0; // index of the TR

        // Check if start > end
        if (x1 > x2 && y1 > y2) { // end col < start col and end row < start row
            for (i = y1; i >= y2 - 1; i--) {
                if (i == y1) {
                    // First row (Top Header)
                    //console.log(NUM_TABS);
                    $("#myTable" + NUM_TABS).append("<tr></tr>");

                    // Create the first TD (detail)
                    $("#myTable" + NUM_TABS + " tr").eq(tr_index).append("<td></td>");

                    // Create other TD on the first row
                    for (j = x1; j >= x2; j--) {
                        $("#myTable" + NUM_TABS + " tr").eq(tr_index).append("<td>" + j + "</td>");
                    }
                    tr_index++;
                } else {
                    // rows 2nd and more
                    $("#myTable" + NUM_TABS).append("<tr></tr>");

                    // Left Header
                    $("#myTable" + NUM_TABS + " tr").eq(tr_index).append("<td>" + (i + 1) + "</td>");

                    // Create other next TD (columns)
                    for (j = x1; j >= x2; j--) {
                        $("#myTable" + NUM_TABS + " tr").eq(tr_index).append("<td>" + (i + 1) * j + "</td>");
                    }
                    tr_index++;
                }
            }
        } else if (x1 > x2 && y1 <= y2) { // start col > end col and start row <= end row
            for (i = y1; i <= y2 + 1; i++) {
                if (i == y1) {
                    // First row (Top Header)
                    $("#myTable" + NUM_TABS).append("<tr></tr>");

                    // Create the first TD (detail)
                    $("#myTable" + NUM_TABS + " tr").eq(tr_index).append("<td></td>");

                    // Create other TD on the first row
                    for (j = x1; j >= x2; j--) {
                        $("#myTable" + NUM_TABS + " tr").eq(tr_index).append("<td>" + j + "</td>");
                    }
                    tr_index++;
                } else {
                    // rows 2nd and more
                    $("#myTable" + NUM_TABS).append("<tr></tr>");

                    // Left Header
                    $("#myTable" + NUM_TABS + " tr").eq(tr_index).append("<td>" + (i - 1) + "</td>");

                    // Create other next TD (columns)
                    for (j = x1; j >= x2; j--) {
                        $("#myTable" + NUM_TABS + " tr").eq(tr_index).append("<td>" + (i - 1) * j + "</td>");
                    }
                    tr_index++;
                }
            }
        } else if (x1 <= x2 && y1 > y2) { // start col <= end col and start row > end row
            for (i = y1; i >= y2 - 1; i--) {
                if (i == y1) {
                    // First row (Top Header)
                    $("#myTable" + NUM_TABS).append("<tr></tr>");

                    // Create the first TD (detail)
                    $("#myTable" + NUM_TABS + " tr").eq(tr_index).append("<td></td>");

                    // Create other TD on the first row
                    for (j = x1; j <= x2; j++) {
                        $("#myTable" + NUM_TABS + " tr").eq(tr_index).append("<td>" + j + "</td>");
                    }
                    tr_index++;
                } else {
                    // rows 2nd and more
                    $("#myTable" + NUM_TABS).append("<tr></tr>");

                    // Left Header
                    $("#myTable" + NUM_TABS + " tr").eq(tr_index).append("<td>" + (i + 1) + "</td>");

                    // Create other next TD (columns)
                    for (j = x1; j <= x2; j++) {
                        $("#myTable" + NUM_TABS + " tr").eq(tr_index).append("<td>" + (i + 1) * j + "</td>");
                    }
                    tr_index++;
                }
            }
        } else { // start col <= end col and start row <= end row
            for (i = y1; i <= y2 + 1; i++) {
                if (i == y1) {
                    // First row (Top Header)
                    $("#myTable" + NUM_TABS).append("<tr></tr>");

                    // Create the first TD (detail)
                    $("#myTable" + NUM_TABS + " tr").eq(tr_index).append("<td></td>");

                    // Create other TD on the first row
                    for (j = x1; j <= x2; j++) {
                        $("#myTable" + NUM_TABS + " tr").eq(tr_index).append("<td>" + j + "</td>");
                    }
                    tr_index++;
                } else {
                    // rows 2nd and more
                    $("#myTable" + NUM_TABS).append("<tr></tr>");

                    // Left Header
                    $("#myTable" + NUM_TABS + " tr").eq(tr_index).append("<td>" + (i - 1) + "</td>");

                    // Create other next TD
                    for (j = x1; j <= x2; j++) {
                        $("#myTable" + NUM_TABS + " tr").eq(tr_index).append("<td>" + (i - 1) * j + "</td>");
                    }
                    tr_index++;
                }
            }
        }

        // After update, set back the old index tab value to NUM_TABS
        // This measures we dont mess up the tab index after update the table
        if (update != -1) {
            NUM_TABS = temp;
        }
    }
});