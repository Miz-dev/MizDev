---
layout: ../../layouts/MarkdownPostLayout.astro

title: "typeofとkeyofについて"
pubDate: 2023/05/07
# description: "This is the first post of my new Astro blog."
# image:
#   url: "https://astro.build/assets/blog/astro-1-release-update/cover.jpeg"
#   alt: "The Astro logo with the word One."
tags: ["TypeScript"]
draft: false
---

# typeof と keyof

型クエリーと呼ばれるもの。

## 型クエリーとは

指定したものから型をキャプチャするためのもの。  
自分で宣言した変数や、外部パッケージからインポートしてきた関数など、何か指定したものから型をコピーして使いたい時に使われるものが型クエリー。

型クエリーの種類として、typeof と keyof がある。

## typeof
型アノテーションしたものだけではなく、型推論で導かれた型定義もキャプチャすることができる。  
ちなみに、型アノテーションの方が優先される。

```ts
export const foo: string;

type Foo = typeof foo;
// type Foo = string

export const foo = "123";

type Foo = typeof foo;
// type Foo = "123"

export const foo: string = "123";

type Foo = typeof foo;
// type Foo = string
```

### typeof の注意点
typeof は型定義以外のものに対して使う。

## typeof のユースケース
### オブジェクト作成時  
ある変数の方と全く同じだが、別の変数を定義したい時に便利。

```ts
export const obj1 = {
foo: "foo",
bar: "bar",
};

const obj2: typeof obj1 = {
foo: "aaaaa",
bar: "bbbbb",
};
```

### 型の絞り込み
型の絞り込みをしたい時によく使われる。

```ts
export function double (x: number | string) {
if (typeof x === "string") {
return Number(x) _ 2;
}
return x _ 2;
}
```

## keyof
keyof はオブジェクトのプロパティ名を Lyteral Types として一覧で取得できるもの。

```ts
export type Obj = {
foo: string;
bar: number;
}
```
上記を Lyteral Types、かつ Union Types として取得するために使うのが keyof。

```ts
export type Obj = {
foo: string;
bar: number;
}

type key = keyof Obj;

const key: key = "bar";
```

### keyof の注意点
keyof は型定義に対して使う型クエリー。

# keyof のユースケース
keyof のユースケースは多々あるため、例として以下の 1 つを挙げる。

## オブジェクトのプロパティ名を引数とした関数作成時
オブジェクトのプロパティ名を引数とした関数を作成したい時に使用出来る。

# keyof と typeof の組み合わせについて
keyof と typeof は組み合わせて使うこともよくある。

```ts
export const Obj = {
foo: "foo",
bar: "bar",
}

// type Obj = typeof Obj;
// type Key = keyof Obj;

type key = keyof typeof Obj;
// typeof keyof Obj;では、エラーとなるので注意

// const key: Key = "bar";
```

組み合わせの際には、keyof typeof 〇〇;の順番で記述する。  
※typeof keyof Obj;では、エラーとなるので注意。
