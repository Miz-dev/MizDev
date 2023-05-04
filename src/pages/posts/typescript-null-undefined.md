---
layout: ../../layouts/MarkdownPostLayout.astro

title: "TypeScriptでのnullとundefinedの使い分け"
pubDate: 2023/05/04
# description: "This is the first post of my new Astro blog."
# image:
#   url: "https://astro.build/assets/blog/astro-1-release-update/cover.jpeg"
#   alt: "The Astro logo with the word One."
tags: ["TypeScript"]
draft: false
---

# null

現在利用できない状態を表す型。  
明示的に使えない状態を強く表したい時に使うことが多い。  
API で json を返すときは null が使われる。

## null をしょうがなく使う場面

undefind にしたいけれども、実用上や既に使われている現状を見て全て undefind に置き換えることは出来ないから、どうしても許容しないと行けない状態。

# undefind

初期化されていない状態の型。  
暗黙的な状態を示す時に使われることが多い。  
TypeScript の開発チームは undefind 推奨。

# 参照

TypeScript Coding guidelines  
https://github.com/microsoft/TypeScript/wiki/Coding-guidelines#null-and-undefined
