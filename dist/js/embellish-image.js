'use strict';

// Module Defination

// 1. upload module
// 2. Embellish
// 3. save to server


/**
 * init upload file model
 * 
 * @param {any} dom 
 */
function initUploadModel(dom) {

  var inputFile = document.createElement('input');
  inputFile.type = 'file';
  inputFile.hidden = true;
  dom.parentElement.appendChild(inputFile);

  // click upload btn Listener
  dom.addEventListener('click', function () {

    inputFile.click();
  });

  // selected File Listener
  inputFile.addEventListener('change', function () {

    var files = inputFile.files;
    transferToBlobData(files);
  });
}

/**
 * transfer to blob data
 * 
 * TODO: 2017-05-22
 * 
 * @param {any} files 
 */
function transferToBlobData(files) {

  console.warn(files);
  // const URL = window.URL || window.webkitURL;
  // let blobURL;

  // if(files && files.length) {
  // const file = files[0];


  // }
}

/**
 * Save To Server
 */
EmbellishImage.prototype.save = function () {

  if (!this.blobFile) {

    console.warn('Please select an image file.');
    return;
  }

  var XHR = new XMLHttpRequest();
  XHR.open('POST', this.serverURL, true);
  XHR.setRequestHeader('Content-Type', undefined);
  XHR.send(this.blobFile);
};

/**
 * EmbellishImage Constructor
 * 
 * @param {any} dom 
 * @param {any} config 
 */
function EmbellishImage(dom, config) {

  console.warn(dom, config);

  this.width = config.width || 200;
  this.height = config.height || 200;
  this.serverURL = config.serverURL;
  this.blobFile;
  this.name;
  this.type;

  this.initUploadModel = initUploadModel(dom);
}

module.exports = EmbellishImage;
