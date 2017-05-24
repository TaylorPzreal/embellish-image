// Module Defination

// 1. upload module
// 2. Embellish
// 3. save to server
let fileName;
let fileType;
let embellishImageModel;

/**
 * init upload file model
 * 
 * @param {any} dom 
 */
function initUploadModel(dom) {

  const inputFile = document.createElement('input');
  inputFile.type = 'file';
  inputFile.hidden = true;
  dom.parentElement.appendChild(inputFile);

  // click upload btn Listener
  dom.addEventListener('click', () => {

    inputFile.click();

  });

  // selected File Listener
  inputFile.addEventListener('change', () => {

    const files = inputFile.files;

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

  if (files && files.length) {

    // show canvas model 
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
      </div>
      <div class="em-box-body">
        
        <div class="em-image-render">
          <canvas id="em-canvas"></canvas>
        </div>
        
        <div class="em-image-preview">

        </div>
      </div>
      <div class="em-box-footer">
      
      </div>
    `;

    modal.appendChild(modalContainer);

    document.body.appendChild(modal);


    // init image
    const file = files[0];
    const URL = window.URL || window.webkitURL;
    const src = URL.createObjectURL(file);
    const canvasContainer = document.getElementsByClassName('em-image-render')[0];
    const width = canvasContainer.clientWidth;
    const height = canvasContainer.clientHeight;
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

    const emCanvas = document.getElementById('em-canvas');
    const context = emCanvas.getContext('2d');
    const emImage = new Image();
    emImage.src = src;

    // preview
    document.getElementsByClassName('em-image-preview')[0].appendChild(emImage);

    emImage.onload = () => {

      console.warn(this.width, this.height, emImage.width, emImage.height);
      context.drawImage(emImage, 0, 0, width, height);

    };

  }

}

/** 
 * 获取美化的裁剪框内的数据
 */
InitEmbellishImageModel.prototype.getBlobData = () => {

  // transferToBlobData
  console.warn(fileName, fileType);
  transferToBlobData(this.files);

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
 * Save To Server
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

export default EmbellishImage;
