$(document).ready(function(){
  try{
    var flkty = new Flickity('.product-featured-banner-bottom, .product-featured-banner .home-banner-wrapper, .carousel ');
    var carouselStatus = document.querySelector('.carousel-status');

    function updateStatus() {
      var slideNumber = flkty.selectedIndex + 1;
//       carouselStatus.textContent = slideNumber + '/' + flkty.slides.length;
    }
    updateStatus();
    flkty.on( 'select', updateStatus );
  } catch(err){console.log(err)}



  $('.toggle').click(function(e) {
    e.preventDefault();

    let $this = $(this);

    if ($this.next().hasClass('show')) {
      $this.next().removeClass('show');
      $this.next().slideUp(350);
    } else {
      $this.parent().parent().find('li .inner').removeClass('show');
      $this.parent().parent().find('li .inner').slideUp(350);
      $this.next().toggleClass('show');
      $this.next().slideToggle(350);
    }
  });


  // Smooth Scrolling Start

  // Add smooth scrolling to all links
  $(".section-links a").on('click', function(event) {

    // Make sure this.hash has a value before overriding default behavior
    if (this.hash !== "") {
      // Prevent default anchor click behavior
      event.preventDefault();

      // Store hash
      var hash = this.hash;

      // Using jQuery's animate() method to add smooth page scroll
      // The optional number (800) specifies the number of milliseconds it takes to scroll to the specified area
      $('html, body').animate({
        scrollTop: $(hash).offset().top
      }, 800, function(){


      });
    } // End if
  });


  // Add smooth scrolling to all links
  $(".custom-buttons-wrapper a").on('click', function(event) {

    // Make sure this.hash has a value before overriding default behavior
    if (this.hash !== "") {
      // Prevent default anchor click behavior
      event.preventDefault();

      // Store hash
      var hash = this.hash;

      // Using jQuery's animate() method to add smooth page scroll
      // The optional number (800) specifies the number of milliseconds it takes to scroll to the specified area
      $('html, body').animate({
        scrollTop: $(hash).offset().top
      }, 800, function(){


      });
    } // End if
  });

  // Smooth Scrolling end



  // Accordian with Images

  // $("#services__accordion .accordion  h3").click(function (e) {
  // 		e.stopPropagation();
  //     // The panel is not the H3, but its parent.
  //     let panel = $(this).parent(),
  //             tabName = panel.attr("tab-name"),
  //             image = $("#" + tabName + "-img");

  //     // Slide Up all other panels
  //     panels.slideUp();
  //     images.hide();

  //     // Slide Down target panel, and target image.
  //     panel.find(".accordion__body").slideDown();
  //     image.fadeIn('slow');

  //     $(".accordion  h3.active").removeClass('active');
  //     $(this).addClass('active');

  //     return false;
  // }).eq(0).trigger('click');

  // Accordian end



  //   let panels = $("#services__accordion > .accordion > .accordion__body").hide()

  // // Hide all accordion images
  // images = $("#accordion__img > img").hide();

  // // On click of a panel title

  // $("#services__accordion .accordion  h3").click(function (e) {
  // 		e.stopPropagation();
  //     // The panel is not the H3, but its parent.
  //     let panel = $(this).parent(),
  //             tabName = panel.attr("tab-name"),
  //             image = $("#" + tabName + "-img");

  //     // Slide Up all other panels
  //     panels.slideUp();
  //     images.hide();

  //     // Slide Down target panel, and target image.
  //     panel.find(".accordion__body").slideDown();
  //     image.fadeIn('slow');

  //     $(".accordion  h3.active").removeClass('active');
  //     $(this).addClass('active');

  //     return false;
  // }).eq(0).trigger('click');



  $('.accordian-img').first().addClass('current');
  $('.accordian-inner-wrapper .accordion').first().addClass('current');
  $('#accordion-container .accordion  h3').click(function(){
    var tab_id = $(this).parents('.accordion').attr('tab-name');
    $('.accordian-img').first().removeClass('current');
    $('.accordion').removeClass('current');
    $('.accordian-img').removeClass('current');

    $(this).parents('.accordion').addClass('current');
    $("#"+tab_id).addClass('current');
  });

  $(document).on('click', '.video-play-icon-mob', function() {
    $(this).closest('.shopify-section').find('.video-section__poster').click();
  });

  $(document).on('click', '.tab_link', function(){
    var $el = $(this),
        $el_wrap = $el.closest('.featured_tabs__wrapper'),
        target = $el.data('target');
    $el_wrap.find('.featured_tabs__content').hide();
    $(target).show();
  });
  $('.featured_tabs__wrapper').each(function(){
    $(this).find('.featured_tabs__content').first().find('.tab_link').first().trigger('click');
  });


  $(document).on('click', '#myBtn', function(){
    var $this = $(this);
    if($this.text() == 'see more') {
      $this.text('see less').addClass('active');
      $this.prev().slideDown();
    } else {
      $this.text('see more').removeClass('active');
      $this.prev().slideUp();
    }
  });

  $(document).on('click', '.video-section__poster', function () {
    var $el = $(this),
        $el_wrap = $el.closest('.video-section__media'),
        iframe = $el_wrap.find('iframe'),
        src = $(iframe).get(0).src;
    if(src.indexOf('?') != -1) {
      $(iframe).get(0).src += "&autoplay=1";
    } else {
      $(iframe).get(0).src += "?autoplay=1";
    }
  });


  $(document).on('click', '.trigger_modal', function(){
    var $el = $(this),
        target = $el.data('target');
    $(target).addClass("show-modal");
  });

  $(document).on('click', '.close-button', function(){
    $('.modal').removeClass("show-modal");
  });

  $(window).on('click', function(event){
    var classes = event.target.classList.value;
    if (classes.indexOf('modal') != -1) {
      $('.modal').removeClass("show-modal");
    }
  });
  
  $(document).on('click', '.show_more_video', function(e){
    e.preventDefault();
   var $el = $(this),
   target = $el.closest('.main-user-experience').find('.js--video_list__item');
    $(target).removeClass("hidden").show();
  });

  $(document).on('click', '[data-add-to-cart]', function(e) {
  
    e.preventDefault();
    
    let $form = $(this).closest('form');
    
    let formData = {
      'items': [{
        'id': parseInt($form.find('[name="id"]').val()),
        'quantity': 1
      }]
    };

   
    fetch('/cart/add.js', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    })
    .then(response => {
      return response.json();
    }).then(response => {
      
      window.location.href="/checkout";
      
    })
    .catch((error) => {
      console.error('Error:', error);
    });

    
  });
  // Compare Page 
  // Compare Page 
  $("button.compare_label").click(function(e){
   $(".cover").fadeIn("300");
  });
  
  
   $(".compare_now").click(function(e){
     e.preventDefault();
     
    $(".cover").fadeIn("300");
     var query_url='';
     if( $('.compare_product_image:checked').length < 2){
     alert("Please select the products");
     }
     else{
     $('.compare_product_image').each(function(index,value){
       if($(this).is(':checked')){
          if(query_url == ''){
         query_url=$(this).val();
       }
       else{
         query_url=query_url+'&'+$(this).val();

       }
       
     }
     
     });
        window.location.href="/pages/compare-page?"+query_url;
     }
     
  });
  $(".close").click(function(){
    $(".cover").fadeOut("300");
  });
  if(window.location.href.indexOf('?') > -1){
    var query_string =window.location.href.split('?')[1];
      var queries = [];
        $.each(query_string.split('&'), function(c, q) {
          queries[c] = q;
        });
    
      $.each(queries,function(c,q){
//         $('.product_compare_show[data-value="'+q+'"]').css('display','block');
//               $('.scrool_table td[data-value="'+q+'"]').css('display','block');

      });
    }
  var new_count = $('.compare_product_image:checked').length; 
     $('.compare_now').text("Compare " + new_count + " Products");
  
    $(document).on('click', '.compare_product_image', function () {
       var new_count = $('.compare_product_image:checked').length; 
     $('.compare_now').text("Compare " + new_count + " Products");
     });
  var new_count = $('.compare_product_image:checked').length; 
     $('.compare_now').text("Compare " + new_count + " Products");

// compare page js 
function getwidth()
  {
var get_length = $(".scrool_table table").find('tr:first td').length;
	
    if(get_length > 4){
	    $(".compare_page_result_inner").addClass("hand-icon-remove");
    }else{
    $(".compare_page_result_inner").removeClass("hand-icon-remove");
}
   var set_width=  100;

 var newWindowWidth = $(window).width();
        if (newWindowWidth > 768) {
          
for(i=0;i<= get_length-5;i++ ){
         set_width= set_width += 20 ;
		var set_width2 = set_width * 2;
		var set_width22 = set_width2 + "%"; 
            var actual_width = set_width + "%"; 
//     alert(actual_width);
$(".scrool_table table").css('width',actual_width); 
  
      function checkScreenSize(){
        var newWindowWidth = $(window).width();
        if (newWindowWidth < 769) {
           $(".compare_page_result_inner").css('width',set_width22); 
	
        }else{
           $(".compare_page_result_inner").css('width','auto'); 

			}
        
    }
        checkScreenSize();

  $(window).on("resize", function (e) {
        checkScreenSize();
    });
  
} 
        }else{
	    $(".compare_page_result_inner").addClass("hand-icon-remove");

	for(i=0;i<get_length-1;i++ ){
         set_width= set_width += 10 ;
		var set_width2 = set_width * 2;
		var set_width22 = set_width2 + "%"; 
            var actual_width = set_width + "%"; 
//     alert(actual_width);
$(".scrool_table table").css('width',actual_width); 
      function checkScreenSize(){
        var newWindowWidth = $(window).width();
        if (newWindowWidth < 769) {
           $(".compare_page_result_inner").css('width',set_width22); 
	
        }else{
           $(".compare_page_result_inner").css('width','auto'); 

			}
        
    }
        checkScreenSize();

  $(window).on("resize", function (e) {
        checkScreenSize();
    });
  
} 
	
  }
  }
getwidth();
  
const slider = document.querySelector('.scrool_table');
let isDown = false;
let startX;
let scrollLeft;

slider.addEventListener('mousedown', (e) => {
  isDown = true;
  slider.classList.add('active');
  startX = e.pageX - slider.offsetLeft;
  scrollLeft = slider.scrollLeft;
});
slider.addEventListener('mouseleave', () => {
  isDown = false;
  slider.classList.remove('active');
});
slider.addEventListener('mouseup', () => {
  isDown = false;
  slider.classList.remove('active');
});
slider.addEventListener('mousemove', (e) => {
  if(!isDown) return;
  e.preventDefault();
  const x = e.pageX - slider.offsetLeft;
  const walk = (x - startX) * 3; //scroll-fast
  slider.scrollLeft = scrollLeft - walk;
});  

}); // ready
window.onload = function() {
$(".compare_page_result_inner").addClass('active')
};

//table scrol hand js
$("body").on("pointerdown", function (e) {
  if ($(e.target).parents(".compare_page_result_inner").hasClass('hand-icon-remove')) {
    $(e.target).parents(".compare_page_result_inner").removeClass("hand-icon-remove");
  }
});

$(document).ready(function() {
  $(".carousel-cell").addClass("pageloaded");
});

$("body").on("click",".review_wrap",function(t){t.preventDefault(),$("html, body").animate({scrollTop:$(".customer-reviews").offset().top-100},500)})

