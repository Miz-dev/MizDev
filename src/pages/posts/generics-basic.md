---
layout: ../../layouts/MarkdownPostLayout.astro

title: "Genericsの基礎"
pubDate: 2023/05/20
# description: "This is the first post of my new Astro blog."
# image:
#   url: "https://astro.build/assets/blog/astro-1-release-update/cover.jpeg"
#   alt: "The Astro logo with the word One."
tags: ["TypeScript"]
draft: false
---

# Generics とは？

型の決定を遅延できるもの。  
基本的には以下のように記述する。

```ts
type Foo<T> = {
  value: T;
};

const foo: Foo<number> = {
  value: 0,
};
```

# Generics で使用される T や K などの由来

Generics で使用される T や K などの由来は以下の通り。

- T：Type
- K：Key
- U：Unknown
- E：Element

以上の 4 つが慣例的によく使われるので覚えておくと良い。

# Generics の良さ

後から使いまわしたりする際に、型を自由に定義することができる。

```ts
type Foo<T> = {
  value: T;
};

const foo1: Foo<number> = {
  value: 0,
};
const foo2: Foo<string> = {
  value: "",
};
const foo3: Foo<number[]> = {
  value: [1, 2, 3],
};
```

Generics じゃなかったら value を定義し直さなければならなくなる。

# Generics のユースケース

以下の例のように後から Japanese や American の型が決定させたい場合に使われる。

```ts
type User<T> = {
  name: string;
  state: T;
};

type Japanese = User<"東京都" | "大阪府">;
type American = User<"CA" | "NY">;

const user1: Japanese = {
  name: "田中",
  state: "東京都",
};

const user2: American = {
  name: "taylor",
  state: "CA",
};
```

Generics の初期値
<code><T = string></code>とすることで、初期値が string となる。  
そのため、foo1 で<code>Foo<string></code>としなくても、初期値は string だと暗黙的に分かっているので問題ない。

```ts
type Foo<T = string> = {
  value: T;
};

const foo1: Foo = {
  value: "",
};
const foo2: Foo<number> = {
  value: 111,
};
```

## Generics の extends による型制約

Generics の型引数に制約を加えたい時に extends による型制約を用いる。  
以下のコードだと、extends で string を指定しているので、string に互換性がない number はエラーとなる。

```ts
type Foo<T extends string> = {
  value: T;
};

const foo1: Foo<string> = {
  value: "",
};
const foo2: Foo<"abc"> = {
  value: "abc",
};
const foo3: Foo<number> = {
  // 型 'number' は制約 'string' を満たしていません。
  value: 123,
};
```

# Generics の初期値と extends による型制約の組み合わせ

シンプルに<code>= string</code>と繋げて記述すれば OK。

```ts
type Foo<T extends string = string> = {
  value: T;
};

const foo1: Foo = {
  value: "",
};
const foo2: Foo<"abc"> = {
  value: "abc",
};
```
