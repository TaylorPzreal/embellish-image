const { EmbellishImage, getImageURL } = EmbellishBundle;
const dom = document.getElementById('canvas');

const config = {
  width: 600,
  height: 600,
  transform: [-388.05764003367335, -374.73933846240163],
  scale: 2.0676614724959306,
  filters: [
    {name: "brightness", type: "number", value: 4},
    {name: "contrast", type: "number", value: 0},
    {name: "invert", type: "boolean", value: false},
    {name: "grayscale", type: "boolean", value: true}
  ],
};

const embellish = new EmbellishImage(dom, config);

const inputImage = document.getElementById('image');
inputImage.addEventListener('change', (ev) => {
  const src = getImageURL(ev);
  embellish.renderImage(src);
});

const grayscale = document.getElementById('grayscale');
grayscale.addEventListener('change', () => {
  console.log(grayscale.checked);
  embellish.grayscale(grayscale.checked);
})
const invert = document.getElementById('invert');
invert.addEventListener('change', () => {
  console.log(invert.checked);
  embellish.invert(invert.checked);
})


function reset() {
  embellish.reset();
}

const brightness = document.getElementById('brightness');
brightness.addEventListener('change', (ev) => {
  const value = +brightness.value;
  embellish.brightness(value);
});

const contrast = document.getElementById('contrast');
contrast.addEventListener('change', () => {
  const value = +contrast.value;
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

function exportConfig() {
  const config = embellish.exportConfig();
  console.log(config);
}