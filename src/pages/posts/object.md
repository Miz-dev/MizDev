---
layout: ../../layouts/MarkdownPostLayout.astro

title: "「オブジェクト」について"
pubDate: 2023/05/06
# description: "This is the first post of my new Astro blog."
# image:
#   url: "https://astro.build/assets/blog/astro-1-release-update/cover.jpeg"
#   alt: "The Astro logo with the word One."
tags: ["TypeScript"]
draft: false
---

# 「オブジェクト」について

JavaScript では「オブジェクト」という単語の意味が 2 つある。

- プリミティブ型以外のオブジェクト（非プリミティブ型を指すオブジェクト）
- 辞書型としてのオブジェクト

非プリミティブ型のオブジェクトの中に辞書型としてのオブジェクトも含まれる。

# 空オブジェクトの型付け

空オブジェクトの型付けは、以下の 4 つがある。

```ts
let obj1: {} = {};
let obj2: object = {};
let obj3: Record<string, unknown> = {};
let obj4: { [key: string]: unknown } = {};
```

この中では obj3 と obj4 が好ましい。

## {}と object が好ましくない理由

{}は辞書型として使いたいが、obj1 と obj2 は辞書型としてのオブジェクトを指していない。  
obj1 は null と undefined 以外全て受け取れてしまうので、辞書型としてのオブジェクトに使うものではない。  
obj2 は非プリミティブ型のオブジェクトを指すときは OK だが、辞書型としてのオブジェクトとしては適していない。  
例えば配列を入れた場合、辞書型としてのオブジェクトではないが、非プリミティブ型のオブジェクトではあるため、エラーが出ない。

## 空オブジェクトのままで、中にプロパティを持ちたくない場合

もし、空オブジェクトのままで、中にプロパティを持ちたくない場合は以下のように never を記述すると、新たにプロパティを持たせようとしてもエラーを出してくれる。

```ts
let obj3: Record<string, never> = {};
let obj4: { [key: string]: never } = {};
```

# プロパティがある状態での定義方法

## Record

Record<string, unknown>の場合は以下のように記述する。

```ts
let obj3: Record<string, unknown> = {
  a: 1,
  b: "foo",
};
```

Record<〇〇, 〇〇>の１つ目はキーに対応していて、2 つ目は値に対応している。

## インデックスシグネチャ([key: string])

インデックスシグネチャ([key: string])の場合は以下のように記述する。

```ts
let obj4: { [key: string]: unknown } = {
  a: 1,
  b: "foo",
};
```

## Record よりもインデックスシグネチャが良い理由

### 特定のプロパティが存在する場合に記述しやすい。

以下のように、特定のプロパティがある場合に容易に記述することが出来る。

```ts
let obj4: { a: number; b: string; foo: string } = {
  a: 1,
  b: "foo",
  foo: "foo",
};
```

### 特定のプロパティがオプショナルである場合を表現する時も使いやすい。

以下のように、foo の後に「?」をつけることで、存在するかもしれないし、存在しないかもしれないというのを表現することができる。

```ts
let obj4: { a: number; b: string; foo?: string } = {
  a: 1,
  b: "foo",
  foo: "foo",
};
```

### オブジェクトの Value がネストした場合に Record よりも扱いやすい。

オブジェクトの Value がネストした場合でも、以下のように容易に記述することができる、

```ts
let obj4: { [key: string]: { foo: unknown } } = {
  a: {
    foo: 1,
  },
};
```

ちなみに Record を用いた場合は以下のようになる。

```ts
let obj3: Record<string, Record<"foo", unknown>> = {
  a: {
    foo: 1,
  },
};
```
