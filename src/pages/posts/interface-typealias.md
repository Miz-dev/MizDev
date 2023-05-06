---
layout: ../../layouts/MarkdownPostLayout.astro

title: "InterfaceとType Aliasの違い"
pubDate: 2023/05/07
# description: "This is the first post of my new Astro blog."
# image:
#   url: "https://astro.build/assets/blog/astro-1-release-update/cover.jpeg"
#   alt: "The Astro logo with the word One."
tags: ["TypeScript"]
draft: false
---

# Type Alias の書き方

```ts
type Foo = {
  a: number;
};

const foo: Foo = {
  a: 1,
};
```

# Interface の書き方

```ts
interface Foo {
  a: number;
}

const foo: Foo = {
  a: 1,
};
```

# Interface と Type Alias の違い

## ① 宣言できる型の違い

Interface は宣言できるものが辞書型としてのオブジェクト。  
あくまで辞書型としてのオブジェクトに対して型宣言するもの。

Type Alias は上記に限らず、オブジェクト以外のものに対しても型宣言できる。

## ②open-ended に準拠しているかどうかの違い

Type Alias は open-ended に準拠していないので、同じ名前の宣言があるとエラーが出る。  
※open-ended とは同じ名前で宣言があった時に自動的にマージされる性質のこと。

## ③ 継承（型の拡張）方法の違い

### Interface

Interface は以下のように extens を用いる

```ts
interface Foo {
  a: number;
}
interface Bar extends Foo {
  b: number;
}

const foo: Bar = {
  a: 1,
  b: 2,
};
```

### Type Alias

Type Alias は以下のように Intersection Types を用いる。

```ts
type Foo = {
  a: number;
};
type Bar = Foo & {
  b: number;
};

const foo: Bar = {
  a: 1,
  b: 2,
};
```

## ④ プロパティのオーバーライドの挙動の違い

### Interface

例としてプロパティを number から string へオーバーライドした際には、宣言の時点で、型の互換性が無いというエラーが出るため、予期せぬ値を事前に防ぐことが出来る。

### Type Alias

例としてプロパティを number から string へオーバーライドした際には、string かつ number は成り立たないので never となる。

## ⑤Mapped Types が使用できるかどうかの違い

### Interface

使用できない。

### Type Alias

使用できる。

### Mapped Types とは

他の型をもとに新しい方を作成するための方法

```ts
type Animals = "dog" | "cat";

type foo = {
  dog: number;
  cat: number;
};
```

のように Animals が増えれば増えるほど手動で増やしていくことは大変なので、以下のように Mapped Types を用いると自動的に作成することが出来る。

```ts
type Animals = "dog" | "cat";

type foo = {
  [key in Animals]: number;
};

// 以下の結果となる
// type foo = {
// dog: number;
// cat: number;
// }
```

# Interface と Type Alias どちらを使用するべきか

結論としては、どちらでも良いが Type Alias に統一した方がおすすめ。  
TypeScript の公式にも「ほとんどの場合、個人の好みに応じて選ぶことができます」と記述されている。

また、公式としては Interface を使用して Type Alias でないと出来ないことがあれば Type Alias を使用するよう記述もされているが、Interface と Type Alias のメリット・デメリットで考えると Type Alias の方がメリットが多い部分がある。

<a href="https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#type-aliases"  target="_blank">TypeScript Everyday Types</a>

## Type Alias の方がメリットが多い部分

- プリミティブ型や配列を使用できる
- open-ended に準拠していないので、同じ名前の宣言があるとエラーを出してくれる
- オーバーライドに関しては Interface の方が優秀ではあるが、そういった自体がそこまで多くなく、どの道、コンパイルエラーは出してくれるのであまり変わらない
- Mapped Types を使用できる

Type Alias に統一した方が一貫性があり、簡潔で記述も短くスッキリしている。
