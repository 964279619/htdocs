$(()=>{
//    收起更多
var $u=$(".updown");
$u.click(e=>{
    if($(".pinpai_div").is(":has(:hidden)")){
    $(".pinpai_div div").slideDown();
    $(e.target).html("收起").css({"background":"url(images/04.png)no-repeat 50px"});
}else{
    $(".pinpai_div div:gt(2):not(:last)").slideUp();
    $(e.target).html("更多").css({"background":"url(images/03.png)no-repeat 50px"});
}
})
});
var kw=location.search.split("=")[1];
//undefined  ""  =>false
function loadProducts(pno=1){//(反复被调用)
    var data=(kw?"kw="+kw+"&":"")+`pno=${pno}`;
    ajax({
        type:"get",
        url:"php/products/products.php",
        data,
        dataType:"json"
    }).then(output=> {
        console.log(output)
    var data = output.data;
    var html = "";
    console.log(data);
    for (var p of data) {
        html +=
            `<li class="pro lf clearfloat">
					<a href="product_details.html?lid=${p.lid}" class="pro_img">
						<img src="${p.md}" alt="">
					</a>
					<a href="" class="pro_title">
						${p.title}
					</a>
					<p class="pro_price">
						<span><em>￥</em>${p.price}</span>
					</p>
					<p class="pro_count">
						<s>￥${p.discount_price}</s>
					</p>
					<p class="pro_xs">
						<span>最近成交1笔</span>
						<a href="product_details.html?lid=${p.lid}" class="rf">进入店铺</a>
					</p>
				</li>`
    }
    $(".product_bigdiv").html(html);
    var pno=output.pno,pageCount=output.pageCount;
    var divPages=document.querySelector(".pager");
    //分页加载
    var html1=`<a href="javascript:;" class="previous ${pno==1?'disabled':''}">上一页</a>`;
    for(var i=1;i<=pageCount;i++){
        html1+=`<a href="javascript:;" class="${pno==i?'current':''}">${i}</a>`;
    }
    html1+=`<a href="javascript:;" class="next ${pno==pageCount?'disabled':''}">下一页</a>`;
    html1+=`&nbsp;&nbsp;&nbsp;到第<input type="text" id="pnotext">页<button class="requestpno">确认</button>`
    divPages.innerHTML=html1;
    //上方的分页加载
    var rightbtn=document.querySelector(".shaixuanlist_right");
    var html2=`<span>${pno}</span>/
				<span>${pageCount}</span>
				<a href="javascript:;" class="buttonpage prevbtn ${pno==1?'disabled':''}"> < </a>
				<a href="javascript:;" class="buttonpage nextbtn ${pno==pageCount?'disabled':''}"> > </a>`;
    rightbtn.innerHTML=html2;
    var btnrequest=document.querySelector(".requestpno");
    btnrequest.onclick=e=>{
        var pnoinput=document.getElementById("pnotext");
        var p=parseInt(pnoinput.value);
        if(p<=pageCount)
            loadProducts(pno=p);
    }

    divPages.onclick=e=> {
        var tar = e.target;
        var curr = document.querySelector(".pager a.current");
        console.log(curr)
        if (tar.nodeName == "A" && !tar.className.endsWith("disabled") && tar.className != "current") {
            switch (tar.innerHTML) {
                case "上一页":
                    loadProducts(parseInt(curr.innerHTML)-1);
                    break;
                case "下一页":
                    loadProducts(parseInt(curr.innerHTML)+1);
                    break;
                default:
                    loadProducts(tar.innerHTML);
            }
        }
    }
    rightbtn.onclick=e=> {
        var tar = e.target;
        var curr1 = document.querySelector(".shaixuanlist_right a");
        // console.log(pno)
        // console.log(curr1)
        // console.log(tar)
        console.log(!tar.className.endsWith("disabled"))
        if($(tar).is(".prevbtn")&& !tar.className.endsWith("disabled")){
            loadProducts(pno-=1);
        }
        if($(tar).is(".nextbtn")&& !tar.className.endsWith("disabled")){
            loadProducts(pno+=1);
        }
    }
})
}
loadProducts();
