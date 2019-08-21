//JavaScript Document.

//FUNCTION loadData
function loadData(errTarifa, errTarifaDetalle, errTarifaTitulo) {
    $.getJSON(urlMarkers, function (data) {
        loadMap(data, errTarifa, errTarifaDetalle, errTarifaTitulo);
    }).error(function (jqXHR, textStatus, errorThrown) {
        console.log(jqXHR.responseText);
        console.log(textStatus);
        console.log(errorThrown);
    });
}
//END FUNCTION loadData

//FUNCTION loadMap
function loadMap(addr, errTarifa, errTarifaDetalle, errTarifaTitulo) {

    var styles = [{
        featureType: "administrative",
        elementType: "labels",
        stylers: [{ visibility: "off"}]
    }, {
        featureType: "all",
        elementType: "labels",
        stylers: [{ visibility: "off"}]
    }];

    var styledMap = new google.maps.StyledMapType(styles, { name: "Styled Map" });

    //SET MAP OPTIONS
    var options = {
        zoom: 2,
        center: new google.maps.LatLng(21.9019, 16.3505),
        mapTypeControl: false,
        navigationControl: true,
        navigationControlOptions: { style: google.maps.NavigationControlStyle.SMALL },
        //mapTypeId: google.maps.MapTypeId.ROADMAP,
        mapTypeControlOptions: { mapTypeIds: [google.maps.MapTypeId.ROADMAP, 'map_style'] }
    };

    //CREAT MAP OBJECT
    var map = new google.maps.Map($('#map').get(0), options);

    map.mapTypes.set('map_style', styledMap);
    map.setMapTypeId('map_style');

    //CREATE and SET infoBubble (InfoWindow)
    var infoBubble = new InfoBubble({
        borderRadius: 10,
        arrowSize: 50,
        arrowPosition: 54,
        maxWidth: 365,
        maxHeight: 220,
        disableAutoPan: false,
        //backgroundClassName: 'infobubble',
        arrowStyle: 2
    });

    if ($.browser.msie) {
        if (parseInt($.browser.version, 10) > 8) {
            infoBubble.setBackgroundColor('rgba(255,255,255, 0.8)');
        }
    } else {
        infoBubble.setBackgroundColor('rgba(255,255,255, 0.8)');
    }

    //CREATE TABS
    infoBubble.addTab('', '');
    var tab_length = 1;

    var paises = [];
    var destinos = [];
    var markers = [];

    destinos['Todos'] = new Object();

    var j = 0;
    //var tab_length = 0;

    $.each(addr, function (i, data) {

        //DESTINOS
        destinos['Todos'][data.cod_dest] = { destino: data.address, flex: data.flex };
        if (destinos[data.cod_pais] == undefined) { destinos[data.cod_pais] = new Object(); }
        destinos[data.cod_pais][data.cod_dest] = { destino: data.address, flex: data.flex };

        //PAISES
        if (!$.grep(paises, function (n) { return n.value == data.cod_pais; }).length) {
            paises[j] = { label: data.country, value: data.cod_pais };
            j++;
        }

        //CREATE marker
        markers[data.cod_dest] = new google.maps.Marker({
            position: new google.maps.LatLng(data.lat, data.lng),
            map: map,
            title: data.address
        });

        //ADD EVENT CLICK
        new google.maps.event.addListener(markers[data.cod_dest], 'click', function () {

            var url = urlTarifa.replace('_destino_', data.cod_dest);
            var url2 = urlMapaDestino.replace('_destino_', data.cod_dest);
            var content = '', oData = {}, index = 0, rm = 0;

            var conoceDestino = linkDestino.replace('_pais_', data.cod_pais).replace('_destino_', data.addressEncode);
            /*console.log(data.cod_pais);
            console.log(data.addressEncode);
            console.log(conoceDestino);*/

            var comprar = linkComprar.replace('_texto_', data.addressEncodeAux).replace('_destino_', data.cod_dest);
            var destMapa = false;

            $.getJSON(url2, function (dataDM) {

                if (dataDM[0] != undefined) { destMapa = dataDM[0].destMapa; }

                //console.log('0 - ' + dataDM[0].destMapa);


                $.getJSON(url, function (dataT) {

                    if (dataT[0] != undefined) {

                        //console.log('1 - ' + dataDM[0].destMapa);

                        $.each(dataT, function (i, o) {

                            //console.log('2 - ' + dataDM[0].destMapa);

                            oData = {
                                imgCity: data.Absolute_Path_Image_Without_Tilde,
                                address: data.address,
                                fare: o.fare,
                                details: o.details,
                                btn1: destMapa ? conoceDestino : '',
                                btn2: comprar
                            };

                            //CONTENT infoBubble
                            content = createInfoBubble(oData, 'fares');

                            //ACTUALIZA LA SOLAPA
                            if (i > 0 && tab_length == dataT.length) {

                                infoBubble.updateTab(i, o.title, content);
                                //AGREGA UNA SOLA NUEVA
                            } else if (i > 0 && tab_length < dataT.length) {

                                infoBubble.addTab(o.title, content);
                                tab_length++;
                                //BORRA TODAS LAS SOLAPAS QUE ESTAN DEMAS (lo verificaría en la 1ra iteración)
                            } else if (tab_length > dataT.length) {
                                rm = (tab_length - dataT.length);
                                index = tab_length - rm;

                                for (var j = index; j < tab_length; j++) {
                                    infoBubble.removeTab(j);
                                }
                                tab_length = index;
                            }

                            if (i == 0)
                                infoBubble.updateTab(0, o.title, content);
                        });

                    } else {

                        oData = {
                            imgCity: data.Absolute_Path_Image_Without_Tilde,
                            address: data.address,
                            fare: errTarifa,
                            details: errTarifaDetalle,
                            btn1: destMapa ? conoceDestino : '',
                            btn2: comprar
                        };

                        //CONTENT infoBubble
                        content = createInfoBubble(oData, 'nofares');

                        //BORRA TODAS LAS SOLAPAS DEMAS
                        if (tab_length > 1) {
                            index = 1;

                            for (var j = index; j < tab_length; j++) {
                                infoBubble.removeTab(j);
                            }
                            tab_length = index;
                        }

                        infoBubble.updateTab(0, errTarifaTitulo, content);
                    }

                    infoBubble.open(map, markers[data.cod_dest]);
                });
            });
        });
    });

    $('#pais').combobox({
        selected: function (event, ui) {
            cargarDestinos(destinos[ui.item.value], markers);
        }
    });

    //SORT paises
    paises.sort(function (a, b) {
        if (a.label < b.label)
            return -1;
        if (a.label > b.label)
            return 1;
        return 0;
    });

    cargarPaises(paises);
    cargarDestinos(destinos['Todos'], markers);
}
//END FUNCTION loadMap

