---
layout: ../../layouts/MarkdownPostLayout.astro

title: "Literal Typesの使い方や使い道、Wideningの概念"
pubDate: 2023/05/05
# description: "This is the first post of my new Astro blog."
# image:
#   url: "https://astro.build/assets/blog/astro-1-release-update/cover.jpeg"
#   alt: "The Astro logo with the word One."
tags: ["TypeScript"]
draft: false
---

# Literal Types

プリミティブ型の以下の 3 つを細分化したもの。

- Boolean
- String
- Number

取りうる値の中で、とある値に限定させたい場面で有用となる。

## Boolean Literal Types
以下のように、<strong style="color: red;">true</strong>に限定して受け取りたいといったような場合に使用する。

```ts
const foo: boolean = true;
↓
const foo: true = true;
```

## String Literal Types
以下のように、とある<strong style="color: red;">文字列</strong>に限定して受け取りたい場合に使用する。  
文字列を指定しているので、タイポを防ぐという意味でも有用。

```ts
const foo: string = "foo";
↓
const foo: "foo" = "foo";
```

## Number Literal Types
以下のように、とある<strong style="color: red;">数値</strong>に限定して受け取りたい場合に使用する。  
数値を指定しているので、タイポを防ぐという意味でも有用。

```ts
const foo: number = 0;
↓
const foo: 0 = 0;
```

# Literal Types の使い所
値を限定することができるので、コードを書く時の補完や予期せぬ値やタイポを防ぐことができる。  
特定の値を入れさせたい場合に便利。

# const と let の型推論の違い
## const
const の型推論では Literal Types が表示される。  
→<strong style="color: red;">再代入不可のため、特定の値だと推論できるため。</strong>

## let
Literal Types ではなく、通常の型が表示される。  
→<strong style="color: red;">let は再代入可能なので、あとから別の値が入る可能性があり、特定の値だと推論できないため。</strong>

# Widening とは
const で型推論された Literal Types を再代入可能な変数やオブジェクトのプロパティのような、後から変えられうるところに代入してしまうと、Literal Types ではない例えば string 型に拡張されてしまうことを <strong style="color: red;">Widening</strong>という。

const での Literal Types は Widening の性質を持っているため、<strong style="color: red;">Widening Literal Types</strong>と呼ばれる。

# Widening への対処
## 型アノテーション
型アノテーションを付与することによって、Literal Types のままにすることができる。  
→Widening の性質を解除することができる。

```ts
const foo: "foo" = "foo";
```

## 型アサーション
以下のように <code>as "foo"</code>を使って、Literal Types を指定する。

```ts
const foo = "foo" as "foo";
```

## const assertion
以下のように <code>as const</code>を使って、Literal Types を指定する。

```ts
const foo = "foo" as const;
```

型アサーションでの対処が少し冗長のため、こちらを使用する場合が多い。

# Widening の注意点
Widening は Literal Types に限った話ではない。  
Widening はあくまで性質のこと。

<strong style="color: red;">「型が拡張されてしまう = Widening」</strong>
