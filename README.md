# embellish-image
上传本地图片,进行裁剪,优化,美化,装饰,并保存到本地或者保存到服务器

正在开发中 ... 2017-05-17 08:57:13

## 使用说明
```
yarn install embellish-image
```
```html
<a id="upload" class="style">上传图片</a>

<a id="save">确认上传</a>
```

```js
import EmbellishImage from 'embellish-image';

const config = {
  width: 400,
  height: 300,
  serverURL: 'server url here.'
};

const dom = document.getElementById('upload');

// init
const embellishImage = new EmbellishImage(dom, config);

// <!--save-->
document.getElementById('save').onclick(function() {

  embellishImage.save();
})
```

## 产品需求
- 图片上传
- 封装保存图片到服务器的接口
- 优化美化图片(Canvas的熟练应用)
- 支持拍照上传