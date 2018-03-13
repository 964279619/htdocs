//数码馆下面的轮播
$(()=>{
    const LIWIDTH=1920;
    $.get("php/xiangqing/getCarousel.php")
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
                     </li>`
            var $ul=$(".banner_img_ul");
            $ul.html(html)
                .css("width",LIWIDTH*(data.length+1));
            var $ids=$(".indicators");
            $ids.html("<li></li>".repeat(data.length))
                .children().first().addClass("hover");
            const WAIT=3000,DURA=500;
            var moved=0,timer=null;
            function move(){
                moved+=1;
                $ul.animate({
                    left:-LIWIDTH*moved
                },DURA,()=>{
                    if(moved==data.length){
                        $ul.css("left",0);
                        moved=0;
                    }
                    $ids.children(":eq("+moved+")")
                        .addClass("hover")
                        .siblings().removeClass("hover");
                })

            }
            var timer=setInterval(move,WAIT);

            $(".banner_img").hover(
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
})
var $ull=$(".tab_list_baokuan ul");
var html = "";
html += `<li class="lf clearfloat">
			<a href="">
				<img src="xiangqingye_img/15.jpg" alt=""/>
			</a>
			<p class="tab_list_jieshao">【精品专区】OPPO A59s 5.5英寸 八核 全网通手机 1300万+1600万像素 官方标配</p>
			<p class="tab_list_price">￥2999.00<span class="rf">已售：0</span></p>
		</li>
		<li  class="lf clearfloat">
			<a href="">
				<img src="xiangqingye_img/16.jpg" alt=""/>
			</a>
			<p class="tab_list_jieshao">苹果/Apple iPhone 7（A1660/32G）4.7 英寸 全网通手机 700万+1200万像素 官方标配</p>
			<p class="tab_list_price">￥4280.00<span class="rf">已售：0</span></p>
		</li>
		<li  class="lf clearfloat">
			<a href="">
				<img src="xiangqingye_img/17.jpg" alt=""/>
			</a>
			<p class="tab_list_jieshao">魅族/Meizu 魅蓝U20（标准版） 5.5英寸 真八核 全网通4G手机 500万像素+1300万像素 双卡双待 官方标配</p>
			<p class="tab_list_price">￥1079.00<span class="rf">已售：0</span></p>
		</li>
		<li  class="lf clearfloat">
			<a href="">
				<img src="xiangqingye_img/18.jpg" alt=""/>
			</a>
			<p class="tab_list_jieshao">【机情四月】小米/MI 红米Note4 全网通 5.5英寸 十核 全网通手机 1300万像素+500万像素 双卡双待 官方标配</p>
			<p class="tab_list_price">￥1199.00<span class="rf">已售：0</span></p>
		</li>
		<li  class="lf clearfloat">
			<a href="">
				<img src="xiangqingye_img/19.jpg" alt=""/>
			</a>
			<p class="tab_list_jieshao">小米/MI 小米6（全网通/尊享版）5.15英寸 八核 128G 全网通手机 1200万像素+1200万像素+800万像素 双卡双待 官方标配</p>
			<p class="tab_list_price">￥2999.00<span class="rf">已售：0</span></p>
		</li>
		<!--第二组数据-->
		<li class="lf clearfloat">
			<a href="">
				<img src="xiangqingye_img/15.jpg" alt=""/>
			</a>
			<p class="tab_list_jieshao">【精品专区】OPPO A59s 5.5英寸 八核 全网通手机 1300万+1600万像素 官方标配</p>
			<p class="tab_list_price">￥2999.00<span class="rf">已售：0</span></p>
		</li>
		<li  class="lf clearfloat">
			<a href="">
				<img src="xiangqingye_img/16.jpg" alt=""/>
			</a>
			<p class="tab_list_jieshao">苹果/Apple iPhone 7（A1660/32G）4.7 英寸 全网通手机 700万+1200万像素 官方标配</p>
			<p class="tab_list_price">￥4280.00<span class="rf">已售：0</span></p>
		</li>
		<li  class="lf clearfloat">
			<a href="">
				<img src="xiangqingye_img/17.jpg" alt=""/>
			</a>
			<p class="tab_list_jieshao">魅族/Meizu 魅蓝U20（标准版） 5.5英寸 真八核 全网通4G手机 500万像素+1300万像素 双卡双待 官方标配</p>
			<p class="tab_list_price">￥1079.00<span class="rf">已售：0</span></p>
		</li>
		<li  class="lf clearfloat">
			<a href="">
				<img src="xiangqingye_img/18.jpg" alt=""/>
			</a>
			<p class="tab_list_jieshao">【机情四月】小米/MI 红米Note4 全网通 5.5英寸 十核 全网通手机 1300万像素+500万像素 双卡双待 官方标配</p>
			<p class="tab_list_price">￥1199.00<span class="rf">已售：0</span></p>
		</li>
		<li  class="lf clearfloat">
			<a href="">
				<img src="xiangqingye_img/19.jpg" alt=""/>
			</a>
			<p class="tab_list_jieshao">小米/MI 小米6（全网通/尊享版）5.15英寸 八核 128G 全网通手机 1200万像素+1200万像素+800万像素 双卡双待 官方标配</p>
			<p class="tab_list_price">￥2999.00<span class="rf">已售：0</span></p>
		</li>`
$ull.html(html);
 const WAIT=3000,DURA=400;
var moved1=0,timer=null;canMove=true;
function autoMove(){
    if(canMove){
        if(moved1==5){//先判断是否最后一张
            moved1=0;//将moved1归0
            $ull.css("left",0);//将ull的left瞬间归0
        }
        timer=setTimeout(()=>{//先等待WATI秒
            move(1,autoMove);
        },WAIT);
    }
}
autoMove();
function move(dir1,callback){
    moved1+=dir1;
    $ull.stop(true).animate({
        left:-239*moved1
    },DURA,callback);
}
var $ull1=$(".tab_list_jingpin ul");
const WAIT1=3000,DURA1=500;
var moved2=0,timer1=null;canMove1=true;
function autoMove1(){
    if(canMove1){
        if(moved2==3){//先判断是否最后一张
            moved2=0;//将moved1归0
            $ull1.css("left",0);//将ull的left瞬间归0
        }
        timer1=setTimeout(()=>{//先等待WATI秒
            move1(1,autoMove1);
        },WAIT1);
    }
}
autoMove1();
function move1(dir2,callback1){
    moved2+=dir2;
    $ull1.stop(true).animate({
        left:-239*moved2
    },DURA1,callback1);
}
var $ull2=$(".tab_list_rexiao ul");
const WAIT2=3000,DURA2=500;
var moved3=0,timer2=null;canMove2=true;
function autoMove2(){
    if(canMove2){
        if(moved3==5){//先判断是否最后一张
            moved3=0;//将moved1归0
            $ull2.css("left",0);//将ull的left瞬间归0
        }
        timer2=setTimeout(()=>{//先等待WATI秒
            move2(1,autoMove2);
        },WAIT1);
    }
}
autoMove2();
function move2(dir3,callback2){
    moved3+=dir3;
    $ull2.stop(true).animate({
        left:-239*moved3
    },DURA2,callback2);
}
$(".tab_list_largediv").hover(
    ()=>{
            canMove=false;canMove1=false;canMove2=false;
            clearInterval(timer);timer=null;
            clearInterval(timer1); timer1=null;
            clearInterval(timer2); timer2=null;
    },
    ()=>{
            canMove=true;autoMove();
            canMove1=true;autoMove1();
            canMove2=true;autoMove2();
        }
);
//				爆款z-index显示
$(".tab_list:has([data-toggle=tab])")
    .on("mouseover","[data-toggle=tab]",e=>{
        e.preventDefault();
        var $tar=$(e.target);
        if(!$tar.is(".active")){
            $tar.addClass("active li_selected").siblings().removeClass("active li_selected");
            var id=$tar.attr("href");
            $(id).addClass("active") .siblings().removeClass("active");
        }
    })
$("._btn img").click(e=>{
        var parent = $(e.target).parent();
        var lis = $(".hot_tab_list li");
        if(parent.is(".left_btn")){
            if(lis.eq(0).is(".active")){
                    if(moved1==0){
                        $ull.css("left",-239);
                        moved1=5;
                    }
                    move(-1);
            }else if (lis.eq(1).is(".active")){
                    if(moved2==0){
                        $ull1.css("left",-239);
                        moved2=3;
                    }
                    move1(-1);
            }else if (lis.eq(2).is(".active")){
                    if(moved3==0){
                        $ull2.css("left",-239);
                        moved3=5;
                    }
                    move2(-1);
            }
        }else  if(parent.is(".right_btn")){
            if(lis.eq(0).is(".active")){
                if(moved1==5){
                    moved1=0;
                    $ull.css("left",0);
                }
                move(1);
            }else if (lis.eq(1).is(".active")){
                if(moved2==3){
                    moved2=0;
                    $ull1.css("left",0);
                }
                move1(1);
            }else if (lis.eq(2).is(".active")){
                if(moved3==5){
                    moved3=0;
                    $ull2.css("left",0);
                }
                move2(1);
            }
        }
})