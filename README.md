# フォーム回答に応じたDM自動送信スクリプト

## 概要
フラスタ企画を進行する為に用いたgoogle apps script。  
スプレッドシートに依存するContainer Bound Scriptを無理やりStandalone Script化させたもの。  

## 何が出来る
- googleフォームの回答に反応し回答者にDMを送る
- 回答内容に応じた返信文章の変更
- 支払方法・対応状況に応じた背景色の変更

## 使用方法

### 事前準備
- Twitter Developersから新規appの作成
- Oauth等のライブラリ導入
- Google Docs上にて支払方法に応じた返信文章の作成
- Google フォームでtwitterIDと支払方法を入力する質問の追加

### スクリプトへの書き込み
- 作成したtwitter appのAPIキーを入力
- 支払方法毎のGooglDocsIDの入力
- 支払状態の分岐と回答欄数をcoloring.js上に記述

### 実行準備
- トリガーにonFormSubmitとonEditを追加
- authorizeを実行しログに出力されたURLからTwitter認証

### 運用
1. 参加者にフォームのURLを送信
1. 回答を受け取りDMを自動送信
1. 入金を確認したらスプレッドシートを更新
1. 状態はスプレッドシートに色分けされ表示

## 参考
http://yoshiyuki-hirano.hatenablog.jp/entry/2015/10/13/010317  
http://dackdive.hateblo.jp/entry/2015/01/28/135515
