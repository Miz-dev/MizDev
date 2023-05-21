---
layout: ../../layouts/MarkdownPostLayout.astro

title: "Genericsの型引数が複数あるパターン"
pubDate: 2023/05/22
# description: "This is the first post of my new Astro blog."
# image:
#   url: "https://astro.build/assets/blog/astro-1-release-update/cover.jpeg"
#   alt: "The Astro logo with the word One."
tags: ["TypeScript"]
draft: false
---

# Generics の型引数が複数あるパターン

以下のようにカンマ区切りで記述する。

```ts
const foo = <T, K, U>(foo: T, bar: K, baz: U) => {
  return {};
};
```

また、以下のように型引数それぞれに初期値や extends の制約を付け加えることも出来る。

```ts
const foo = <T extends string, K extends number, U = boolean>(
  foo: T,
  bar: K,
  baz: U
) => {
  return {};
};
```

## Lookup Types

以下のように T[K]の構文で記述する。

```ts
const foo = <T extends string, K extends number, U = boolean>(
  foo: T,
  bar: K,
  baz: U
) => {
  return {};
};

type Obj = {
  a: number;
  b: boolean;
};

type Foo = Obj["a"];
```

## Generics と Lookup Types が合わさったパターン

第一引数の T は第二引数で用いることができる。 extends と keyof を用いて、オブジェクト T の key を K に制約している。 それにより、Lookup Types の obj[key]でエラーが出なくなる。

```ts
const getProperty = <T, K extends keyof T>(obj: T, key: K) => {
  return obj[key];
};

const obj = {
  foo: 1,
  bar: 2,
  baz: 3,
};

const hoge = getProperty(obj, "bar");
// const hoge: number
```

また、setProperty また、の例として以下のように記述する。 第三引数に value: T[K]とすることで、value は number 型となる。

```ts
const getProperty = <T, K extends keyof T>(obj: T, key: K) => {
  return obj[key];
};

const setProperty = <T, K extends keyof T>(obj: T, key: K, value: T[K]) => {
  obj[key] = value;
};

const obj = {
  foo: 1,
  bar: 2,
  baz: 3,
};

const hoge = getProperty(obj, "bar");

setProperty(obj, "bar", 100);
```

# JavaScript で用いられる Generics

## map 関数

map 関数の場合、以下のように型推論が上手く動いている。 map 自体が Generics になっていて、暗黙的な型解決でうまく推論してくれている。
