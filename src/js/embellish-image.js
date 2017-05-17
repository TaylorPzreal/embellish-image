function EmbellishImage(id, config) {

  this.width = config.width;
  this.height = config.height;

}

EmbellishImage.prototype.getSize = function () {

  // TODO: somenthing
  const msg = `width: ${this.width}, height: ${this.height}`;
  return msg;

};

export default EmbellishImage;
