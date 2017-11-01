 
//BACKGROUND CHANGER

  $(function() {
	  $themes = $("ul.dropdown-menu div");
	  
	  $themes.eq(0).click(function() {
          $("body").css({
              "background": "url('"+window._BasePath+"/mrhweb/css/assets/img/bg5.jpg')no-repeat center center fixed"
          });
          changeTheme(this);
      });
	  $themes.eq(1).click(function() {
          $("body").css({
              "background": "url('"+window._BasePath+"/mrhweb/css/assets/img/bg2.jpg')no-repeat center center fixed"
          });changeTheme(this);
      });


	  $themes.eq(2).click(function() {
          $("body").css({
              "background": "url('"+window._BasePath+"/mrhweb/css/assets/img/bg.jpg')no-repeat center center fixed"
          });changeTheme(this);
      });

	  $themes.eq(3).click(function() {
          $("body").css({
              "background": "url('"+window._BasePath+"/mrhweb/css/assets/img/giftly.png')repeat"
          });changeTheme(this);

      });

	  $themes.eq(4).click(function() {
          $("body").css({
              "background": "#2c3e50"
          });changeTheme(this);

      });

	  $themes.eq(5).click(function() {
          $("body").css({
              "background": "url('"+window._BasePath+"/mrhweb/css/assets/img/bg3.png')repeat"
          });changeTheme(this);

      });
	  $themes.eq(6).click(function() {
          $("body").css({
              "background": "url('"+window._BasePath+"/mrhweb/css/assets/img/bg8.jpg')no-repeat center center fixed"
          });
      });
	  $themes.eq(7).click(function() {
          $("body").css({
              "background": "url('"+window._BasePath+"/mrhweb/css/assets/img/bg9.jpg')no-repeat center center fixed"
          });changeTheme(this);
      });

	  $themes.eq(8).click(function() {
          $("body").css({
              "background": "url('"+window._BasePath+"/mrhweb/css/assets/img/bg10.jpg')no-repeat center center fixed"
          });changeTheme(this);
      });
	  $themes.eq(9).click(function() {
          $("body").css({
              "background": "url('"+window._BasePath+"/mrhweb/css/assets/img/bg11.jpg')no-repeat center center fixed"
          });changeTheme(this);
      });
	  $themes.eq(10).click(function() {
          $("body").css({
              "background": "url('"+window._BasePath+"/mrhweb/css/assets/img/bg12.jpg')no-repeat center center fixed"
          });changeTheme(this);
      });

	  $themes.eq(11).click(function() {
          $("body").css({
              "background": "url('"+window._BasePath+"/mrhweb/css/assets/img/bg13.jpg')repeat"
          });changeTheme(this);
      });
  });

  
  
////TOGGLE CLOSE
//    $('.nav-toggle').click(function() {
//        //get collapse content selector
//        var collapse_content_selector = $(this).attr('href');
//
//        //make the collapse content to be shown or hide
//        var toggle_switch = $(this);
//        $(collapse_content_selector).slideToggle(function() {
//            if ($(this).css('display') == 'block') {
//                //change the button label to be 'Show'
//                toggle_switch.html('<span class="entypo-minus-squared"></span>');
//            } else {
//                //change the button label to be 'Hide'
//                toggle_switch.html('<span class="entypo-plus-squared"></span>');
//            }
//        });
//    });
//
//
//    $('.nav-toggle-alt').click(function() {
//        //get collapse content selector
//        var collapse_content_selector = $(this).attr('href');
//
//        //make the collapse content to be shown or hide
//        var toggle_switch = $(this);
//        $(collapse_content_selector).slideToggle(function() {
//            if ($(this).css('display') == 'block') {
//                //change the button label to be 'Show'
//                toggle_switch.html('<span class="entypo-up-open"></span>');
//            } else {
//                //change the button label to be 'Hide'
//                toggle_switch.html('<span class="entypo-down-open"></span>');
//            }
//        });
//        return false;
//    });
//    //CLOSE ELEMENT
//    $(".gone").click(function() {
//        var collapse_content_close = $(this).attr('href');
//        $(collapse_content_close).hide();
//
//
//
//    });
//
////tooltip
//    $('.tooltitle').tooltip();
 