//FUNCTION cargarPaises
function cargarPaises(paises) {
    $.each(paises, function (i, obj) {
        $('<option/>', {
            text: obj.label,
            value: obj.value
        }).appendTo('#pais');
    })
}
//END FUNCTION cargarPaises

//FUNCTION cargarDestinos
function cargarDestinos(destinos, markers) {
    $('.ciudadDestino ul').empty();
    $.each(destinos, function (cod, obj) {
        $('<li/>', {
            text: obj.destino,
            click: function () { google.maps.event.trigger(markers[cod], 'click'); cerrarDiv(box_btn_jpg); }
        }).appendTo('.ciudadDestino ul').attr('class', !obj.flex ? 'fbold' : '');
    });
}
//END FUNCTION cargarDestinos

//FUNCTION abrirDiv
function abrirDiv(img_line_jpg, text) {
    $('#box_btn').attr('src', img_line_jpg);
    $('#box_title').html(text);
    $('#box_title').attr('class', 'mleft10 celeste fbold fleft_ie7');
    $('#div_flotante2').animate({
        left: '608px',
        width: '357px',
        height: '235px'
    }, 'slow', function () {
        $('#buscadorTarifas').fadeIn('slow');
    });
}
//END FUNCTION abrirDiv

//FUNCTION cerrarDiv
function cerrarDiv(box_btn_jpg, text) {
    $('#buscadorTarifas').fadeOut('fast');
    $('#box_btn').attr('src', box_btn_jpg);
    $('#box_title').html(text);
    $('#box_title').attr('class', 'mleft10 gris11 fleft_ie7');
    $('#div_flotante2').animate({
        left: '865px',
        width: '100px',
        height: '20px'
    });
}
//END FUNCTION cerrarDiv

//FUNCTION createInfoBubble
function createInfoBubble(oData, cssFares) {

    var imagen = oData.imgCity != null ? '<div><img src="' + oData.imgCity + '" style="width:100px;height:100px;" /></div>' : '';

    var content = '<div class="infoWindow">' +
                    '<div class="hr"></div>' +
                    imagen +
                    '<div class="wrap1">' +
                        '<div class="address">' + oData.address + '</div>' +
                        '<div class="' + cssFares + '">' + oData.fare + '</div>' +
                        '<div class="text1">' + oData.details + '</div>' +
                    '</div>' +
                    '<div class="hr"></div>' +
                    '<div class="buttons">' +
    //'<img class="img1" src="' + oData.imgBtn1 + '" /><img src="' + oData.imgBtn2 + '"/>' +
    //'<div>'+ oData.btn1 + '</div><div>' + oData.btn2 + '</div>' +
                        oData.btn1 + oData.btn2
    '</div>' +
                  '</div>';
    return content;
}
//END FUNCTION createInfoBubble