'use strict';

app.tiendasView = kendo.observable({
    onShow: function() {},
    afterShow: function() {
        var selectedPlazaCookie = getCookie("initial");
        changeColor(selectedPlazaCookie);
        $("#selectedPlazaTiendas").val(selectedPlazaCookie);
        $("#selectedPlazaTiendas").change(function() { 
            changeColor($("#selectedPlazaTiendas").val());
            loadTiendas($("#selectedPlazaTiendas").val());  
        });
        loadTiendas(selectedPlazaCookie);
    }
});
app.localization.registerView('tiendasView');

// START_CUSTOM_CODE_tiendasView
// Add custom code here. For more information about custom code, see http://docs.telerik.com/platform/screenbuilder/troubleshooting/how-to-keep-custom-code-changes

function loadTiendas(selectedPlazaCookie){

    var centroId = getIdCentro(selectedPlazaCookie);
    var urlService = "http://167.114.156.36/CustomServices/CentrosComerciales/CentrosService/GetTiendaByFilters?centroId="+centroId;

    $("#tiendasResponse").html(loadingHtml);
    $(".loadingData").show();

    $.ajax({
        url: urlService,
        contentType: "application/json; charset=utf-8",
        dataType: "json", 
    }).done(function(xhr) {

        var tiendas = xhr.GetTiendaByFiltersResult;

        for (var x=0;x<tiendas.length;x++) {

            var tituloTienda = tiendas[x].Nombre;
            var imageTienda = tiendas[x].LogoURL;
            var detalleTienda = tiendas[x].DetalleURL;
            var horarioTienda = tiendas[x].Horario;

            var htmlTienda = '' +
                '<div class="row" style="padding:20px 10px 0px;">'+
                    '<div class="col-xs-12">'+
                        '<img src="'+imageTienda+'" style="width:100%;"/>'+
                    '</div>'+
                    '<div class="col-xs-12" style="margin-top:10px;text-align:left;padding:0px 30px;">'+
                        '<span style="font-weight:bold;">'+tituloTienda+'</span>'+
                        '<br/>'+
                        '<span style="font-weight:bold;">'+""+'</span>'+
                    '</div>'+
                    '<div class="col-xs-12 tal" style="margin:10px 0px 10px;padding:0px 30px;">'+
                        '<span>'+""+'</span>'+
                        '<br/>'+
                        '<span>'+horarioTienda+'</span>'+
                        '<br/>'+
                        '<a href="'+detalleTienda+'" target="_blank">Leer más</a>'+
                        '<hr/>'+
                    '</div>'+
                    '<div class="col-xs-6 tal" style="padding-left:30px;"><img src="images/viber-icon.png" style="width:30px;cursor:pointer;"/></div>'+
                    '<div class="col-xs-6 tar" style="padding-right:30px;"><img src="images/share-icon.png" style="width:30px;cursor:pointer;"/></div>'+
                    '<div class="col-xs-12"><hr style="border:2px solid #dcdcdc;"/></div>'+
                '</div>';

            $(".loadingData").hide();
            $("#tiendasResponse").append(htmlTienda);
        }
    });
}

// END_CUSTOM_CODE_tiendasView