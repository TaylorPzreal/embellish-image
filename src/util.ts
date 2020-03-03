import { event } from 'd3';

function grayscale(imageData: ImageData): ImageData {
  const { data, width, height } = imageData;
  const result: ImageData = new ImageData(new Uint8ClampedArray(data), width, height);

  for (let i = 0; i < data.length; i+=4) {
    const avg = (data[i] + data[i + 1] + data[i + 2]) / 3;
    result.data[i] = avg; // red
    result.data[i + 1] = avg; // green
    result.data[i + 2] = avg; // blue
  }

  return result;
}

function invert(imageData: ImageData): ImageData {
  const { data, width, height } = imageData;
  const result: ImageData = new ImageData(new Uint8ClampedArray(data), width, height);

  for (let i = 0; i < data.length; i+=4) {
    result.data[i] = 255 - data[i]; // red
    result.data[i + 1] = 255 - data[i + 1]; // green
    result.data[i + 2] = 255 - data[i + 2]; // blue
  }

  return result;
}

function scaleToFill(canvas: HTMLCanvasElement, img: HTMLImageElement): [number, number, number, number] {
  const scale = Math.max(canvas.width / img.width, canvas.height / img.height);

  const dx = (canvas.width / 2) - (img.width / 2) * scale;
  const dy = (canvas.height / 2) - (img.height / 2) * scale;
  const dWidth = img.width * scale;
  const dHeight = img.height * scale;
  return [dx, dy, dWidth, dHeight];
}

function scaleToFit(canvas: HTMLCanvasElement, img:HTMLImageElement) {
  const scale = Math.min(canvas.width / img.width, canvas.height / img.height);

  const dx = (canvas.width / 2) - (img.width / 2) * scale;
  const dy = (canvas.height / 2) - (img.height / 2) * scale;
  const dWidth = img.width * scale;
  const dHeight = img.height * scale;

  return [dx, dy, dWidth, dHeight];
}

function zoomCallback(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D, callback: () => void) {
  const transform = event.transform;
  const { width, height } = canvas;

  ctx.save();
  ctx.clearRect(0, 0, width, height);
  ctx.translate(transform.x, transform.y);
  ctx.scale(transform.k, transform.k);
  callback();
  ctx.restore();
}

export {
  grayscale,
  invert,
  scaleToFill,
  scaleToFit,
  zoomCallback,
}
