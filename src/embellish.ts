import { Option } from './model';
import { grayscale, invert, scaleToFill } from './util';

export default class EmbellishImage {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  // private option: Option;
  private originImageData: ImageData;
  private imageFile: HTMLImageElement;

  constructor(private e: HTMLCanvasElement | string, private opt?: Option) {
    this.canvas = typeof this.e === 'object' ? this.e : document.querySelector(this.e);
    this.ctx = this.canvas.getContext('2d');
    // this.option = opt;
    console.log(this.opt);
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

  public setRGB(r: number, g: number, b: number) {

  }

  // private getColorIndicesForCoord(x: number, y:number, canvasWidth:number) {
  //   var red = y * (canvasWidth * 4) + x * 4;
  //   return [red, red + 1, red + 2, red + 3];
  // }

  public brightness() {

  }

  public contrast() {

  }

  public grayscale(imageData: ImageData) {
    const result = grayscale(imageData);
    this.renderData(result, 0, 0);
  }

  public invert(imageData: ImageData) {
    const result = invert(imageData);
    this.renderData(result, 0, 0);
  }

  public reset() {
    this.renderData(this.originImageData, 0, 0);
  }

  public renderData(imageData: ImageData, dx: number, dy: number) {
    this.ctx.putImageData(imageData, dx, dy);
  }

  private getFillData():[number, number, number, number] {
    return scaleToFill(this.canvas, this.imageFile);
  }
}
