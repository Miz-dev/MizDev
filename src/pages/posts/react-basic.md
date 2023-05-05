---
layout: ../../layouts/MarkdownPostLayout.astro

title: "Reactの基礎"
pubDate: 2023/05/02
# description: "This is the first post of my new Astro blog."
# image:
#   url: "https://astro.build/assets/blog/astro-1-release-update/cover.jpeg"
#   alt: "The Astro logo with the word One."
tags: ["React"]
draft: false
---

# はじめに

React を学び始めた時の基本的なところの備忘録となります。  
※Zenn に投稿している記事です。

## React 使用する場合

React 使用する場合、お作法として、react というライブラリからインポートする。
React のコンポーネントを書いていく場合、必ず必要となる。

```js
import React from "react";
```

※JSX を使用するだけの場合、React の import は必須ではない。

## ReactDom 使用する場合

HTML にコンポーネントを反映するために、以下を記載する。

```js
import ReactDom from "react-dom";
```

## JSX 記法

JavaScript の中で、return で HTML のタグを記述していく。

```js
const App = () => {
  return <h1>こんにちは！</h1>;
};
```

return の内容が複数になる場合は()で囲って、その中に記述していく。

```js
const App = () => {
  return (
    <>
      <h1>こんにちは！</h1>
      <p>お元気ですか？</p>
    </>
  );
};
```

### 注意

以下の記述だとエラーとなる。

```js
const App = () => {
  return (
    <h1>こんにちは！</h1>
    <p>お元気ですか？</p>
  );
};
```

理由としては、return する HTML の内容は 1 つのタグで囲わないと行けないルールがあるため。
そのため、

```js
const App = () => {
  return <>〜内容〜</>;
};
```

で囲う必要がある。
以前は以下の記述で囲っていたが、今は上記のように簡略化して記述できる。

```js
const App = () => {
  return <React.Fragment>〜内容〜</React.Fragment>;
};
```

## コンポーネント

### コンポーネントを他ファイルでも扱えるようにする

```js
export default App;
```

### コンポーネントの拡張子

拡張子が.js でも問題なく動作するが、React のコンポーネントであると分かりやすくするために拡張子は.jsx にする。

### コンポーネントの命名規則について

コンポーネント名は必ず先頭を大文字から初める。
先頭が大文字で始まり、単語の区切りを大文字とする変数名の付け方を「パスカルケース」と呼ぶ。
React のコンポーネントはこのパスカルケースで命名する。

#### 正しい例

- App
- SomeComponent

#### エラーとなる例

- app
- someComponent

#### エラーにはならないが推奨されない例

- Some_component
- Some_Component

## React でのイベントや style の扱い方

### イベントの当て方

ボタンにイベンを割り当てたい場合は、以下のようにタグの中に割り当てる。  
JSX で返している HTML のタグの中で、{}で囲うとをその中は JavaScript として認識されるので、中に JavaScript の関数等を入れる。

```js
<button onClick={onClickButton}>ボタン</button>
```

### style の当て方

直接、{}の中にオブジェクトとして{スタイル}のように入れる方法

```js
<h1 style={{ color: "red" }}>こんにちは！</h1>
```

か、予め変数を定義して、それを当てる方法がある。

```js
// 予め定義
const contentStyle = {
  color: "blue",
  fontSize: "18px"
};

〜省略〜

// 以下のように変数を入れる
<p style={contentStyle}>お元気ですか？</p>
```

#### style の注意

通常の CSS のように

```css
font-size: 18px;
```

ではなく

```js
fontSize: "18px";
```

とキャメルケースで記載する。

## Props

コンポーネントに引き渡す引数のようなもの。

- コンポーネントは、画面要素の 1 単位。大(1 画面)から小(1 つのテキストボックス)まで様々。
- Props はコンポーネントに渡される引数的なもの。

```js
<ColorfulMassage color="blue" massage="お元気ですか？" />
```

のように、「color」や「massage」のように任意の名前を付け、値を指定することで、コンポーネントに対して値を渡すことが出来る。

```js
const ColorfulMassage = (props) => {};
```

のように、コンポーネントで引数を指定することで、Props を受け取ることが出来る。  
「props」の箇所の名前は何でも良いが、props と分かるように「props」にしておくと良い。

### props の別の渡し方

コンポーネントをタグで分けて、その中に書かれたものを渡す方法もある。

```js
<ColorfulMassage color="blue">お元気ですか？</ColorfulMassage>
```

とタグで分け、

```js
<p style={contentStyle}>{props.children}</p>
```

コンポーネント側で上記のように記述する。  
「props.children」とすることで、タグで挟んだ中身を取得できる。

