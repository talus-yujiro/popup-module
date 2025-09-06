# POPUPModule

## 概要

任意の要素に対して、背景色を活かしたカスタマイズ可能なポップアップを表示するESモジュールです。

## 使い方

1. 任意のJSファイルにて以下のように読み込みます：

```javascript
import { showPopup } from 'https://talus-yujiro.github.io/popup-module/popupModule.js';
```

2. 以下の形式で関数を呼び出します：

```javascript
showPopup({
  target: [HTMLElement],          // ポップアップを出す対象要素（必須）
  content: [string],              // 表示するテキストまたはHTML（必須）
  closeButton: [Boolean],         // 閉じるボタンを表示するか（true/false）
  darkenBackground: [Boolean],    // 背景を暗くするか（true/false）
  duration: [number],             // 自動で閉じるまでの時間（ミリ秒）
  position: [string]              // 表示位置（以下のいずれか）
                                  // "top-right", "top-left", "bottom-right",
                                  // "bottom-left", "top", "bottom", "right",
                                  // "left", "center"
});
```

### パラメータ説明

| パラメータ名       | 型       | 説明                                                                                          | 例・備考                                            |
|--------------------|----------|-----------------------------------------------------------------------------------------------|-----------------------------------------------------|
| `target`           | DOM要素  | ポップアップを表示したい要素を指定します。                                                    | `document.getElementById('btn1')`                   |
| `content`          | 文字列   | ポップアップ内に表示するテキストやHTMLを文字列で指定します。                                  | `'これはポップアップの内容です。<br><b>太字も可</b>'` |
| `closeButton`      | 真偽値   | `true`で閉じるボタン（×印）を表示。`false`で非表示。                                        | `true`                                              |
| `darkenBackground` | 真偽値   | `true`で背景を半透明の黒で暗くする。`false`で暗くしない。                                    | `true`                                              |
| `duration`         | 整数     | ミリ秒単位でポップアップが自動的に閉じるまでの時間。指定しないか`0`を指定すると自動で閉じない。          | `5000`（5秒）                                       |
| `position`         | 文字列   | ポップアップの表示位置。以下のいずれかを指定：<br>top-right, top-left, bottom-right, bottom-left,<br>top, bottom, right, left, center, none | `top-right`                                         |

### 例
```javascript
showPopup({
  target: document.getElementById('button1'),
  content: 'こんにちは！これはポップアップです。',
  closeButton: true,
  darkenBackground: true,
  duration: 5000,
  position: 'top-right'
});
```

## 注意
`type="module"` の `<script>` で読み込む必要があります。

ローカルファイルから直接読み込む場合、モジュールの読み込みにはローカルHTTPサーバーが必要です（例: `Live Server` など）。

## ライセンス
[MIT](https://opensource.org/licenses/mit-license.php)

&copy; 2025 talus
