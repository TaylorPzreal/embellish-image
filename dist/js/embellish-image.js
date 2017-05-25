'use strict';

var _this = undefined;

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

  // const inputFile = document.createElement('input');
  // inputFile.type = 'file';
  // inputFile.hidden = true;
  // dom.parentElement.appendChild(inputFile);

  // click upload btn Listener
  dom.addEventListener('click', function () {

    // inputFile.click();

    // 初始化上传照片模版
    var initEmbellishImageModel = new InitEmbellishImageModel();
    initEmbellishImageModel.addAction();
  });

  // selected File Listener
  // inputFile.addEventListener('change', () => {

  //   const files = inputFile.files;

  //   // open edit model, preview, embellish image, cropper or add filters & so on ...
  //   embellishImageModel = new InitEmbellishImageModel(files);

  // });
}

/**
 * init edit modal: EmbellishImage Editing
 * 
 */
function InitEmbellishImageModel() {

  window.addEventListener('dragover', function (event) {

    var e = event || window.event;
    e.preventDefault();
  }, false);
  window.addEventListener('drop', function (event) {

    var e = event || window.event;
    e.preventDefault();
  }, false);

  // show canvas model 
  var modal = document.createElement('div');
  modal.className = 'em-modal';

  var modalBg = document.createElement('div');
  modalBg.className = 'em-modal-bg';

  modal.appendChild(modalBg);

  var modalContainer = document.createElement('div');
  modalContainer.className = 'em-box';
  modalContainer.innerHTML = '\n     <div class="em-box-header">\n       <h3>\u4E0A\u4F20\u56FE\u7247</h3>\n       <div>\n         <a class="em-btn em-btn-secondary" onclick="document.getElementById(\'em-file\').click()">\u9009\u62E9\u56FE\u7247</a>\n         <input id="em-file" type="file" hidden>\n       </div>\n       <div class="em-cancel">\n        <span></span>\n       </div>\n     </div>\n     <div class="em-box-body">\n\n       <div class="em-image-render">\n        <div id="em-drop" class="em-drop-area">\n          <span>You can drag an image and drop it here.</span>\n        </div>\n       </div>\n        \n       <div class="em-image-preview">\n\n       </div>\n     </div>\n    <div class="em-box-footer">\n      <a id="em-cancel" class="em-btn em-btn-secondary">Cancel</a>\n      <a id="em-submit" class="em-btn em-btn-success">Submit</a>\n    </div>\n  ';

  modal.appendChild(modalContainer);

  document.body.appendChild(modal);

  // init image
  // const file = files[0];
  // const URL = window.URL || window.webkitURL;
  // const src = URL.createObjectURL(file);
  // const canvasContainer = document.getElementsByClassName('em-image-render')[0];
  // const width = canvasContainer.clientWidth;
  // const height = canvasContainer.clientHeight;
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
  // <-- <canvas id="em-canvas"></canvas> -->
  // const emCanvas = document.getElementById('em-canvas');
  // const context = emCanvas.getContext('2d');
  // const emImage = new Image();
  // emImage.src = src;

  // // preview
  // document.getElementsByClassName('em-image-preview')[0].appendChild(emImage);

  // emImage.onload = () => {

  //   console.warn(this.width, this.height, emImage.width, emImage.height);
  //   context.drawImage(emImage, 0, 0, width, height);

  // };

  // }
}

InitEmbellishImageModel.prototype.addAction = function () {

  var dropArea = document.getElementById('em-drop');

  console.warn('haha');

  dropArea.ondragover = function (event) {

    var ev = event || window.event;
    ev.preventDefault();
    ev.dataTransfer.dropEffect = 'copy';
    console.warn('allow drop.');
  };

  dropArea.ondrop = function (ev) {

    ev.preventDefault();
    var data = ev.dataTransfer.files;
    console.warn(data);
  };
};

/** 
 * 获取美化的裁剪框内的数据
 */
InitEmbellishImageModel.prototype.getBlobData = function () {

  // transferToBlobData
  console.warn(fileName, fileType);
  transferToBlobData(_this.files);
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
 * EmbellishImage Constructor 1 Step
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
