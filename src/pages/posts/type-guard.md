---
layout: ../../layouts/MarkdownPostLayout.astro

title: "Type Guard（型ガード）の色々な例"
pubDate: 2023/05/14
# description: "This is the first post of my new Astro blog."
# image:
#   url: "https://astro.build/assets/blog/astro-1-release-update/cover.jpeg"
#   alt: "The Astro logo with the word One."false
tags: ["TypeScript"]
draft: false
---

# Type Guard（型ガード）とは

型の絞り込み。  
型が複数考えられる場合に Type Guard で型を特定していくこと。

# tyepof を使った Type Guard

以下のように、typeof 用いることで型の絞り込みが出来る。

```ts
export const foo = (value: string | number | boolean) => {
  if (typeof value === "string") {
    return value;
    // value: string
  }
  if (typeof value === "number") {
    return value;
    // value: number
  }
  return value;
  // value: boolean
};
```

# JavaScript や演算子を使った Type Guard

## JavaScript を使った Type Guard

Array.isArray()のような JavaScript のメソッドを用いて、型の絞り込みが出来る。

```ts
export const foo = (value: string | string[]) => {
  if (Array.isArray(value)) {
    return value;
    // value: string[]
  }
  return value;
  // value: string
};
```

## 演算子を使った Type Guard

例えば以下のように論理否定演算子を用いて、value が falsy だった場合に if 文の中を返すことで、undefined の可能性を消去できる。

```ts
export const foo = (value?: string) => {
  if (!value) {
    return value;
    // value: string | undefined
  }
  return value;
  // value: string
};
```

こちらは頻出で、React 等を使っていて上から props が渡ってきた時に props の値がオプショナルだった場合に可能性を消去する。  
そして、下の return 文でコンポーネントを記述する。のような場面で出てくる。

ちなみに、if 文内は<code>value: string | undefined</code>となっているが、空文字に<strong>!</strong>を付けると<strong>truthy となる=条件分岐に入り string の可能性が残る</strong>ということ。  
実際は以下のように、null やただの return にする。

```ts
export const foo = (value?: string) => {
  if (!value) {
    return null;
  }
  return value;
};
```

or

```ts
export const foo = (value?: string) => {
  if (!value) {
    return;
  }
  return value;
};
```

## in 演算子を使った Type Guard

以下のように<code>"nickname" in value</code>とすることで、value に nickname があるかどうかで、型の絞り込みが出来る。

```ts
type UserA = { name: string };
type UserB = { name: string; nickname: string };

export const foo = (value: UserA | UserB) => {
  if ("nickname" in value) {
    return value;
    // value: UserB
  }
  return value;
  // value: UserA
};
```

# タグ付き Union Types(Discriminated Union,Taggrd Union)を使った Type Guard

以下のように UserA も UserB も同じようなプロパティを持っている時に、タグ付き Union Types を用いて型の絞り込みが出来る。

```ts
type UserA = { name: string; lang: "ja" };
type UserB = { name: string; lang: "en" };

export const foo = (value: UserA | UserB) => {
  if (value.lang === "ja") {
    return value;
    // value: UserA
  }
  return value;
  // value: UserB
};
```

実際には Admin と一般ユーザーを分けたりするような type,kind,id 等をよく見るが特に決まりはなく、色々なプロパティが Tag として使われる。

# switch 文を使った Type Guard

以下のように、switch 文を用いて型の絞り込みが出来る。

```ts
type UserA = { name: string; lang: "ja" };
type UserB = { name: string; lang: "en" };
type UserC = { name: string; lang: "fr" };

export const foo = (value: UserA | UserB | UserC) => {
  switch (value.lang) {
    case "ja": {
      return value;
    }
    case "en": {
      return value;
    }
    case "fr": {
      return value;
    }
    default: {
      throw Error("lang is not defined!");
    }
  }
};
```
