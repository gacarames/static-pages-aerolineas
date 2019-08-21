/*** Funciones comunes ***/
function ExpandCollapse(id) { 
	
	if (document.getElementById) { // DOM3 = IE5, NS6
		if (document.getElementById(id).style.display == "none"){
			document.getElementById(id).style.display = 'block';
			//filter(("img"+id),'imgin');			
		} else {
			//filter(("img"+id),'imgout');
			document.getElementById(id).style.display = 'none';
		}
	} else { 
		if (document.layers) {	
			if (document.id.display == "none"){
				document.id.display = 'block';
				//filter(("img"+id),'imgin');
			} else {
				//filter(("img"+id),'imgout');	
				document.id.display = 'none';
			}
		} else {
			if (document.all.id.style.visibility == "none"){
				document.all.id.style.display = 'block';
			} else {
				//filter(("img"+id),'imgout');
				document.all.id.style.display = 'none';
			}
		}
	}
}

/*** Funcion para remover items de un listbox, si cantidadDesdeUltimo=0 entonces remueve todo ***/
/*** Autor: Gerardo Gerfauo ***/
function Remove(objListBox,cantidadDesdeUltimo){
	var intDesde = parseInt(objListBox.length)-1;
	if(cantidadDesdeUltimo==0){
		for(var i=intDesde;i>=0;i--){
			objListBox.remove(i);
		}
	} else {
		if(cantidadDesdeUltimo <= objListBox.length){
			//cantidadDesdeUltimo += 1
			var intHasta = parseInt(objListBox.length)-cantidadDesdeUltimo;
			for(var i=intDesde;i>=intHasta;i--){
				objListBox.remove(i);
			}
		}
	}
}

/*** Funcion para agregar items en un listbox ***/
/*** Autor: Gerardo Gerfauo ***/
function AddItem(objListBox, strText, strValue, intId){
	var newOpt = document.createElement("OPTION");
	//alert('antes: ' + objListBox.length);
	newOpt.text = strText;
	newOpt.value = strValue;
	newOpt.id = intId;
	objListBox.options.add(newOpt);
	//alert('Luego: ' + objListBox.length);
}

/*** Funcion para actualizar el combo de fechas segun el mes ***/
/*** Autor: Gerardo Gerfauo ***/
function ActualizaDias(objListBox, objListBoxDias){
	var cantidadDeDias = 31;
	/* Para Febrero se toman 28/29 dias */
	if(objListBox.selectedIndex==1){
		var intAnio = parseInt(objListBox.options[objListBox.selectedIndex].value.substring(0,4));
		if( (intAnio % 4) == 0 || (intAnio % 100) == 0){
			cantidadDeDias = 29;
		} else {
			cantidadDeDias = 28;
		}
	}
	
	/* Para Abril, Junio, Septiembre y Noviembre se toman 30 dias */
	if(objListBox.selectedIndex==3 ||
		objListBox.selectedIndex==5 ||
		objListBox.selectedIndex==8 ||
		objListBox.selectedIndex==10){
		cantidadDeDias = 30;
	}
	
	var intDiferencia = 0;
	intDiferencia = cantidadDeDias - objListBoxDias.length;

	//alert(cantidadDeDias + ' ' + intDiferencia);

	if(intDiferencia < 0){
		intDiferencia = Math.abs(intDiferencia);
		//alert('Remueve ' + intDiferencia);
		Remove(objListBoxDias, intDiferencia);
	} else {
		intDiferencia = Math.abs(intDiferencia);
		//alert('Agrega ' + intDiferencia);
		var intDesde = cantidadDeDias-intDiferencia+1;
		var intHasta = cantidadDeDias;
		for(var i=intDesde;i<=intHasta;i++){
			AddItem(objListBoxDias, i, i, parseInt(i-1));
		}
	}
}


//Valida la existencia de un caracter carval en la cadena val
/*** Autor: Gerardo Gerfauo ***/
function parser(val, carval, mensaje){
	for(i = 0;i < val.length;i++){
		caracter = val.charAt(i);
		if(carval.indexOf(caracter) == -1){
			alert(mensaje);
			return false;
   		}
	}
	return true;
}

//Validacion de una fecha
function validarFecha(d, m, a){
		if(a%4==0)
			var meses = new Array(31,29,31,30,31,30,31,31,30,31,30,31);
		else
			var meses = new Array(31,28,31,30,31,30,31,31,30,31,30,31);
		if(m==0||a==-1||d==0) return false;
		if(d>meses[m-1])
			return false;
		else
			return true;
}

/*** Validacion de un email ***/
function validarEmail(mail){
	if(mail.value.length < 5){
		return false;
	} else {
		num = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ.@-_";
		len = mail.value.length;
		val = mail.value;
		for(i = 0;i < len ;i++){
    		caracter = val.charAt(i);
			if(num.indexOf(caracter) == -1){
				return false;
    		}
		}
		if(val.indexOf(".@")!= -1 ||val.indexOf("@.")!= -1 || val.charAt(len - 1)=="@" 
		   || val.charAt(len - 1)=="." || val.charAt(0)=="@" || val.charAt(0)=="." 
		   || val.indexOf("@")== -1 || val.indexOf(".")== -1){
				return false;
		}
	}
	return true;
}

