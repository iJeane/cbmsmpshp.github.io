$(document).ready(function () {
    $.getJSON( "ea_list.json", function( json ) {
        let municipality = json.mt_province[0].municipality;
        var dataset = [];
        console.log(municipality[0].barangays[0].ea.length);
        for(var x=0; x < municipality[0].barangays.length; x++){
            var name = municipality[0].barangays[x].name, code;
            for(var y=0; y < municipality[0].barangays[x].ea.length; y++){
                code = municipality[0].barangays[x].code+municipality[0].barangays[x].ea[y];
                $.get("https://cbms.psa.gov.ph/api/check_shapefiles/CAPI/HPQ"+code,function(result){
                    console.log(result);
                });
                dataset.push([name,code,'<h5>Hello!</h5>']);
            }
        }
        $('table').DataTable({
            columns: [
                { title: 'Barangay'},
                { title: 'Geocode'},
                { title: 'Shapefile Uploaded'}
            ],
            data: dataset
        });
    });
});