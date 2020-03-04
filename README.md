# embellish-image

> v2.0.0 👏👏👏 A plugin that embellish image.

## Usage

```ts
import { EmbellishImage, getImageURL } from 'embellish-image';
const option = {};

const embellish = new EmbellishImage(document.getElementById('canvas'), option);

// renderImage
const inputImage = document.getElementById('image');
inputImage.addEventListener('change', (ev) => {
  const src = getImageURL(ev);
  embellish.renderImage(src);
});
embellish.getImageData();
embellish.putImageData(imageData: ImageData);

const value = 2;

embellish.grayscale(true);
embellish.invert(true);
embellish.brightness(value);
embellish.contrast(value);

// reset all changes
embellish.reset();

embellish.exportImage(callback, type?:string, quality?:any);
embellish.exportConfig();
```

## Features

- render image
- drag
- zoom
- invert
- grayscale
- brightness
- contrast
- export image to blob
- export config
- Initialize with config

## Development

```bash
git clone git@github.com:TaylorPzreal/embellish-image.git
cd embellish-image

yarn install
```

For test

```bash
yarn start
yarn server

# open url
http://127.0.0.1:9000/demos/
```

For prod

```bash
yarn build
```
