/* DBK 15/10/2012 */

/* NO FINALIZADO !!! */

$.editable.addInputType('translatable', {
    /* create input element */
    element: function (settings) {
        var buttonTranslate = $('<input type="button" id="btnTranslate" value="Obtener traducción" />');
        $(this).append(buttonTranslate);
        return (buttonTranslate);
    },
    content: function (string, settings, original) {
        /* do nothing */
    },
    plugin: function (settings, original) {
        var form = this;
        form.attr("enctype", "multipart/form-data");
        $("button:btnTranslate", form).bind('click', function () {
            var ruta = '/Translator/GoogleTranslateString';
            //alert(ruta);
            $.ajax({
                url: ruta,
                type: "post",
                dataType: "json",
                traditional: true,
                async: false,
                //beforeSend: loadingBeforeSubmit,
                data: { 'srcString': cultureName, 'toLanguage': onlyEmptyEntries },
                success: function (result, responseText) {
                    loadingSuccess(result, responseText);
                },
                error: function () {
                    alert('Error al traducir la cultura');
                }
            });


            //$(".message").show();
            $.ajax({
                url: settings.target,
                secureuri: false,
                fileElementId: 'upload',
                dataType: 'html',
                success: function (data, status) {
                    $(original).html(data);
                    original.editing = false;
                },
                error: function (data, status, e) {
                    alert(e);
                }
            });
            return (false);
        });
    }
});