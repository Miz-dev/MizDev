---
layout: ../../layouts/MarkdownPostLayout.astro

title: "ユーザー定義のType Guard"
pubDate: 2023/05/18
# description: "This is the first post of my new Astro blog."
# image:
#   url: "https://astro.build/assets/blog/astro-1-release-update/cover.jpeg"
#   alt: "The Astro logo with the word One."
tags: ["TypeScript"]
draft: false
---

# ユーザー定義の Type Guard がなぜ必要か？

以下のように、value が any だった場合、if 文で絞り込んでも any となってしまい、Type Guard が機能しなくなってしまう。

```ts
type UserA = { name: string; lang: "ja" };
type UserB = { name: string; lang: "en" };

const foo = (value: any) => {
  if (value.lang === "ja") {
    return value;
    // value: any
  }
  return value;
  // value: any
};
```

この時に生きてくるのがユーザー定義の Type Guard。

# ユーザー定義の Type Guard の構文

関数の返り値が true の場合、is 〇〇で指定した型が適用される。

```ts
type UserA = { name: string; lang: "ja" };
type UserB = { name: string; lang: "en" };

const isUserA = (user: UserA | UserB): user is UserA => {
  return user.lang == "ja";
};

const foo = (value: any) => {
  if (isUserA(value)) {
    return value;
    // value: UserA
  }
  return value;
  // value: any
};
```

注意点として最後に return で返している value の型が any となっている。  
そもそも value は any としているので、事前に isUserA で絞り込んでも最終的に any の可能性が消える訳ではないため、UserB ではなく any となる。  
もし、UserB も絞り込む場合は以下のように UserB も追加する。

```ts
type UserA = { name: string; lang: "ja" };
type UserB = { name: string; lang: "en" };

const isUserA = (user: UserA | UserB): user is UserA => {
  return user.lang == "ja";
};

const isUserB = (user: UserA | UserB): user is UserB => {
  return user.lang == "en";
};

const foo = (value: any) => {
  if (isUserA(value)) {
    return value;
    // value: UserA
  }
  if (isUserB(value)) {
    return value;
    // value: UserB
  }
  return value;
  // value: any
};
```

# ユーザー定義の Type Guard がよく使われる事例

## 非同期処理

自分の監視の範囲外からデータを取得する場合にレスポンスに型を付与することが難しい。  
今は色々と技術はあるが、非同期処理で得たデータは型が付いていないことが多い。  
そのため、ユーザー定義の Type Guard を使うことによって解決していく。

```ts
type UserA = { name: string; lang: "ja" };
type UserB = { name: string; lang: "en" };

const isUserA = (user: UserA | UserB): user is UserA => {
  return user.lang == "ja";
};

const isUserB = (user: UserA | UserB): user is UserB => {
  return user.lang == "en";
};

const foo = async () => {
  const res = await fetch("");
  const json = await res.json();
  if (isUserA(json)) {
    return json.lang;
    // lang: "ja"
  }
};
```

外部の API を叩いた時のレスポンスに型をつけたい場合は上記のように使用する。

## filter 関数

現状、JavaScript の filter 関数を使っても型まで絞り込むことが出来ない。  
それを型付きで絞り込むためにユーザー定義の Type Guard を用いる。

通常、以下のように filter 関数で"ja"のユーザーを絞り込めるが、ここでは型まで絞り込めない。

```ts
type UserA = { name: string; lang: "ja" };
type UserB = { name: string; lang: "en" };

const isUserA = (user: UserA | UserB): user is UserA => {
  return user.lang == "ja";
};

const isUserB = (user: UserA | UserB): user is UserB => {
  return user.lang == "en";
};

const users: (UserA | UserB)[] = [
  { name: "たなか", lang: "ja" },
  { name: "やまだ", lang: "ja" },
  { name: "ジョニー", lang: "en" },
];

const japanese = users.filter((user) => user.lang === "ja");
// japanese: (UserA | UserB)[]
```

そこで、isUserA の(user.....)の箇所と、filter()内が同様の構文になっていることに着目し、以下のように記述することで、型を絞り込むことができる。

```ts
type UserA = { name: string; lang: "ja" };
type UserB = { name: string; lang: "en" };

const isUserA = (user: UserA | UserB): user is UserA => {
  return user.lang == "ja";
};

const isUserB = (user: UserA | UserB): user is UserB => {
  return user.lang == "en";
};

const users: (UserA | UserB)[] = [
  { name: "たなか", lang: "ja" },
  { name: "やまだ", lang: "ja" },
  { name: "ジョニー", lang: "en" },
];

const japanese = users.filter(isUserA);
// japanese: UserA[]

const notJapanese = users.filter(isUserB);
// notJapanese: UserB[]
```
