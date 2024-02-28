---
layout: ../../layouts/MarkdownPostLayout.astro

title: "画面幅768pxを基準にリロード"
pubDate: 2024/02/29
# description: "This is the first post of my new Astro blog."
# image:
#   url: "https://astro.build/assets/blog/astro-1-release-update/cover.jpeg"
#   alt: "The Astro logo with the word One."
tags: ["JavaScript"]
draft: false
---

## 画面幅768pxを基準にリロードさせる

```javascript
export const reloadOnWindowResize = () => {
  // ブレークポイントを定義する（768ピクセル以下でリサイズ発火）
  const breakPoint = 768;
  // リサイズの状態を保持するフラグ
  let resizeFlag = breakPoint < window.innerWidth;

  // リサイズイベントを処理する関数
  const handleResize = () => {
    // 現在のウィンドウ幅を取得
    const currentWidth = window.innerWidth;

    // ウィンドウのサイズがブレークポイントを超えた場合、またはブレークポイント以下に戻った場合にページをリロード
    if ((breakPoint < currentWidth && !resizeFlag) || (breakPoint >= currentWidth && resizeFlag)) {
      window.location.reload();
    }
  };

  // ウィンドウのリサイズイベントにハンドラーを追加
  window.addEventListener("resize", handleResize);

  // 初回のリサイズ処理を実行
  handleResize();
};
```

このコードは、ウィンドウのリサイズイベントを監視し、指定されたブレークポイント以下であればページをリロードする機能を実装しています。

1. **`const resize = () => { ... }`**: **`resize`** という名前の定数に、アロー関数が代入されています。この関数は、ページのリサイズを監視し、リサイズに応じてページのリロードを行います。
2. **`const breakPoint = 768;`**: ページのリロードが行われる条件となるブレークポイントを定義しています。このブレークポイントは、768ピクセル以下のウィンドウ幅として設定されています。
3. **`let resizeFlag = breakPoint < window.innerWidth;`**: **`resizeFlag`** という変数を定義し、初期値として現在のウィンドウ幅がブレークポイントより大きいかどうかを設定しています。この変数は、ウィンドウのサイズがブレークポイントを超えたかどうかを追跡します。
4. **`const handleResize = () => { ... }`**: **`handleResize`** という名前のアロー関数を定義しています。この関数は、ウィンドウのリサイズイベントが発生した際に呼び出されます。ウィンドウのサイズを確認し、ブレークポイントを超えた場合はページをリロードします。
5. **`window.addEventListener("resize", handleResize);`**: ウィンドウのリサイズイベントに **`handleResize`** 関数を登録しています。つまり、ウィンドウがリサイズされるたびに **`handleResize`** 関数が実行されます。
6. **`handleResize();`**: 初回のリサイズ処理を手動で実行しています。これにより、ページが読み込まれた直後にもウィンドウのサイズに応じた処理が行われます。
7. **`resize();`**: 最後に、**`resize`** 関数が呼び出されます。これにより、ページのリサイズを監視する処理が開始されます。

このコードは、ウィンドウのリサイズに応じてページのリロードを行う簡単な仕組みを提供しています。主に、レスポンシブなデザインが必要な場合に使用されます。
