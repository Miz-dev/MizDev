---
layout: ../../layouts/MarkdownPostLayout.astro

title: 'Prettierの設定オプション'
pubDate: 2023/10/13
# description: "This is the first post of my new Astro blog."
# image:
#   url: "https://astro.build/assets/blog/astro-1-release-update/cover.jpeg"
#   alt: "The Astro logo with the word One."
tags: ['Prettier']
draft: false
---

Prettier はコードのフォーマッターとして非常に人気があり、さまざまな言語やフレームワークに対応しています。
設定オプションを使用することで、フォーマットの動作を細かく制御することができます。

以下に、Prettier の設定オプションとその説明をまとめています。

## **Prettier の設定オプション**

```json
{
  "printWidth": 120,
  "tabWidth": 2,
  "useTabs": true,
  "semi": false,
  "singleQuote": true,
  "quoteProps": "as-needed",
  "trailingComma": "none",
  "bracketSpacing": true,
  "bracketSameLine": true,
  "arrowParens": "always",
  "requirePragma": false,
  "insertPragma": false,
  "htmlWhitespaceSensitivity": "ignore",
  "endOfLine": "lf",
  "embeddedLanguageFormatting": "auto",
  "singleAttributePerLine": false,
  "plugins": ["prettier-plugin-astro"]
}
```

■ 上記設定の簡易的な説明

```json
{
  "printWidth": 120, // 1行あたりの文字数の最大値
  "tabWidth": 2, // 1インデントあたりのスペース数
  "useTabs": true, // インデントとしてタブを使用
  "semi": false, // 文の終わりにセミコロンを置かない
  "singleQuote": true, // 文字列にシングルクォートを使用
  "quoteProps": "as-needed", // プロパティ名に必要に応じてクォートを追加
  "trailingComma": "none", // トレイリングカンマを置かない
  "bracketSpacing": true, // オブジェクトリテラルのブラケット内にスペースを入れる
  "bracketSameLine": true, // ">"を同じ行に置く
  "arrowParens": "always", // 常にアロー関数の引数に括弧を付ける
  "requirePragma": false, // 特定のコメントがなければフォーマットしない
  "insertPragma": false, // フォーマットされたことを示すコメントを追加しない
  "proseWrap": "preserve", // マークダウンテキストの折り返しをしない
  "htmlWhitespaceSensitivity": "ignore", // HTMLの空白を無視
  "endOfLine": "lf", // 改行コードとしてLFを使用
  "embeddedLanguageFormatting": "auto", // 埋め込み言語のフォーマットを自動で行う
  "singleAttributePerLine": false, // 複数の属性を1行に配置
  "plugins": ["prettier-plugin-astro"] // 使用するプラグイン
}
```

各項目について説明していきます。

## **printWidth 　 1 行あたりの文字数の最大値**

長い行を折り返す位置を指定します。

| デフォルト | CLI                 | API               |
| ---------- | ------------------- | ----------------- |
| 80         | --print-width {int} | printWidth: {int} |

### **例**

```json
# 120文字で折り返し
printWidth: 120
```

- 指定した文字数を超えたら折り返します。
- 日本語など全角文字は 2 文字としてでカウントされます。
- インデントは 1 つにつき tabWidth の数値分でカウントされます。
  - インデントが 2 個なら 4 文字分（tabWidth がデフォルト値の場合）。

## **tabWidth 1 インデントあたりのスペース数**

インデントのサイズを指定します。

スペースでインデントの場合、指定数分のインデントとなります。

タブでインデントの場合、見た目上は変化が無いですが、printWidth の折り返しタイミングの数値に影響します。

| デフォルト | CLI               | API             |
| ---------- | ----------------- | --------------- |
| 2          | --tab-width {int} | tabWidth: {int} |

### **例**

```json
# タブのサイズを4文字にする
tabWidth: 4
```

## **useTabs インデントとしてタブを使用**

タブでインデントを行います。

デフォルトは半角スペースでインデントです。

| デフォルト | CLI        | API             |
| ---------- | ---------- | --------------- |
| false      | --use-tabs | useTabs: {bool} |

