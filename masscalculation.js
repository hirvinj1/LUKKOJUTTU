var helalista;
var menuoptions;
var keysystem; // 0
var surface; // 1
var handlepair_u_type; // 2
var exit_handle_type; // 3
var necessary_options = [keysystem,surface,handlepair_u_type,exit_handle_type]; // slightly awkward but works. Above comments tell which variable goes to what index
var data = window.localStorage;

$(function(){
    $.getJSON('https://api.myjson.com/bins/qv4tb',function(json){
        helalista = json;
    });
    $.getJSON('https://api.myjson.com/bins/lkfzz',function(json){
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

        for(i = 0; i < menuoptions.handlepair_u_types[i].length; i++){
            menuitem  ="<p class='dropdown-item' onclick=\"SelectHandlePair_U_Type('"+menuoptions.handlepair_u_types[i]+"')\">"+menuoptions.handlepair_u_types[i]+"</p>";
            $('#handlepair-u-option-items').append(menuitem);
        }
        });
});

$(document).ready(function(){
    for (i= 0;i < 20;i++){
        AddRow();
    }
});



function Help(){
    // Korostaa vuorollaan työkalurivit ja selittää työkalun käytön
}

function MassCalculate(){
    console.log(necessary_options);
    for(i = 0; i < necessary_options.length; i++){
        if(necessary_options[i] === undefined){
            alert(""); // Ilmoitus puuttuvista arvoista. Lisää korostukset!!!
            return 0; //paluuarvo epäonnistuneelle suoritukselle
        }
    }
    var product_list = []; // alustetaan muuttuja tuotteiden keruuta varten
    var helat = $('[id*="flex"]'); //poimitaan heloitustunnukset syötekentistä
    for (i = 0; i < helat.length;i++){ // käydään läpi syötetyt helat järjestyksessä
        for (j = 0;j < helalista.length;j++){ //verrataan syötettyjä heloja tietokantaan
            if (helat[i].value == helalista[j].id){ // osuman löytyessä kerätään tuotteet listaan
                for (k = 0;k < helalista[j].products.length;k++){
                    product_list.push(helalista[j].products[k]);
                }
            }
        }
    } // looppauksen jälkeen muodostetaan massaluettelo
    console.log(product_list); // loki tarkistelua varten
    var massalista = {} // alustetaan muuttuja tulostetta varten. Myöhemmin pohja *.csv tiedostolle
    for (i = 0; i< product_list.length;i++){ // käydään läpi kerätyt tuotteet
        if (product_list[i] in massalista){ // jos tuote on jo esiintynyt listassa aiemmin, lisätään sen määrää yhdellä
            massalista[product_list[i]] += 1;
        }
        else { //jos tuote ei ole esiintynyt aiemmin, annetaan sille määräksi 1.
            massalista[product_list[i]] = 1; 
        }
    }
    var tulos = $('#laskentatulos'); // muuttuja tulosteen paikkaa varten
    tulos.empty(); //Poista vanha sisältö tulostaulusta tai ainakin varmista että on tyhjä
    var avaimet = Object.keys(massalista); // tee tuotteiden nimistä oma listansa
    for(i = 0; i < avaimet.length;i++){ // käy tuotteiden nimiä läpi
        var rivi = formatKeys(avaimet[i]) + ' : ' + massalista[avaimet[i]] + '\n'; // Muodostetaan riville oikea nimi valittujen ominaisuuksien perusteella.
        tulos.append(rivi+'<br>'); // lisätään rivi tulosteeseen ja siirrytään seuraavalle riville
        tulos.append('<br>'); 
    }
return 1; // Paluuarvo onnistuneelle funktion suoritukselle
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
    necessary_options.surface = valinta;
    $("#pinta-option").text("Pintakäsittely: " + valinta);
    
}

function SelectKeySystem(valinta){
    keysystem = valinta;
    $("#keysystem-option").text("Avainjärjestelmä: " + valinta);
}

function SelectHandlePair_U_Type(valinta){
    handlepair_u_type = valinta;
    $("#handlepair-u-option").text("Umpioven painikeparin tyyppi: " + valinta);
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