angular-zengin-code
========================

口座情報を入力するフォームを構築するためのAngularJSのディレクティブを提供するライブラリです。  
[zengin_code](https://github.com/rosylilly/zengin_code/)をバリデーションに利用しています。


## Installation
```bash
$bower install angular-zengin-code
```
## Setup

```js
angular.module('myApp', [
  'zengin-code'
]);
```

## API
angular-zengin-code モジュールの提供するディレクティブは ngModel に依存しています。

全てのディクレティブで、[BETTER NUMERICAL INPUTS FOR MOBILE FORMS](http://bradfrost.com/blog/mobile/better-numerical-inputs-for-mobile-forms/) を参考に`pattern="[0-9]*"`を設定しています。

### Bank Code (`zc-bank-code`)

```html
<input type="text" ng-model="bankCode" zc-bank-code />
```

* バリデーションルールに`maxlength="4"`を設定します
* 存在する銀行かどうか調べます
* 銀行名を入力されたコードに応じて、`$zcBankName`プロパティに設定します

以下にユーザーの入力から銀行名を表示する例を示します。

```html
<form name="form">
  <input type="text" name="bankCode" ng-model="bankCode" zc-bank-code />
</form>
銀行名 {{form.bankCode.$zcBankName}}
```

### Branch Code (`zc-branch-code`)

```html
<input type="text" ng-model="branchCode" zc-branch-code bank-code="bankCode" />
```

* バリデーションルールに`maxlength="3"`を設定します
* 存在する支店かどうか調べます
* 支店名を入力されたコードに応じて、`$zcBranchName`プロパティに設定します

以下にユーザーの入力から支店名を表示する例を示します。

```html
<form name="form">
  <input type="text" name="bankCode" ng-model="bankCode" zc-bank-code />
  <input type="text" name="branchCode" ng-model="branchCode" zc-branch-code />
</form>
支店名 {{form.branchCode.$zcBranchName}}
```

## Licence

[MIT](LICENCE)
