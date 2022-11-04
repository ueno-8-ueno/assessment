//use strict宣言後の記述ミスをエラー表示してくれる機能
'use strict';

const userNameInput = document.getElementById('user-name');
const assessmentButton = document.getElementById('assessment');
const resultDivided = document.getElementById('result-area');
const tweetDivided = document.getElementById('tweet-area');

//無名関数,ボタンが押された際に実行
assessmentButton.onclick = () => {
  const userName = userNameInput.value;
  if(userName.length === 0){
    //名前が空の時は処理を終了する
    return;
  }
  console.log(userName);

  //診断結果表示エリアの作成
  resultDivided.innerText = '';
  const header = document.createElement('h3'); //createElementで<h3></h3>のようなタグだけを先に作成する
  header.innerText = '診断結果'; //innerTextでタグの中身を設定できる
  resultDivided.appendChild(header); //appendChildは、div要素を親として、そこに子要素として追加する
  /**
   * 要するに上3行は
   * 
   * <div id="result-area">
   *   <h3>診断結果</h3>
   *   <p>あなたのいいところは声です。あなたの特徴的な声は皆を惹きつけ、心に残ります。</p>
   * </div>
   * 
   * のようになります(親要素と子要素の入れ子構造)
   */

  const paragraph = document.createElement('p'); //createElementで<p></p>のようなタグだけを先に作成する
  const result = assessment(userName);
  paragraph.innerText = result; //innerTextでタグの中身を設定できる
  resultDivided.appendChild(paragraph); //appendChildは、div要素を親として、そこに子要素として追加する
};

const answers = [
'{userName}のいいところは声です。{userName}の特徴的な声は皆を惹きつけ、心に残ります。',
'{userName}のいいところはまなざしです。{userName}に見つめられた人は、気になって仕方がないでしょう。',
'{userName}のいいところは情熱です。{userName}の情熱に周りの人は感化されます。',
'{userName}のいいところは厳しさです。{userName}の厳しさがものごとをいつも成功に導きます。',
'{userName}のいいところは知識です。博識な{userName}を多くの人が頼りにしています。',
'{userName}のいいところはユニークさです。{userName}だけのその特徴が皆を楽しくさせます。',
'{userName}のいいところは用心深さです。{userName}の洞察に、多くの人が助けられます。',
'{userName}のいいところは見た目です。内側から溢れ出る{userName}の良さに皆が気を惹かれます。',
'{userName}のいいところは決断力です。{userName}がする決断にいつも助けられる人がいます。',
'{userName}のいいところは思いやりです。{userName}に気をかけてもらった多くの人が感謝しています。',
'{userName}のいいところは感受性です。{userName}が感じたことに皆が共感し、わかりあうことができます。',
'{userName}のいいところは節度です。強引すぎない{userName}の考えに皆が感謝しています。',
'{userName}のいいところは好奇心です。新しいことに向かっていく{userName}の心構えが多くの人に魅力的に映ります。',
'{userName}のいいところは気配りです。{userName}の配慮が多くの人を救っています。',
'{userName}のいいところはその全てです。ありのままの{userName}自身がいいところなのです。',
'{userName}のいいところは自制心です。やばいと思ったときにしっかりと衝動を抑えられる{userName}が皆から評価されています。'
];

/**
 * 名前の文字列を渡すと診断結果を返す関数
 * @param {string} userName ユーザ名前
 * @return {string} 診断結果
 */
function assessment(userName){
    //全文字のコード番号を取得してそれを足し合わせる
    let sumOfCharCode = 0;
    for(let i=0; i<userName.length; i++){
        sumOfCharCode = sumOfCharCode + userName.charCodeAt(i);
    }

    //文字コード番号の合計を回数の数で割って、その余りを添字の数値とする
    const index = sumOfCharCode % answers.length;
    let result = answers[index];

    //{userName}となっているところを引数(名前)と差し替える
    result = result.replaceAll('{userName}', userName);

    return result; //文字列を返す
}

// テストコード
console.assert(
    assessment('太郎') ===
      '太郎のいいところは決断力です。太郎がする決断にいつも助けられる人がいます。',
    '診断結果の文言の特定の部分を名前に置き換える処理が正しくありません。'
  );
  console.assert(
    assessment('太郎') === assessment('太郎'),
    '入力が同じ名前なら同じ診断結果を出力する処理が正しくありません。'
  );
  