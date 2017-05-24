var EmbellishImage = (function () {
'use strict';

var _this2 = undefined;

// Module Defination

// 1. upload module
// 2. Embellish
// 3. save to server
var fileName = void 0;
var fileType = void 0;
var embellishImageModel = void 0;

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

    // open edit model, preview, embellish image, cropper or add filters & so on ...
    embellishImageModel = new InitEmbellishImageModel(files);
  });
}

/**
 * init edit modal: EmbellishImage Editing
 * 
 * @param {any} files 
 */
function InitEmbellishImageModel(files) {
  var _this = this;

  if (files && files.length) {

    // show canvas model 
    var modal = document.createElement('div');
    modal.className = 'em-modal';

    var modalBg = document.createElement('div');
    modalBg.className = 'em-modal-bg';

    modal.appendChild(modalBg);

    var modalContainer = document.createElement('div');
    modalContainer.className = 'em-box';
    modalContainer.innerHTML = '\n      <div class="em-box-header">\n        <h3>\u4E0A\u4F20\u56FE\u7247</h3>\n      </div>\n      <div class="em-box-body">\n        \n        <div class="em-image-render">\n          <canvas id="em-canvas"></canvas>\n        </div>\n        \n        <div class="em-image-preview">\n\n        </div>\n      </div>\n      <div class="em-box-footer">\n      \n      </div>\n    ';

    modal.appendChild(modalContainer);

    document.body.appendChild(modal);

    // init image
    var file = files[0];
    var URL = window.URL || window.webkitURL;
    var src = URL.createObjectURL(file);
    var canvasContainer = document.getElementsByClassName('em-image-render')[0];
    var width = canvasContainer.clientWidth;
    var height = canvasContainer.clientHeight;
    // const natureWidth = file.width;
    // const natureHeight = file.height;
    // let showWidth;
    // let showHeight;
    // if (natureWidth > natureHeight) {

    //   showWidth = natureWidth > width ? width : natureWidth;
    //   showHeight = parseFloat(natureHeight / natureWidth).toFixed(3) * showWidth;

    // } else {

    //   showHeight = natureHeight > height ? height : natureHeight;
    //   showWidth = parseFloat(natureWidth / natureHeight).toFixed(3) * showHeight;

    // }

    // console.warn(showHeight, showWidth, natureHeight, natureWidth, file);

    var emCanvas = document.getElementById('em-canvas');
    var context = emCanvas.getContext('2d');
    var emImage = new Image();
    emImage.src = src;

    // preview
    document.getElementsByClassName('em-image-preview')[0].appendChild(emImage);

    emImage.onload = function () {

      console.warn(_this.width, _this.height, emImage.width, emImage.height);
      context.drawImage(emImage, 0, 0, width, height);
    };
  }
}

/** 
 * 获取美化的裁剪框内的数据
 */
InitEmbellishImageModel.prototype.getBlobData = function () {

  // transferToBlobData
  console.warn(fileName, fileType);
  transferToBlobData(_this2.files);
};

/**
 * transfer to blob data
 * 
 * TODO: 2017-05-22
 * 
 * @param {any} files 
 */
function transferToBlobData(files) {

  if (files && files.length) {

    var file = files[0];
    var URL = window.URL || window.webkitURL;
    var blobURL = null;

    fileName = file.name;
    fileType = file.type;

    blobURL = URL.createObjectURL(file);

    console.warn(blobURL);
  }
}

/**
 * 将Base64URL转换为Blob
 */
// function dataURItoBlob(dataURI) {

//   const byteString = window.atob(dataURI.split(',')[1]);

//   const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];

//   const ab = new ArrayBuffer(byteString.length);
//   const ia = new Uint8Array(ab);
//   for (let i = 0; i < byteString.length; i++) {

//     ia[i] = byteString.charCodeAt(i);

//   }

//   const bb = new Blob([ab], {
//     'type': mimeString,
//   });
//   return bb;

// }

/**
 * Save To Server
 */
EmbellishImage.prototype.save = function () {

  var blobFile = embellishImageModel.getBlobData();

  if (!blobFile) {

    console.warn('Please select an image file.');
    return;
  }

  var XHR = new XMLHttpRequest();
  XHR.open('POST', this.serverURL, true);
  XHR.setRequestHeader('Content-Type', undefined);
  XHR.send(blobFile);
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

return EmbellishImage;

}());
