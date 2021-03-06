/**
 * Created by Anthony on 2/2/2017.
 */
// Main Javascript File

function updateTable() {
    // Here's where your code is going to go.
    var url = "/api/name_list_get";

    $.getJSON(url, null, function(json_result) {
            // json_result is an object. You can set a breakpoint, or print
            // it to see the fields. Specifically, it is an array of objects.
            // Here we loop the array and print the first name.
            for (var i = 0; i < json_result.length; i++) {
                myPhone = json_result[i].phone.substring(0,3) + "-" + json_result[i].phone.substring(4,6) + "-" + json_result[i].phone.substring(7,10)
                $("#datatable tbody").append("<tr><td>"
                    +json_result[i].id+"</td><td>"
                    +json_result[i].first+"</td><td>"
                    +json_result[i].last+"</td><td>"
                    +json_result[i].phone+"</td><td>"
                    +json_result[i].email+"</td><td>"
                    +json_result[i].birthday+"</td><td>"
                    +"<button type='button' name='delete' class='deleteButton btn' value='" + json_result[i].id + "'>Delete</button></td><td>"
                    +"<button type='button' name='edit' class='editButton btn' value='" + json_result[i].id + "'>Edit</button></td></tr>");
            }
            var buttons = $(".deleteButton");
        buttons.on("click", deleteItem);
        console.log("Deleted");
            var buttons = $(".editButton");
        buttons.on("click", editItem);
        console.log("Edited");
        }
    );
}

// Call your code.
updateTable();


function editItem(e) {
    console.debug("Edit");
    console.debug(e.target.value);

    // Print that we got here
    console.log("Opening edit item dialog");
    // Grab the id from the event
    var id = e.target.value;

// This next line is fun.
// "e" is the event of the mouse click
// "e.target" is what the user clicked on. The button in this case.
// "e.target.parentNode" is the node that holds the button. In this case, the table cell.
// "e.target.parentNode.parentNode" is the parent of the table cell. In this case, the table row.
// "e.target.parentNode.parentNode.querySelectorAll("td")" gets an array of all matching table cells in the row
// "e.target.parentNode.parentNode.querySelectorAll("td")[0]" is the first cell. (You can grab cells 0, 1, 2, etc.)
// "e.target.parentNode.parentNode.querySelectorAll("td")[0].innerHTML" is content of that cell. Like "Sam" for example.
// How did I find this long chain? Just by setting a breakpoint and using the interactive shell in my browser.

    var firstName = e.target.parentNode.parentNode.querySelectorAll("td")[1].innerHTML;
    var lastName = e.target.parentNode.parentNode.querySelectorAll("td")[2].innerHTML;
    var phone_number = e.target.parentNode.parentNode.querySelectorAll("td")[3].innerHTML;
    var email = e.target.parentNode.parentNode.querySelectorAll("td")[4].innerHTML;
    var birthday = e.target.parentNode.parentNode.querySelectorAll("td")[5].innerHTML;


    // Clear out the values in the form.
    // Otherwise we'll keep values from when we last
    // opened or hit edit.
    // I'm getting it started, you can finish.
    $('#id').val(id);
    $('#firstName').val(firstName);
    $('#lastName').val(lastName);
    $('#phone_number').val(phone_number);
    $('#email').val(email);
    $('#birthday').val(birthday);
    $('#firstNameDiv').removeClass("has-success");
    $('#firstNameGlyph').removeClass("glyphicon-ok");
    $('#firstNameDiv').removeClass("has-error");
    $('#firstNameGlyph').removeClass("glyphicon-remove");
    $('#lastNameDiv').removeClass("has-success");
    $('#lastNameGlyph').removeClass("glyphicon-ok");
    $('#lastNameDiv').removeClass("has-error");
    $('#lastNameGlyph').removeClass("glyphicon-remove");
    $('#emailDiv').removeClass("has-success");
    $('#emailGlyph').removeClass("glyphicon-ok");
    $('#emailDiv').removeClass("has-error");
    $('#emailGlyph').removeClass("glyphicon-remove");
    $('#phone_numberDiv').removeClass("has-success");
    $('#phone_numberGlyph').removeClass("glyphicon-ok");
    $('#phone_numberDiv').removeClass("has-error");
    $('#phone_numberGlyph').removeClass("glyphicon-remove");
    $('#birthdayDiv').removeClass("has-success");
    $('#birthdayGlyph').removeClass("glyphicon-ok");
    $('#birthdayDiv').removeClass("has-error");
    $('#birthdayGlyph').removeClass("glyphicon-remove");
    // Show the hidden dialog
    $('#myModal').modal('show');
}

