
/*
****************************************************************
 Dana Jamous - SWE645 - HW1
External javaScript file: contains the javascript function to validate the Raffle
****************************************************************
*/


function validateRaffle(data) {
	
  document.getElementById("wrongEntry").innerHTML = "";
  input = data.replace(/\s/g, '');
  if (input.length === 0) {
    return; // Do nothing if the input is empty
  }
  
  
  var numbers = input.split(',');
  if (numbers.length != 10) {		
	document.getElementById("wrongEntry").innerHTML = "Please enter exactly 10 numbers comma separated numbers";
    return;
  }
  
  for (var i = 0; i < numbers.length; i++) {
    var number = parseInt(numbers[i]);
    if (isNaN(number)) {
	  document.getElementById("wrongEntry").innerHTML = "Only number allowed, please enter 10 comma separated numbers";
      return;
    }
    
    if (number < 1 || number > 100) {
	 document.getElementById("wrongEntry").innerHTML = "Numbers should be in the range 1-100";
      return;
    }
  }
}