### **例**

```json
# タブでインデントする
useTabs: **true**
```

## **semi 　行末にセミコロン**

行末にセミコロンを付与します。

デフォルトではセミコロンを付与します。

| デフォルト | CLI       | API          |
| ---------- | --------- | ------------ |
| true       | --no-semi | semi: {bool} |

### **例**

```json
# 行末のセミコロンをなしにする
semi: **false**
```

## **singleQuote 　文字列にシングルクォートを使用**

文字列の囲みをダブルクォーテーションではなく、シングルクォーテーションにします。

| デフォルト | CLI            | API                 |
| ---------- | -------------- | ------------------- |
| false      | --single-quote | singleQuote: {bool} |

### **例**

```json
# シングルクォーテーションで囲む
singleQuote: **true**
```

文字列中にシングルクォーテーションが含まれる場合は、ダブルクォーテーションで囲むなど割と柔軟にフォーマットしてくれます。

文字列中のシングルクォーテーションとダブルクォーテーションの使用頻度で選択されます。

使用頻度が多い方を生かして少ない方の引用符で囲む方式。

### **singleQuote: true の例**

```json
// シングルクォーテーションが含まれる場合、ダブルクォーテーションのままで変換されない
const s = "I'm double quoted"
// シングルクォーテーションに変換される
const s = "This \"example\" is single quoted" // 変換前
const s = 'This "example" is single quoted' // 変換後

// 文中に ' が1つ、 " が２つで、 " の方が多いのでシングルクォーテーションで囲まれる
const s = "I'm double quoted. This \"example\" is single quoted" // 変換前
const s = 'I\'m double quoted. This "example" is single quoted' // 変換後

// 文中に ' と " が同じ数含まれる場合、設定に従ってシングルクォーテーションで囲まれる
const s = "I'm I'm double quoted. This \"example\" is single quoted" // 変換前
const s = 'I\'m I\'m double quoted. This "example" is single quoted' // 変換後
```

## **quoteProps オブジェクトのプロパティ引用符**

オブジェクトのプロパティを引用符で囲むルールについての取り決めを設定します。