//Convierte los simbolos de un campo
function convertir_simbolos(NomCampo){
		var cad1 = "áéíóúñÑ";
		var cad2 = "aeiounN";
		var len = cad1.length;

		for(var i = 0;i < len ;i++){
			getObjectById(NomCampo).value = convertir_letra(getObjectById(NomCampo).value, cad1.substr(i,1), cad2.substr(i,1));
		}
}

//Saca los espacios a izquierda
function LTrim(s){
	// Devuelve una cadena sin los espacios del principio
	var i=0;
	var j=0;
	
	// Busca el primer caracter <> de un espacio
	for(i=0; i<=s.length-1; i++)
		if(s.substring(i,i+1) != ' '){
			j=i;
			break;
		}
	return s.substring(j, s.length);
}

//Saca los espacios a derecha
function RTrim(s){
	// Quita los espacios en blanco del final de la cadena
	var j=0;
	
	// Busca el último caracter <> de un espacio
	for(var i=s.length-1; i>-1; i--)
		if(s.substring(i,i+1) != " "){
			j=i;
			break;
		}
	return s.substring(0, j+1);
}

//Saca espacios a ambos lados de la cadena de string
function Trim(s){
	// Quita los espacios del principio y del final
	return LTrim(RTrim(s));
}

function trim2(string){
	return string.replace(/(^\s+)|(\s+$)/g, "");
}

//Determina si un string esta vacío
function isEmpty(s){
	s=Trim(s);
	if ((s == null) || (s.length == 0) || (s == ' ')){
		return true;
	}else {
		return false;
	};
}


//Extrae guiones de un string
//Autor: Gerardo Gerfauo
function QuitarGuiones(NomCampo){
	var valor = getObjectById(NomCampo).value;
	var largo = valor.length;
	//Saca los guiones para validar la guia
	var CAMPO = "";
	for(var i=0;i<largo;i++){
		if(valor.substring(i,i+1)!="-"){
			CAMPO += valor.substring(i,i+1);
		}
	}
	getObjectById(NomCampo).value = CAMPO;
}

//Funcion para validar si un dato es numerico
function IsNumeric(sText,Tel){
   var ValidChars = "0123456789.";
   //Si indica que es un campo telefónico, acepta el guion y los paréntesis
   if(Tel==1){
	ValidChars+="-()";
   }
   var IsNumber=true;
   var Char;

 
   for (i = 0; i < sText.length && IsNumber == true; i++) 
      { 
      Char = sText.charAt(i); 
      if (ValidChars.indexOf(Char) == -1) 
         {
         IsNumber = false;
         }
      }
   return IsNumber;
   
}

/* Obtiene un objeto por su ID*/
function getObjectById(id) { 
	var obj; 
	if (document.getElementById){ 
	obj = document.getElementById(id); 
	}else if(document.layers){ obj = document.layers[id];
	}else{ 
		obj = document.all.item(id); 
	} return obj; 
} 

//Convierte las letras a mayúsculas
function cadena_mayuscula(cadena) {

    var txt_cadena = cadena;
    var lng_cadena = cadena.length;
    var cta = 0;
    var txt_cadena_aux = '';
    var var_letra = '';

    while (cta <= lng_cadena) {
	var_letra = txt_cadena.substring(cta + 1, cta);
	letra_mayuscula = var_letra.toUpperCase();
	txt_cadena_aux = txt_cadena_aux + letra_mayuscula;
	cta++;
    }

    return txt_cadena_aux;

  }


// Reemplaza los caracteres de una cadena por otro.
function convertir_letra(cadena, letra, letra_reemplazo) {

  var txt_cadena = cadena;
  var lng_cadena = cadena.length;
  var cta = 0;
  var txt_cadena_aux = '';
  var var_letra = '';

  while (cta <= lng_cadena - 1) {
    var_letra = txt_cadena.substring(cta + 1, cta);
    letra_mayuscula = var_letra.toUpperCase();

    if (letra_mayuscula == letra.toUpperCase()) {
	  if (var_letra.toUpperCase() == var_letra)
	    var_letra = letra_reemplazo.toUpperCase();
	  else
 		    var_letra = letra_reemplazo.toLowerCase();
	}

    txt_cadena_aux = txt_cadena_aux + var_letra;
    cta++;
  }
  return txt_cadena_aux;
}


//Devuelve una fecha en formato ANSI Standard -universal- a partir de una fecha con formato dd/mm/yyyy
//Autor: Gerardo Gerfauo
function FechaToANSI(Fecha){ 
	var dia='';
	var mes='';
	var anio='';
	var Char;
	
	for (i = 0; i < Fecha.length; i++){ 
		Char = Fecha.charAt(i); 
		if(i<=1){ 
			dia+=Char;
		}else {
			if(i>=3 && i<=4){ 
				mes+=Char;
			} else {
				if(i>=6 && i<=9){ 
					anio+=Char;
				}
			}
		}
	}
	return (anio+mes+dia);
}

