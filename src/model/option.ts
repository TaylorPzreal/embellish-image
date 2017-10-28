export class Option {
  public width?: number;
  public height?: number;
  public show?: {
    zoom?: boolean;
    cropper?: boolean;
    filter?: boolean;
    download?: boolean;
    cShape?: boolean;
  };
  public cropper: {
    shape?: 'circle' | 'rect';
    percent: number; // only can be use when shape select rect
  };
}