| デフォルト | CLI                      | API        |
| ---------- | ------------------------ | ---------- |
| as-needed  | --quote-props {as-needed | consistent |

- "as-needed" - 必要な場合にのみ、引用符で囲みます。
- "consistent" - オブジェクト内の要素で 1 つでも引用符が必要な場合は、すべてのプロパティに付与します。
- "preserve" - 引用符の入力使用を尊重します。
- '-'を含むプロパティ名は引用符で囲む必要があります。

### **下記の場合**

```json
interface Customer {
  'code': string;
  name: string;
  'e-mail': string;
}
```

### **"as-needed"**

引用符の必要性がないプロパティは引用符が消える。（ｃｏｄｅ）

引用符の必要なプロパティは引用符はそのまま。（e-mail）

```json
interface Customer {
  code: string;
  name: string;
  'e-mail': string;
}
```

### **"consistent"**

引用符の必要なプロパティがあるのですべてが引用符で囲まれます。

引用符の必要なプロパティがない場合は引用符が消えます。

```json
interface Customer {
  'code': string;
  'name(: string;
  'e-mail': string;
}
```

### **"preserve"**

記述した引用符の状態を維持します。

```json
interface Customer {
  'code': string;
  name: string;
  'e-mail': string;
}
```

## **trailingComma 末尾のカンマ**

複数要素の末尾の後ろにカンマを付与するかどうかを設定します。

| デフォルト | CLI                   | API  |
| ---------- | --------------------- | ---- |
| "es5"      | --trailing-comma {es5 | none |

### **例**

```json
# 末尾のカンマはなし
trailingComma: "none"
```

- "es5" - ES5 で有効な末尾のカンマ。TypeScript の型パラメーターに末尾のカンマはありません。
- "none" - 末尾のカンマはありません。
- "all" - 可能な限り末尾のカンマを付与。

※　 all の場合、動作環境によっては javascript が動作しない可能性があります。

[Trailing Commas](https://prettier.io/docs/en/options.html#trailing-commas)

```json
const test = {
  a: 'a',
  b: 'b', // ←末尾のカンマ
};
```

### **es5 の場合**

```json
const test = {
  a: 'a',
  b: 'b', // ←末尾のカンマが消えない。ついていない場合は付与する
};
```

```json
const test = { a: 'a', b: 'b' }; // １行で書いた場合、末尾のカンマが消える
```

複数要素の末尾が改行で終えているとカンマが必要で、同一行で要素が閉じられていれば不要となります。

## **bracketSpacing オブジェクト内の要素と括弧間のスペース**

オブジェクト内の要素と括弧の間にスペースを出力します。

| デフォルト | CLI                  | API                    |
| ---------- | -------------------- | ---------------------- |
| true       | --no-bracket-spacing | bracketSpacing: {bool} |

### **例**

```json
# スペースを入れない
bracketSpacing: **false**
```

true - 例: { foo: bar }

false - 例: {foo: bar}

## **bracketSameLine 閉じカッコを同一行にするかどうか**

HTML タグの閉じカッコを同一行に含めるかどうかを設定します。

| デフォルト | CLI                 | API                     |
| ---------- | ------------------- | ----------------------- |
| false      | --bracket-same-line | bracketSameLine: {bool} |

### **例**

```json
# 含める場合
bracketSameLine: **true**
```

### **true 同一行に含める**

```json
<button
  className="prettier-class"id="prettier-id"onClick={this.handleClick}> ※←ここのカッコの位置
  Click Here
</button>
```

### **false 同一行に含めない**

```json
<button
  className="prettier-class"id="prettier-id"onClick={this.handleClick}> ※←ここのカッコの位置
  Click Here
</button>
```

## **arrowParens アロー関数の引数をカッコで囲む**

アロー関数のパラメーターをカッコで囲みます

| デフォルト | CLI                    | API    |
| ---------- | ---------------------- | ------ |
| "always"   | --arrow-parens {always | avoid} |

- "always" - 常に括弧を含めます。例：(x) => x
- "avoid" - 可能な場合は括弧を省略します。例：x => x 引数が 1 つの場合くらいか？

## **requirePragma 　プラグマ付きファイルをフォーマット対象とする**

プラグマを含むファイルのみにフォーマットを行います。

| デフォルト | CLI              | API                   |
| ---------- | ---------------- | --------------------- |
| false      | --require-pragma | requirePragma: {bool} |

プラグマは、ファイルの先頭に記述する下記のようなコメントです。

```json
/** @prettier */
または、
/** @format */
```

HTML や Vue ファイルの場合

```json
<!-- @prettier -->
または、
<!-- @format -->
```

- 設定を true にしフォーマットすると、想定通りフォーマットされなくなります。
- プラグマを追加してフォーマットすると、フォーマットされるようになります。rangeStart rangeEnd に任意の値を設定している場合、プラグマがあってもフォーマットが効かないようです。設定なしか、明示的にデフォルト値と同じ値を設定している場合であればフォーマットされます。

### **例**

```json
#
requirePragma: **true**
```

## **insertPragma プラグマを挿入**

プラグマを挿入します。

| デフォルト | CLI             | API                  |
| ---------- | --------------- | -------------------- |
| false      | --insert-pragma | insertPragma: {bool} |

### **例**

```json
# プラグマを挿入する
insertPragma: **true**
```

- ファイルの先頭にブロックコメントがある場合は、そのブロックコメント内にプラグマが挿入されます。
- requirePragma が true の場合、insertPragma は無視されます。本機能を利用してプラグマを挿入したい場合は、一時的にオフにするとよいでしょう。
- 新規サービスでは不要ですが。prettier を導入しようとして差分が出過ぎるようなソースに段階的に適用していく場合に活用できます。

## **proseWrap マークダウンテキストの折り返し**

マークダウンテキストの折り返しを設定します。

マークダウンといいつつ、html や vue ファイルでも効いてくれます。

| デフォルト | CLI                  | API   |
| ---------- | -------------------- | ----- |
| "preserve" | --prose-wrap {always | never |

### **例**

```json
# 常に折り返す設定
proseWrap: "always"
```

- "always" - 文字列が printWidth を超える場合は折り返す。
- "never" - 文字列の各ブロックを 1 行に広げます。
- "preserve" - 何もせず、文章をそのままにしておきます。

"always"の場合、printWidth のサイズより短めに自身で入れた改行も無視して printWidth のサイズで折り返しされてしまいます。

## **htmlWhitespaceSensitivity HTML の空白の感度**

HTML の空白の感度を設定します。

| デフォルト | CLI                                | API    |
| ---------- | ---------------------------------- | ------ |
| "css"      | --html-whitespace-sensitivity {css | strict |

- "css" - CSS の display プロパティのデフォルト値を尊重します。ハンドルバーの場合は strict と同じ扱い。
- "strict" - すべてのタグの周りの空白（または空白がないこと）は重要であるとみなされます。
- "ignore" - すべてのタグの周りの空白（または空白がないこと）は重要でないとみなされます。

### **例**

下記のタグの場合

```json
<span class="dolorum atque aspernatur">Est molestiae sunt facilis qui rem.</span>
```

### **css**

```json
<span class="dolorum atque aspernatur">Est molestiae sunt facilis qui rem.</span
>
```

折り返しが発生する場合、タグの後ろ「>」も含めて改行し、文字列が続きます。

### **strict**

```json
<span class="dolorum atque aspernatur">Est molestiae sunt facilis qui rem.</span
>
```

### **ignore**

折り返しが発生する場合、特に考慮せず文字列のみ改行されます。

```json
<span class="dolorum atque aspernatur">
  Est molestiae sunt facilis qui rem.
</span>
```

## **endOfLine 改行コードの指定**

改行コードの指定を設定します。

| デフォルト | CLI               | API  |
| ---------- | ----------------- | ---- |
| "lf"       | --end-of-line {lf | crlf |

### **例**

```json
# 120文字で折り返し
endOfLine: "auto"
```

- "lf" – ラインフィード ( \n)、Linux と macOS および git リポジトリ内で共通
- "crlf" - キャリッジリターン + ラインフィード ( \r\n)、Windows で一般的
- "cr" - キャリッジリターン ( \r)、めったに使用されません
- "auto" - 既存の行末を維持します (1 つのファイル内の混合値は、最初の行の後に使用されているものを調べることによって正規化されます)

## **embeddedLanguageFormatting 組み込み言語のフォーマット**

組み込み言語のフォーマットを有効にします。

| デフォルト | CLI                                | API                               |
| ---------- | ---------------------------------- | --------------------------------- |
| "auto"     | --embedded-language-formatting=off | embeddedLanguageFormatting: "off" |

### **例**

```json
# 組み込み言語のフォーマットをしない
embeddedLanguageFormatting: "off"
```

lang で指定した形式にフォーマットしてくれます。

```json
<custom lang="json">
{
"a": 1,
"b": 2
}
</custom>
```

変換後

```json
<custom lang="json">
{
  "a": 1,
  "b": 2
}
</custom>
```

## **singleAttributePerLine 属性の改行**

HTML、JSX 等において、付与されている属性を１行づつ改行します。

| デフォルト | CLI                         | API                            |
| ---------- | --------------------------- | ------------------------------ |
| false      | --single-attribute-per-line | singleAttributePerLine: {bool} |

### **例**

下記のように属性を複数持つような場合、tabWidth で折り返しますが、

この設定を有効にすることで、1 つの属性で改行されるようになります。

```json
<template><div class="q-pa-md"><q-table title="Treats" :rows="rows" :columns="columns" row-key="name" :separator="separator" /></div></template>
```

変換後

```json
<template><div class="q-pa-md"><q-table
      title="Treats":rows="rows":columns="columns"row-key="name":separator="separator"/></div></template>
```

## 最後に

Prettier の設定オプションを利用して、読みやすく一貫性のあるコードを保つためのガイドラインを設定することができます。
これにより、チームの開発効率を向上させることが期待できるので積極的に活用していきましょう。
