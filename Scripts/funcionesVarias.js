// muestra u oculta elemento segun su estado agregandole un efecto
function mostrarElemento(_div) {
    if ($('#' + _div).css("display") == "none") {
        $('#' + _div).fadeIn('slow');
    }
    else {
        $('#' + _div).fadeOut('slow');
    }
}

// muestra u oculta el mapa segun su estado agregandole un efecto
function cargarMapaListado(lat, lng, _div) {
    //var lat = $("#Latitud").val();
    //var lng = $("#Longitud").val();
    if ($('#' + _div).css("display") == "none") {
        $('#' + _div).fadeIn('slow');
        var zoom = 15;
        var position = null;
        if (lat != null && lat != "" && lng != null && lng != "") {
            position = new google.maps.LatLng(lat, lng);
        }
        else {
            // Por defecto: Centro del mapa
            lat = 21.9019;
            lng = 16.3505;
            zoom = 1;
        }

        var options = {
            zoom: zoom,
            center: new google.maps.LatLng(lat, lng),
            mapTypeControlOptions: { style: google.maps.MapTypeControlStyle.DROPDOWN_MENU },
            navigationControl: true,
            navigationControlOptions: { style: google.maps.NavigationControlStyle.SMALL },
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };

        var map = new google.maps.Map($('#' + _div).get(0), options);

        // Muestro marker
        if (position != null) {
            map.setCenter(new google.maps.LatLng(lat, lng));
            var marker = new google.maps.Marker({
                position: position,
                map: map
            });
        }
    } else {
        $('#' + _div).fadeOut('slow');
    }
}
