---
layout: ../../layouts/MarkdownPostLayout.astro

title: "関数のGenerics"
pubDate: 2023/05/21
# description: "This is the first post of my new Astro blog."
# image:
#   url: "https://astro.build/assets/blog/astro-1-release-update/cover.jpeg"
#   alt: "The Astro logo with the word One."
tags: ["TypeScript"]
draft: false
---

# 関数 Generics の構文

以下のように記述する。

```ts
function foo<T>(arg: T) {
  return { value: arg };
}
```

# 関数 Generics の使い方

以下のように記述する。

```ts
function foo<T>(arg: T) {
  return { value: arg };
}

const foo1 = foo<number[]>([1, 2]);
```

# アロー関数での記述方法

以下のように引数の()の前に Generics を記述する。

```ts
const foo = <T>(arg: T) => {
  return { value: arg };
};

const foo1 = foo<number[]>([1, 2]);
```

# 暗黙的な型解決について

関数の Generics は暗黙的に型が解決される仕組みがある。 以下のように<code><string></code>のようにしなくても引数の型を推論して、暗黙的に型を決定してくれる。

```ts
const foo = <T>(arg: T) => {
  return { value: arg };
};

const foo1 = foo("");
// value: string;
const foo2 = foo(1);
// value: number;
const foo3 = foo(false);
// value: number;
```

このおかげで関数で Generics を使用したとしても、使う側が毎回型指定をしなくて良くなるので、 非常に便利な機能。

## どういう時に型引数を使うのか

### Nullable かもしれない場合

Nullable かもしれない場合に以下のように型引数に null を入れて対応する。 ※Nullable：Null になりうる値

```ts
const foo = <T>(arg: T) => {
  return { value: arg };
};

const foo1 = foo<string | null>("");
// value: string | null;
```

Nullable に限らず Union Types 等で後から引数に何が入ってくるかわからない場合に、 型引数を使用することが多い。

# 関数 Generics の extends による型制約

関数 Generics の型引数に制約を加えたい時に extends による型制約を用いる。

```ts
const foo = <T extends string>(arg: T) => {
  return { value: arg };
};

const foo1 = foo<string>("");
const foo2 = foo(1); // 型 'number' の引数を型 'string' のパラメーターに割り当てることはできません。
```

関数 Generics の extends による型制約は重要なもので、しっかりと理解しておく。

## なぜ関数 Generics の extends による型制約は重要なのか

arg はある程度型を特定させるために必要で、もし extends による型制約が無かったら、 arg が中でどのような型になっているかが分からなくなってしまう。

```ts
const foo = <T>(arg: T) => {
  // argが中でどのような型になっているかが分からない

  return { value: arg };
};
```

そのため、型制約がないと unknown として扱われてしまい、メソッド等を呼び出せなくなってしまう。

```ts
const foo = <T>(arg: T) => {

  arg.
  // メソッドにアクセス出来ない

  return { value: arg };
}
```

型制約があると

```ts
const foo = <T extends string>(arg: T) => {
  arg.toUpperCase();
  // メソッドにアクセス出来る

  return { value: arg };
};
```

## 関数 Generics の extends による型の絞り込み

Union Types で string または number 等の場合、以下のように上手く扱えなくなるケースが出てくる。

```ts
const foo = <T extends string | number>(arg: T) => {
  arg.toUpperCase;
  // プロパティ 'toUpperCase' は型 'string | number' に存在しません。
  // プロパティ 'toUpperCase' は型 'number' に存在しません。

  return { value: arg };
};
```

そういった時に型の絞り込みを行い対応する。

```ts
const foo = <T extends string | number>(arg: T) => {
  if (typeof arg === "string") {
    return { value: arg.toUpperCase() };
  }

  return { value: arg.toFixed() };
};
```

型引数が Union Types の場合でも型の絞り込みを使うことによって、 関数内でうまく扱える。  
ネストされたオブジェクトになっているなど、複雑な Union Types の場合でも ユーザー定義の Type Guard を使うことによって型解決できる。
