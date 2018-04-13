var helalista;
var menuoptions;
var keysystem;
var surface;
var handlepair_u_type;
var data = window.localStorage;

$(function(){
    $.getJSON('https://api.myjson.com/bins/qv4tb',function(json){
        helalista = json;
    });

    $.getJSON('https://api.myjson.com/bins/jsc4n',function(json){
        menuoptions = json;
        // following loops build the menuitems used in the application
        for(i = 0; i < menuoptions.surfaces.length; i++){
            menuitem = "<p class='dropdown-item' onclick=\"SelectSurface('"+menuoptions.surfaces[i]+"')\">"+menuoptions.surfaces[i]+"</p>";
            $('#surf-option-items').append(menuitem);
        }
        
        for(i = 0; i < menuoptions.keysystems.length; i++){
            menuitem = "<p class='dropdown-item' onclick=\"SelectKeySystem('"+menuoptions.keysystems[i]+"')\">"+menuoptions.keysystems[i]+"</p>";
            $('#keysystem-option-items').append(menuitem);
        }
        // CONTINUE FROM HERE
        /* Commented section doesn't work
        console.log(menuoptions.handle-u-types);
        for(i = 0; i < menuoptions.handle-u-types[i].length; i++){
            menuitem  ="<p class='dropdown-item' onclick=\"SelectHandlePair_U_Type('"+menuoptions.handle-u-types[i]+"')\">"+menuoptions.handle-u-types[i]+"</p>";
            $('#handlepair-u-option-items').append(menuitem);
        }
        */
    });
});

$(document).ready(function(){
    for (i= 0;i < 20;i++){
        AddRow();
    }
});

/*
$(document).ready(function(){
    $('.dropdown').click(function(){
        //alert("Kukkuu!");  korvataan oikealla implementaatiolla
        $('.dropdown-content').animate({display: 'block'});
    }); 
});
*/

function BuildMenus(menuoptions){
    
}

function Help(){
    // Korostaa vuorollaan työkalurivit ja selittää työkalun käytön
}

function MassCalculate(){
    var product_list = [];
    var helat = $('[id*="flex"]');
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
    var tulos = $('#laskentatulos');
    tulos.empty(); //Poista vanha sisältö tulostaulusta tai ainakin varmista että on tyhjä
    var avaimet = Object.keys(massalista);
    for(i = 0; i < avaimet.length;i++){
        var rivi = formatKeys(avaimet[i]) + ' : ' + massalista[avaimet[i]] + '\n';
        tulos.append(rivi);
        tulos.append('<br>');
    }
}

 function AddRow(){
    $("#AddRowButton").before("<input type='text' class='flexdatalist'/><br>");
    $('.flexdatalist:last').flexdatalist({
        minLength : 1,
        data: "https://api.myjson.com/bins/qv4tb",
        searchIn : "id"
    })
}


function ParseProducts(){

}

function SelectSurface(valinta){
    surface = valinta;
    $("#pinta-option").text("Pintakäsittely: " + valinta);
    
}

function SelectKeySystem(valinta){
    keysystem = valinta;
    $("#keysystem-option").text("Avainjärjestelmä: " + valinta);
}

function SelectHandlePair_U_Type(valinta){
    handlepair_u_type = valinta;
    $("#painikepari_u-option").text("Umpioven painikeparin tyyppi: " + valinta);
}

function formatKeys(input){ //malli syötteen käsittelylle, mahdollisesti tarvitsee tietokannan
    if(input == 'PULL_OUT'){
        return "ULKOPUOLEN VEDIN";
    }
    else if(input == 'HANDLEPAIR_U'){
        return "PAINIKE " + handlepair_u_type;
    }
    else if(input == 'HANDLEPAIR_P'){
        return "PROFIILIOVEN PAINIKE"
    } 
    else if(input == 'HANDLE_IN_U'){
        return "UMPIOVEN PUOLIPAINIKE"
    }
    
    else if(input.substr(0,3) == 'ACY'){
        return input + keysystem + " " + surface;
    }

    else{
        return input
    }
}