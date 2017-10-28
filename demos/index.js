import { EmbellishImage } from '../dist/embellish-image.es';
// import '../scss/embellish-image.scss';

const dom = document.getElementById('embellish-image');
const config = {
  width: 100,
  heigh: 100,
};

const em = new EmbellishImage(dom, config);
