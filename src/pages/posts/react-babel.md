---
layout: ../../layouts/MarkdownPostLayout.astro

title: "Reactのbabelでの環境構築"
pubDate: 2023/05/05
# description: "This is the first post of my new Astro blog."
# image:
#   url: "https://astro.build/assets/blog/astro-1-release-update/cover.jpeg"
#   alt: "The Astro logo with the word One."
tags: ["React"]
draft: false
---

# インストール

まず最初に以下のコマンドをターミナルで入力する。

```
yarn add -D @babel/core @babel/preset-react babel-loader
```

ただ、これとは別に React を入れないといけない。

```
yarn add react react-dom
```

## dependencies と devDependencies

先程のコマンドでは、package.json に dependencies と devDependencies に分かれて記述がされている。  
それぞれの違いは以下の通り。

### dependencies

本番環境でも必要なもの。

```
//　例
"dependencies": {
 "react": "^17.0.2",
 "react-dom": "^17.0.2"
}
```

### devDependencies

開発時でのみ必要なもの。  
babel や webpack は本番環境では必要がないので、devDependencies でインストールする。

```
// 例
"devDependencies": {
 "@babel/core": "^7.16.7",
 "@babel/preset-react": "^7.16.7",
 "babel-loader": "^8.2.3",
 "webpack": "^5.65.0",
 "webpack-cli": "^4.9.1",
 "webpack-dev-server": "^4.7.2"
},
```

# webpack に babel の設定を記述

```
module: {
 rules: [
  {
   test: /\.js$/,
   use: [
    {
     loader: "babel-loader",
     options: {
      presets: ["@babel/react"],
     }
    }
   ]
  }
 ]
}
```

## rules

webpack のバンドル時に何をするかを記述する。

```
test: /\.js$/,
use: [
 {
  loader: "babel-loader",
  options: {
   presets: ["@babel/react"],
  }
 }
]
```

### test: /\.js$/

「/\.js$/」で、拡張子が.js のものという指定になる。

### use

test にヒットしたものに対して、use で指定したものを使用する。

### loader

.js で終わるファイルに対して、webpack でバンドル時に"babel-loader"を当てて、React 等を使用出来るようにする。という指定になる。
