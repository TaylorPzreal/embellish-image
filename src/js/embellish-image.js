// export default function EmbellishImage (id) {

//   this.dom = document.getElementById(id);
//   this.dom.append('<input type="file">')

//   document.body.append(this.dom);

//   console.warn('init');
// }


function EmbellishImage(id, config) {

  this.width = config.width;
  this.height = config.height;
}

EmbellishImage.prototype.getSize = function() {
  return `width: ${this.width}, height: ${this.height}`;
}
