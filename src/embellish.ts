import { zoom, select, zoomIdentity, zoomTransform } from 'd3';
import cloneDeep from 'lodash/cloneDeep';
import { Option, Filter, defaultFilters, FilterName } from './model';
import { grayscale, invert, scaleToFill, zoomCallback, brightness, contrast } from './util';

export default class EmbellishImage {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private originImageData: ImageData;
  private imageFile: HTMLImageElement;
  private filters: Filter[] = defaultFilters();

  constructor(canvas: HTMLCanvasElement | string, option?: Option) {
    this.canvas = typeof canvas === 'object' ? canvas : document.querySelector(canvas);
    this.ctx = this.canvas.getContext('2d');
    this.initOption(option);
    this.initZoom();
  }

  private initOption(option?: Option) {
    if (!option) {
      return;
    }

    const { width, height, transform, scale, filters } = option;
    if (width) {
      this.canvas.width = width;
    }

    if (height) {
      this.canvas.height = height;
    }

    if (transform) {
      this.ctx.save();
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this.ctx.translate(...transform);
      this.ctx.restore();
    }

    if (scale) {
      this.ctx.save();
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this.ctx.scale(scale, scale);
      this.ctx.restore();
    }

    if (filters) {
      this.filters.forEach((f) => {
        const item = filters.find(ff => ff.name === f.name);
        if (item && f.name === item.name) {
          f.value = item.value;
        }
      });

      this.renderFilters();
    }
  }

  private initZoom() {
    select(this.canvas).call(zoom().scaleExtent([1, 4]).duration(500).on('zoom', () => {
      zoomCallback(this.canvas, this.ctx, () => {
        this.renderImageFile();
        this.renderFilters();
      });
    }));
  }

  public renderImage(src: string) {
    this.imageFile = new Image();
    this.imageFile.onload = (ev: Event) => {
      this.renderImageFile();
      this.originImageData = this.getImageData();
      this.renderFilters();
    }
    this.imageFile.src = src;
  }

  public getImageData(): ImageData {
    const result = this.ctx.getImageData(0, 0, this.canvas.width, this.canvas.height);
    return result;
  }

  public putImageData(imageData: ImageData, dx: number, dy: number) {
    this.ctx.putImageData(imageData, dx, dy);
  }

  public brightness(value: number = 0) {
    this.filters.forEach((f) => {
      if (f.name === FilterName.brightness) {
        f.value = value;
      }
    });
    const imageData = this.getImageData();
    const result = brightness(imageData, value);
    this.putImageData(result, 0, 0);
  }

  public contrast(value: number = 0) {
    this.filters.forEach((f) => {
      if (f.name === FilterName.contrast) {
        f.value = value;
      }
    });
    const imageData = this.getImageData();
    const result = contrast(imageData, value);
    this.putImageData(result, 0, 0);
  }

  public grayscale(active: boolean) {
    this.filters.forEach((f) => {
      if (f.name === FilterName.grayscale) {
        f.value = active;
      }
    });
    if (active) {
      const imageData = this.getImageData();
      const result = grayscale(imageData);
      this.putImageData(result, 0, 0);
    } else {
      this.render();
    }
  }

  public invert(active: boolean) {
    this.filters.forEach((f) => {
      if (f.name === FilterName.invert) {
        f.value = active;
      }
    });

    if (active) {
      const imageData = this.getImageData();
      const result = invert(imageData);
      this.putImageData(result, 0, 0);
    } else {
      this.render();
    }
  }

  public reset() {
    this.filters = defaultFilters();
    this.ctx.save();
    select(this.canvas).call(zoom().transform, zoomIdentity);
    this.putImageData(this.originImageData, 0, 0);
    this.ctx.restore();
  }

  public render() {
    const { x, y, k } = zoomTransform(this.canvas);
    const { width , height } = this.canvas;

    this.ctx.save();
    this.ctx.clearRect(0, 0, width, height);
    this.ctx.translate(x, y);
    this.ctx.scale(k, k);
    this.renderImageFile();
    this.renderFilters();
    this.ctx.restore();
  }

  private renderImageFile() {
    const data = this.getFillData();
    this.ctx.drawImage(this.imageFile, ...data);
  }

  private renderFilters() {
    this.filters.forEach((filter) => {
      switch(filter.name) {
        case FilterName.grayscale:
          filter.value === true && this.grayscale(filter.value);
          break;
        case FilterName.invert:
          filter.value === true && this.invert(filter.value);
          break;
        case FilterName.brightness:
          this.brightness(filter.value as number);
          break;
        case FilterName.contrast:
          this.contrast(filter.value as number);
          break;
      }
    });
  }

  private getFillData():[number, number, number, number] {
    return scaleToFill(this.canvas, this.imageFile);
  }

  public exportImage(callback: BlobCallback, type?: string, quality?: any) {
    this.canvas.toBlob(callback, type, quality);
  }

  public exportConfig() {
    const { x, y, k } = zoomTransform(this.canvas);
    const { width, height } = this.canvas;

    const result: Option = {
      width,
      height,
      transform: [x, y],
      scale: k,
      filters: cloneDeep(this.filters),
    }

    return result;
  }
}
