---
layout: ../../layouts/MarkdownPostLayout.astro

title: "グローバルなstate管理"
pubDate: 2023/05/03
# description: "This is the first post of my new Astro blog."
# image:
#   url: "https://astro.build/assets/blog/astro-1-release-update/cover.jpeg"
#   alt: "The Astro logo with the word One."
tags: ["React"]
draft: false
---

# Context での state 管理

Context の中の値を使う場合は、providers で囲ってその中で Context の値を参照出来る。  
値を提供するために囲っていくものを provider を言う。

```js
import React, { createContext } from "react";

export const UserContext = createContext({});

export const UserProvider = (props) => {
  const { children } = props;
  const contextName = "テストネーム";
  return (
    <UserContext.Provider value={{ contextName }}>
      {children}
    </UserContext.Provider>
  );
};
```

## 注意

Context を使う場合は更新時にどのコンポーネントが再レンダリングされるのか意識しながら使う必要があるので気をつける。  
再レンダリングしたくないコンポーネントは memo 化を忘れず行うこと。

# Recoil

Facebook 社のグローバルな state 管理のライブラリ。  
store フォルダ配下にファイルを作成し、以下の要領で state を定義するだけ。

```js
import { atom } from "recoil";

export const userState = atom({
  key: "userState",
  default: { isAdmin: false },
});
```

使用するためには、全体を以下のように囲う必要がある。

```js
import React from "react";
import "./styles.css";
import { Router } from "./router/Router";
import { UserProvider } from "./providers/UserProvider";
import { RecoilRoot } from "recoil";

export default function App() {
  return (
    <RecoilRoot>
      <UserProvider>
        <Router />
      </UserProvider>
    </RecoilRoot>
  );
}
```

## RecoilRoot の作成

Recoil による状態管理をアプリケーションで使用するには、RecoilRoot というコンポーネントで囲ってあげる必要がある。

```js
<RecoilRoot>
  <Component />
</RecoilRoot>
```

このコンポーネントは、React の Context API のようにルート直下のコンポーネントの状態管理を担当する。

## Atoms の作成

```js
// TODO リストの状態を保持する Atoms を作成。
const todoListState = atom({
  key: "todoListState",
  default: [],
});

export const TodoList = () => {
  // useRecoilValue() の Hooks API を使って
  // コンポーネントに適用
  const todoList = useRecoilState(todoListState);
  return (
    <>
      {todoList.map((todoItem) => (
        <TodoItem key={todoItem.id} item={todoItem} />
      ))}
    </>
  );
};
```

Atoms は一意のキーを持っており、Hooks API の useRecoilState()で状態を共有できる。

## Selectors の作成

Selectors は複数の Atom・他の Selector を受け取る純粋な関数として定義し、他のデータに依存する動的データを構築できる。  
useRecoilValue()の Hooks API で呼び出す。

```js
// TODO リストの状態を保持する Atom を作成。
const todoListState = atom({
  key: "todoListState",
  default: [],
});

// TODO リストのフィルターを設定する Atom
const todoListFilterState = atom({
  key: "todoListFilterState",
  default: "Show All",
});

// Selector 関数の定義
const filteredTodoListState = selector({
  key: "filteredTodoListState",
  get: ({ get }) => {
    const filter = get(todoListFilterState);
    const list = get(todoListState);
    // Redux の Reducer のように、
    // アクションに応じて状態を変更して返す
    switch (filter) {
      case "Show Completed":
        return list.filter((item) => item.isComplete);
      case "Show Uncompleted":
        return list.filter((item) => !item.isComplete);
      default:
        return list;
    }
  },
});
```
