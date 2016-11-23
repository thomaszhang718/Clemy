//------------------------------------- Login Function -------------------------------------//
function loginFunc(username, password) {

    console.log("login func");

    // grab data from form
    var data = {
            username: username,
            password: password
        }
        console.log(data)
        // grab url to ajax call
    var currentURL = window.location.origin + "/login";

    // post our login data
    $.post(currentURL, data, function(results) {
        console.log("THIS IS THE RESULTS: " + results);

/*        if (results === "fail") {
            $('#invalidUserOrPassModal').modal();
        } else if (results.type === "admin") {
            console.log("You are an admin");
            window.location.replace(window.location.origin + results.path);
        } else if (results.type === "user") {
            console.log("you're user!");
            window.location.replace(window.location.origin + results.path);
        }*/

    });
};

//------------------------------------- Create Account Functions -------------------------------------//

function createAccount() {

    console.log("createAccount func")

    // jQuery AJAX call for JSON data of notes
    $.ajax({
        type: "POST",
        dataType: "json",
        url: '/createUser',
        data: {
            firstName: $('#firstName').val().trim(),
            lastName: $('#lastName').val().trim(),
            username: $('#newUsername').val().trim(),
            password: $('#newPassword').val().trim(),
            email: $('#newEmail').val().trim(),
            accountType: "user",
            createDate: Date.now()
        }
    })

    // with that done, post the current Notes to the page
    .done(function(response) {

        console.log("we are here")
        console.log(response);




        loginFunc(response.username, response.password);
    })

    // if something went wrong, tell the user
    .fail(function() {
        console.log("Sorry. Server unavailable.");
    });

}

//Function to check if the passwords entered match
function bothPasswordsMatch() {

    var isMatch = false;

    if ($("#newPassword").val() === $("#passwordAgain").val()) {
        isMatch = true;
    }
    return isMatch;
}