# watermark-observer

[![Build status](https://img.shields.io/travis/余聪/watermark-observer/master.svg?style=flat-square)](https://travis-ci.org/余聪/watermark-observer)
[![Test coverage](https://img.shields.io/codecov/c/github/余聪/watermark-observer.svg?style=flat-square)](https://codecov.io/github/余聪/watermark-observer?branch=master)
[![NPM version](https://img.shields.io/npm/v/watermark-observer.svg?style=flat-square)](https://www.npmjs.com/package/watermark-observer)
[![NPM Downloads](https://img.shields.io/npm/dm/watermark-observer.svg?style=flat-square&maxAge=43200)](https://www.npmjs.com/package/watermark-observer)
[![Prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://prettier.io/)
[![Conventional Commits](https://img.shields.io/badge/Conventional%20Commits-1.0.0-yellow.svg?style=flat-square)](https://conventionalcommits.org)

> Watermark effect with dom observer

## Installation

```bash
npm install watermark-observer
# or use yarn
yarn add watermark-observer
```

## Usage

```javascript
import watermarkObserver, { watermarkObserverStandalone, createFixedWatermarkContainerDOM } from 'watermark-observer'

// 独立注入水印，检测到修改将会重新创建
watermarkObserverStandalone(createFixedWatermarkContainerDOM('water-mark-standlone'), require('./image.png').default)

// 注入水印至已有内容容器中，检测到修改将会重新设置样式
watermarkObserver(window.container, '/watermark')
```

## Contributing

- Fork it!
- Create your new branch:  
  `git checkout -b feature-new` or `git checkout -b fix-which-bug`
- Start your magic work now
- Make sure npm test passes
- Commit your changes:  
  `git commit -am 'feat: some description (close #123)'` or `git commit -am 'fix: some description (fix #123)'`
- Push to the branch: `git push`
- Submit a pull request :)

## Authors

This library is written and maintained by 余聪, <a href="mailto:yucong06@meituan.com">yucong06@meituan.com</a>.

## License

MIT - [余聪](https://github.com/余聪) 🐟
