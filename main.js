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
function autotab(current,to) {
	if (current.getAttribute && current.value.length==current.getAttribute("maxlength")) {
		to.focus() 
	   }
	}
 /* This function validates either form on the page - the num parameter
 is used so that correct elements in nodelists are accessed since I am
using classes, not ids. The loc parameter is used to indicate which sub-
mit button to disable. Originally, I had 2 functions and numerous ids and
 I did not like that solution. Too much code duplication. Having 2 identical
forms on the page presents some difficulties/challenges.*/
  
function validate(form,num,loc) {	

	let formPage = document.querySelectorAll('.page')[num];
	let email = document.querySelectorAll('.email')[num];
	let names = document.querySelectorAll('.names')[num];
	let phone = document.querySelectorAll('.phone')[num];
	let phoneOne = document.querySelectorAll('.phone input:first-of-type')[num];
	let privPolicy = document.querySelectorAll('.privacy')[num];
	//get the submit button of the "other" form - remember there are 2
	let subm = document.querySelectorAll('.subm')[loc];
	
	let subcurr = document.querySelectorAll('.subm')[num]; // get the submit button for this form (remember there are 2)
	let errmsg = document.querySelectorAll('.error')[num];
	
	errmsg.innerHTML = "";
	errmsg.style.visibility = "hidden";
	subm.disabled = true; // disable the other submit button while this form is being validated
	
	if (formPage.innerHTML == 1) {
		
		fail  = validateForename(form.firstName.value);
		fail += validateSurname(form.lastName.value);

		if   (fail == "") {
		  
		  email.style.visibility = "visible";
		  names.style.visibility = "hidden";
		  formPage.innerHTML = 2;		  
		//  return false;
		}
		else {
			subm.disabled = false;
			showErrMsg(fail,errmsg);	
		//	return false;
		}
	}
	else if (formPage.innerHTML == 2) {
	
		fail = validateEmail(form.email.value);
		
		if (fail == "") {
		   
		   phone.style.visibility = "visible";
		   phoneOne.focus();
		   email.style.visibility = "hidden";
		   formPage.innerHTML = 3;
		   subcurr.value = "Submit"; // change what it says, from "Continue" to "submit"
		   privPolicy.style.display = "flex";
		 //  return false;
		}
	    else {
			showErrMsg(fail,errmsg);	
			subm.disabled = false;
		//	return false;
		}
	}
	else if (formPage.innerHTML == 3) {
		
		fail = validatePhone(form.phoneOne.value,
			   form.phoneTwo.value, form.phoneThree.value);
			
		if (fail == "") {
		//	return true;
		   //alert("Your are done!");
		  // return false;    temp - should return trueso that form gets subitted
		  form.submit();
		}
	    else {
			showErrMsg(fail,errmsg);	
			subm.disabled = false;
		//	return false;
		}
	}
}
// Modified so that names cannot be a string of spaces, which was possible before (but no good!)

function validateForename(field){
//return (field == "") ? "No Forename was entered.\n" : ""
  return (field.replace(/\s+/g,"") == "") ? "No Forename was entered.\n" : ""
}

function validateSurname(field)
{
//return (field == "") ? "No Surname was entered.\n" : ""
  return (field.replace(/\s+/g,"") == "") ? "No Surname was entered.\n" : ""
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
function validatePhone(field1, field2, field3) {
  
	if (field1 == "" || field2 == "" || field3 == "") { 
		return "All 3 fields are required";
	}
	else {
	
	//Concatenate the 3 input fields:
	  var phoneConcat = field1 + field2 + field3;
	
	  var phonenoPlain = /^\d{10}$/;
	  //var phonenoFancy = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
	  
	  if (phoneConcat.match(phonenoPlain)) {
		  return "";
	  }
	  else {
		 return "Invalid phone number format; Do this: 212-123-1234.\n";
	  }
	}
}	
function showErrMsg(fail,errmsg) {
	
	errmsg.innerHTML = fail;
	errmsg.style.visibility = "visible";
}
// 10/24/18 - there are 2 identical forms, top and bottom of page to make it a better UX? 
// Since there are only 2, I think it's ok to use ids to access them rather than the form collection object

let formTop = document.getElementById('formTop');
let buttonTop = document.getElementById('buttonTop');
let formBot = document.getElementById('formBot');
let buttonBot = document.getElementById('buttonBot');
	// pass the index for the classes used for each form since querySelectorAll is used
	// pass the "opposing" button index so that it is disabled while current form is being validated
	
	buttonTop.addEventListener('click', function () {validate(formTop,0,1);});		
		
	buttonBot.addEventListener('click', function () {validate(formBot,1,0);});
	
 let elburger = document.getElementById('burger');
 let eloverlay = document.getElementById('overlay');
		 
 elburger.addEventListener('click', function() {
	//this.classList.toggle("change"); 
	eloverlay.classList.toggle("show");
	
});

// Get all "outerlist" li elements in the FAQ section
		// Get all innerlists (the uls) - they belong to the outer list
		
let faqListItems = document.querySelectorAll('.faqItem');  // should I use this way or className ?
//let faqListItems = document.getElementsByClassName('faqItem');
let faqAnswers = document.querySelectorAll('.innerList');
//let faqAnswers = document.getElementsByClassName('innerList');

for (i = 0; i < faqListItems.length; i++) {

let faqArrow = faqListItems[i].firstChild; // grab i tag to see arrow position, or should I collect all of them in an array too?
let theAnswer = faqAnswers[i];

faqListItems[i].addEventListener('click', function() { //add listener to each faq list item
				
	if (faqArrow.classList.contains("fa-arrow-circle-right")) { // if pointing right, means user wants to see answer
		for (j=0; j < faqListItems.length; j++) { // need to find out if another faq answer was previously displayed
			let currentArrow = faqListItems[j].firstChild;
			if (currentArrow.classList.contains("fa-arrow-circle-down")) { // answer is displayed for this faq
				currentArrow.classList.remove("fa-arrow-circle-down"); 
				currentArrow.classList.add("fa-arrow-circle-right"); // go back to default arrow right
				faqAnswers[j].style.display = "none"; // no more answer displayed
				break; // get out of this loop - there can only be one answer displayed at one time
			} // end of if
		} // end of for loop
		faqArrow.classList.remove("fa-arrow-circle-right");
		faqArrow.classList.add("fa-arrow-circle-down"); // change to down arrow
		theAnswer.style.display = "block"; // display the answer
	} // end of if when arrow pointing right
	else { // the li was previously clicked and answer displayed, so now undisplay it in response to user's click
		faqArrow.classList.remove("fa-arrow-circle-down");
		faqArrow.classList.add("fa-arrow-circle-right"); // put back the right
		theAnswer.style.display = "none";
	} 
});
} // end of loop to add EVL to each li in FAQ list