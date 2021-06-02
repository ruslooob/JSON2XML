/// variables 

// textAreas
let textAreas = docGetAll('.section__textarea');
let leftTextArea = textAreas[0];
let rightTextArea = textAreas[1];

// buttons
let convertButton = docGet('.convert-button');
let browseButton = docGet('.browse-button');
let loadUriButton = docGet('load-uri-button');
let beautifyJsonButton = docGet('.beautyfi-json-button');
let beautifyXMLButton = docGet('.beautyfi-xml-button');
let minifyJsonButton = docGet('.minify-json-button');
let minifyXmlButton = docGet('.minify-xml-button');

let clearButton = docGet('.clear-button');
// other vars 
let leftTextAreaText;
let RightTextAreaText;




/// functions

function getTextFromLeftTextArea() {
	leftTextAreaText = leftTextArea.value;
}

function minifyJSON() {
	leftTextArea.value = leftTextArea.value.replace(/\s{2,}/g, ' ');
}

function clearTextAreas() {
	leftTextArea.value = '';
	rightTextArea.value = '';
}

function docGet(selector) {
	return document.querySelector(selector);
}

function docGetAll(selector) {
	return document.querySelectorAll(selector);
}


/// listeners

convertButton.addEventListener('click', getTextFromLeftTextArea);
clearButton.addEventListener('click', clearTextAreas);
minifyJsonButton.addEventListener('click', minifyJSON);
