'use strict';

//////////////////////////////////////////
///////     以下twitter利用準備      ////////

// 以下を参考に "Oauth" "TwitterWebService" をライブラリに追加
// http://yoshiyuki-hirano.hatenablog.jp/entry/2015/10/13/010317


var twitter = TwitterWebService.getInstance(
  '/** Consumer Key (API Key) **/',
  '/** Consumer Secret (API Secret) **/'
);

twitter.getService = function() {
  return OAuth1.createService('Twitter-forFlowerStand')
    .setAccessTokenUrl('https://api.twitter.com/oauth/access_token')
    .setRequestTokenUrl('https://api.twitter.com/oauth/request_token')
    .setAuthorizationUrl('https://api.twitter.com/oauth/authorize')
    .setConsumerKey(twitter.consumer_key)
    .setConsumerSecret(twitter.consumer_secret)
    .setCallbackFunction('authCallback')
    .setPropertyStore(PropertiesService.getUserProperties())
}

function authorize() {
  twitter.authorize();
}

function reset() {
  twitter.reset();
}

function authCallback(request) {
  return twitter.authCallback(request);
}

/////////  準備ここまで  /////////////////
////////////////////////////////////////

//通常ツイートのポスト　statusの内容を呟く
function postUpdateStatus() {
  var service  = twitter.getService();
  var response = service.fetch('https://api.twitter.com/1.1/statuses/update.json', {
    method: 'POST',
    payload: {status: '@null hoge'}
  });
  Logger.log(JSON.parse(response));
}

//DMのポスト　宛先をnameとしたtextsの内容を送信する
function postDirectMassages(name, texts) {
  var service  = twitter.getService();
  var response = service.fetch('https://api.twitter.com/1.1/direct_messages/new.json', {
    method: 'POST',
    payload: { "screen_name": name,
               "text" : texts}
  });
  Logger.log(JSON.parse(response));
}

/**
 * フォーム送信時に実行される　トリガーと連携させる
 * answer_valuesはタイムスタンプの後に回答項目が順に並ぶ配列となる
 * @param e event 送信されたgoogle form回答 
 */
function onFormSubmit(e){
  var answer_values = e.values;
  var user_name = answer_values[1];
  var selectmethod = answer_values[3];
  
  onEdit(e);
  
  // cut @ character
  if(user_name.match(/@/)){
   user_name = user_name.slice(1); 
  }
  
  var response = sendDetailMassages(user_name,selectmethod);
  //Logger.log(JSON.parse(response));
}


function sendDetailMassages(User, Method){
  var sendmassages = "";
  var senddocs;
  
  // select documents depend on method
  if(Method.match(/passmarket/)){
    senddocs = DocumentApp.openById("/** Google Docs ID **/");
  } else if(Method.match(/銀行/)){
    senddocs = DocumentApp.openById("/** Google Docs ID **/");  
  } else if(Method.match(/手渡し/)){
    senddocs = DocumentApp.openById("/** Google Docs ID **/");
  } else {
    senddocs = DocumentApp.openById("/** Google Docs ID **/");
  }
  
  
  sendmassages = senddocs.getBody().getText();
  
  var response = postDirectMassages(User,sendmassages);
  Logger.log(JSON.parse(response));
}