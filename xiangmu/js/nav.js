$(()=>{
  ajax({
    type:"get",
    url:"nav.html"
  }).then(html=>{
    document.querySelector("nav")
      .innerHTML=html;
  })
   $("nav").load("nav.html",()=>{
       if(location.search)
           $(".nav_sousuokuanginput").val(
               decodeURI(location.search.split("=")[1])
           );
     /*为search按钮添加单击事件，跳转到商品列表页*/
       //查找data-trigger属性为search的a绑定单击事件
       $("[data-trigger=search]").click(()=>{
           //获得id为txtSearch的内容,去掉开头和结尾的空格保存在变量kw中
           var kw=$("#nav_sousuokuanginput").val().trim();
           if(kw!=="")//如果kw不为""
           //用location跳转到products.html?kw=kw
               location="product.html?kw="+kw;
       });
     $txtSearch= $("#nav_sousuokuanginput");
     $shelper = $(".sousuokuang_ul");
	 $txtSearch.keyup(e=>{
         if(e.keyCode!=13){
             if(e.keyCode==40){
                 if(!$shelper.is(":has(.focus)")){
                     $shelper.children()
                         .first().addClass("focus");
                 }else{
                     if($shelper.children().last()
                             .is(".focus")){
                         $shelper.children(".focus")
                             .removeClass("focus");
                         $shelper.children()
                             .first().addClass("focus");
                     }else{
                         $shelper.children(".focus")
                             .removeClass("focus")
                             .next().addClass("focus");
                     }
                 }
                 $txtSearch.val(
                     $shelper.children(".focus")
                         .attr("title")
                 );
             }else if(e.keyCode==38){
                 if(!$shelper.is(":has(.focus)")){
                     $shelper.children()
                         .last().addClass("focus");
                 }else{
                     if($shelper.children()
                             .first().is(".focus")){
                         $shelper.children(".focus")
                             .removeClass("focus");
                         $shelper.children()
                             .last().addClass("focus");
                     }else{
                         $shelper.children(".focus")
                             .removeClass("focus")
                             .prev().addClass("focus");
                     }
                 }
                 $txtSearch.val(
                     $shelper.children(".focus").attr("title")
                 );
             }else{
                 var $tar=$(e.target);
                 $.get(
                     "php/searchHelper.php",
                     "term="+$tar.val()
                 ).then(data=>{
                     var html="";
                     for(var p of data){
                         html+=`<li title="${p.title}">
						<div class="search-item" title="${p.title}" data-url="product_details?lid=${p.lid}">${p.title}</div>
					</li>`
                     }
                     $shelper.show().html(html);
                 });
             }
         }else
             $("[data-trigger=search]").click();
     }).blur(()=>{$shelper.hide()});
  })
});