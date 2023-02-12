$(document).ready(function() {
  $('.drawer').drawer();

  //smooth scroll
  //#から始まるURLがクリックされたとき
  $('a[href^="#"]').on('click', function() {
    //移動速度(ミリ秒)
    let speed = 300;
    //hrefで指定されたidを取得
    let id = $(this).attr('href');
    //ヘッダの高さを取得
    let header = $('#js-header').outerHeight();
    //idの値が#のみならターゲットをhtmlタグにしてトップに戻る
    let target = $(id == '#' ? 'html' : id);
    //ターゲット位置の取得 (ヘッダの高さを引く)
    let position = $(target).offset().top - header;
    console.log(target);
    console.log(position);
    //ターゲット位置までspeedの速度で移動
    $('html, body').animate({
      scrollTop: position
    }, speed);

    return false;
  });

  new WOW().init();

  //form
  let $form = $('#js-form');
  $form.submit(function(e) {  //formがsubmitされたときにajaxが実行される
    $.ajax({
     url: $form.attr('action'),
     data: $form.serialize(),
     type: "POST",
     dataType: "xml",
     statusCode: {
        0: function() {
          //送信に成功したときの処理
          $form.slideUp();
          $('#js-success').slideDown();
        },
        200: function() {
          //送信に失敗したときの処理
          $form.slideUp();
          $('#js-error').slideDown();
        }
      }
    });
    return false;
  });

  //formの入力確認
  let $submit = $('#js-submit');

  $('#js-form input, #js-form textarea').on('change', function() {
    if (
      $('#js-form input[type="text"]').val() !== "" && //フォームのtext入力欄が空でない
      $('#js-form input[type="email"]').val() !== "" && //フォームのemail入力欄が空でない
      $('#js-form input[name="entry.1517570769"]').prop('checked') === true //プライバシーポリシーのチェックが付いている
    ) {
      //全て入力されたとき
      $submit.prop('disabled', false);
      $submit.addClass('-active');
      //入力されていないとき
     } else {
      $submit.prop('disabled', true);
      $submit.removeClass('-active');
      }
    });
});