# embellish-image
上传本地图片,进行裁剪,优化,美化,装饰,并保存到本地或者保存到服务器

正在开发中 ... 2017-05-17 08:57:13

## 使用说明
```
yarn install embellish-image
```

```js
import EmbellishImage from 'embellish-image';

const config = {
  width: 400,
  height: 300
};

const embellishImage = new EmbellishImage('ID', config);
```

## 产品需求
- 图片上传
- 封装保存图片到服务器的接口
- 优化美化图片(Canvas的熟练应用)
- 支持拍照上传