### props を分割代入で記述を短くする方法

上記のコードのように、毎回 props.◯◯ とするのは、少し煩雑となる。
そのため分割代入を用いて以下のように記述するとスッキリとさせることが出来る。

```js
const ColorfulMassage = (props) => {
  const { color, children } = props;
  const contentStyle = {
    color, // プロパティ名と値が同じなので、省略することができる
    fontSize: "18px",
  };

  return (
    <>
      <p style={contentStyle}>{children}</p>
    </>
  );
};
```

## useState

各コンポーネントが持つ状態。State が変更されると再レンダリングされる。
以下のように、記述する。

```js
const [num, setNum] = useState();
```

配列の分割代入で取り出す際は以下のようにする。

- 第一引数 → State として使用する変数名
- 第荷引数 → その State を変更、更新するための関数名。一般的に第一引数で命名した名前の前に「set」を付ける。

useState を使って、State の変数を定義して、更新する関数を使用することで、簡単に動的な値を作成することができる。
コンポーネント内で動的に変わる部分は useState で定義して、変数、更新する関数、初期値を設定していく。

## useEffect

useEffect を使用することで処理の監視を分離できたり、コンポーネントが表示される最初の 1 回だけ実行する処理を実装することができる。

```js
useEffect(() => {
  // 監視したい処理を記述
}, [監視対象の変数を記述]);
```

第 2 引数を空で設定すると、最初の 1 回のみ通したい処理を実行することができる。
画面を表示した時にデータを取得する際に、State が変更されるたびにデータを取得しに行くとパフォーマンスが悪くなるため、
その時に使用する。

```js
// 毎回実行される
useEffect(() => {
  console.log("◯◯◯", count);
});

// 初回レンダリング後のみ実行される
useEffect(() => {
  console.log("◯◯◯", count);
}, []);

// triggerが変更される度に実行される
useEffect(() => {
  console.log("◯◯◯", count);
}, [trigger]);

// trigger1かtorigger2が変更される度に実行される
useEffect(() => {
  console.log("◯◯◯", count);
}, [trigger1, trigger2]);
```

## 論理演算子の応用

以下のようにすると、予め設定した showFlag が true の時に、何か表示するという実装を行える。

```js
{
  showFlag && <p>テキスト</p>;
}
```

### 分岐方法

以下の特性を利用して、条件分岐を行う。

- || 左側が false だったら右側を返す
- && 左側が true だったら右側を返す

```js
if (条件) {
  showFlag || setShowFlag(true); // showFlagがfalseだったらshowFlagをtrueにする
} else {
  showFlag && setShowFlag(false); // showFlagがtrueだったらshowFlagをfalseにする
}
```

## export default と export の違い

export には 2 つの記述方法があるが、React では定義した関数の前に記述する「export」の方が良い。
理由としては、コンポーネントの名称が確約されるため。

### export default の記述

もし、export 先の記述でタイポがあり、そのタイポのまま記述していた場合にはエラーが出ない。

```js
// export先の記述
import ColorfulMassage from "./components/ColorfulMassage";

// export元の記述
export default ColorfulMassage;
```

### export の記述

もし、export 先の記述でタイポがあった場合には、エラーとなる。
そのため、タイポに気づかずに開発が進んでいってしまうことが防げる。

```js
// export先の記述
import { ColorfulMassage } from "./components/ColorfulMassage";

// export元の記述
export const ColorfulMassage = (props) => {
  省略;
};
```

## 再レンダリングがされる条件

- state が更新されたコンポーネントは再レンダリング
- props が更新されたコンポーネントは再レンダリング
- 再レンダリングされたコンポーネント配下の子要素は再レンダリング

## memo

親の再レンダリングに伴って不要なレンダリングを起こさないようにするために、
コンポーネントを memo()で囲う。
基本的には memo で囲うと良いが、memo 化することのコストもあるので最小粒度のコンポーネントまではしなくて良いが以下のような場合は、memo 化しておくと良い。

- 複数の要素から成り立っているコンポーネント
- 今後、肥大化が予想されるコンポーネント

コンポーネントを memo で囲うとその中身が変更されないとレンダリング memo

## useCallback()

useCallback()は memo 化されたコールバック関数を返す。

```js
useCallback(コールバック関数, [監視対象]);
```

先程の memo 化とそこに関数を渡していく場合は、関数の方の memo 化(= useCallback)の 2 つを組み合わせる必要がある。

## Zenn 記事

<a href="https://zenn.dev/miz_dev/articles/4e6baa5b747c5d" target="_blank">React の基本的なところを備忘として残しておく</a>
