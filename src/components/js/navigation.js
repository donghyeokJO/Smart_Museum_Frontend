
$(document).ready(function(){
    $('.m-close').hide();

    //모바일 메뉴 클릭시 보이도록
    $('.m-open').click(function(){
        $('.mobileMenu').addClass('on');
        $('.m-open').hide();
        $('.m-close').show();
        $('.bg-shadow').css('display','block')
    });
    $('.bg-shadow').click(function(){
        $('.mobileMenu').removeClass('on');
        $(".bg-shadow").css("display", "none"); 
    });
    $('.m-close').click(function(){
        $('.mobileMenu').removeClass('on');
        $(".bg-shadow").css("display", "none");
        $('.m-close').hide();
        $('.m-open').show();

    });

    $('.gnb .menu > li').click(function(){
        $('.gnb .menu > li').removeClass('active');
        $(this).addClass('active');
    })
});
