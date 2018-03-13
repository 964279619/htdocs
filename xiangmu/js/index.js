$(()=>{
    const LIWIDTH=1920;
    $.get("php/index/getCarousel.php")
        .then(data=>{
            var html="";
            for(var img of data){
                html+=`<li  class="lf clearfloat">
                    <a href="${img.href}" title="${img.title}">
                        <img src="${img.img}">
                    </a>
                </li>`}
            html+=`<li  class="lf clearfloat">
                        <a href="${data[0].href}" title="${data[0].title}">
                            <img src="${data[0].img}">
                        </a>
                    </li>`;
            var $ul=$(".banner-img");
            $ul.html(html)
                .css("width",LIWIDTH*(data.length+1));
            var $ids=$(".indicators");
            $ids.html("<li></li>".repeat(data.length))
                .children().first().addClass("hover");

            const WAIT=3000,DURA=1000;
            var moved=0,timer=null;canMove=true;
            function move(dir=1){
                moved+=dir;
                $ul.animate({
                    left:-LIWIDTH*moved
                },DURA,()=>{
                    if(moved==data.length){
                        $ul.css("left",0);
                        moved=0;
                    }
                    $ids.children(":eq("+moved+")")
                        .addClass("hover")
                        .siblings().removeClass("hover")
                })
            }
            var timer=setInterval(move,WAIT);

            $(".index_banner").hover(
                ()=>{ clearInterval(timer); timer=null; },
                ()=>{ timer=setInterval(move,WAIT); }
            );
            $ids.on("mouseover","li",function(){
                var $li=$(this);
                var i=$li.index();
                moved=i;
                $ul.stop(true).animate({
                    left:-LIWIDTH*moved
                },DURA,()=>{
                    $ids.children(":eq("+i+")")
                        .addClass("hover")
                        .siblings().removeClass("hover");
                })
            });
        })
//    楼层滚动
    var $lift=$(".lift");
    $(window).scroll(()=>{
        var scrollTop=$("html,body").scrollTop();
        var $f1=$(".floor1");
        var offsetTop=$f1.offset().top;
        if (offsetTop<scrollTop+innerHeight/2)
            $lift.fadeIn(500);
        else
            $lift.fadeOut(500);
        var $floors=$(".floor");
        $floors.each((i,elem)=>{
            var $f=$(elem);
            if ($f.offset().top<scrollTop+innerHeight/2)
                $lift.find(".lift_item:eq("+i+")")
                    .addClass("hover")
                    .siblings().removeClass("hover");
        })
    })
    $lift.children("ul").on("click","li",function(){
        var $li=$(this);
        var i=$li.index();
        var $fi=$(".floor:eq("+i+")");
        var offsetTop=$fi.offset().top;
        $("html").animate({
            scrollTop:offsetTop
        },500)
    })
})