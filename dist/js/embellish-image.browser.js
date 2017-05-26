var EmbellishImage = (function () {
'use strict';

var _this = undefined;

// Module Defination

// 1. upload module
// 2. Embellish
// 3. save to server
var fileName = void 0;
var fileType = void 0;
var embellishImageModel = void 0;

function addClass(dom, name) {

  var className = dom.className;
  if (className.indexOf(name) < 0) {

    return className + ' ' + name;
  } else {

    return className;
  }
}

function removeClass(dom, name) {

  var className = dom.className;
  if (className.indexOf(name) > -1) {

    return className.split(name).join('').split(/\s+/).join(' ');
  } else {

    return className;
  }
}

/**
 * init upload file model
 * 
 * @param {any} dom 
 */
function initUploadModel(dom) {

  // click upload btn Listener
  dom.addEventListener('click', function () {

    // 初始化上传照片模版
    var initEmbellishImageModel = new InitEmbellishImageModel();
    initEmbellishImageModel.addAction();
  });
}

/**
 * init edit modal: EmbellishImage Editing
 * 
 */
function InitEmbellishImageModel() {

  // 显示上传模态框
  var modal = document.createElement('div');
  modal.className = 'em-modal';

  var modalBg = document.createElement('div');
  modalBg.className = 'em-modal-bg';

  modal.appendChild(modalBg);

  var modalContainer = document.createElement('div');
  modalContainer.className = 'em-box';
  modalContainer.innerHTML = '\n     <div class="em-box-header">\n       <h3>\u4E0A\u4F20\u56FE\u7247</h3>\n       <div>\n         <a class="em-btn em-btn-secondary" onclick="document.getElementById(\'em-file\').click()">\u9009\u62E9\u56FE\u7247</a>\n         <input id="em-file" type="file" hidden>\n       </div>\n       <div class="em-cancel">\n        <span></span>\n       </div>\n     </div>\n     <div class="em-box-body">\n\n       <div class="em-image-render">\n        <div id="em-drop" class="em-drop-area">\n          You can drag an image and drop it here.\n        </div>\n       </div>\n        \n       <div class="em-image-preview">\n\n       </div>\n     </div>\n    <div class="em-box-footer">\n      <a id="em-cancel" class="em-btn em-btn-secondary">Cancel</a>\n      <a id="em-submit" class="em-btn em-btn-success">Submit</a>\n    </div>\n  ';

  modal.appendChild(modalContainer);

  document.body.appendChild(modal);
}

InitEmbellishImageModel.prototype.addAction = function () {

  // Disable drag an image to the web page exclude #em-drop element.
  window.addEventListener('dragover', function (event) {

    var e = event || window.event;
    e.preventDefault();
  }, false);
  window.addEventListener('drop', function (event) {

    var e = event || window.event;
    e.preventDefault();
  }, false);

  var dropArea = document.getElementById('em-drop');

  dropArea.ondragover = function (event) {

    var ev = event || window.event;
    ev.preventDefault();
    ev.dataTransfer.dropEffect = 'copy';
  };

  dropArea.ondragenter = function () {

    dropArea.className = addClass(dropArea, 'dragover');
  };

  dropArea.ondragleave = function () {

    dropArea.className = removeClass(dropArea, 'dragover');
  };

  dropArea.ondrop = function (ev) {

    ev.preventDefault();
    dropArea.className = removeClass(dropArea, 'dragover');

    var files = ev.dataTransfer.files;
    console.warn(files);

    // 初始化渲染 canvas
    new RenderEmbellishImageModel(files);
  };

  var selectFile = document.getElementById('em-file');
  selectFile.onchange = function () {

    var files = selectFile.files;
    console.warn(files);

    // 初始化渲染 canvas
    new RenderEmbellishImageModel(files);
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
 * 展示渲染已选择的图片
 * 裁剪， 美化， 获取裁剪数据 。。。
 * 
 * @param {any} files 
 */
function RenderEmbellishImageModel(files) {

  if (files && files.length) {

    var file = files[0];
    fileName = file.name;
    fileType = file.type;

    var canvasContainer = document.getElementsByClassName('em-image-render')[0];
    canvasContainer.removeChild(document.getElementById('em-drop'));

    var width = canvasContainer.clientWidth;
    var height = canvasContainer.clientHeight;

    var canvas = document.createElement('canvas');
    canvas.idName = addClass(canvas, 'em-canvas');
    var ctx = canvas.getContext('2d');

    var URL = window.URL || window.webkitURL;
    var src = URL.createObjectURL(file);
    var emImage = new Image();
    emImage.src = src;

    emImage.onload = function () {

      ctx.drawImage(emImage, 0, 0, width, height);
    };

    // preview
    document.getElementsByClassName('em-image-preview')[0].appendChild(emImage);

    canvasContainer.appendChild(canvas);
  }
}

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
