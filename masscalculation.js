var helalista;
var menuoptions;
var keysystem; // 0
var surface; // 1
var handlepair_u_type; // 2
var handlepair_p_type; // 3
var handlepair_light_type; // 4
var exit_handle_type; // 4
var necessary_options = [keysystem,surface,handlepair_u_type,exit_handle_type]; // slightly awkward but works. Above comments tell which variable goes to what index
var data = window.localStorage;

$(function(){
    $.getJSON('https://api.myjson.com/bins/wnmdb',function(json){
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

        for(i = 0; i < menuoptions.handlepair_u_types.length; i++){
            menuitem  ="<p class='dropdown-item' onclick=\"SelectHandlePair_U_Type('"+menuoptions.handlepair_u_types[i]+"')\">"+menuoptions.handlepair_u_types[i]+"</p>";
            $('#handlepair-u-option-items').append(menuitem);
        }

        for(i = 0; i < menuoptions.handlepair_p_types.length; i++){
            menuitem  ="<p class='dropdown-item' onclick=\"SelectHandlePair_P_Type('"+menuoptions.handlepair_p_types[i]+"')\">"+menuoptions.handlepair_p_types[i]+"</p>";
            $('#handlepair-p-option-items').append(menuitem);
        }

        for(i = 0; i < menuoptions.handlepair_u_light_types.length; i++){
            menuitem = "<p class='dropdown-item' onclick=\"SelectLightHandleType('"+menuoptions.handlepair_u_light_types[i]+"')\">"+menuoptions.handlepair_u_light_types[i]+"</p>";
            $('#lighthandlepair-option-items').append(menuitem);
        }
        //Valikkojen loopit loppuu
        });
});

$(document).ready(function(){
    for (i= 0;i < 5;i++){ // Silmukka luo alustavasti 5 riviä heloitustunnuksille, kun muu dokumentti on ladattu
        AddRow(i);
    }
});

function AddRow(i){ // Luo syöterivin heloitustunnusten laatua ja määrää varten. KORJAA RIVINMUODOSTUS!!!!
    spot = $("#MassCalculateButton");
    value_id = "'flxamount-"+ String(i)+"'";
    spot.before("<div class='inputrow'><input type='text' class='flexdatalist'/><input type='number' id="+value_id+"'></div>");
    $('.flexdatalist:last').flexdatalist({
        minLength : 1,
        data: "https://api.myjson.com/bins/wnmdb",
        searchIn : "id"
    });
    $('.inputrow:last').append("<div class='div-button' id='AddRowButton' onclick='AddRow(" + String($('.inputrow').length-1) + ")'> +</div>");
}

function formatKeys(input){ //apufunktio syötteen käsittelylle
    if(input == 'PULL_OUT'){
        return "ULKOPUOLEN VEDIN";
    }
    else if(input == 'HANDLEPAIR_U'){
        return "UMPIOVENPAINIKE " + handlepair_u_type;
    }
    else if(input == 'HANDLEPAIR_P'){
        return "PROFIILIOVEN PAINIKE"
    } 
    else if(input == 'HANDLE_IN_U'){
        return "UMPIOVEN PUOLIPAINIKE"
    }
    
    else if(input.substr(0,3) === 'ACY'){
        if(keysystem === 'Protec 2 Cliq'){
            return 'ACYL' + input.substr(3) + KeySystemLetter(keysystem) + ' ' + surface;
        }
        else{
        return input + KeySystemLetter(keysystem) + " " + surface;
        }
    }
    else{
        return input
    }
}

function Help(){
    // Korostaa vuorollaan työkalurivit ja selittää työkalun käytön
}

function KeySystemLetter(keysystem){
    if (keysystem === 'Sento'){
        return 'Z';
    }
    else if(keysystem === 'Protec'){
        return 'N';
    }
    else if(keysystem === 'Protec 2' || 'Protec 2 Cliq'){
        return 'T';
    }
    else if(keysystem === 'Classic'){
        return 'C';
    }
    else if(keysystem === 'Sentry'){
        return 'B';
    }
}
function MassCalculate(){
    console.log(necessary_options);
    for(i = 0; i < necessary_options.length; i++){
        if(necessary_options[i] === undefined){
            alert(""); // Ilmoitus puuttuvista arvoista. Lisää korostukset!!!
            return 0; //paluuarvo epäonnistuneelle suoritukselle. Laskentaa ei suoriteta.
        }
    }
    var product_list = []; // alustetaan muuttuja tuotteiden keruuta varten
    var helat = $('[id*="flex"]'); //poimitaan heloitustunnukset syötekentistä.
    for (i = 0; i < helat.length;i++){ // käydään läpi syötetyt helat järjestyksessä
        for (j = 0;j < helalista.length;j++){ //verrataan syötettyjä heloja tietokantaan
            if (helat[i].value == helalista[j].id){ // osuman löytyessä kerätään tuotteet listaan
                for (k = 0;k < helalista[j].products.length;k++){
                    list_object = {}; // alustetaan object
                    item_position = '#flxamount-' + String(i); //id helarivin arvolle
                    console.log(item_position);
                    list_value = $(item_position).val();
                    list_object[helalista[j].products[k]] = list_value;
                    product_list.push(list_object);
                }
            }
        }
    } // looppauksen jälkeen muodostetaan massaluettelo
    console.log(product_list); // loki tarkistelua varten
    var massalista = {} // alustetaan muuttuja tulostetta varten. Myöhemmin pohja *.csv tiedostolle
    for (i = 0; i< product_list.length;i++){ // käydään läpi kerätyt tuotteet
        for (variable in product_list[i]){
            massalista[variable] = product_list[i][variable];
        }
    }
    var tulos = $('#laskentatulos_column'); // muuttuja tulosteen paikkaa varten
    tulos.empty(); //Poista vanha sisältö tulostaulusta tai ainakin varmista että on tyhjä
    var avaimet = Object.keys(massalista); // tee tuotteiden nimistä oma listansa
    for(i = 0; i < avaimet.length;i++){ // käy tuotteiden nimiä läpi
        var rivi = formatKeys(avaimet[i]) + ' : ' + massalista[avaimet[i]] + '\n'; // Muodostetaan riville oikea nimi valittujen ominaisuuksien perusteella.
        tulos.append(rivi+'<br>'); // lisätään rivi tulosteeseen ja siirrytään seuraavalle riville
    }
return 1; // Paluuarvo onnistuneelle funktion suoritukselle
}

function SelectSurface(valinta){
    surface = valinta;
    necessary_options[0] = valinta;
    $("#surface-option").html("Pintakäsittely:<br>" + valinta);
    
}

function SelectKeySystem(valinta){
    keysystem = valinta;
    necessary_options[1] = valinta;
    $("#keysystem-option").html(" Avainjärjestelmä:<br>" + valinta);
}

function SelectHandlePair_U_Type(valinta){
    handlepair_u_type = valinta;
    necessary_options[2] = valinta;
    $("#handlepair-u-option").html("Umpiovien painikemalli:<br>" + valinta);
}

function SelectHandlePair_P_Type(valinta){
    handlepair_p_type = valinta;
    necessary_options[3] = valinta;
    $("#handlepair-p-option").html("Profiiliovien painikemalli:<br>" + valinta);
}

function SelectLightHandleType(valinta){
    handlepair_light_type = valinta;
    necessary_options[4] = valinta;
    $("#lighthandlepair-option").html("Väliovien painikemalli:<br>" + valinta);
}