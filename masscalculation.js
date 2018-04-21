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
    for (i= 0;i < 10;i++){ // Silmukka luo alustavasti 5 riviä heloitustunnuksille, kun muu dokumentti on ladattu
        AddRow(i);
    }
});

function AddRow(i){ // Luo syöterivin heloitustunnusten laatua ja määrää varten. KORJAA RIVINMUODOSTUS!!!!
    spot = $("#MassCalculateButton");
    value_id = "'flxamount-"+ String(i)+"'";
    spot.before("<div class='inputrow'><input type='text' placeholder='esim. M26-1' class='flexdatalist'/><input type='number' class='flex-number' placeholder='Määrä:' id="+value_id+"'></div>");
    $('.flexdatalist:last').flexdatalist({
        minLength : 1,
        data: "https://api.myjson.com/bins/wnmdb",
        searchIn : "id"
    });
    $('#AddRowButton').remove();
    $('.inputrow:last').append("<div class='div-button' id='AddRowButton' onclick='AddRow(" + String($('.inputrow').length-1) + ")'> <strong>+</strong></div>");
}

function formatKeys(input){ //apufunktio syötteen käsittelylle
    if(input == 'PULL_OUT'){
        return "Ulkopuolen vedin";
    }
    else if(input === 'HANDLEPAIR_U'){
        return "Umpioven painike " + handlepair_u_type;
    }
    else if(input === 'HANDLEPAIR_P'){
        return "Profiilioven painike " + handlepair_p_type;
    } 
    else if(input === 'HANDLE_IN_U'){
        return "Umpioven puolipainike " + handlepair_u_type;
    }

    else if(input === 'HANDLE_IN_P'){
        return "Profiilioven puolipainike " + handlepair_p_type;
    }
    
    else if(input.substr(0,3) === 'ACY'){
        if(keysystem === 'Protec 2 Cliq'){
            return 'ACYL' + input.substr(3) + KeySystemLetter(keysystem) + ' ' + surface;
        }
        else{
        return input + KeySystemLetter(keysystem) + " " + surface;
        }
    }

    else if(input === 'PULL_IN'){
        return "Sisäpuolen vedin ";
    }

    else if(input === 'PULL_OUT'){
        return "Ulkopuolen vedin ";
    }
    else if(input === 'PULL_WIRE'){
        return "Lankavedin ";
    }

    else if(input === 'PULL_WOOD'){
        return "Puuvedin ";
    }

    else if(input === 'PULL_PAIR'){
        return "Vedinpari ";
    }

    else if(input === 'HANDLE_IN_P_EXIT'){
        return "Profiilioven sisäpuolen EXIT-painike "
    }

    else if(input === 'HANDLEPAIR_P_EXIT'){
        return "Profiilioven EXIT-painikepari "
    }

    else if(input === 'HANDLEPAIR_U_EXIT'){
        return "Umpioven EXIT-painikepari "
    }

    else if(input === 'HANDLE_U_OUT'){
        return "Umpioven ulkopuolen puolipainike "
    }

    else if(input === 'HANDLE_P_OUT'){
        return "Profiilioven ulkopuolen puolipainike "
    }


    else if(input === 'HANDLE_IN_U_EXIT'){
        return "Umpioven sisäpuolen EXIT-painike "
    }

    else if(input === 'DOOR_STOP'){
        return "Ovenpysäytin ";
    }
    

    else if(input === 'CARD_READER'){
        return "Kortinlukija ";
    }

    else if(input === "HANDLEPAIR_U_LIGHT"){
        return "Välioven painike " + handlepair_light_type;
    }

    else if(input === 'WC_KNOB'){
        return "WC-nuppi ";
    }

    else if(input === 'AVR'){
        return "Abloy-vastarauta ";
    }

    else if(input === 'SAVR'){
        return "Säädettävä Abloy-vastarauta ";
    }
    
    else if(input === 'DOOR_BELL'){
        return "Ovikello ";
    }

    else if(input === 'POST_HATCH'){
        return "Postiluukku ";
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
            alert("Kaikkia tarvittavia ominaisuuksia ei ole valittu!"); // Ilmoitus puuttuvista arvoista. Lisää korostukset!!!
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
                    list_value = $(item_position).val();
                    list_object[helalista[j].products[k]] = list_value;
                    if(helalista[j].products[k].substr(0,3) === 'ACY'){
                        product_list.push({'Sarjakorotus Rakennuslukot':list_value});
                        product_list.push(list_object);
                        }
                    else if(helalista[j].products[k].substr(0,3) === "AOF" ){
                        product_list.push({"Sarjakorotus Kalustelukot":list_value});
                        product_list.push(list_object);
                        }
                    else if(helalista[j].products[k].substr(0,3) === "ACL" ){
                        product_list.push({"Sarjakorotus Kalustelukot":list_value});
                        product_list.push(list_object);
                        }
                    else{
                        product_list.push(list_object);
                        }
                }
            }
        }
    } // looppauksen jälkeen muodostetaan massaluettelo
    console.log(product_list); // loki tarkistelua varten
    var massalista = {} // alustetaan muuttuja tulostetta varten. Myöhemmin pohja *.csv tiedostolle
    for (i = 0; i< product_list.length;i++){ // käydään läpi kerätyt tuotteet
        for (variable in product_list[i]){
            if(massalista.hasOwnProperty(variable)){
                console.log('We are here!');
                massalista[variable] = parseInt(massalista[variable]) + parseInt(product_list[i][variable]);
            }
            else{
                console.log('We are here for the first time');
                massalista[variable] = parseInt(product_list[i][variable]);
            }
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
    $("#pinta").css("box-shadow","0 2px 2px 0px rgb(0,255,0)");
}

function SelectKeySystem(valinta){
    keysystem = valinta;
    necessary_options[1] = valinta;
    $("#keysystem-option").html(" Avainjärjestelmä:<br>" + valinta);
	$("#keysystem").css("box-shadow","0 2px 2px 0px rgb(0,255,0)");
}

function SelectHandlePair_U_Type(valinta){
    handlepair_u_type = valinta;
    necessary_options[2] = valinta;
    $("#handlepair-u-option").html("Umpiovien painikemalli:<br>" + valinta);
	$("#handlepair-u").css("box-shadow","0 2px 2px 0px rgb(0,255,0)");
}

function SelectHandlePair_P_Type(valinta){
    handlepair_p_type = valinta;
    necessary_options[3] = valinta;
    $("#handlepair-p-option").html("Profiiliovien painikemalli:<br>" + valinta);
	$("#handlepair-p").css("box-shadow","0 2px 2px 0px rgb(0,255,0)");
}

function SelectLightHandleType(valinta){
    handlepair_light_type = valinta;
    necessary_options[4] = valinta;
    $("#lighthandlepair-option").html("Väliovien painikemalli:<br>" + valinta);
	$("#lighthandlepair").css("box-shadow","0 2px 2px 0px rgb(0,255,0)");
}