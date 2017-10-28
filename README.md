# embellish-image

A plugin that can upload local image, crop image, embellish image and save image to server or local.

v2.0.0 js to ts reconstructing ... 2017-10-28
![Upload Image](./src/images/upload.png)

## Installation

```bash
npm install embellish-image
```

## Usage

```ts
import { EmbellishImage } from 'embellish-image';
const option = {};

const em = new EmbellishImage(option);

em.init(); // init container
em.uploadLocal(); // upload from local
em.uploadURL(); // upload from an URL
em.cropper();
em.getCanvasData();
em.saveToLocal(); // download img
em.saveToServer(); // save to server
em.cancel(); // cancel edit
```

## Plan

- [x] upload image
- [ ] save image to server
- [ ] embellish image (canvas)
- [x] enable drag and drop
- [ ] enable responsive
- [ ] support take a picture as upload
- [ ] ...
