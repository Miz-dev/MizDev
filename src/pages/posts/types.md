---
layout: ../../layouts/MarkdownPostLayout.astro

title: "型推論・型アノテーション・型アサーション"
pubDate: 2023/05/05
# description: "This is the first post of my new Astro blog."
# image:
#   url: "https://astro.build/assets/blog/astro-1-release-update/cover.jpeg"
#   alt: "The Astro logo with the word One."
tags: ["TypeScript"]
draft: false
---

# 型推論(Type Inference)

TypeScript は自動的に型を付与してくれる。  
TypeScript が推測して、宣言に対して方を付与してくれる。

そのため、特にこちらから型を付与しなくても、ある程度型ありの状態で開発することができる。

# 型アノテーション(型注釈　 Type Annotation)

プログラマー側で明示的に型を付ける方法。

## 自動的に型を付与してくれる型推論があるが、型アノテーションを使用する理由

### 1.型アノテーションがドキュメント的な役割を果たす。

明示的に型が付与されているので、ここには何が入るべきなのかがわかりやすい。

### 2.コンパイラ側理解の助けになり、コンパイル速度が上がる。

型アノテーションを付与することによって、型推論をスキップでき、コンパイル速度が上がる。

### 3.型推論だけでは足りない場面が、意外とある。

型推論では、型をうまく推論出来ない場面が多々ある。  
型アノテーションを上手く使わないと、型が付いていなかったり、型が間違っていたりするので、こういう場面ではどうしても必要になる。

### 4.プログラマーが主体となってコードを書いていける(開発者ドリブン)

予め型が明示的に示されているため、後でリファクタリングする際にそのことを頭に入れながらコードを書いていくことができる。  
また、1 から書く場合でも予め型を明示的に示すことで、常に意識してコードを書いていくことができる。  
→ 型推論とはトレードオフ

# 型アサーション(Type Assertion)

既にある方に対して、上書きで型を付与すること。  
ただし、型アサーションは基本的に多用するべきではない。  
→ 型アサーションを多用するとプログラマー側が型を自由にいじれてしまうため、型の整合性が取れなくなってしまう。

※型推論や型アノテーションで上手く出来ている部分に関しては、触らないほうが良い。

## 型アサーションを使用する場面

外部とリクエストを行ってレスポンシブの型が分からなかったり、外部ライブラリを使用する時に方が用意されていなかったり不十分だったりする場合には、どうしても型アサーションを使用しなければならない場面が存在する。

## 記述方法

<code>as { bar: number }</code>を付与することで、上書きをすることができる。

```ts
let foo = {} as { bar: number };
```

## 型アサーションをなるべく使わない方法

型ガード(Type Guard)という方法がある。

# 型の使い分け

型をどうやって使い分けるかはチームによる。

## TypeScript をしっかり学んで精通しているチーム

型アノテーション

## TypeScript に詳しくないチーム

型を全てに対して上手くつけるのは難しいため、型アサーションで上書きしていくチームもある。

## チームの指向性によっても変わる

コードの記述量が多くなるのが嫌なチームであれば型推論を使用していく。
