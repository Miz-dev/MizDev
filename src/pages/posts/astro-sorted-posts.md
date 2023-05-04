---
layout: ../../layouts/MarkdownPostLayout.astro

title: "Astroで最新記事から日付順に記事一覧を表示する方法"
pubDate: 2023/05/04
# description: "This is the first post of my new Astro blog."
# image:
#   url: "https://astro.build/assets/blog/astro-1-release-update/cover.jpeg"
#   alt: "The Astro logo with the word One."
tags: ["Astro"]
draft: false
---

Astro は、静的サイトジェネレーターであり、React や Vue.js のようなフレームワークと同様に、コンポーネントベースの開発をサポートしています。

Astro では、Markdown ファイルの Frontmatter から日付情報を取得して記事一覧を生成することができます。この記事では、最新記事から日付順に記事一覧を表示する方法を説明します。

# 1. 記事一覧を取得する

まず、以下のように Astro.glob()を使用して、記事一覧を取得します。

```jsx
const allPosts = await Astro.glob("../pages/posts/_.md");
const nonDraftPosts = allPosts.filter((post) => !post.frontmatter.draft);
```

このコードでは、Astro.glob()を使用して、../pages/posts/\_.md にマッチする Markdown ファイルのリストを取得しています。filter()を使用して、draft が true でない記事のみを取得しています。

# 2. 日付順にソートする

次に、記事を日付順にソートします。以下のように、sort()メソッドを使用して、pubDate の値に基づいて記事を並び替えます。

```jsx
const sortedPosts = nonDraftPosts.sort((a, b) => {
  const aDate = new Date(a.frontmatter.pubDate);
  const bDate = new Date(b.frontmatter.pubDate);
  return bDate - aDate;
});
```

ただ、このコードでは「算術演算の右辺には、'any' 型、'number' 型、'bigint' 型、または列挙型を指定する必要があります。」とエラーがでてしまいます。

このエラーは、比較する値の型が不明確なために発生しているようです。  
具体的には、a.frontmatter.pubDate と b.frontmatter.pubDate の値が文字列型であるため、比較演算子 < および > を使用することができません。

この問題を解決するために、以下のように new Date()を使用して、文字列を日付オブジェクトに変換し、その後に比較を行うことができます。

```jsx
const sortedPosts = nonDraftPosts.sort((a, b) => {
  const aDate = new Date(a.frontmatter.pubDate);
  const bDate = new Date(b.frontmatter.pubDate);
  return bDate.getTime() - aDate.getTime();
});
```

このコードでは、各記事の pubDate を new Date()で日付オブジェクトに変換し、getTime()を使用して、各日付オブジェクトのミリ秒数を取得しています。そして、それらの差を計算して、結果を返しています。

# 3. 記事一覧を表示する

最後に、以下のように、map()を使用して、記事一覧を表示します。

```jsx
<ul>
  {sortedPosts.map((post) => (
    <Post
      url={post.url}
      title={post.frontmatter.title}
      pubDate={post.frontmatter.pubDate}
      tags={post.frontmatter.tags}
    />
  ))}
</ul>
```

このコードでは、sortedPosts の各記事に対して、<Post>コンポーネントを使用して、リストアイテムを生成します。

# 最後に

以上で、Astro で最新記事から日付順に記事一覧を表示する方法を説明しました。これを使って、より使いやすく魅力的なブログを作成してください。
