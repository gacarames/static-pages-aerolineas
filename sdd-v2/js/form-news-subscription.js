$(document).ready(function() { 
	$(".btn_form_news").click(function() { 
		$(".form-news-open").addClass("open"), 
		$(".btn_form_news").addClass("hidden"), 
		$(".btn_form_news_close").removeClass("hidden") }), 
	$(".btn_form_news_close").click(function() { 
		$(".form-news-open").removeClass("open"), 
		$(".btn_form_news").removeClass("hidden"), 
		$(".btn_form_news_close").addClass("hidden") }) }), 
$(document).mouseup(function(a) {
    var b = $(".form-news-open"),
        c = $(".btn_form_news_close"),
        d = $(".btn_form_news");
    b.is(a.target) || 0 !== b.has(a.target).length || (b.removeClass("open"), c.addClass("hidden"), d.removeClass("hidden")) 
});
