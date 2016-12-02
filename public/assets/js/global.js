
//Function to check if the passwords entered match
function bothPasswordsMatch() {

    var isMatch = false;

    if ($("#newPassword").val() === $("#passwordAgain").val()) {
        isMatch = true;
    }
    return isMatch;
}