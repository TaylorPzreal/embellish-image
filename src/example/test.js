import EmbellishImage from '../js/embellish-image';
import '../scss/embellish-image.scss';

const dom = document.getElementById('embellish-image');
const config = {
  width: 100,
  heigh: 100,
};

const embellishImage = new EmbellishImage(dom, config);

const savebtn = document.getElementById('save');
savebtn.onclick = () => {

  embellishImage.save();

};
