import { zoom, select, zoomIdentity } from 'd3';
import { Option, Operation, OperationName } from './model';
import { grayscale, invert, scaleToFill, zoomCallback, brightness, contrast } from './util';

export default class EmbellishImage {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  // private option: Option;
  private originImageData: ImageData;
  private imageFile: HTMLImageElement;
  private operationList: Operation[] = [];

  constructor(private e: HTMLCanvasElement | string, private opt?: Option) {
    this.canvas = typeof this.e === 'object' ? this.e : document.querySelector(this.e);
    this.ctx = this.canvas.getContext('2d');
    // this.option = opt;
    console.log(this.opt);
    this.initZoom();
  }

  private initZoom() {
    select(this.canvas).call(zoom().scaleExtent([1, 4]).duration(500).on('zoom', () => {
      zoomCallback(this.canvas, this.ctx, () => {
        this.ctx.save();
        const data = this.getFillData();
        this.ctx.drawImage(this.imageFile, ...data);
        this.ctx.restore();
        this.operationList.forEach((op) => {
          switch(op.name) {
            case OperationName.grayscale:
              this.innerGrayScale();
              break;
            case OperationName.invert:
              this.innerInvert();
              break;
            case OperationName.brightness:
              this.innerBrightness(op.config.value);
              break;
            case OperationName.contrast:
              this.innerContrast(op.config.value);
              break;
          }
        });
      });
    }));
  }

  public renderImage(src: string) {
    this.imageFile = new Image();
    this.imageFile.onload = (ev: Event) => {
      const data = this.getFillData();
      this.ctx.drawImage(this.imageFile, ...data);
      this.originImageData = this.getImageData();
    }
    this.imageFile.src = src;
  }

  public getImageData(): ImageData {
    const result = this.ctx.getImageData(0, 0, this.canvas.width, this.canvas.height);
    return result;
  }

  public getLastImageData() {

  }

  public setRGB(r: number, g: number, b: number) {

  }

  private innerBrightness(value: number = 0) {
    const imageData = this.getImageData();
    const result = brightness(imageData, value);
    this.renderData(result, 0, 0);
  }

  public brightness(value: number = 0) {
    this.innerBrightness(value);
    this.operationList.push({ name: OperationName.brightness, config: { value } });
  }

  private innerContrast(value: number = 0) {
    const imageData = this.getImageData();
    const result = contrast(imageData, value);
    this.renderData(result, 0, 0);
  }

  public contrast(value: number = 0) {
    this.innerContrast(value);
    this.operationList.push({ name: OperationName.contrast, config: { value } });
  }

  private innerGrayScale() {
    const imageData = this.getImageData();
    const result = grayscale(imageData);
    this.renderData(result, 0, 0);
  }

  public grayscale() {
    this.innerGrayScale();
    this.operationList.push({ name: OperationName.grayscale })
  }

  private innerInvert() {
    const imageData = this.getImageData();
    const result = invert(imageData);
    this.renderData(result, 0, 0);
  }

  public invert() {
    this.innerInvert();
    this.operationList.push({ name: OperationName.invert })
  }

  public reset() {
    this.operationList = [];
    this.ctx.save();
    select(this.canvas).call(zoom().transform, zoomIdentity);
    this.renderData(this.originImageData, 0, 0);
    this.ctx.restore();
  }

  public renderData(imageData: ImageData, dx: number, dy: number) {
    this.ctx.putImageData(imageData, dx, dy);
  }

  public getOperationList() {

  }

  private getFillData():[number, number, number, number] {
    return scaleToFill(this.canvas, this.imageFile);
  }

  public exportImage(callback: BlobCallback, type?: string, quality?: any) {
    this.canvas.toBlob(callback, type, quality);
  }
}
