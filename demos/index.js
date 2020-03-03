const { EmbellishImage, getImageURL } = EmbellishBundle;
const dom = document.getElementById('canvas');
const config = {
  width: 200,
  heigh: 200,
};

const embellish = new EmbellishImage(dom, config);

const inputImage = document.getElementById('image');
inputImage.addEventListener('change', (ev) => {
  const src = getImageURL(ev);
  embellish.renderImage(src);
});

function gray() {
  embellish.grayscale();
}

function invert() {
  embellish.invert();
}

function reset() {
  embellish.reset();
}

const brightness = document.getElementById('brightness');
brightness.addEventListener('change', (ev) => {
  const value = brightness.value;
  console.log('Brightness: ', value);
  embellish.brightness(value);
});

const contrast = document.getElementById('contrast');
contrast.addEventListener('change', () => {
  const value = contrast.value;
  console.log(value);
  embellish.contrast(value);
});

function save() {
  embellish.exportImage((blob) => {
    const img = new Image();
    const src = URL.createObjectURL(blob);
    img.onload = function(ev) {
      // URL.revokeObjectURL(src);
      document.body.append(img);
    }
    img.src = src;
  })
}
