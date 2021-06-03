/// variables 

// textAreas
let textAreas = docGetAll('.section__textarea');
let leftTextArea = textAreas[0];
let rightTextArea = textAreas[1];

// buttons
let convertButton = docGet('.convert-button');
let browseButton = docGet('.browse-button');
let loadUriButton = docGet('load-uri-button');
let beautifyJsonButton = docGet('.beautify-json-button');
let beautifyXMLButton = docGet('.beautify-xml-button');
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



function json2xml() {
	let convert = require('xml-js');
	console.log(convert);
	let json = JSON.parse(leftTextArea.value);
	let options = { compact: true, ignoreComment: true, spaces: 4 };
	let result = convert.json2xml(json, options);
	rightTextArea.value = result;
}


function minifyJSON() {
	let json = JSON.parse(leftTextArea.value);
	let jsonObject = JSON.stringify(json, null, 0);
	leftTextArea.value = jsonObject;
	console.log('minifyJSON');
}

function minifyXML() {
	let xmlParser = new DOMParser();
	let xmlDoc = xmlParser.parseFromString(rightTextArea.value, 'text/xml');
	rightTextArea.value = xmlDoc.stringify(xmlDoc, null, 0);
}

/* По умолчанию использует 4 пробела 
	 во вложенных элемантах 					*/
function beautifyJSON() {
	let json = JSON.parse(leftTextArea.value);
	leftTextArea.value = JSON.stringify(json, null, 4);
}

function beautifyXML() {
	console.log('beautifyXML');
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

convertButton.addEventListener('click', json2xml);
clearButton.addEventListener('click', clearTextAreas);
minifyJsonButton.addEventListener('click', minifyJSON);
minifyXmlButton.addEventListener('click', minifyXML);
beautifyJsonButton.addEventListener('click', beautifyJSON);