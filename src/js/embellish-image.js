// Module Defination

// 1. upload module
// 2. Embellish
// 3. save to server
let fileName;
let fileType;
let embellishImageModel;

function addClass(dom, name) {

  const className = dom.className;
  if (className.indexOf(name) < 0) {

    return `${className} ${name}`;

  } else {

    return className;

  }

}

function removeClass(dom, name) {

  const className = dom.className;
  if (className.indexOf(name) > -1) {

    return className
      .split(name)
      .join('')
      .split(/\s+/)
      .join(' ');

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
  dom.addEventListener('click', () => {

    // 初始化上传照片模版
    const initEmbellishImageModel = new InitEmbellishImageModel();
    initEmbellishImageModel.addAction();

  });

}

/**
 * init edit modal: EmbellishImage Editing
 * 
 */
function InitEmbellishImageModel() {

  // 显示上传模态框
  const modal = document.createElement('div');
  modal.className = 'em-modal';

  const modalBg = document.createElement('div');
  modalBg.className = 'em-modal-bg';

  modal.appendChild(modalBg);

  const modalContainer = document.createElement('div');
  modalContainer.className = 'em-box';
  modalContainer.innerHTML = `
     <div class="em-box-header">
       <h3>上传图片</h3>
       <div>
         <a class="em-btn em-btn-secondary" onclick="document.getElementById('em-file').click()">选择图片</a>
         <input id="em-file" type="file" hidden>
       </div>
       <div class="em-cancel">
        <span></span>
       </div>
     </div>
     <div class="em-box-body">

       <div class="em-image-render">
        <div id="em-drop" class="em-drop-area">
          You can drag an image and drop it here.
        </div>
       </div>
        
       <div class="em-image-preview">

       </div>
     </div>
    <div class="em-box-footer">
      <a id="em-cancel" class="em-btn em-btn-secondary">Cancel</a>
      <a id="em-submit" class="em-btn em-btn-success">Submit</a>
    </div>
  `;

  modal.appendChild(modalContainer);

  document.body.appendChild(modal);

}

InitEmbellishImageModel.prototype.addAction = () => {

  // Disable drag an image to the web page exclude #em-drop element.
  window.addEventListener('dragover', (event) => {

    const e = event || window.event;
    e.preventDefault();

  }, false);
  window.addEventListener('drop', (event) => {

    const e = event || window.event;
    e.preventDefault();

  }, false);

  const dropArea = document.getElementById('em-drop');

  dropArea.ondragover = (event) => {

    const ev = event || window.event;
    ev.preventDefault();
    ev.dataTransfer.dropEffect = 'copy';

  };

  dropArea.ondragenter = () => {

    dropArea.className = addClass(dropArea, 'dragover');

  };

  dropArea.ondragleave = () => {

    dropArea.className = removeClass(dropArea, 'dragover');

  };

  dropArea.ondrop = (ev) => {

    ev.preventDefault();
    dropArea.className = removeClass(dropArea, 'dragover');

    const files = ev.dataTransfer.files;
    console.warn(files);

    // 初始化渲染 canvas
    new RenderEmbellishImageModel(files);

  };

  const selectFile = document.getElementById('em-file');
  selectFile.onchange = () => {

    const files = selectFile.files;
    console.warn(files);

    // 初始化渲染 canvas
    new RenderEmbellishImageModel(files);

  };

};

/** 
 * 获取美化的裁剪框内的数据
 */
InitEmbellishImageModel.prototype.getBlobData = () => {

  // transferToBlobData
  console.warn(fileName, fileType);
  transferToBlobData(this.files);

};

/**
 * 展示渲染已选择的图片
 * 裁剪， 美化， 获取裁剪数据 。。。
 * 
 * @param {any} files 
 */
function RenderEmbellishImageModel(files) {

  if (files && files.length) {

    const file = files[0];
    fileName = file.name;
    fileType = file.type;

    const canvasContainer = document.getElementsByClassName('em-image-render')[0];
    canvasContainer.removeChild(document.getElementById('em-drop'));

    // const width = canvasContainer.clientWidth;
    // const height = canvasContainer.clientHeight;

    const canvas = document.createElement('canvas');
    canvas.idName = 'em-canvas';
    canvas.className = 'em-canvas';
    // canvas.style.cursor = 'move';
    canvasContainer.appendChild(canvas);
    
    const ctx = canvas.getContext('2d');

    const URL = window.URL || window.webkitURL;
    const src = URL.createObjectURL(file);
    const emImage = new Image();
    emImage.src = src;

    emImage.onload = () => {

      const sX = 0;
      const sY = 0;
      const sWidth = emImage.width;
      const sHeight = emImage.height;
      const dX = 0;
      const dY = 0;
      const dWidth = sWidth;
      const dHeight = Math.ceil(parseFloat(842 / 1134).toFixed(4) * dWidth);
      console.warn(dWidth, dHeight, sWidth, sHeight);
      
      canvas.width = 686 * 2;
      canvas.height = 800;

      // Create clipping region
      // ctx.arc(100, 100, 75, 0, Math.PI * 2, false);
      // ctx.clip();
      
      // ctx.clearRect(0, 0, sWidth, sHeight);
      ctx.drawImage(emImage, sX, sY, sWidth, sHeight, dX, dY, dWidth, dHeight);

      canvas.addEventListener('mousewheel', (e) => {

        console.warn(e);
        
        if (e.wheelDelta >= 0) { // 缩小图片
          
          ctx.drawImage(emImage, sX, sY, sWidth, sHeight, dX, dY, dWidth + e.wheelDelta, dHeight + e.wheelDelta);
          
        } else { // 放大图片

          ctx.drawImage(emImage, sX, sY, sWidth, sHeight, dX, dY, dWidth + e.wheelDelta, dHeight + e.wheelDelta);

        }

      });
      // ctx.scale(-1, 1);
      // ctx.rotate(20 * Math.PI / 180);

      // 参考线
      const rW = 400;
      const rH = 400;
      const rX = Math.ceil((canvas.width - rW) / 2);
      const rY = Math.ceil((canvas.height - rH) / 2);
      ctx.setLineDash([5, 15]);
      ctx.strokeStyle = '#3bb4c1';
      ctx.lineWidth = 6;
      ctx.strokeRect(rX, rY, rW, rH);

      // 给矩形添加 move cursor

    };

    // preview
    // document.getElementsByClassName('em-image-preview')[0].appendChild(emImage);

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

    const file = files[0];
    const URL = window.URL || window.webkitURL;
    let blobURL = null;

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
 * Save To Server.
 */
EmbellishImage.prototype.save = function () {

  const blobFile = embellishImageModel.getBlobData();

  if (!blobFile) {

    console.warn('Please select an image file.');
    return;

  }

  const XHR = new XMLHttpRequest();
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

export default EmbellishImage;