function deleteItem(e) {


    updateTable()
    var url = "/api/name_list_delete";
    var id = e.target.value;
    var dataToServer = {id: id};

    $.post(url, dataToServer, function (dataFromServer) {
        console.log("Finished calling servlet.");
        console.log(dataFromServer);
        $("#datatable tbody").empty();
        updateTable();
        })
    console.debug("Delete");
    console.debug(e.target.value);
}


// There's a button in the form with the ID "addItem"
// Associate the function showDialogAdd with it.
var addItemButton = $('#addItem');
addItemButton.on("click", showDialogAdd);

// Called when "Add Item" button is clicked
function showDialogAdd() {

    // Print that we got here
    console.log("Opening add item dialog");

    // Clear out the values in the form.
    // Otherwise we'll keep values from when we last
    // opened or hit edit.
    // I'm getting it started, you can finish.
    $('#id').val("");
    $('#firstName').val("");
    $('#lastName').val("");
    $('#phone_number').val("");
    $('#email').val("");
    $('#birthday').val("");
    $('#firstNameDiv').removeClass("has-success");
    $('#firstNameGlyph').removeClass("glyphicon-ok");
    $('#firstNameDiv').removeClass("has-error");
    $('#firstNameGlyph').removeClass("glyphicon-remove");
    $('#lastNameDiv').removeClass("has-success");
    $('#lastNameGlyph').removeClass("glyphicon-ok");
    $('#lastNameDiv').removeClass("has-error");
    $('#lastNameGlyph').removeClass("glyphicon-remove");
    $('#emailDiv').removeClass("has-success");
    $('#emailGlyph').removeClass("glyphicon-ok");
    $('#emailDiv').removeClass("has-error");
    $('#emailGlyph').removeClass("glyphicon-remove");
    $('#phone_numberDiv').removeClass("has-success");
    $('#phone_numberGlyph').removeClass("glyphicon-ok");
    $('#phone_numberDiv').removeClass("has-error");
    $('#phone_numberGlyph').removeClass("glyphicon-remove");
    $('#birthdayDiv').removeClass("has-success");
    $('#birthdayGlyph').removeClass("glyphicon-ok");
    $('#birthdayDiv').removeClass("has-error");
    $('#birthdayGlyph').removeClass("glyphicon-remove");
    // Show the hidden dialog
    $('#myModal').modal('show');
}

var addItemButton = $('#addItem');
addItemButton.on("click", showDialogAdd);

function saveChanges() {
    console.log("Working");

}


