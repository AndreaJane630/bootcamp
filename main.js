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
// I need to keep track of where we are in the form, each time submit button hit
// I could check the value of the span element with i.d. = "page", but I think that this is better?

let formPageTop = document.getElementById('page').innerHTML;
let formPageBot = document.getElementById('page-bot').innerHTML;
 	
 	
function validate(form) {	
	let privPolicy = document.getElementById('privacy');
	document.getElementById('submit-bot').disabled = true;
	let errmsg = document.getElementById('error');
	errmsg.innerHTML = "";
	errmsg.style.visibility = "hidden";
	
	if (formPageTop == 1) {
		
		fail  = validateForename(form.firstName.value);
		fail += validateSurname(form.lastName.value);

		if   (fail == "") {
		  
		  document.getElementById('email').style.visibility = "visible";
		  document.getElementById('names').style.visibility = "hidden";
		  document.getElementById('page').innerHTML = 2;		  
		  formPageTop++;
		  return false;
		}
		else {
			document.getElementById('submit-bot').disabled = false;
			showErrMsg(fail,errmsg);	
			return false;
		}
	}
	else if (formPageTop == 2) {
	
		fail = validateEmail(form.email.value);
		
		if (fail == "") {
		   formPageTop++;
		   document.getElementById('phone').style.visibility = "visible";
		   document.getElementById('email').style.visibility = "hidden";
		   document.getElementById('page').innerHTML = 3;
		   privPolicy.classList.toggle("show");
		   return false;
		}
	    else {
			showErrMsg(fail,errmsg);	
			document.getElementById('submit-bot').disabled = false;
			return false;
		}
	}
	else if (formPageTop == 3) {
		
		fail = validatePhone(form.phoneOne.value,
			form.phoneTwo.value, form.phoneThree.value);
			
		//fail = validatePhone(form.phone.value);
		if (fail == "") {
			return true;
		   //alert("Your are done!");
		  // return false;    temp - should return trueso that form gets subitted
		}
	    else {
			showErrMsg(fail,errmsg);	
			document.getElementById('submit-bot').disabled = false;
			return false;
		}
	}
}
function validate_two(form) {
	let privPolicy = document.getElementById('privacy-bot');
	document.getElementById('submit-top').disabled = true;
	let errmsg = document.getElementById('error-bot');
	errmsg.innerHTML = "";
	errmsg.style.visibility = "hidden";
	
	if (formPageBot == 1) {
		
		fail  = validateForename(form.firstName.value);
		fail += validateSurname(form.lastName.value);

		if   (fail == "") {
		  document.getElementById('email-bot').style.visibility = "visible";
		  document.getElementById('names-bot').style.visibility = "hidden";
		  document.getElementById('page-bot').innerHTML = 2;
		  formPageBot++;
		  return false;
		 }
		else {
			showErrMsg(fail,errmsg);	
			document.getElementById('submit-top').disabled = false;
			return false;
		}
	}
	else if (formPageBot == 2) {
		
		fail = validateEmail(form.email.value);
		
		if (fail == "") {
		   formPageBot++;
		   document.getElementById('phone-bot').style.visibility = "visible";
		   document.getElementById('email-bot').style.visibility = "hidden";
		   document.getElementById('page-bot').innerHTML = 3;
		   privPolicy.classList.toggle("show");
		   return false;
		}
	    else {
			showErrMsg(fail,errmsg);	
			document.getElementById('submit-top').disabled = false;
			return false;
		}
	}
	else if (formPageBot == 3) {
		fail = validatePhone(form.phoneOne.value,
			form.phoneTwo.value, form.phoneThree.value);
			
		//fail = validatePhone(form.phone.value);
		
		if (fail == "") {
			return true;
		 //  alert("You are done!");
		 //  return false;    temp - should return trueso that form gets subitted
		}
		else {
			showErrMsg(fail,errmsg);	
			document.getElementById('submit-bot').disabled = false;
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
	
/*function validatePhone(field)
  {
	if (field == "") { 
		return "Please enter a phone number.\n";
	}
	else {
	  var phonenoPlain = /^\d{10}$/;
  	  var phonenoFancy = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
	  
      if (field.match(phonenoPlain) || field.match(phonenoFancy)) {
		  return "";
	  }
	  else {
         return "Invalid phone number format; Do this: 212-123-1234.\n";
	  }
	}
}*/
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