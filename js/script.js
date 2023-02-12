    /*スムーススクロール処理
  --------------------------------------------------*/
  const smoothScroll = function(id) {
    //移動速度(ミリ秒)
    let speed = 300;
    //ヘッダの高さを取得
    let header = $('#js-header').outerHeight();
    //idの値が#のみならターゲットをhtmlタグにしてトップに戻る
    let target = $(id == '#' ? 'html' : id);
    //ターゲット位置の取得 (ヘッダの高さを引く)
    let position = $(target).offset().top - header;
    //ターゲット位置までspeedの速度で移動
    $('html, body').animate(
      {scrollTop: position}, speed);
    return false;
  }


$(document).ready(function() {

  //wowの使用宣言
  new WOW().init();

  /*drawer動作
  --------------------------------------------------*/
  $('.drawer-icon').on('click', function(e) {
    e.preventDefault(); //ブラウザのデフォルト動作を無効化

    //クリックされたときにis-activeがなかったら付ける。付いていたら外す
    $('.drawer-icon').toggleClass('is-drawer-active');
    $('.drawer-content').toggleClass('is-drawer-active');
    $('.drawer-background').toggleClass('is-drawer-active');

    return false; //古いブラウザ用の慣例(無くても大丈夫かも)
  });

  //ドロワーメニューがクリックされた場合
  $('.drawer-menu-item-link').on('click', function(e) {
    e.preventDefault();
    $('.drawer-icon').removeClass('is-drawer-active');
    $('.drawer-content').removeClass('is-drawer-active');
    $('.drawer-background').removeClass('is-drawer-active');

    let id = $(this).attr('href');
    smoothScroll(id);

    return false;
  })


  //swiper設定
  const swiper = new Swiper('.swiper', {
    // Optional parameters
    direction: 'horizontal',
    loop: true,

    //768px未満の場合
    slidesPerView: 'auto',
    loopedSlides: 2,
    spaceBetween: 20,

    breakpoints: {
      //768px以上の場合
      768: {
        slidesPerView: 'auto',
        loopedSlides: 2,
        spaceBetween: 40
        }
    },

    // If we need pagination
    pagination : {
      el: '.swiper-pagination',
      clickable: true,
      type: 'bullets',
    }
  });

  $('.qa-box-q').on('click', function() {
    jQuery(this).next().slideToggle();
    jQuery(this).children('.qa-box-icon').toggleClass('is-open');
  });

  //フォームの送信確認メッセージ表示
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
          //$('.contact-footer-submit').fadeOut();
          $('#js-form-success').slideDown();
        },
        200: function() {
          //送信に失敗したときの処理
          $form.slideUp();
          //$('.contact-footer-submit').fadeOut();
          $('#js-form-error').slideDown();
        }
      }
    });
    return false;
  });

//#から始まるURLがクリックされたとき
$('a[href^="#"]').on('click', function(e) {
   //hrefで指定されたidを取得
  e.preventDefault();
  let id = $(this).attr('href');
  console.log(id);
  smoothScroll(id);
});


  //formの入力確認
  let $submit = $('#js-submit'); //送信ボタンのjQueryオブジェクト

  $('#js-form input, #js-form textarea').on('change', function() {
    if (
      $('#js-form input[type="text"]').val() !== "" && //フォームのtext入力欄が空でない
      $('#js-form input[type="checkbox"]').prop('checked') === true //プライバシーポリシーのチェックが付いている
    ) {
      //全て入力されたとき
      $submit.prop('disabled', false);
      $submit.addClass('active');
      //入力されていないとき
    } else {
      $submit.prop('disabled', true);
      $submit.removeClass('active');
    }
  });


  //トップに戻るボタン
  $(window).on('scroll', function() {
    //縦方向100の位置に移動したら
    if (300 < jQuery(this).scrollTop()) {
      jQuery('.to-top').addClass('is-show');
    } else {
      jQuery('.to-top').removeClass('is-show');
    }
    
  });

});
