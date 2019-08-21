function mostrarElemento(n) { $("#" + n).css("display") == "none" ? $("#" + n).fadeIn("slow") : $("#" + n).fadeOut("slow") }

function cargarMapaListado(n, t, i) {
    var f, r, e, u, o;
    $("#" + i).css("display") == "none" ? ($("#" + i).fadeIn("slow"), f = 15, r = null, n != null && n != "" && t != null && t != "" ? r = new google.maps.LatLng(n, t) : (n = 21.9019, t = 16.3505, f = 1), e = { zoom: f, center: new google.maps.LatLng(n, t), mapTypeControlOptions: { style: google.maps.MapTypeControlStyle.DROPDOWN_MENU }, navigationControl: !0, navigationControlOptions: { style: google.maps.NavigationControlStyle.SMALL }, mapTypeId: google.maps.MapTypeId.ROADMAP }, u = new google.maps.Map($("#" + i).get(0), e), r != null && (u.setCenter(new google.maps.LatLng(n, t)), o = new google.maps.Marker({ position: r, map: u }))) : $("#" + i).fadeOut("slow")
}

function convertToSlug(n) {
    return n.toLowerCase().replace(/ /g, "-").replace(/\//g, "-").replace(/[á|à|ä|â|ã]/g, "a").replace(/[é|è|ë|ê|ē]/g, "e").replace(/[í|ì|ï|î]/g, "i").replace(/[ó|ò|ö|ô|õ]/g, "o").replace(/[ú|ù|ü|û]/g, "u").replace(/ñ/g, "n").replace(/[^\w-]+/g, "")
}(function(n) {
    n.fn.TabIndexExtension = function(t) {
        var i = n.extend({ defaults: 'a[id!="top"],area,button,input,object,select,textarea', selector: "" }, t);
        return this.find(i.selector + "," + i.defaults).attr("tabindex", "0")
    }
})(jQuery);

if ($(document.body).height() < $(window).height()) {
  $('#footer').attr('style', 'position: fixed!important; bottom: 0px;');
}
