$(document).ready(function () {
        $(".btn_sharing").click(function () {
                $(".social_share_menu").addClass("open"),
                    $(".btn_sharing").addClass("hidden"),
                    $(".btn_sharing_close").removeClass("hidden")
            }),
            $(".btn_sharing_close").click(function () {
                $(".social_share_menu").removeClass("open"),
                    $(".btn_sharing").removeClass("hidden"),
                    $(".btn_sharing_close").addClass("hidden")
            })
    }),
    $(document).mouseup(function (a) {
        var b = $(".social_share_menu"),
            c = $(".btn_sharing_close"),
            d = $(".btn_sharing");
        b.is(a.target) || 0 !== b.has(a.target).length || (b.removeClass("open"), c.addClass("hidden"), d.removeClass("hidden"))
    });
