---
layout: ../../layouts/MarkdownPostLayout.astro

title: "ESLintとは"
pubDate: 2023/05/02
# description: "This is the first post of my new Astro blog."
# image:
#   url: "https://astro.build/assets/blog/astro-1-release-update/cover.jpeg"
#   alt: "The Astro logo with the word One."
tags: ["ESLint"]
draft: false
---

# ESLint とは

ESLint とはコード解析ツール。

# install

```
yarn add eslint

yarn run eslint --init
```

対話式で答えていく。

```
? How would you like to use ESLint?

> To check syntax only
> To check syntax and find problems
> To check syntax, find problems, and enforce code style

// ESLint をどのように使いたいですか？

// シンタックスチェックのみを行う場合
// シンタックスチェックと問題点の発見
// 構文チェック、問題の発見、コードスタイルの強制のため
```

```
? What type of modules does your project use? (Use arrow keys)

> JavaScript modules (import/export)
> CommonJS (require/exports)
> None of these

// プロジェクトで使用しているモジュールの種類をお教えください。(矢印キーを使用)

// JavaScript modules (import/export)
// CommonJS (require/exports)
// 該当なし
```

```
? Which framework does your project use?

> React
> Vue.js
> None of these

// プロジェクトでは、どのフレームワークを使用していますか？

// React
// Vue.js
// 該当なし
```

```
? Does your project use TypeScript? · No / Yes

// あなたのプロジェクトでは TypeScript を使用していますか？- いいえ / はい
```

```
? Where does your code run? · browser, node

// あなたのコードはどこで実行されますか？- browser, node
```

```
? What format do you want your config file to be in?

> JavaScript
> YAML
> JSON

// コンフィグファイルの形式は？

// JavaScript
// YAML
// JSON
```

```
? Would you like to install them now with npm?

// 今すぐ npm でインストールしますか？
```

# rules の設定

ESLint の設定は rules の中に記述していく。

```
"rules": {
内容
}
```

例として以下のように設定する。

```
"rules": {
"semi": ["error", "always"], // セミコロンを末尾につけるかどうかの設定
"quotes": ["error", "double"] // クォーテーションを「'」か「"」にするかの設定
}
```

第一引数は以下の 3 つある。

```
- error // エラーを出す(必ず直すもの)
- warn // 注意(直したほうが良いもの)
- off // ルール無効化
```

ちなみに第一引数は数字でも表せる。  
ただ、明示的な方が分かりやすいので、数字ではない方が良い。

```
- 2 // error
- 1 // warn
- 0 // off
```

第 2 引数でデフォルトのものは記述しなくても良い場合もある。

```
"rules": {
"semi": "error", // "always"がデフォルトのため省略可能
"quotes": "error", // 「"」がデフォルトのため省略可能
"no-undef": "error" // 未定義の変数をエラーとする(定義されていない変数を使うことは少ないため設定しておくと良い)
}
```

## reles ドキュメント

https://eslint.org/docs/rules/

# env

```
"env": {
"browser": true, // ブラウザのグローバル変数を有効にする(document 等)
"es2021": true, // 最新の JS も事前定義されていると認識する
"node": "true" // 最初の module.exports がエラーとなるので、module 等の node のグローバル変数を認識する
},
```

グローバルな変数を環境に応じて定義してくれるもの。  
ここのエラーは設定をしていないと、先程の"no-undef"でエラーが出てしまう。

## env ドキュメント

https://eslint.org/docs/user-guide/configuring/language-options#specifying-environments

# plugins

「rules に本来 eslint に無い独自のルールを追加するもの」  
後の extends によって、plugins も設定されることがあるので、記述が無くても良い場合もある。

この辺は必要かどうか確認しておく

```
"plugins": [],
plugins は基本的に設定することが多くなるので、もし最初に必要なくても空配列は用意しておいても良い
```

# extends

「rules のデフォルト設定を行えるもの」＋「他のオプションを拡張できるもの」

```
"extends": ["plugin:react/recomended"],
```

extends は複数使用することが多いので、配列にしておくと良い

# settings

```
"settings": {
"react": {
"version": "detect"
}
}
```

package.json の react を見てバージョンを決める設定。
