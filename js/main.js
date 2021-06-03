/// variables 

// textAreas
let textAreas = docGetAll('.section__textarea');
let leftTextArea = textAreas[0];
let rightTextArea = textAreas[1];

// buttons
let modeChangeButton = docGet('.mode-change-button');
let json2xmlButton = docGet('.json2xml-button');
let xml2jsonButton = docGet('.xml2json-button');
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
let rightTextAreaText;
let mode = 'json2xml';



/// functions


function json2xml() {
	try {
		let convert = require('xml-js');
		let json = leftTextArea.value;
		rightTextArea.value = convert.json2xml(json, { compact: true, ignoreComment: true, spaces: 4 });
	} catch (e) {
		console.log(e);
	}
}

function xml2json() {
	try {
		let convert = require('xml-js');
		let iconvlite = require('iconv-lite');
		let xml = iconvlite.decode(rightTextArea.value, 'UTF-8');
		leftTextArea.value = convert.xml2json(xml, { compact: false, spaces: 4 });
	} catch (e) {
		console.log(e);
	}
}

function convert() {
	if (mode === 'json2xml') {
		json2xml();
	} else {
		xml2json();
	}
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

function swapHeaderTitles() {
	let header = docGetAll('.header span');
	let firstTitle = header[0];
	let secondTitle = header[2];
	// swap
	let tmp = firstTitle.textContent;
	firstTitle.textContent = secondTitle.textContent;
	secondTitle.textContent = tmp;

	let mainSections = docGet('.main__sections');
	if (mainSections.style.flexDirection === 'row-reverse') {
		mainSections.style.flexDirection = 'row';
	} else {
		mainSections.style.flexDirection = 'row-reverse';
	}
}

function docGet(selector) {
	return document.querySelector(selector);
}

function docGetAll(selector) {
	return document.querySelectorAll(selector);
}


/// listeners

json2xmlButton.addEventListener('click', () => {
	if (mode === 'xml2json') {
		mode = 'json2xml';
		swapHeaderTitles();
		modeChangeButton.textContent = json2xmlButton.textContent;
	}

});
xml2jsonButton.addEventListener('click', () => {
	if (mode === 'json2xml') {
		mode = 'xml2json';
		swapHeaderTitles();
		modeChangeButton.textContent = xml2jsonButton.textContent;
	}
});
convertButton.addEventListener('click', convert);
clearButton.addEventListener('click', clearTextAreas);
minifyJsonButton.addEventListener('click', minifyJSON);
minifyXmlButton.addEventListener('click', minifyXML);
beautifyJsonButton.addEventListener('click', beautifyJSON);