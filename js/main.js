/// variables 

// textAreas
let textAreas = docGetAll('.section__textarea');
let jsonTextArea = textAreas[0];
let xmlTextArea = textAreas[1];

// buttons
let modeChangeButton = docGet('.mode-change-button');
let json2xmlButton = docGet('.json2xml-button');
let xml2jsonButton = docGet('.xml2json-button');
let convertButton = docGet('.convert-button');
let browseButton = docGet('.browse-button');
let loadUriButton = docGet('load-uri-button');
let beautifyJsonButton = docGet('.beautify-json-button');
let beautifyXmlButton = docGet('.beautify-xml-button');
let minifyJsonButton = docGet('.minify-json-button');
let minifyXmlButton = docGet('.minify-xml-button');

let clearButton = docGet('.clear-button');
// other vars 
let mode = 'json2xml';



/// functions


function json2xml() {
	try {
		let convert = require('xml-js');
		let json = jsonTextArea.value;
		xmlTextArea.value = convert.json2xml(json, { compact: true, ignoreComment: true, spaces: 4 });
	} catch (e) {
		alert('Ошибка, некорректный JSON');
		console.log(e);
	}
}

function xml2json() {
	try {
		let convert = require('xml-js');
		let iconvlite = require('iconv-lite');
		let xml = iconvlite.decode(xmlTextArea.value, 'UTF-8');
		jsonTextArea.value = convert.xml2json(xml, { compact: false, spaces: 4 });
	} catch (e) {
		alert('Ошибка, некорректный XML!');
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
	let json = JSON.parse(jsonTextArea.value);
	let jsonObject = JSON.stringify(json, null, 0);
	jsonTextArea.value = jsonObject;
	console.log('minifyJSON');
}

let vkBeatify = require('vkbeautify');

function minifyXML() {
	xmlTextArea.value = vkBeatify.xmlmin(xmlTextArea.value, true);
}

/* По умолчанию использует 4 пробела 
	 во вложенных элемантах 					*/
function beautifyJSON() {
	let json = JSON.parse(jsonTextArea.value);
	jsonTextArea.value = JSON.stringify(json, null, 4);
}

function beautifyXML() {
	xmlTextArea.value = vkBeatify.xml(xmlTextArea.value);
}
function clearTextAreas() {
	jsonTextArea.value = '';
	xmlTextArea.value = '';
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


function browse() {
	alert('Этот функционал еще не готов!');
}

function loadURI() {
	alert('Этот функционал еще не готов!');
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
beautifyXmlButton.addEventListener('click', beautifyXML);
beautifyJsonButton.addEventListener('click', beautifyJSON);
minifyJsonButton.addEventListener('click', minifyJSON);
minifyXmlButton.addEventListener('click', minifyXML);
browseButton.addEventListener('click', browse);
loadUriButton.addEventListener('click', loadURI)