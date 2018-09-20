var inputList = document.querySelectorAll('.textfield');
var arrayOfNames = [];
var arrayOfPlaceHolders = [];

// load arrays: of name of input field and its initial placeholder text 

for (i = 0; i < inputList.length; i++) {
	arrayOfNames.push(inputList[i].name);
	arrayOfPlaceHolders.push(inputList[i].placeholder);
}

function clearPlaceHolder(input) {
				
	if (input.placeholder == arrayOfPlaceHolders[arrayOfNames.indexOf(input.name)]) {
		input.placeholder = '';
	}
}

function resetPlaceHolder(input) {
	if (input.placeholder == '') {
		input.placeholder = arrayOfPlaceHolders[arrayOfNames.indexOf(input.name)];
	}
}

// attach event listeners to all form input type="text" elements with class name "textfield"

for (i = 0; i < inputList.length; i++) {
	
	inputList[i].addEventListener('focus', function() {
		clearPlaceHolder(this);
		});
	inputList[i].addEventListener('blur', function() {
		resetPlaceHolder(this);
		});
}
 /* This function validates either form on the page - the num parameter
 is used so that correct elements in nodelists are accessed since I am
using classes, not ids. The loc parameter is used to indicate which sub-
mit button to disable. Originally, I had 2 functions and numerous ids and
 I did not like that solution. Too much code duplication. Having 2 identical
forms on the page presents some difficulties.*/
  
function validate(form,num,loc) {	

	let formPage = document.querySelectorAll('.page')[num];
	let email = document.querySelectorAll('.email')[num];
	let names = document.querySelectorAll('.names')[num];
	let phone = document.querySelectorAll('.phone')[num];
	let phoneOne = document.querySelectorAll('.phone input:first-of-type')[num];
	let privPolicy = document.querySelectorAll('.privacy')[num];
	let subm = document.querySelectorAll('.subm')[loc].disabled = true;
	let subcurr = document.querySelectorAll('.subm')[num];
	let errmsg = document.querySelectorAll('.error')[num];
	errmsg.innerHTML = "";
	errmsg.style.visibility = "hidden";
	
	if (formPage.innerHTML == 1) {
		
		fail  = validateForename(form.firstName.value);
		fail += validateSurname(form.lastName.value);

		if   (fail == "") {
		  
		  email.style.visibility = "visible";
		  names.style.visibility = "hidden";
		  formPage.innerHTML = 2;		  
		  
		  return false;
		}
		else {
			subm.disabled = false;
			showErrMsg(fail,errmsg);	
			return false;
		}
	}
	else if (formPage.innerHTML == 2) {
	
		fail = validateEmail(form.email.value);
		
		if (fail == "") {
		   
		   phone.style.visibility = "visible";
		   phoneOne.focus();
		   email.style.visibility = "hidden";
		   formPage.innerHTML = 3;
		   subcurr.value = "Submit";
		   privPolicy.style.display = "flex";
		   return false;
		}
	    else {
			showErrMsg(fail,errmsg);	
			subm.disabled = false;
			return false;
		}
	}
	else if (formPage.innerHTML == 3) {
		
		fail = validatePhone(form.phoneOne.value,
			   form.phoneTwo.value, form.phoneThree.value);
			
		if (fail == "") {
			return true;
		   //alert("Your are done!");
		  // return false;    temp - should return trueso that form gets subitted
		}
	    else {
			showErrMsg(fail,errmsg);	
			subm.disabled = false;
			return false;
		}
	}
}

function validateForename(field){
return (field == "") ? "No Forename was entered.\n" : ""
}

function validateSurname(field)
{
return (field == "") ? "No Surname was entered.\n" : ""
}

function validateEmail(field)
  {
	if (field == "") {
		return "No Email was entered.\n";
	}
	else {
		let emailGood = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
		if (field.match(emailGood)) {
			return "";
		}
		else {
			return "You have entered an invalid email address!";
		}
	}
  }
	
function showErrMsg(fail,errmsg) {
	
	errmsg.innerHTML = fail;
	errmsg.style.visibility = "visible";
}

 let elburger = document.getElementById('burger');
 let eloverlay = document.getElementById('overlay');
		 
 elburger.addEventListener('click', function() {
	//this.classList.toggle("change"); 
	eloverlay.classList.toggle("show");
	
});