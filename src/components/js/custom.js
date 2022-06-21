$(document).ready(function(){
    //SelectBoxCustom
    $("div.select > a").click(function() {
        $(this).next("ul").toggle();
        return false;
    });
    
    $("div.select > ul > li").click(function() {
        $(this).parent().hide().parent("div.select").children("a").text($(this).text());
        $(this).prependTo($(this).parent());
    });

    //morebtnCustom
    $("div.etcBtn > a").click(function() {
        $(this).next("ul").toggleClass('on');
        return false;
    });

    //파일 추가
    $('#file').on('change', function(){
        var fileName = $('#file').val();
        $('.upload-name').val(fileName);
    });

    //tab메뉴
    var tabBtn = $('#tab-ul > li');
	var tabCont = $('.tab-cont > div');
	
	tabCont.hide().eq(0).show();
	
	tabBtn.click(function(){
		var target = $(this);
		
		var index = target.index();
		tabBtn.removeClass('on');
		target.addClass('on');
		tabCont.css("display","none");
		tabCont.eq(index).css("display","block");
	});
});
