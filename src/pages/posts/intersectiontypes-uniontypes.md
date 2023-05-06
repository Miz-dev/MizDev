---
layout: ../../layouts/MarkdownPostLayout.astro

title: "Intersection TypesとUnion Types"
pubDate: 2023/05/06
# description: "This is the first post of my new Astro blog."
# image:
#   url: "https://astro.build/assets/blog/astro-1-release-update/cover.jpeg"
#   alt: "The Astro logo with the word One."
tags: ["TypeScript"]
draft: false
---

# Intersection Types（交差型）

複数の型を 1 つにまとめることが出来るもの。

## Type Alias

型に名前を付けることが出来るもの。  
型が長くなって見づらくなってしまう時に Type Alias として定義しておくことで後ほどのコードの見通しが良くなる。

```ts
type Foo = {
  a: number;
  b: string;
};

const Test: Foo = {
  a: 1,
  b: "test",
};
```

## Intersection Types

Intersection Types（交差型）は以下のように「&」で Type Alias を繋げることで複数の型をまとめることが出来る。

```ts
type Foo = {
  a: number;
  b: string;
};
type Bar = {
  c: boolean;
};
type FooBer = Foo & Bar;

const Test: FooBer = {
  a: 1,
  b: "",
  c: true,
};
```

# Union Types（共用体型・合併型）

複数の型があった場合にどれか 1 つが成立すれば OK。  
「どちらか一方の型になる」という訳では無いので注意。  
※もしそうであれば全ての型があった場合にエラーとなってしまうため。

Union Types（共用体型・合併型）は以下のように「|」で Type Alias を繋げることで複数の型をまとめることが出来る。

```ts
type Foo = {
  a: number;
  b: string;
};
type Bar = {
  c: boolean;
};
type FooBer = Foo | Bar;

const Test: FooBer = {
  a: 1,
  b: "",
  c: true,
};
```

## Union Types の絞り込み

以下のような場合に、例えば a を string として扱いたいとなった場合に、補完で number の方の補完も出てしまう等の不都合が出てきてしまう。

```ts
type Foo = {
  a: number;
  b: string;
};
type Bar = {
  a: string;
  b: boolean;
};
type FooBer = Foo | Bar;

const Test: FooBer = {
  a: 1,
  b: "",
  c: true,
};
```

それを解決するために、以下のように「in 演算子」を用いて解決することができる。

```ts
type Foo = {
  a: number;
  b: string;
};
type Bar = {
  a: string;
  b: boolean;
};
type FooBer = Foo | Bar;

const test: FooBer = {
  a: 1,
  b: "",
  c: true,
};

if ("b" in test) {
  test.a.〇〇〇;
} else {
  test.c.〇〇〇;
}
```

test の b は string なので、Foo の型だと推測ができる。
