---
layout: ../../layouts/MarkdownPostLayout.astro

title: "div.innerのwrapperや個別paddingを使わずにレイアウトを実現する方法"
pubDate: 2023/08/18
# description: "This is the first post of my new Astro blog."
# image:
#   url: "https://astro.build/assets/blog/astro-1-release-update/cover.jpeg"
#   alt: "The Astro logo with the word One."false
tags: ["HTML", "CSS"]
draft: false
---

![レイアウト画像](/assets/img_20230818_1.jpg)

上記のように、画像を親の横幅 100%表示、その他は左右余白を指定するレイアウトはよくあるレイアウトかと思います。

こちらに対応するために div.inner の wrapper 要素や、余白を付けたい要素に個別 padding を使う事例もありますが、CSS Grid で名前付きグリッド線を使用したレイアウトでの実装方法をご紹介します。

## 1.親要素に grid の設定

まず、親要素（以下の例では article）に grid の設定をします。

```css
/* 親要素にgridの設定 */
.article {
  display: grid;
  grid-template-columns: [main-start] 40px [content-start] 1fr [content-end] 40px [main-end];
}
```

![レイアウト画像](/assets/img_20230818_2.jpg)

上記では`[main-start]`と`[main-end]`で囲まれた要素は横幅いっぱい、

`[content-start]`と`[content-end]`で囲まれた要素は左右余白がある要素として作成しています。

（`[main-start]`と`[content-start]`の間が 40px の余白があります。(end も同様)）

## 2.左右余白がある要素の grid 設定

```css
/* 左右余白がある要素のgrid設定 */
.article > * {
  grid-column: content;
}
```

![レイアウト画像](/assets/img_20230818_3.jpg)

左右余白がある要素は`[content-start]`と`[content-end]`に囲まれた要素なので、左右余白をつけたい要素には画像のように`grid-column: content;`と指定をします。

### 名前付きの線による暗黙のグリッド領域

`[content-start]`と`[content-end]`のように囲むとその中に`content`という名前のグリッド領域がが作成されるので、content のみで指定することが出来ます。

## 3.左右余白がある要素の grid 設定

```css
/* 親要素の横幅100%表示 */
.image {
  grid-column: main;
}
```

![レイアウト画像](/assets/img_20230818_4.jpg)

親要素の横幅 100%の要素は外側の[main-start]と[main-end]に囲まれた要素なので、画面いっぱいにしたい要素には画像のように`grid-column: main;`と指定をします。

そうすることで、div.inner の wrapper 要素や、余白を付けたい要素に個別 padding を使わずに余白有り無しレイアウトを実装することが出来ます。

## 参照

[名前付きグリッド線を使用したレイアウト](https://developer.mozilla.org/ja/docs/Web/CSS/CSS_grid_layout/Grid_layout_using_named_grid_lines)
