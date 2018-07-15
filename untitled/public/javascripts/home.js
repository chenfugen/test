jQuery(function(){
    $(".nav li").click(function () {
       var index=$(this).index();
       console.log(index);
        $(this).siblings('li').removeClass('active');
        $(this).addClass('active');
    })
});