// Function to validate
function validateFunction() {
    // Get the field
    var firstName = $('#firstName').val();
    var lastName = $('#lastName').val();
    var email = $('#email').val();
    var phone_number = $('#phone_number').val();
    var birthday = $('#birthday').val();

    // Create the regular expression
        var name = /^[A-Za-z]{1,20}$/;
        var email_check = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        var phone = /^[0-9]{3}-[0-9]{3}-[0-9]{4}$/;
        var birthday_check = /^[0-9]{4}-[0-9]{2}-[0-9]{2}/;
        var validForm = true;
    // Test the regular expression to see if there is a match
    if (name.test(firstName)) {
        console.log("Ok");
        // Set style for outline of form field
        $('#firstNameDiv').removeClass("has-success");
        $('#firstNameDiv').addClass("has-success");
        // Set the icon for the form field
        $('#firstNameGlyph').removeClass("glyphicon-ok");
        $('#firstNameGlyph').addClass("glyphicon-ok");
        // Put in the field used by screen readers
        $('firstNameStatus').val("(success)");
    } else {
        console.log("Bad");
        $('#firstNameDiv').removeClass("has-error");
        $('#firstNameDiv').addClass("has-error");
        // Set the icon for the form field
        $('#firstNameGlyph').removeClass("glyphicon-remove");
        $('#firstNameGlyph').addClass("glyphicon-remove");
        validForm = false;

        $('firstNameStatus').val("(error)");
    }

    if (name.test(lastName)) {
        console.log("Ok");
        $('#lastNameDiv').removeClass("has-success");
        $('#lastNameDiv').addClass("has-success");

        $('#lastNameGlyph').removeClass("glyphicon-ok");
        $('#lastNameGlyph').addClass("glyphicon-ok");

        $('lastNameStatus').val("(success)");
    } else {
        console.log("Bad");
        $('#lastNameDiv').removeClass("has-error");
        $('#lastNameDiv').addClass("has-error");
        // Set the icon for the form field
        $('#lastNameGlyph').removeClass("glyphicon-remove");
        $('#lastNameGlyph').addClass("glyphicon-remove");
        validForm = false;
        $('lastNameStatus').val("(error)");
    }
    if (email_check.test(email)) {
        console.log("Ok");
        $('#emailDiv').removeClass("has-success");
        $('#emailDiv').addClass("has-success");
        // Set the icon for the form field
        $('#emailGlyph').removeClass("glyphicon-ok");
        $('#emailGlyph').addClass("glyphicon-ok");
        // Put in the field used by screen readers
        $('emailStatus').val("(success)");
    } else {
        console.log("Bad");
        $('#emailDiv').removeClass("has-error");
        $('#emailDiv').addClass("has-error");
        // Set the icon for the form field
        $('#emailGlyph').removeClass("glyphicon-remove");
        $('#emailGlyph').addClass("glyphicon-remove");
        validForm = false
        $('emailStatus').val("(error)");
    }
    if (phone.test(phone_number)) {
        console.log("Ok");
        $('#phone_numberDiv').removeClass("has-success");
        $('#phone_numberDiv').addClass("has-success");
        // Set the icon for the form field
        $('#phone_numberGlyph').removeClass("glyphicon-ok");
        $('#phone_numberGlyph').addClass("glyphicon-ok");
        // Put in the field used by screen readers
        $('phoneStatus').val("(success)");
    } else {
        console.log("Bad");
        $('#phone_numberDiv').removeClass("has-error");
        $('#phone_numberDiv').addClass("has-error");
        // Set the icon for the form field
        $('#phone_numberGlyph').removeClass("glyphicon-remove");
        $('#phone_numberGlyph').addClass("glyphicon-remove");
        validForm = false
        $('phoneStatus').val("(error)");
    }
    if (birthday_check.test(birthday)) {
        console.log("ok");
        $('#birthdayDiv').removeClass("has-success");
        $('#birthdayDiv').addClass("has-success");
        // Set the icon for the form field
        $('#birthdayGlyph').removeClass("glyphicon-ok");
        $('#birthdayGlyph').addClass("glyphicon-ok");
        // Put in the field used by screen readers
        $('birthdayStatus').val("(success)");
    } else {
        console.log("Bad" + birthday);
        $('#birthdayDiv').removeClass("has-error");
        $('#birthdayDiv').addClass("has-error");
        // Set the icon for the form field
        $('#birthdayGlyphGlyph').removeClass("glyphicon-remove");
        $('#birthdayGlyph').addClass("glyphicon-remove");
        validForm = false
        $('firstNameStatus').val("(error)");

    }
    if (validForm) {
        console.log("valid")
        updateTable()
        var url = "/api/name_list_edit";
        var id = $("#id").val();
        var firstName = $("#firstName").val();
        var lastName = $("#lastName").val();
        var email = $("#email").val();
        var phone_number = $("#phone_number").val();
        var birthday = $("#birthday").val();
        var dataToServer = {
            id: id,
            firstName: firstName,
            lastName: lastName,
            email: email,
            phone_number: phone_number,
            birthday: birthday

        };
        $('#myModal').modal('hide');

        $.post(url, dataToServer, function (dataFromServer) {
            console.log("Finished calling servlet.");
            console.log(dataFromServer);
            $("#datatable tbody").empty();
            updateTable();


        });
    }
}


var saveChangesButton = $('#saveChanges');
saveChangesButton.on("click", saveChanges);
saveChangesButton.on("click", validateFunction);





