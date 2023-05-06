---
layout: ../../layouts/MarkdownPostLayout.astro

title: "TypeScriptの色々な型"
pubDate: 2023/05/06
# description: "This is the first post of my new Astro blog."
# image:
#   url: "https://astro.build/assets/blog/astro-1-release-update/cover.jpeg"
#   alt: "The Astro logo with the word One."
tags: ["TypeScript"]
draft: false
---

# Array
配列の型。  
以下のように記述する。

```ts
const foo: number[] = [1, 2, 3];
```

以下の記述でもOK。一般的には上の記述の方が多い傾向にある。

```ts
const foo: Array<number> = [1, 2, 3];
```

また、配列内に複数の型が入る場合は以下のように記述する。

```ts
const foo: (number | string | boolean)[] = [1, "a", true];
```

# Tuple
Tuple型はArrayと非常に似ているが、以下の点が異なる。

- 1つひとつの要素に対して型をつけることができる。
- 要素の数が決まっている。

以下のように記述する。

```ts
const foo: [string, number] = ["a", 1];
```
配列の要素にアクセスした時に、その要素が持っているメソッドを補完してくれる。  
そのため、Tuple型を使える場合はTuple型を使用した方が良い。

# Any
型チェックを無効にしてコンパイルを無理やり通す時に使用される。  
ただ、基本的に多用するべきではない。

# Unknown
型が不明な時に使用する点ではAnyと一緒だが、なるべく型安全にした時にUnknownが用いられる。  
Anyの場合は利用のときでもなんでもOK(エラーが出ない)だが、Unknownの場合は利用する時にエラーが出てくれるので型が安全。  

エラーが出た場合の対処としては以下のように<code>typeof</code>構文で絞り込む。

```ts
const foo: unknown = "foo";

if(typeof foo === "string") {
 foo.substring(2)
}
```

# Void
関数の返り値が何も無い場合に使用される。  
「何も返さない」というのを明示的に示す場合等、以下のように記述する。

```ts
function foo(): void {
 alert("hello");
}
```

# アロー関数の記述方法
アロー関数では2通り記述方法がある。

```ts
const foo = (): void => {
 alert("hello");
}
```

もう一つは以下のように記述する。

```ts
const foo: (): void => = () => {
 alert("hello");
}
```

どちらを使うかはケースバイケースだが、もし型を外付けする場合は以下の記述が多い。

```ts
type Foo = () => void;

const foo: Foo = () => {
 alert("hello");
}
```

# Never
発生し得ない値の型に対してNever型は付与される。