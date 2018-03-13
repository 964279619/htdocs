$(()=>{
    $.get({
        url:'title_list.html'
    }).then(html=>{
        $('.title_list').html(html);
        var $a=$(".lunbotu");
        $a.hover(
            ()=>{$(".lunbotu ul").show();},
            ()=>{$(".lunbotu ul").hide();}
        );
    })
});