var helalista

$(function(){
    $.getJSON('https://api.myjson.com/bins/qv4tb',function(json){
        helalista = json;
        for (i in helalista){
        //    console.log(helalista[i]); // debuggausta varten. Muista poistaa.
        }
    });
});



function MassCalculate(){
    var product_list = [];
    var helat = $('[id*="flex"]');
    console.log(helat.length);
    for (i = 0; i < helat.length;i++){ // käydään läpi syötetyt helat järjestyksessä
        for (j = 0;j < helalista.length;j++){ //verrataan syötettyjä heloja tietokantaan
            if (helat[i].value == helalista[j].id){ // osuman löytyessä kerätään tuotteet listaan
                for (k = 0;k < helalista[j].products.length;k++){
                    product_list.push(helalista[j].products[k]);
                }
            }
        }
    } // looppauksen jälkeen muodostetaan massaluettelo
    console.log(product_list);
    var massalista = {}
    for (i = 0; i< product_list.length;i++){
        if (product_list[i] in massalista){
            massalista[product_list[i]] += 1;
        }
        else {
            massalista[product_list[i]] = 1;
        }
    }
    var tulos = $('#calculation_output');
    tulos.empty(); //Poista vanha sisältö tai ainakin varmista että on tyhjä
    var avaimet = Object.keys(massalista);
    for(i = 0; i < avaimet.length;i++){
        var rivi = avaimet[i] + ' : ' + massalista[avaimet[i]] + '\n';
        tulos.append(rivi);
        tulos.append('<br>');
    }
}

 function AddRow(){
    $("#AddRowButton").before("<input type='text' class='flexdatalist'/><br>");
    $('.flexdatalist').flexdatalist({
        minLength : 1,
        data: "https://api.myjson.com/bins/qv4tb",
        searchIn : "id"
    })
}


function ParseProducts(){

}