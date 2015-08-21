$(document).ready(function(){
    function setEqualHeight(columns){//лики одной высоты
        var tallestcolumn = 0;
        columns.each(
        function(){
            currentHeight = $(this).height();
            if(currentHeight > tallestcolumn){
                tallestcolumn = currentHeight;
            }
        });
        columns.height(tallestcolumn);
    };
    setEqualHeight( $('.change-tarif-wrap._ats .price p') );
    
    $(document).on('click','.open-more',function(){//кнопка открития доп инфо
      $(this).toggleClass('active');
      var $that = $(this);
      var $open = $( $that.attr('data-hide') );
      $open.parent().toggleClass('active');
      $open.slideToggle(800);
    });

    $(document).on('click','.d-more',function(e){//кнопка открития доп инфо
      e.preventDefault();
      var $that = $(this);
      $that.toggleClass('active');
      var $open = $( $that.attr('href') );
      $open.slideToggle(500);
    });

    $('ul.tabs__caption').on('click', 'li:not(.active)', function() {//табы
      $(this)
        .addClass('active').siblings().removeClass('active')
        .closest('div.tabs').find('div.tabs__content').removeClass('active').eq($(this).index()).addClass('active');
    });
    $('.slider').slick({//слайдер
      slidesToShow: 4,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 2000,
      arrows: true,
      customPaging: '10px',
      prevArrow: '<button class="slick-btn prev icon2-left-open"></button>',
      nextArrow: '<button class="slick-btn next icon2-right-open"></button>'
    });

    var $map = $('#map-canvas');//карта
    var longVal,latVal,zoomVal,contenteBlock,titleVal;
    longVal = $map.attr('data-long');
    latVal = $map.attr('data-lidt');
    zoomVal = $map.attr('data-zoom')*1;
    titleVal = $map.attr('data-title');
      function initialize() {
        var myLatlng = new google.maps.LatLng(longVal,latVal);
        var myCenter = new google.maps.LatLng(55.709429,37.653419);
        var mapOptions = {
          zoom: zoomVal,
          center: myCenter,
          scrollwheel: false
        };

        var map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);

        var image = '../images/point-map.png';
        var marker = new google.maps.Marker({
            position: myLatlng,
            map: map,
            title: titleVal,
            icon: image
        });
        google.maps.event.addListener(marker, 'click', function() {
          infowindow.open(map,marker);
        });
      }

      google.maps.event.addDomListener(window, 'load', initialize);
      $('.track').click(function(e){
        e.preventDefault();
        var id = $(this).attr('href');
         $('html, body').animate({scrollTop : $(id).offset().top-100},800);
      });
       $("input[type='tel']").mask("+7(999) 9-999-999");
      $(".fancy").fancybox({
        openEffect  : 'none',
        closeEffect : 'none',
        padding: 0
      });

      $('#step1-btn').click(function(e){//комплексна форма 1 крок
        e.preventDefault();
        var $wrap = $(this).parents('.contenteBlock'),
        $inputs = $wrap.find('input');
        $inputs.each(function(){
          if($(this).val() == ''){
            $(this).parents('.form-group').addClass('invalidElem');
            $(this).parents('.contenteBlock').find('.sbm-btn').addClass('invalid');
          } else{
            $(this).parents('.form-group').removeClass('invalidElem');
            $(this).parents('.form-group').find('.errorMsg').remove();
            $(this).parents('.contenteBlock').find('.sbm-btn').removeClass('invalid');
          }
          if($(this).hasClass('namei') ){
            if(!$(this).parents('.form-group').find('.errorMsg').length){$(this).parents('.form-group').append('<div class="errorMsg">Это поле необходимо заполнить</div>');
          } }
            
          if($(this).hasClass('teli')){
            if(!$(this).parents('.form-group').find('.errorMsg').length){ $(this).parents('.form-group').append('<div class="errorMsg">Введите правильный номер</div>');}
            
          }
        });
        if(!$(this).hasClass('invalid')){
          $wrap.removeClass('current');
          $('#contenteBlock2').addClass('current');
          $('.steps ul li').removeClass('current');
          $('.steps ul li').eq(1).addClass('current');
          $('.steps ul li').eq(0).addClass('default');
        }

      });
      $('input').change(function(){$(this).parent().removeClass('invalidElem')})
      $('.tarif-change').click(function(e){//комплексна форма 2 крок
        e.preventDefault();
        var $that = $(this),
        $wrap = $(this).parents('.contenteBlock'),
        $input = $wrap.find('input[name="tarif"]');
        console.log($input)
        $input.val($that.attr('data-val'))
        $wrap.removeClass('current');
        $('#contenteBlock3').addClass('current');
        $('#contenteBlock4').find('.center .tarif').addClass($that.attr('data-color-t')).text( $that.parents('.item ').find('.header-title').text() )
        $('.steps ul li').removeClass('current');
        $('.steps ul li').eq(2).addClass('current');
        $('.steps ul li').eq(1).addClass('default');
      });

      $('.select-ats').click(function(e){//комплексна форма 3 крок
        e.preventDefault();
        var $that = $(this),
        $wrap = $(this).parents('.contenteBlock'),
        $input = $wrap.find('input[name="ats"]');
        $('#contenteBlock4').find('.center .ats').addClass($that.attr('data-color-t')).text( $that.parents('.item ').find('.header-title').text() );
        console.log($input)
        $input.val($that.attr('data-val'))
        $wrap.removeClass('current');
        $('#contenteBlock4').addClass('current');
        $('.steps ul li').removeClass('current');
        $('.steps ul li').eq(3).addClass('current');
        $('.steps ul li').eq(2).addClass('default');
      });

      $('#quick-request').validate({//валыдацыя #quick-request
        highlight: function(element, errorClass) {
            $(element).parent().addClass("invalidElem");
        },
        unhighlight: function(element, errorClass) {
            $(element).parent().removeClass("invalidElem");
        },
        errorElement: "div",
        errorClass: "errorMsg",
        rules: {
          telfield1: "required",
          namefield1: "required"
          },
        messages: {
          telfield1: "Введите правильный номер",
          namefield1: "Это поле необходимо заполнить",
        }

      });
      $('.change-other-number').click(function(){
        $.fancybox.close();
        var id = '#wayp2';
        $('html, body').animate({scrollTop : $(id).offset().top-100},800);
        $('.center  .ats').removeClass('virt-ats fiz-ats your-ats');
        $('.center  .tarif').removeClass('junior popular happies unlimited');
        $('.contenteBlock').removeClass('current');
        $('#contenteBlock1').addClass('current');
        $('.steps ul li').removeClass('current');
        $('.steps ul li').eq(0).addClass('current').removeClass('default');
      });
      $('.change-other-tarif ').click(function(){
        $('.center  .tarif').removeClass('junior popular happies unlimited');
        $('.center  .ats').removeClass('virt-ats fiz-ats your-ats');
        $('.contenteBlock').removeClass('current');
        $('#contenteBlock2').addClass('current');
        $('.steps ul li').removeClass('current');
        $('.steps ul li').eq(1).addClass('current').removeClass('default');
        $('.steps ul li').eq(2).removeClass('default');
        $('.steps ul li').eq(3).removeClass('default');
      });
      $('.change-other-ats').click(function(){
        $('.center  .ats').removeClass('virt-ats fiz-ats your-ats');
        $('.center  .tarif').removeClass('junior popular happies unlimited');
        $('.contenteBlock').removeClass('current');
        $('#contenteBlock3').addClass('current');
        $('.steps ul li').removeClass('current');
        $('.steps ul li').eq(2).addClass('current').removeClass('default');
        $('.steps ul li').eq(3).removeClass('default');
      });
      $('#cons-form').validate({//валыдацыя #cons-form
        highlight: function(element, errorClass) {
            $(element).parent().addClass("invalidElem");
        },
        unhighlight: function(element, errorClass) {
            $(element).parent().removeClass("invalidElem");
        },
        errorElement: "div",
        errorClass: "errorMsg",
        rules: {
          telfield3: "required",
          namefield3: "required"
          },
        messages: {
          telfield3: "Введите правильный номер",
          namefield3: "Это поле необходимо заполнить",
        }

      });
      $('#have-quetions').validate({//валыдацыя #have-quetions
        highlight: function(element, errorClass) {
            $(element).parent().addClass("invalidElem");
        },
        unhighlight: function(element, errorClass) {
            $(element).parent().removeClass("invalidElem");
        },
        errorElement: "div",
        errorClass: "errorMsg",
        rules: {
          telfield2: "required",
          namefield2: "required",
          textf: "required"
          },
        messages: {
          telfield2: "Введите правильный номер",
          namefield2: "Это поле необходимо заполнить",
          textf: "Оставьте комментарий"
        }

      });
      
    $.validator.setDefaults({
      submitHandler: function() {
        console.log(e);
        $.fancybox.open('<h3 class="black-title-b">Спасибо! Мы перезвоним вам в ближайшее время</h3>');//попап після відправки форми
      }
    });
    
});
/*для слайдера*/