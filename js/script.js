$(document).ready(function(){
    function setEqualHeight(columns){
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
    $('textarea').val('');
/*tooltip*/
  (function($){
    var defaults = {
      startText: 'журнал',
      item: 'a',
      objectTitle: 'img',
      hasTiitle: 'data-title',
      show: 'mouseenter',
      hide: 'mouseleave'
    }
    $.fn.tooltip = function(options){

      var config = $.extend({},defaults,options);

      $this = $(this);
      
      $this.init = function(){
        $this.on(config.show, config.item, function(e){
        e.preventDefault();
        var $that=$(this);

        if(!$(this).children('.tooltip').length){
            $('<div/>',{
                "class": "tooltip",
                text: config.startText+' "'+$(this).find(config.objectTitle).attr(config.hasTiitle) + '"'
            }).appendTo(this);   
        }
        $that.find(config.objectTitle).mousemove(function(e){
            // положение элемента
            var pos = $(this).offset();
            var elem_left = pos.left;
            var elem_top = pos.top;
            // положение курсора внутри элемента
            var Xinner = e.pageX - elem_left;
            var Yinner = e.pageY - elem_top;
            $that.children('.tooltip').removeClass('destroy-tooltip')
                                      .animate({
                                        opacity: '1' 
                                      },800)
                                      .css({
                                        top: Yinner-25,
                                        left: Xinner-10
                                      });
            //console.log("X: " + Xinner + " Y: " + Yinner); // вывод результата в консоль
          });
        });
        $this.on(config.hide, config.item,function(){
         $(this).find('.tooltip').addClass('destroy-tooltip');
        });
      }
      
      /*tooltip*/
     $this.init();
     return $this;
    };

  }(jQuery));
   $('.tip').tooltip({

   });
    (function() {
       var app = {
           
          initialize : function () {          
              this.modules();
              this.setUpListeners();
          },
   
          modules: function () {
   
          },
   
          setUpListeners: function () {
              $('form').on('submit',app.submitForm);        
          },    
          submitForm: function (e) {
            console.log('submit');
            var $form = $(this);
            
            if(app.validateForm($form) === false) {e.preventDefault(); return false;}

            console.log('ajax');
          },       
          
      validateForm: function($form){
        var inputs = $form.find('input, textarea');
        valid = true;

        $.each(inputs,function(index,val){
          var input = $(val),
            val = input.val();
            formGroup = input.parents('.field'),
            textError = 'x';
            $(formGroup).append('<div class="nameInfo info"></div>').css({position:'relative'});
            nameInfo = $(formGroup).find('.nameInfo');
          if(input.hasClass('namevalid')){
            if(val.length<6){   
              nameInfo.removeClass('correct').addClass('error').html('').show();
                        input.removeClass('normal').addClass('wrong').attr({title:'Ви ввели не коректні дані.'});
                      valid = false;
                    } else {
                        nameInfo.removeClass('error').addClass('correct').html('').show();
                        input.removeClass('wrong').addClass('normal').attr({title:'Все вірно!'});
                    }
                }
                if(input.hasClass('phonevalid')){
                  var patt = /^[0-9()\-+ ]+$/;
              if(!patt.test(input.val())){    
              nameInfo.removeClass('correct').addClass('error').html('').show();
                        input.removeClass('normal').addClass('wrong').attr({title:'Ви ввели не коректні дані.'});
                      valid = false;
                    } else {
                        nameInfo.removeClass('error').addClass('correct').html('').show();
                        input.removeClass('wrong').addClass('normal').attr({title:'Все вірно!'});
                    }
                }
                if(input.hasClass('emailvalid')){
            var patt = /^.+@.+[.].{2,}$/i;
                if(!patt.test(input.val())){    
              nameInfo.removeClass('correct').addClass('error').html('').show();
                        input.removeClass('normal').addClass('wrong').attr({title:'Ви ввели не коректні дані.'});
                      valid = false;
                    } else {
                        nameInfo.removeClass('error').addClass('correct').html('').show();
                        input.removeClass('wrong').addClass('normal').attr({title:'Все вірно!'});
                    }
                }
        });
        return valid;
      }
      }
   
    app.initialize();
  }());
}); 
/*для слайдера*/
$(function(){
      SyntaxHighlighter.all();
    });
$(window).load(function() {
      $('#carousel').flexslider({
        animation: "slide",
        controlNav: false,
        animationLoop: false,
        slideshow: false,
        itemWidth: 165,
        itemMargin: 5,
        asNavFor: '#slider',
        move: 1,
        prevText: " ",
        nextText: " "
      });

      $('#slider').flexslider({
        animation: "slide",
        controlNav: false,
        animationLoop: false,
        directionNav: false,
        slideshow: false,
        prevText: " ",
        nextText: " ",
        sync: "#carousel",
        start: function(slider){
          $('body').removeClass('loading');
        }
      });
  $('.default-carusel').flexslider({
      animation: "slide",
      controlNav: false,
      animationLoop: false,
      itemWidth: 110,
      slideshow: true,
      itemMargin: 20,
      prevText: " ",
      nextText: " ",
      move:1
    });
});
$(function(){
  var toggles = $('.toggle a'),
      codes = $('.code');
  
  toggles.on("click", function(event){
    event.preventDefault();
    var $this = $(this);
    
    if (!$this.hasClass("active")) {
      toggles.removeClass("active");
      $this.addClass("active");
      codes.hide().filter(this.hash).show();
    }
  });
  toggles.first().click();
});
/*для слайдера*/