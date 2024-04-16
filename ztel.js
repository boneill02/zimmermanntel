const alphabetNumbers = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
var outputDivElement = document.getElementById("output");
var outputElement = document.getElementById("outputDisplay");
var axisElement = document.getElementById("axis");
var gridElement = document.getElementById("grid");
var inputElement = document.getElementById("input");

String.prototype.replaceAll = function(search, replacement) {
	return this.replace(new RegExp(search, 'g'), replacement);
};

String.prototype.shuffle = function () {
	var a = this.split(""),
		n = a.length;

	for(var i = n - 1; i > 0; i--) {
		var j = Math.floor(Math.random() * (i + 1));
		var tmp = a[i];
		a[i] = a[j];
		a[j] = tmp;
	}
	return a.join("");
}


function generateGrid() {
	return alphabetNumbers.shuffle();
}

function generateAxis() {
	return alphabetNumbers.shuffle().substring(0, 6);
}

function encrypt(axis, grid, message) {
	grid = grid.toUpperCase();
	axis = axis.toUpperCase();
	var encryptedMessage = "";

	if(grid.length !== 36) {
		return "Sorry, but your message could not be encrypted because the " +
		"grid length was not thirty-six characters.";
	}
	if(axis.length !== 6) {
		return "Sorry, but your message could not be encrypted because the " +
		"axis value was not six characters.";
	}

	message = message.replaceAll(/\W/g, "X").toUpperCase();

	for(i = 0; i < message.length; i++) {
		for(j = 0; j < 36; j++) {
			if(grid.charAt((Math.floor(j / 6) * 6) + (j % 6))
				=== message.charAt(i)) {
					encryptedMessage += axis.charAt(Math.floor(j / 6))
						+ axis.charAt(j % 6);
			}
		}
	}

	var tempMessage = encryptedMessage;
	return encryptedMessage;
}

function decrypt(axis, grid, message) {
	grid = grid.toUpperCase();
	axis = axis.toUpperCase();

	if(grid.length !== 36) {
		return "Sorry, but your message could not be decrypted because the " +
		"grid length was not thirty-six characters.";
	}
	if(axis.length !== 6) {
		return "Sorry, but your message could not be decrypted because the " +
		"axis value was not six characters.";
	}

	message = message.replaceAll(" ", "").toUpperCase().replace(/\W/g, "");

	var decryptedMessage = "";
	for(i = 0; i < message.length; i = i + 2) {
		for(j = 0; j < 36; j++) {
			if("" + axis.charAt(Math.floor(j / 6)) + axis.charAt(j -
				(Math.floor(j / 6) * 6)) ===
					message.substring(i, i + 2).toUpperCase()) {
						decryptedMessage += grid.substring(j, j + 1);
			}
		}
	}
	return decryptedMessage;
}

function encryptFromDoc() {
	output.innerHTML = encrypt(axisElement.value, gridElement.value,
			inputElement.value);
	outputDivElement.style.display = "block";
}

function decryptFromDoc() {
	output.innerHTML = decrypt(axisElement.value, gridElement.value,
			inputElement.value);
	outputDivElement.style.display = "block";
}

axisElement.value = generateAxis();
gridElement.value = generateGrid();

outputDivElement.style.display = "none";
