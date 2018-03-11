/*Pre Loader 加载0.8后消失*/
$(function(){
    'use strict';
    $('#preloader').delay(800).fadeOut('slow');
})

/* -----------------------------
nav根据滚动高度渐变
----------------------------- */
$(function(){
    $(window).scroll(()=> {
        var scrollTop = $("html body").scrollTop();
        scrollTop<200?
            $(".sticky-setion").removeClass("nav-bg"):
            $(".sticky-setion").addClass("nav-bg")
    });
})

/* -----------------------------
滑轮滚动到响应位置视口的加动画
----------------------------- */
$(document).ready(function(){
    'use strict';
    $('.animated').appear(function(e){
        e.preventDefault();
        var element = $(this),
            animation = element.data('animation'),
            animationDelay =  element.data('animation-delay');
        if(animationDelay){
            setTimeout(function(){
                element.addClass(animation + ' visible')
            },animationDelay);
        }else{
            element.addClass( animation + " visible");
        }
    })
})



/* -----------------------------
头部后动态背景图
----------------------------- */
$(function(){
    'use strict';
    $.vegas('slideshow', {
        backgrounds:[
            { src:'image/bg-slider/1.jpg', fade:1000 },
            { src:'image/bg-slider/2.jpg', fade:1000 },
            { src:'image/bg-slider/3.jpg', fade:1000 }
        ]
    })();
})
/* -----------------------------
书籍展开的轮播
----------------------------- */
$(document).ready(function() {
    'use strict';
    var $el = $('#card-ul'),
        sectionFeatrue = $("#section-feature"),
        baraja = $el.baraja();

     if($(window).width()>480){
         sectionFeatrue.appear(function(){
             baraja.fan({
                 speed:1500,
                 easing:'ease-out',
                 range:100,
                 direction:'right',
                 origin:{x:50,y:200},
                 center:true
             });
         });
         $('#feature-expand').click(function(){
             baraja.fan({
                 speed:500,
                 easing:'ease-out',
                 range:100,
                 direction:'right',
                 origin:{x:50,y:200},
                 center:true
             });
         });
     }else{
         sectionFeatrue.appear(function(){
             baraja.fan({
                 speed:1500,
                 easing:'ease-out',
                 range:80,
                 direction:'left',
                 origin:{x:200,y:50},
                 center:true
             });
         });
         $('#feature-expand').click(function(){
             baraja.fan({
                 speed:500,
                 easing:'ease-out',
                 range:80,
                 direction:'left',
                 origin:{x:200,y:50},
                 center:true
             });
         });
     };
     $('#feature-prev').on('click',function(){
         baraja.previous();
     });
    $('#feature-next').on('click',function(){
        baraja.next();
    });
    $('#feature-close').on('click',function(){
        baraja.close();
    })
});


/* 相册点击触发事件*/
$(function(){
    'use strict';
    $(".view-project").on('click',function(e) {
        e.preventDefault();
        console.log(1);
        var porfolioWrap = $(".porfolio-container"),
            contentLoaded = $("#porfolio-load"),
            href = $(this).attr('href') + ' .portfolio-project',
            offset = $('#section-screenshots').offset().top;
        porfolioWrap.animate({'left': '-120%'}, {duration: 400, queue: false});
        porfolioWrap.fadeOut(400);
        $('html, body').animate({scrollTop: offset},{duration:800,queue:true});
        setTimeout(function(){ $('#porfolio-loader').fadeIn('fast'); },300);
        setTimeout(function(){
            $('#porfolio-loader').fadeOut();
            contentLoaded.fadeIn(600).animate({'left':'0'},{duration:800,queue:false});
            $(".back-button").fadeIn(600);
        },400)
    })

    $(".backToProject").on("click",function(){
        var porfolioWrap = $(".porfolio-container"),
            contentLoaded = $("#porfolio-load");
        contentLoaded.animate({'left':'105%'},{duration:800,queue:false}).delay(300).fadeOut(400);
        $(this).parent().fadeOut(400);
        setTimeout(function(){
            porfolioWrap.animate({'left':'0'},{duration:300,queue:false});
            porfolioWrap.fadeIn(350);
            },350);
    })
})

/*====手风琴====*/
$(function(){
    $("#section-pricing li").hover(function(){
        if($(this).hasClass('bt')){
            $(this).addClass('bt');
        }else{
            $(this).addClass('bt').siblings().removeClass("bt");
        }
    })
})


/*====  3d轮播 ====*/
$(function(){
    $("#center-img").mouseenter(function(){
        $(".box-3d").css({"animation-play-state":"paused"});
    });
    $("#center-img").mouseleave(function(){
        $(".box-3d").css({"animation":"rotate 30s linear infinite"});
    });

    $(".box-3d img").mouseenter(function(){
        let img = $(this).attr("src");
        $("#center-img").attr("src",img);
        $(".box-3d").css({"animation-play-state":"paused"});
    })

    $(".box-3d img").mouseleave(function(){
        $(".box-3d").css({"animation":"rotate 30s linear infinite"});
    })
})

$(function(){

    var W = 100 ,WAIT=2500, i=0 , moved=0,timer=null,canMove=true;

    $("#ccb li").off("click").on("click",function(){
        i = $(this).index();
        moved=i;
        $(this).addClass("on").siblings().removeClass("on");
        $("#gl").animate({'left':(-W*i+"%")},{duration:500,queue:false}).delay(1000);
    });

    function autoMove(){
        if(canMove){
            if(moved==$("#gl li").length-1){
                moved=0;
                $("#gl").css("left",0);
            }
            timer=setTimeout(()=>{
                move(1,autoMove);
            },WAIT);
        }
    }
    autoMove();

    $(".guagao1").hover(
        ()=>{//关闭轮播的开关变量
            canMove=false;
            clearTimeout(timer);//停止等待
            timer=null;
        },
        ()=>{//打开轮播开关，启动自动轮播
            canMove=true;
            autoMove();
        }
    );

    function move(dir,callback){
        moved+=dir;
        if(moved<$("#gl li").length-1){
            $("#ccb").children(":eq("+moved+")")
                .addClass("on")
                .siblings().removeClass("on");
        }else{
            $("#ccb").children(":eq(0)")
                .addClass("on")
                .siblings().removeClass("on");
        }
        $("#gl").stop(true).animate({
            left:-W*moved+"%"
        },800,callback);
    }

    $("#next").off("click").click(()=>{
        if(moved==$("#gl li").length-1){
            moved=0;
            $("#gl").css("left",0);
        }
        move(1);
    });

    $("#prev").off("click").click(()=>{
        if(moved==0){
            moved=$("#gl li").length-1;
            $("#gl").css("left",-W*moved+"%");
        }
        move(-1);
    });

})




/*===Testimonials section Starts=== */
$(function(){
    $("#bx-pager a").on("click",function(){
        var WH = -100 ,i =$(this).index();

        $(this).children().children("img").css({opacity:1});
        $(this).siblings().children().children('img').css({opacity:0.4});
        $('.testimonial-slider').animate({'left':i*WH+'%'},{duration:400,queue:false});
    })
})

/* -----------------------------
楼层滚动
----------------------------- */
$(document).ready(function() {
    'use strict';
    $('.nav').onePageNav({
        currentClass: 'current',
        scrollSpeed: 1000,
        easing: 'easeInOutQuint'
    });
    $(window).bind('scroll', function(e) {
        e.preventDefault();
        var scrollPos = $(window).stop().scrollTop();
        scrollPos > 220 ? $('.sticky-section').addClass('nav-bg') : $('.sticky-section').removeClass('nav-bg');
    });
});












