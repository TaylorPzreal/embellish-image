interface HTMLInputEvent extends Event {
  target: HTMLInputElement & EventTarget;
}

function getImageURL(ev: HTMLInputEvent):string {
  let imageURL;
  if (ev.target.files && ev.target.files.item(0)) {
    imageURL = URL.createObjectURL(ev.target.files[0]);
  }
  return imageURL;
}

export { getImageURL }
