// 切换
var $a=$(".lunbotu");
    $a.hover(
        ()=>{$(".lunbotu ul").show();},
        ()=>{$(".lunbotu ul").hide();}
    );
$(".pro2_tab_menu:has([data-toggle=tiaozhuan])")
    .on("mouseover","[data-toggle=tiaozhuan]",e=>{
        e.preventDefault();
        var $tar=$(e.target);
        if(!$tar.is(".active")){
            $tar.addClass("active").siblings().removeClass("active ");
            var id=$tar.attr("href");
            $(id).show().siblings().hide();
        }
    })
//$()
//固定定位
window.onscroll=function () {
    var scrollTop=$("html,body").scrollTop();
    var $b=$(".pro2_tab_menu");
    if(scrollTop>740){
        $b.css({
            "position":"fixed",
            "top":"0px"
        });
    }else{
        $b.css({
            "position":"absolute",
            "top":"0px"
        });
    }
}
//放大镜
$(()=>{
    var lid = location.search.split("=")[1];
    var icon_list = document.querySelector(".items ul")
    var mImg = document.querySelector(".large_img")
    var mask = document.querySelector(".mask")
    var smask = document.querySelector(".superMask")
    var lgDiv = document.querySelector(".img_largeDiv");
    /*********中图片列表***********/
    icon_list.onmouseover=e=>{
        var tar=e.target;
        if(tar.nodeName=="IMG"){
            mImg.src=tar.dataset.md;
            lgDiv.style.backgroundImage=`url(${tar.dataset.lg})`;
        }
    }
    $.ajax({
        type:"get",
        url:"php/product_detail/getProductById.php",
        data:"lid="+lid
    }).then(output=> {
        var info = output.product_info;
        var imgs = output.icon_list;
        mImg.src = imgs[0].md;
        lgDiv.style.backgroundImage = `url(${imgs[0].lg})`;
        var html = "";
        for (var pic of imgs) {
            html += `<li class="lf clearfloat">
                    <img src="${pic.sm}" data-md="${pic.md}" data-lg="${pic.lg}">

				</li>`;
        }
        icon_list.innerHTML = html;
        ///////////////////                       加载数据 //////////////////////////////////////////////////////
        document.querySelector(".goumaijieshao").innerHTML = `
                    <h1 class="goumai_title">${info.title}</h1>
                    <!-- <span class="goumai_futitle">${info.subtitle}</span> -->
                    <div class="goumai_price flex">
                        <div class="goumai_jiagetitle">村&nbsp;安&nbsp;价&nbsp; ：</div>
                        <p class="goumai_price1"><b>￥</b>${info.price}</p>
                        <span class="goumai_zhekou">(${info.discount})折</span>
                        <div class="goumai_guanwangzhekou">
                            <p>官网价</p>
                            <p>${info.discount_price}</p>
                        </div>
                    </div>
                    <ul class="ul_detail">
                        <li class="ul_detail_li">
                            <span class="ul_title">所属品牌：</span><span class="ul_detail_span">${info.lname}</span>
                        </li>
                        <li class="ul_detail_li">
                            <span class="ul_title">商品货号：
                            </span><span class="ul_detail_span">${info.product_code}</span>
                        </li>
                        <li class="ul_detail_li">
                            <span class="ul_title">库<em class="kg"></em>存：
                            </span><span class="ul_detail_span">库存充足</span>
                        </li>
                        <li class="ul_detail_li">
                            <span class="ul_title">运<em class="kg"></em>费：
                            </span><span class="ul_detail_span">满99包邮</span>
                        </li>
                    </ul>
                    <div class="guige_div flex clearfloat">
                        <div class="guigeselect_div"><span>选择版本：</span></div>
                        <div class="banben_div"></div>
                    </div>
                    <div class="input_div lf clearfloat">
                        <button class="number-add">+</button>
                        <input type="text" value="1">
                        <button class="number-reduce">-</button>
                    </div>
                    <div class="lf clearfloat goumai_btn">
                        <a href="cart.html" class="buy_img"><img src="xiangqingye_img/64.gif" alt=""></a>
                        <a href="javascript:;" class="cart_img"><img src="xiangqingye_img/63.gif" alt=""></a>
        </div>`;
        document.querySelector(".shangjia_titie_a").innerHTML = info.seller;
        document.querySelector(".bianhao_span").innerHTML = info.product_code;
        //规格加载
        var specs = output.specs;
        var html = "";
        for (var spec of specs) {
            html += `<a href="product_details.html?lid=${spec.lid}" 
            class=${info.lid === spec.lid ? "activeguige" : ""}>${spec.spec}</a>`;
        }
        document.querySelector(
            ".banben_div"
        ).innerHTML = html;
        //
        $(".pinpai_logo_a").html(`<img src=${info.seller_img}>`);
        $(".pro2_tab_top_ul").html(`<li>品牌： <span>${info.lname}</span></li>
            <li>屏幕尺寸:<span>&nbsp;${info.resolution}</span></li>
            <li>显卡类型: <span>${info.video_card}</span></li>
            <li>内存容量:<span>&nbsp;${info.memory}</span></li>
            <li>硬盘容量: <span>${info.	disk}</span></li>
            <li>操作系统：<span>${info.os}</span></li>
            <li>笔记本类型：<span>${info.category}</span></li>`)
          
        /***获取面包屑fname***/
        document.querySelector(".bread_src a:last-child").innerHTML=info.title;
        // 在div下找class为account的p为其绑定单击事件
        document.querySelector(".input_div").onclick=e=>{
            //如果e.target的class是number-reduce或number-add
            if(e.target.className=="number-reduce"
                ||e.target.className=="number-add"){
                //获得目标元素旁边的input
                var input=
                    e.target.parentNode.children[1];
                //获取input的值转为整数保存到n中
                var n=parseInt(input.value);
                //如果目标元素的class是number-add,就n+1
                if(e.target.className=="number-add")
                    n++;
                else if(n>1) n--;//否则如果n>1，就n-1
                input.value=n;//将n保存回input的值中
            }
        }
        document.querySelector(".cart_img").onclick=e=>{
            //向data/routes/users/isLogin.php发送get请求
            var url=window.location.href;
            ajax({
                type:"get",
                url:"php/islogin.php",
                dataType:"json"
            }).then(data=>{//收到响应data后:
                console.log(data.ok)
                if(data.ok==1){//如果data的ok为1
                    //获得当前a的父元素的前一个兄弟下的第三个子元素input
                    var input=e.target.parentNode.parentNode.previousElementSibling
                        .children[1];
                    //获得input的值转为整数，保存在count
                    var count=parseInt(input.value);
                    //将location的search按=切割，取第二段保存在变量lid中
                    var lid=location.search.split("=")[1];
                    //向data/routes/cart/addToCart.php发送get请求,设置data为"lid=lid&count=count",设置dataType为text
                    ajax({
                        type:"get",
                        url:"php/cart/addToCart.php",
                        data:"lid="+lid+"&count="+count,
                        dataType:"text"
                    }).then(()=>{
                        //收到响应后:提示:加入购物车成功!
                        alert("加入购物车成功!");
                        input.value=1;//重置input的值为1
                    })
                }else{//否则
                    var url=window.location.href;

                    //将back参数值中的: /等保留字转为单字节
                    // url=encodeURIComponent(url);
                    //location="login.html?back="+url;
					location="login.html?back="+url;
                }
            })
        }
    })

            /********放大镜**********/
         
            lgDiv.style.backgroundImage =
                "url(xiangqingye_img/80.png)";
            lgDiv.style.backgroundSize = "728px 728px"

            smask.onmouseover = e => {
                mask.style.display =
                    lgDiv.style.display = "block";
            }
            smask.onmouseout = e => {
                mask.style.display =
                    lgDiv.style.display = "none";
            }
            var MSIZE = 195;
            smask.onmousemove = e => {
                var x = e.offsetX, y = e.offsetY;
                var top = y - MSIZE / 2, left = x - MSIZE / 2;
                if (top < 0) top = 0;
                else if (top > 195) top = 195;
                if (left < 0) left = 0;
                else if (left > 169) left = 169;
                mask.style.cssText =
                    "display:block;top:" + top + "px;left:" + left + "px";
                lgDiv.style.backgroundPosition =
                    -16 / 7 * left + "px " + (-16 / 7 * top) + "px"
                //x         y
            }
});