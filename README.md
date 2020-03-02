# embellish-image

> v2.0.0👏 A plugin that can upload local image, crop image, embellish image and export image to server or local.

## Usage

```ts
import { EmbellishImage } from 'embellish-image';
const option = {};

const em = new EmbellishImage(option);

// General API
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
