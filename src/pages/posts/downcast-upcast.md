---
layout: ../../layouts/MarkdownPostLayout.astro

title: "ダウンキャストやアップキャストとは"
pubDate: 2023/05/08
# description: "This is the first post of my new Astro blog."
# image:
#   url: "https://astro.build/assets/blog/astro-1-release-update/cover.jpeg"
#   alt: "The Astro logo with the word One."false
tags: ["TypeScript"]
draft: false
---

# ダウンキャストやアップキャストとは

型を変える行為のこと。

# 何故、型を変える必要があるのか

まず、以下のコードのように最初に定義した color は String Literal Types となるが、theme 内の color は string となる。

```ts
export const color = "red";
// const color: "red"

const theme = {
  color: "red",
  // (property) color: string
};

theme.color = "blue";
```

## 何故、このような挙動になるのか

TypeScript が JavaScript の仕様に基づいて作られているからで、JavaScript では const で宣言したものは後から変更ができない。  
しかし、オブジェクト内のプロパティに関しては const でオブジェクトを定義していたとしても、変更出来る仕様になっている。  
そのため、オブジェクト内の color が仮に string ではなく”red”で推論されたとして、後から変更できてしまうと不都合が起こる。  
そうならないように、最初から TypeScript ではオブジェクト内のプロパティに対しては Literal Types で宣言されることがないようになっている。

このように、TypeScript は JavaScript の互換性を重視しているため、型推論の結果がプログラマの意図しないものになることが多々ある。  
今回の例で、オブジェクト内の”red”は必ず”red”なので、string ではなく String Literal Types として最初から推論されてほしい場合にプログラマで挙動を変えることができる。  
それが「<strong>ダウンキャスト</strong>」と「<strong>アップキャスト</strong>」。

# ダウンキャスト

型推論で導かれた型が抽象的すぎる場合に、プログラマー側でより型を詳しくすること。  
抽象度の高い方をより詳しい型にしていくこと。

## as を使ったダウンキャスト

<code>as 〇〇</code>とすることで、設定することができる。

```ts
const theme = {
  color: "red" as "red",
};
```

ただし、以下のようにそもそも互換性が無いものに関してはエラーとなるので注意。

```ts
const theme = {
  color: "red" as number,
};
```

## const assertion

自分が定義した値を性とする書き方。  
設定されている値をそのまま使用したい場合は<code>as const</code>とすることで同様の結果が得られる。

```ts
const theme = {
  color: "red" as const,
};
```

## オブジェクトに対して as const

オブジェクトの各プロパティに<code>as const</code>を付与したい場合は、以下のように最後に<code>as const</code>を記述することで、各プロパティに<code>as const</code>を付与した場合と同じ挙動となる。

```ts
const theme = {
  color: "red",
  backgroundColor: "blue",
} as const;
```

ちなみに、readonly も付与され読み取り専用(書き換えることが出来ない)となる。

## const assertion を実践で使う例

何かしらの定数ファイルを作成するときによく使われる。  
後で書き換えられると困るものに関しては、予め const assertion を用いて読み取り専用としておくと良い。

```ts
export const PATH = {
  INDEX: "/",
  LOGIN: "/login",
  REGISTER: "/register",
  PROFILE: "/profile",
} as const;
```

# アップキャスト

型の抽象度を上げること。  
ただし、TypeScript 開発においてはバグを生みやすくなるため、基本的にはアップキャストはするべきではない。

## アップキャストを使用する場面

外部パッケージ等で型の定義が分からない場合など、型を自分の力だけでは解決出来ないとき。  
「<strong>as any</strong>」を用いて、型の抽象度を上げる。
