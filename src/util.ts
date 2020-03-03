import { event } from 'd3';

function truncateColor(value: number) {
  if (value < 0) {
    value = 0;
  } else if (value > 255) {
    value = 255;
  }

  return value;
}

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

function getColorIndicesForCoord(x: number, y:number, canvasWidth:number) {
  var red = y * (canvasWidth * 4) + x * 4;
  return [red, red + 1, red + 2, red + 3];
}

function brightness(imageData: ImageData, value: number): ImageData {
  const { data, width, height } = imageData;
  const result: ImageData = new ImageData(new Uint8ClampedArray(data), width, height);

  for (let i = 0; i < data.length; i+=4) {
    result.data[i] = data[i] + 255 * (value / 100);
    result.data[i+1] = data[i+1] + 255 * (value / 100);
    result.data[i+2] = data[i+2] + 255 * (value / 100);
  }

  return result;
}

function contrast(imageData: ImageData, value: number): ImageData {
  const { data, width, height } = imageData;
  const result: ImageData = new ImageData(new Uint8ClampedArray(data), width, height);

  const factor = (259.0 * (value + 255.0)) / (255.0 * (259.0 - value));

  for (let i = 0; i < data.length; i+= 4) {
    result.data[i] = truncateColor(factor * (data[i] - 128.0) + 128.0);
    result.data[i+1] = truncateColor(factor * (data[i+1] - 128.0) + 128.0);
    result.data[i+2] = truncateColor(factor * (data[i+2] - 128.0) + 128.0);
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
  getColorIndicesForCoord,
  brightness,
  contrast,
}
