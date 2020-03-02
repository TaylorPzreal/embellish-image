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
  const data = embellish.getImageData();
  embellish.grayscale(data);
}

function invert() {
  const data = embellish.getImageData();
  embellish.invert(data);
}

function reset() {
  embellish.reset();
}