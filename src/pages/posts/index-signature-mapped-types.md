---
layout: ../../layouts/MarkdownPostLayout.astro

title: "Index SignatureとMapped Types"
pubDate: 2023/05/13
# description: "This is the first post of my new Astro blog."
# image:
#   url: "https://astro.build/assets/blog/astro-1-release-update/cover.jpeg"
#   alt: "The Astro logo with the word One."
tags: ["TypeScript"]
draft: false
---

# Index Signature

オブジェクトのプロパティを動的に追加したい時に使用する。  
「key」の部分は key では無い文言でも問題ないが、慣習的に「key」がよく使用される。

```ts
export type User = {
  name: string;
  [key: string]: string;
};

const user: User = {
  name: "テスト",
  account: "test",
};
```

## Index Signature の欠点

### 他の型のプロパティがある場合に不都合が起こる。

Index Signature で string 型を指定しているので、number 型が入るとエラーとなる。

```ts
export type User = {
  name: string;
  age: number;
  [key: string]: string;
};

const user: User = {
  name: "テスト",
  age: 25,
  account: "test",
};
```

以下のように Union Types で指定することで回避することが可能。

```ts
export type User = {
  name: string;
  age: number;
  [key: string]: string | number;
};

const user: User = {
  name: "テスト",
  age: 25,
  account: "test",
};
```

ただし、他のプロパティと型が違う場合には色々な型を付与しなければならないのは、Index Signature の欠点。

### 存在しないプロパティに対して undefined を付与して考慮しなければいけない。

以下のように、undefined を付与することで対処は出来る。

```ts
export type User = {
  name: string;
  age: number;
  [key: string]: string | number | undefined;
};

const user: User = {
  name: "テスト",
  age: 25,
  account: "test",
};
```

ただし、存在するプロパティに対しても undefined が付与されてしまうため、使い勝手が悪くなってしまう。  
そのため、typeof 等を使用して絞り込まないとメソッドにもアクセス出来ない。

Index Signature は便利ではあるが、型がもろくなってしまうので多用するべきではない。

# Mapped Types

以下の 2 点に大きく分類できる。

- オブジェクトのプロパティ名を限定する場面
- ジェネリクスと組み合わせて便利な型を作り出す場面
  以下の[K in …]の「K」の箇所は何でも良いが、慣習的に Key の意で K や Properties の意で P とすることが多い。

```ts
export type User = {
  name: string;
} & PersonalData;

type PersonalData = {
  // height: number;
  // weight: number;
  [K in "height" | "weight"]: number;
};

const user: User = {
  name: "テスト",
  height: 178,
  weight: 65,
};
```

## Mapped Types のメリット

### 別の型から参照することが出来る

以下のように keyof や更に keyof tepeof で変数から直接プロパティ名を指定することも出来る。

```ts
export type User = {
  name: string;
} & PersonalData;

const foo = {
  height: 200,
  weight: 100,
};

type PersonalData = {
  // height: number;
  // weight: number;
  [K in keyof typeof foo]: number;
};

const user: User = {
  name: "テスト",
  height: 178,
  weight: 65,
};
```

### 一括で色々な指定をすることが出来る

以下のように Mapped Types の後に「?」を付けることでオプショナルにすることが出来るため、\***\*「\*\***weight」が無くても必須ではないのでエラーとならなくなる。

```ts
export type User = {
  name: string;
} & PersonalData;

type PersonalData = {
  // height: number;
  // weight: number;
  [K in "height" | "weight"]?: number;
};

const user: User = {
  name: "テスト",
  height: 178,
};
```

ちなみに、このオプショナルの書き方は Index Signature では出来ないため注意。

以下のようにオブジェクトのような感じで PersonalData[K]とすることで、PersonalData の number 等を取り出すことができる。

```ts
type PersonalData = {
  height: number;
  weight: number;
  realName: string;
};
type optionalPersonalData = {
  [K in keyof PersonalData]?: PersonalData[K];
  // height: number;
  // weight: number;
};
```

また、以下のように「-?」とすることで、反対にプロパティを必須にすることが出来る。

```ts
type PersonalData = {
  height?: number;
  weight?: number;
  realName?: string;
};
type RiquiredPersonalData = {
  [K in keyof PersonalData]-?: PersonalData[K];
  // height: number;
  // weight: number;
};
```
