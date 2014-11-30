// JavaScript Document
function validateForm() {
	
	//Putting the form values into variables to make it a little easier to read in the if statements
    var fname = document.getElementById("fname").value;
    var lname = document.getElementById("lname").value;
    var email = document.getElementById("email").value;
    var message = document.getElementById("message").value;
    var radY = document.getElementById("radY").checked;
    var radN = document.getElementById("radN").checked;
	
	
    if (fname == "") {
        document.getElementById("fname").style.border = "solid 1px red";
        return false;
    } else if (lname == "") {
        document.getElementById("lname").style.border = "solid 1px red";
        return false;
    } else if (email == "") {
        document.getElementById("email").style.border = "solid 1px red";
        return false;
    } else if (!radY && !radN) {
        document.getElementById("joinrad").style.border = "solid 1px red";
        return false;
    } else if (message == "") {
        document.getElementById("message").style.border = "solid 1px red";
        return false;
    }  else {
        alert("Thank you for contacting us, we will get back to you as soon as possible");
        return true;
    }
}