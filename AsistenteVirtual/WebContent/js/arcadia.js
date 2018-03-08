var programado;
var yaRemitido=false;
var tituloAlt="";
var respAlt="";
var intervaloOpacidad;
var comprobacionUtilidad;
var ultimaConsultaEnviada="";
var etiquetasConsulta="";
var respuestasEmitidas="";
var numrespuestas=0;
var intentos=0;
var idConversacion="";
var listado;
var comprobarUtilidad="";
var subindice=0;
var numNegativos=0;
var esperandoValidacion=false;
var limiteInferior=document.getElementById("pie").offsetTop-document.getElementById("pie").offsetHeight;
var mensaje="\u00BFLe ha sido \u00FAtil nuestro Asistente Virtual?";
var categoriaActual="";
//var urlAplicacion=window.location.href;
//var indice=0;
var idRespuestaActual="";
var ultimaAccionValidacion=true;

function saludarReseleccionado(ambito)
{
insertarTexto("Nueva consulta");
}
function reseleccionarCategorias(ambito)
{
	var div=document.getElementById("contenido1");
	div.innerHTML="";
	var divCat=document.createElement("div");
	divCat.setAttribute("id","categorias");
	div.appendChild(divCat);
	if (ambito!="") cargarConfig(ambito);	
	var boton=document.createElement("input");
	boton.setAttribute("type","button");
	boton.setAttribute("value","Cambiar de categor\u00EDa");
	boton.setAttribute("onClick","saludarReseleccionado('"+ambito+"')");
	div.appendChild(boton);
}
function notificacion(texto) 
{
	
}
function reemplazarTodo(cadena,caracterOrigen,caracterDestino)
{
	cadena=cadena.replace(/caracterOrigen/g,caracterDestino);
	return cadena;
}
function selCategoria(valor)
{
var catObj=document.getElementById("categoriaSeleccionada");
catObj.value=valor;
}
function cargarMaxIntentos(ambito)
{
	var urlActual=location.href;
	var valor="";
	var max=document.getElementById("intentosRestantes");

	urlActual=urlActual.substring(0,location.href.indexOf("Inicio?OpenForm"));
	urlActual+="CargarMaxIntentos";
		var xhttp;
		if (window.XMLHttpRequest)
		{
			xhttp=new XMLHttpRequest();
		}
		else
		{
			xhttp=new ActiveXObject("Microsoft.XMLHTTP");
		}
		xhttp.onreadystatechange=function()
		{
			if (xhttp.readyState==4 && xhttp.status==200)
			{
			max.value=xhttp.responseText;
			}
		}
		xhttp.open("GET",urlActual,false);
		xhttp.send();
}

function cargarConfig(ambito)
{
	var catPrincipal="";
	var urlActual=location.href;
	var jsonRespuesta="";
	var div=document.getElementById("categorias");

	if (div!=null)
		{
		div.innerHTML="";
		var dest=document.getElementById("buzonSoporte");
		
		dest.value="";
		
		var categorias="";
		urlActual=urlActual.substring(0,location.href.indexOf("Inicio?OpenForm"));
		urlActual+="ListarConfiguracionSoporte";
		var xhttp;
		if (window.XMLHttpRequest)
		{
			xhttp=new XMLHttpRequest();
		}
		else
		{
			xhttp=new ActiveXObject("Microsoft.XMLHTTP");
		}
		xhttp.onreadystatechange=function()
		{
			if (xhttp.readyState==4 && xhttp.status==200)
			{
			jsonRespuesta=xhttp.responseText;
			}
		}
		xhttp.open("GET",urlActual,false);
		xhttp.send();
		try
		{
		var obj=JSON.parse(jsonRespuesta);
		var catAsistente=document.getElementById("categoriasAsistente");
		catAsistente.value=obj.categorias_asistente;
		if ((obj.servidor.length>0) & (obj.ruta.length>0))
		{
		dest.value=obj.servidor+";"+obj.ruta;
		}
		if (obj.categorias.length >0)
		if (obj.categorias[0].categoria!="")
		{
		categorias="<br>Seleccione una categor\u00EDa para su consulta:<br>";
		categorias+="<select id=\"categoriasSelect\" onchange=\"selCategoriaGeneralSoporte(this.value);\"><option name='categ' value=\"'','','"+obj.categorias.length+"'\"></option>";
		
			for (i=0;i<obj.categorias.length;i++)
			{
				categorias+="<option name='categ' value=\"'"+obj.categorias[i].categoria+"','"+i+"','"+obj.categorias.length+"'\">"+obj.categorias[i].categoria+"</option><br>";
				categoriaUnica=obj.categorias[i].categoria;
			}
			categorias+="</select>";
			
			for (i=0;i<obj.categorias.length;i++)
			{
				if (obj.categorias[i].subcategorias.length>0)
					if (obj.categorias[i].subcategorias[0]!="")
						{
						categorias+="<div id=subcats"+i+" style='visibility:hidden;display:none'><br>";
						for (j=0;j<obj.categorias[i].subcategorias.length;j++)
						{
							categorias+="&nbsp;&nbsp;&nbsp;<input type='radio' name='subcateg"+i+"' onClick=\"selSubCategoriaSoporte('"+obj.categorias[i].categoria+"','"+obj.categorias[i].subcategorias[j]+"','"+i+"','"+obj.categorias[i].subcategorias.length+"');\">"+obj.categorias[i].subcategorias[j]+"<br>";
						}
						categorias+="</div>";
						}
			}
			categorias+="<br><br>";
		}
		
		}
		catch(e)
		{

		categorias="";
		}
		div.innerHTML=categorias;
		}/**/
		cargarMaxIntentos(ambito);
}

/*function cargarConfig(ambito)
{
	var urlActual=location.href;
	var jsonRespuesta="";
	var div=document.getElementById("categorias");
	div.innerHTML="";
	var dest=document.getElementById("buzonSoporte");

	dest.value="";

	var categorias="";
	urlActual=urlActual.substring(0,location.href.indexOf("Inicio?OpenForm"));
	urlActual+="listarConfiguracionSoporte?OpenAgent&ambito="+ambito;
		var xhttp;
		if (window.XMLHttpRequest)
		{
			xhttp=new XMLHttpRequest();
		}
		else
		{
			xhttp=new ActiveXObject("Microsoft.XMLHTTP");
		}
		xhttp.onreadystatechange=function()
		{
			if (xhttp.readyState==4 && xhttp.status==200)
			{
			jsonRespuesta=xhttp.responseText;
			}
		}
		xhttp.open("GET",urlActual,false);
		xhttp.send();
		try
		{
		var obj=JSON.parse(jsonRespuesta);
		if ((obj.servidor.length>0) & (obj.ruta.length>0))
		{
		dest.value=obj.servidor+";"+obj.ruta;
		}
		if (obj.categorias.length >0)
		if (	obj.categorias[0]!="")
		{
		categorias="<br><br>Seleccione una categor\u00EDa para su consulta:<br><br>";
			for (i=0;i<obj.categorias.length;i++)
			{
				categorias+="<input type='radio' name='categ' onClick=\"selCategoria('"+obj.categorias[i]+"');\">"+obj.categorias[i]+"<br>";
			}
			categorias+="<br><br>";
		}
		
		}
		catch(e)
		{
		categorias="";
		}
		div.innerHTML=categorias;
		cargarMaxIntentos(ambito);
}
*/
function actualizarContexto(contexto)
{
	var campo=document.getElementById("Contexto");
	campo.value=contexto;
}
function solicitarIdConversacion(correo)
{
	var urlActual=location.href;
	var ambito=document.getElementById("ambito").value;
	var jsonRespuesta="";
	var cats=document.getElementById("categoriaSeleccionada").value;
	urlActual=urlActual.substring(0,location.href.indexOf("Inicio?OpenForm"));
	var useragent=document.getElementById("identificadorUserAgent");
/*	if (hayContexto)
		{
		if (useragent!=null)
			{
			urlActual+="iniciarConversacionConContexto?OpenAgent&email="+correo+"&ambito="+ambito+"&useragent="+document.getElementById("identificadorUserAgent").value+"&contexto="+contexto.value;
			}
		else
			{
			urlActual+="iniciarConversacionConContexto?OpenAgent&email="+correo+"&ambito="+ambito+"&userAgent=&contexto="+contexto.value;
			}
		}
	else
		{
		*/
		var ahora=Math.random().toString(36).replace(/[^a-z]+/g,'');
		if (useragent!=null)
		{
			urlActual+="iniciarConversacion?OpenAgent&email="+correo+"&ambito="+ambito+"&rand="+ahora+"&useragent="+document.getElementById("identificadorUserAgent").value+"&categ="+cats;
		}
		else
		{
			urlActual+="iniciarConversacion?OpenAgent&email="+correo+"&ambito="+ambito+"&rand="+ahora+"&userAgent=&categ="+cats;
		}
		//}
		var xhttp;
		if (window.XMLHttpRequest)
		{
			xhttp=new XMLHttpRequest();
		}
		else
		{
			xhttp=new ActiveXObject("Microsoft.XMLHTTP");
		}
		xhttp.onreadystatechange=function()
		{
			if (xhttp.readyState==4 && xhttp.status==200)
			{
			jsonRespuesta=xhttp.responseText;
			}
		}
		xhttp.open("GET",urlActual,false);
		xhttp.send();
		return jsonRespuesta;
}

function Beep(cadena)
{
	//if (navigator.userAgent.indexOf("Chrome")>0)
		//{
		if (typeof(jBeep)!='undefined') jBeep(cadena);
		//}
}
function incluirLibreriaBeep()
{
//	if (navigator.userAgent.indexOf("Chrome")>0)
	//	{
	var importado=document.createElement("script");
	importado.src="js/jBeep.js";
	document.getElementsByTagName("head")[0].appendChild(importado);
	//importado=document.createElement("script");
	//importado.src="jBeep.min.js";
	//document.getElementsByTagName("head")[0].appendChild(importado);
		//}
}
function incluirLibreriaHistorico()
{
	var importado=document.createElement("script");
	importado.src="js/historico.js";
	document.getElementsByTagName("head")[0].appendChild(importado);
}
function incremento(elem,total)
{
	var altura=elem.style.height;
	var temp=altura.replace("px","");
	temp*=1;
	if (temp<total)
		{
		temp+=20;
		if (temp>total) temp=total;
		elem.style.height=temp+"px";
		}
	else
		{
		clearInterval(programado);
		var texto=document.getElementById("consultaArcadia");
		texto.focus();
		}
	
}
function incrementoTransparencia(elem)
{
	
	var temp=elem.style.opacity;
	temp*=100;
	if (temp<100)
		{
		temp+=10;
		elem.style.filter="alpha(opacity="+temp+") progid:DXImageTransform.Microsoft.Shadow(Strength=5, Direction=135, Color='#111111')";
		elem.style.opacity=temp/100;
		
		}
	else
		{
		clearInterval(intervaloOpacidad);
		}
	
}
function decrementoTransparencia(elem)
{
	if (elem!=null)
		{
	var temp=elem.style.opacity;
	temp*=100;
	if (temp>0)
		{
		temp-=10;
		elem.style.filter="alpha(opacity="+temp+") progid:DXImageTransform.Microsoft.Shadow(Strength=5, Direction=135, Color='#111111')";
		elem.style.opacity=temp/100;
		
		}
	else
		{
		clearInterval(intervaloOpacidad);
		}
		}
}
function cargarUtilidad(div)
{
	if (comprobacionUtilidad=="")
		{
		comprobacionUtilidad="Visible";
		}
	else
		{
			comprobacionUtilidad="";
			
		}
}
function ocultarUtilidad(div)
{
	
}
/*
function cargarUtilidad(div)
{
	if (comprobacionUtilidad=="")
		{
			comprobacionUtilidad="Visible";
		}
	else
		{comprobacionUtilidad="";
		clearInterval(intervaloOpacidad);
		intervaloOpacidad=setInterval(function (){incrementoTransparencia(div);},150);
		}
}

function ocultarUtilidad(div)
{
	if (comprobacionUtilidad=="")
		{
			comprobacionUtilidad="Visible";
		}
	else
		{comprobacionUtilidad="";
		clearInterval(intervaloOpacidad);
		intervaloOpacidad=setInterval(function (){decrementoTransparencia(div);},150);
		}
}
*/
function activarValidacion()
{
	var div=document.getElementById("divTexto");
	var valida=document.getElementById("validacionRespuesta");
	//div.style.visibility="hidden";
	//div.style.display="none";
	//if (valida!=null)
	//{
	//valida.style.visibility="visible";
	//valida.style.display="block";
	//}
	comprobacionUtilidad="";
	
}
function restaurarEntrada()
{
	var div=document.getElementById("divTexto");
	var valida=document.getElementById("validacionRespuesta");
	/*div.style.visibility="visible";
	div.style.display="block";
	if (valida!=null)
	{
	valida.style.visibility="hidden";
	valida.style.display="none";
	}*/
	comprobacionUtilidad="";
	esperandoValidacion=false;
}
function transparenciaGradual(div)
{
	clearInterval(intervaloOpacidad);
	div.style.opacity=0;
	comprobacionUtilidad="";
	intervaloOpacidad=setInterval(function (){cargarUtilidad(div);},1000);
}
function ocultarTransparenciaGradual(div)
{
	comprobacionUtilidad="";
	intervaloOpacidad=setInterval(function (){ocultarUtilidad(div);},10);
	esperandoValidacion=false;
}
function reiniciarConversacion(mensaje)
{
	etiquetasConsulta="";
	respuestasEmitidas="";
	numrespuestas=0;
	intentos=0;
	var divContenido=document.getElementById("contenido1");
	divContenido.innerHTML="";
	//if (mensaje!="") inicioChatStr(mensaje);
	inicioChat();
}
function mostrarGradual(div)
{
	div.style.visibility="visible";
	div.style.display="block";
	//div.style.height="1px";
	div.style.height="auto";
	//programado=setInterval(function (){incremento(div,"630");},5);
}
function right(c,longitud)
{
	var cadena=c;
	if (cadena.length<=longitud)
		return cadena;
	else
		return cadena.substring(cadena.length-longitud,cadena.length);
}
function asignarIdOpener(id)
{
	/*En el caso de entrar desde el formulario*/
	try
	{
	var opener=window.opener;
	if (opener!=null)
		{
		var idc=opener.document.getElementById("IdentificadorConversacion");
		idc.value=id;

		}
	}
	catch (e)
	{}
}
function procesarRespuestaWatson(respuesta)
{
	var contexto=document.getElementById("Contexto");
	var idConversacion=document.getElementById("IdConversacion");
	var mensaje=JSON.parse(respuesta);
	idConversacion.value=mensaje.context.conversation_id;
	document.getElementById("IdConversacion").value=idConversacion.value;
	contexto.value=JSON.stringify(mensaje.context);
	asignarIdOpener(idConversacion.value);
	
	/*
	 * Capturar comportamiento especial en el saludo inicial. Etiqueta especial <START></START>
	 * */
	try
	{
		var saludoInicialWatson=mensaje.output.text[0];
		if (saludoInicialWatson.indexOf("<START>")>=0)
			{
			var codigoPlantillaArranque=saludoInicialWatson.substring(saludoInicialWatson.indexOf("<START>")+7,saludoInicialWatson.indexOf("</START>"));
			if (codigoPlantillaArranque!="") cargarPlantilla(codigoPlantillaArranque);
			}
	}
	catch (e)
	{
		console.log(e);
		
	}
	/*
	 * Fin captura comportamiento especial en saludo inicial
	 * */
}
function enlazarFormularioSoporte()
{

	concatenar("Arcadia",document.getElementById("chat"),"\u00BFDesea ponerse en contacto con nosotros a trav\u00E9s del formulario de correo electr\u00F3nico?<br><ul><li><input type=\"radio\" onClick=\"continuarConversacion();\"> No, quiero continuar la conversaci\u00F3n</li><li><input type='radio' onClick='contactarCorreo();';>S\u00ED, contactar con la AEAT por correo electr\u00F3nico</li></ul>");
	/*var divResultados=document.getElementById("contenedorSub");
	var idc=document.getElementById("IdConversacion").value;
	var ambito=document.getElementById("ambito").value;
	//window.open("https://www2.agenciatributaria.gob.es/soporteaeat/Formularios.nsf/soporteSIIGestionTest?OpenForm&ambito="+ambito+"&idc="+idc);
	divResultados.innerHTML="<div class=\"mt\"><h1 class=\"tituloCanal\">Error al iniciar Asistente Virtual</h1></div><div class=\"mt\"><br>Puede ponerse en contacto con nosotros a trav\u00E9s de nuestro formulario de Soporte pulsando en el siguiente <a href=\"https://www2.agenciatributaria.gob.es/soporteaeat/Formularios.nsf/soporteSIIGestion?OpenForm&ambito="+ambito+"&idc="+idc+"\" target=_blank>enlace</a>.<br></div>";
	*/
}

function envioPreguntasInicio(valor){
	document.getElementById("consultaArcadia").value=valor;
	enviarConsulta();
}
function calcularSaludo(categoria,ambito)
{
	var urlActual=location.href;
	var valor="";
	var saludo="";
	try
	{
	urlActual=urlActual.substring(0,location.href.indexOf("Inicio?OpenForm"));
	urlActual+="calcularSaludo?OpenAgent&cat="+categoria+"&ambito="+ambito+"&rand="+Math.random();
		var xhttp;
		if (window.XMLHttpRequest)
		{
			xhttp=new XMLHttpRequest();
		}
		else
		{
			xhttp=new ActiveXObject("Microsoft.XMLHTTP");
		}
		xhttp.onreadystatechange=function()
		{
			if (xhttp.readyState==4 && xhttp.status==200)
			{
			saludo=xhttp.responseText;
			}
		}
		xhttp.open("GET",urlActual,false);
		xhttp.send();
	}
	catch (e)
	{
		saludo="";
	}
	return saludo;
		
}
function cargarUrlSalida()
{
	esperandoValidacion=false;
	location.href="http://www.agenciatributaria.es/AEAT.internet/Inicio/La_Agencia_Tributaria/Campanas/Suministro_Inmediato_de_Informacion_en_el_IVA__SII_/Suministro_Inmediato_de_Informacion_en_el_IVA__SII_.shtml";
}
function continuarConversacionFocus()
{
	var op=document.getElementById("optContinuar");
	op.parentNode.removeChild(op);
	op=document.getElementById("optSalir");
	op.parentNode.removeChild(op);
	var msg=document.getElementById("confirmaSalida");
	msg.innerHTML="\u00BFDesea salir del Asistente Virtual?<br>No, deseo continuar con la conversaci\u00F3n.";
	msg.removeAttribute("id");
	document.getElementById('consultaArcadia').focus();
}
function cierreConfirmado()
{
	var op=document.getElementById("optContinuar");
	op.parentNode.removeChild(op);
	op=document.getElementById("optSalir");
	op.parentNode.removeChild(op);
	var msg=document.getElementById("confirmaSalida");
	msg.innerHTML="\u00BFDesea salir del Asistente Virtual?<br>S\u00ED, deseo salir del Asistente Virtual";
	msg.removeAttribute("id");
	//window.close();// Chrome no permite cerrar la ventana
	esperandoValidacion=false;
	if (esperandoValidacion)
		{
		concatenar("Arcadia",document.getElementById("chat"),"\u00BFLe ha sido \u00FAtil nuestro Asistente Virtual?<br><li style=\"text-align:right\"><div id=\"validacionRespuesta\"><a href=\"javascript:lanzarPositivoCerrando();cargarUrlSalida();\"><img width=25px height=25px src=\"iconoLike.png\"></a><a href=\"javascript:lanzarNegativoCancelar();cargarUrlSalida();\"><img width=25px height=25px src=\"iconoNoLike.png\"></a></div>");
		}
	else
		{
		cargarUrlSalida();
		}
	
	}
function cerrarChat()
{
	concatenar("Arcadia",document.getElementById("chat"),"<span id=\"confirmaSalida\">\u00BFDesea salir del Asistente Virtual?<br><input type=\"radio\" onClick=\"cierreConfirmado();\" id=\"optSalir\">S\u00ED, deseo salir del Asistente Virtual<br><input type=\"radio\" onClick=\"continuarConversacionFocus();\" id=\"optContinuar\">No, deseo continuar con la conversaci\u00F3n.</span>");
}
function pintarSaludo(am,saludo)
{
	var texto="";
	var mensajeResp="";
	if (am.value!="") 
		{
		var cats=document.getElementById("categoriaSeleccionada").value;
		if (cats!="")
			{
			texto=calcularSaludo(cats,am.value);
			}
		}
	if (texto!="")
		{
		texto=texto.replace(/\n/g,"");
		mensajeResp="<ul><li style=\"margin-bottom:8px\"><span style='color:red'>AEAT:</span> "+texto+"<br>";
		}
	else
		{
	if (am.value!="Gestion"){
		mensajeResp="<ul><li style=\"margin-bottom:8px\"><span style='color:red'>AEAT:</span> Hola "+saludo+", \u00BFen qu\u00E9 puedo ayudarle?<br>";
		//mensajeResp+="<label><input type=\"radio\" name=\"prueba\" value=\"me da error de factura duplicada\" onclick=\"envioPreguntasInicio('me da error de factura duplicada');\"> me da error de factura duplicada</label><br>";
	}else
		{
		mensajeResp="<ul><li style=\"margin-bottom:8px\"><span style='color:red'>AEAT:</span>";
		mensajeResp+="\u00A1Hola! Puedo ayudarle en sus dudas relativas al SII. Puede probar con las siguientes preguntas:<br>";
		mensajeResp+="<label><input type=\"radio\" name=\"prueba\" value=\"registroDUA\" onclick=\"envioPreguntasInicio('\u00BFCu\u00E1l es el plazo para presentar el modelo 303?');\">\u00BFCu\u00E1l es el plazo para presentar el modelo 303?</label><br>";
		mensajeResp+="<label><input type=\"radio\" name=\"prueba\" value=\"registroDUA\" onclick=\"envioPreguntasInicio('\u00BFPuedo acceder a los datos fiscales de mis facturas?');\">\u00BFPuedo acceder a los datos fiscales de mis facturas?</label><br>";
		mensajeResp+="<label><input type=\"radio\" name=\"prueba\" value=\"registroDUA\" onclick=\"envioPreguntasInicio('Realizo importaciones como registro un DUA');\">Realizo importaciones, \u00BFc\u00F3mo registro un DUA?</label><br>";
		mensajeResp+="<label><input type=\"radio\" name=\"prueba\" value=\"plazoFacturaEmitida\" onclick=\"envioPreguntasInicio('Cual es el plazo para el registro de una factura emitida');\">\u00BFCu\u00E1l es el plazo para el registro de una factura emitida?</label><br>";
		mensajeResp+="<label><input type=\"radio\" name=\"prueba\" value=\"registroContablePlazo\" onclick=\"envioPreguntasInicio('Qu\u00E9 se entiende por registro contable cuando calculo un plazo');\">\u00BFQu\u00E9 se entiende por registro contable cuando calculo un plazo?</label><br>";
		mensajeResp+="<label><input type=\"radio\" name=\"prueba\" value=\"comopuedo\" onclick=\"envioPreguntasInicio('&iquest;C&oacute;mo puedo consultar la informaci&oacute;n incluida en los Libros registros de clientes y proveedores?');\">&iquest;C&oacute;mo puedo consultar la informaci&oacute;n incluida en los Libros registros de clientes y proveedores?</label><br>";
		mensajeResp+="<label><input type=\"radio\" name=\"prueba\" value=\"entidadPublicaObligado\" onclick=\"envioPreguntasInicio('Estoy obligado al SII');\">\u00BFEstoy obligado al SII?</label><br>";
		}
		}
	mensajeResp+="</li></ul>";
	return mensajeResp;
}
function continuarNuevaConversacion()
{

		var am=document.getElementById("ambito");
		cargarConfig(am.value);	
		var tdAmbito=document.getElementById("textoAmbito");
		categoriaActiva=document.getElementById("categoriaSeleccionada").value;
		tdAmbito.innerHTML="Est\u00E1 usted hablando con el Asistente Virtual para <b>"+nombreAmbitoFormato()+"</b>";
		tdAmbito.innerHTML+="<br>Ha seleccionado: <b>"+categoriaActiva+"</b>. Si desea seleccionar otra categor\u00EDa pulse <a href=\"javascript:reseleccionarCategorias('"+am.value+"');\">aqu\u00ED</a>.";
		var chat=document.getElementById("chat");
		var d=new Date();
		var email=document.getElementById("emailUsuario").value;
		var yyyy=d.getUTCFullYear();
		var mm=right(("0"+(d.getUTCMonth()+1)),2);
		var dd=right(("0"+d.getUTCDate()),2);
		var hh=right(("0"+d.getUTCHours()),2);
		var min=right(("0"+d.getUTCMinutes()),2);
		var ss=right(("0"+d.getUTCSeconds()),2);
		var ms=d.getUTCMilliseconds();
		var inputConsulta=document.getElementById("consultaArcadia");
		var sendConsulta=document.getElementById("sendConsulta");
		var palConsulta=document.getElementById("palabrasConsulta");
		
		
		
		palConsulta.value="";
		
		//Vamos a reemplazar este idConversacion con el que diga Watson
		var hora=d.getHours();
		var saludo="";
		var saludoAudio="";
		if ((hora>=6) & (hora<12)) 
			{
			saludo="buenos d\u00EDas";
			saludoAudio+="buenosdias.wav";
			}
		else if ((hora>=12) & (hora<21))
			{
			saludo="buenas tardes";
			saludoAudio+="buenastardes.wav";
			}
		else if ((hora>=21) | (hora<6)) 
			{
			saludo="buenas noches";
			saludoAudio+="buenasnoches.wav";
			}
		else
			{
			saludo="";
			saludoAudio+="";
			}
		//var respuesta=solicitarIdConversacion();
		var respuesta=solicitarIdConversacion(email);
		
		if (respuesta.indexOf("{error}")==0)
			{
			chat.innerHTML="<ul><li>AEAT: Se ha producido un error al reiniciar el Asistente Virtual.<br>Por favor recargue la p\u00E1gina y vuelva a intentarlo.<br>Disculpe las molestias.</li></ul>"
			console.log(respuesta);
			consultaArcadia.disabled=true;
			sendConsulta.disabled=true;
			enlazarFormularioSoporte();
			}	
		else 
			{
			//var mensajeResp="\u00BFEn qu\u00E9 m\u00E1s puedo ayudarle?";
			//concatenar("Arcadia",chat,mensajeResp);
			var hayContexto=false;
			var contextoOriginal=document.getElementById("Contexto");
			if (contextoOriginal!=null)
				if (contextoOriginal.value!="") hayContexto=true;
			if (hayContexto) 
				{
				var jsonContextoPrevio=JSON.parse(contextoOriginal.value);
				var jsonRespuesta=JSON.parse(respuesta);
				/*Mantenemos el contexto pero cambiamos el id 
				 * y luego cargamos el contexto modificado en la respuesta inicial*/
				jsonContextoPrevio.conversation_id=jsonRespuesta.context.conversation_id;
				jsonRespuesta.context=jsonContextoPrevio;
				
				}
			
			procesarRespuestaWatson(JSON.stringify(jsonRespuesta));
			}
		
		//registrarEntrada("<RESPUESTA>Hola "+saludo+", \u00BFen qu\u00E9 puedo ayudarle?</RESPUESTA>");

		//Beep("ayudarle.wav");
		//iniciarHistorico();
		numNegativos=0;

}
function inicioChat()
{
	var am=document.getElementById("ambito");
	cargarConfig(am.value);	
	ultimaAccionValidacion=true;
	categoriaActiva=document.getElementById("categoriaSeleccionada").value;
	var tdAmbito=document.getElementById("textoAmbito");
	tdAmbito.innerHTML="Est\u00E1 usted hablando con el Asistente Virtual para <b>"+nombreAmbitoFormato()+"</b>";
	tdAmbito.innerHTML+="<br>Ha seleccionado<b>: "+categoriaActiva+"</b>. Si desea seleccionar otra categor\u00EDa pulse <a href=\"javascript:reseleccionarCategorias('"+am.value+"');\">aqu\u00ED</a>.";
	var chat=document.getElementById("chat");
	var d=new Date();
	var email=document.getElementById("emailUsuario").value;
	var yyyy=d.getUTCFullYear();
	var mm=right(("0"+(d.getUTCMonth()+1)),2);
	var dd=right(("0"+d.getUTCDate()),2);
	var hh=right(("0"+d.getUTCHours()),2);
	var min=right(("0"+d.getUTCMinutes()),2);
	var ss=right(("0"+d.getUTCSeconds()),2);
	var ms=d.getUTCMilliseconds();
	var inputConsulta=document.getElementById("consultaArcadia");
	var sendConsulta=document.getElementById("sendConsulta");
	var palConsulta=document.getElementById("palabrasConsulta");
	
	
	palConsulta.value="";
	
	//Vamos a reemplazar este idConversacion con el que diga Watson
	var hora=d.getHours();
	var saludo="";
	var saludoAudio="";
	if ((hora>=6) & (hora<12)) 
		{
		saludo="buenos d\u00EDas";
		saludoAudio+="buenosdias.wav";
		}
	else if ((hora>=12) & (hora<21))
		{
		saludo="buenas tardes";
		saludoAudio+="buenastardes.wav";
		}
	else if ((hora>=21) | (hora<6)) 
		{
		saludo="buenas noches";
		saludoAudio+="buenasnoches.wav";
		}
	else
		{
		saludo="";
		saludoAudio+="";
		}
	//var respuesta=solicitarIdConversacion();
	var respuesta=solicitarIdConversacion(email);
	if (respuesta.indexOf("{error}")==0)
		{
		chat.innerHTML="<ul><li>AEAT: Se ha producido un error al iniciar el Asistente Virtual.<br>Por favor recargue la p\u00E1gina y vuelva a intentarlo.<br>Disculpe las molestias.</li></ul>"
		console.log(respuesta);
		consultaArcadia.disabled=true;
		sendConsulta.disabled=true;
		enlazarFormularioSoporte();
		}	
	else 
		{
		var mensajeResp=pintarSaludo(am,saludo);
		chat.innerHTML=mensajeResp;
		procesarRespuestaWatson(respuesta);
		}
	
	//registrarEntrada("<RESPUESTA>Hola "+saludo+", \u00BFen qu\u00E9 puedo ayudarle?</RESPUESTA>");

	//Beep("ayudarle.wav");
	//iniciarHistorico();
	numNegativos=0;
}
function inicioChatStr(linea)
{
	inicioChat();
	//Reemplazamos el anterior c\u00F3digo porque ahora s\u00F3lo se reinicia la conversaci\u00F3n entera
	//var chat=document.getElementById("chat");
	//chat.innerHTML="<ul><li>Arcadia: "+linea+"</li></ul>"
}
function mostrarDiv()
{
	var div=document.getElementById("arcadia");
	var divder=document.getElementById("contenedorder");
	var interesar=document.getElementById("interesar");
	var contactar=document.getElementById("contactar");
	interesar.style.visibility="hidden";
	interesar.style.display="none";
	contactar.style.visibility="hidden";
	contactar.style.display="none";
	divder.appendChild(div);
	div.style.borderStyle="solid";
	mostrarGradual(div);
	inicioChat();
}
function notificacion(mensaje)
{
	var td=document.getElementById("notificaciones");
	td.innerHTML=mensaje;
}
function registrarValoracionTexto()
{
	var idc=document.getElementById("IdConversacion").value;
	var mensaje=document.getElementById("valoracionUsuario");
	ejecutarAgenteEvaluacion(idc,"Mejora - "+encodeURI(mensaje.value),false);
	concatenar("Arcadia",document.getElementById("chat"),"Gracias por ayudarnos a mejorar nuestro Asistente Virtual");
	alert("Gracias por ayudarnos a mejorar nuestro servicio");
	contactarCorreo();
}
function lanzarNegativoValorar()
{
	esperandoValoracion=false;
	var divUtilidad=document.getElementById("divUtilidad");
	var divChat=document.getElementById("chat");
	var elemento;
	var tr;
	var td;
	var table;
	var tbody;
	var idc=document.getElementById("IdConversacion").value;
	ejecutarAgenteEvaluacion(idc,"Negativo",(numNegativos==3));
	table=document.createElement("table");
	tr=document.createElement("tr");
	td=document.createElement("td");
	tbody=document.createElement("tbody");
	table.style.width="100%";
	table.appendChild(tbody);
	tbody.appendChild(tr);
	tr.appendChild(td);
	td.innerHTML="Antes de remitirle al formulario de soporte por correo electr\u00F3nico, \u00BFpodr\u00EDa darnos su opini\u00F3n sobre nuestro Asistente Virtual o de qu\u00E9 manera podr\u00EDamos mejorarlo?";
	divUtilidad.innerHTML="";
	divUtilidad.appendChild(table);
	elemento=document.createElement("br");
	td.appendChild(elemento);
	elemento=document.createElement("input");
	elemento.setAttribute("type","text");
	elemento.setAttribute("id","valoracionUsuario");
	elemento.style.width="100%";
	elemento.style.height="70px";
	elemento.style.padding="10px 0px 55px 5px";
	td.appendChild(elemento);
	tr=document.createElement("tr");
	td=document.createElement("td");
	td.style="text-align:right;"
	td.setAttribute("style","text-align:right");
	tbody.appendChild(tr);
	elemento=document.createElement("input");
	elemento.setAttribute("type","button");
	elemento.setAttribute("onClick", "registrarValoracionTexto();");
	elemento.value="Enviar opini\u00F3n";
	td.appendChild(elemento);
	td.innerHTML+="&nbsp;";
	elemento=document.createElement("input");
	elemento.setAttribute("type","button");
	elemento.setAttribute("onClick", "javascript:contactarCorreo();");
	elemento.value="No, gracias";
	td.appendChild(elemento);
	tr.appendChild(td);
	divChat.style.height=180;
	
	//concatenar("Arcadia",document.getElementById("chat"),"\u00BFTiene alguna sugerencia que hacernos para mejorar este Asistente Virtual?<br><input type=\"radio\" name=\"valorar\" value=\"Si\" onClick=\"continuarConversacion();\">S\u00ED<br><input type=\"radio\" name=\"valorar\" value=\"No\" onClick=\"contactarCorreo();\">No, gracias</select> ");
	//var botonEnviar=document.getElementById("sendConsulta");
	//botonEnviar.setAttribute("onClick","registrarValoracionTexto();");
}
function crearArcadia()
{
	//incluirLibreriaBeep();
	var body=document.getElementById("body");
	var divArcadia=document.createElement("div");
	
	divArcadia.id="arcadia";
	divArcadia.className="arcadia";
	//divArcadia.className="objMovible arcadia";
	var divPrecarga=document.createElement("div");
	divPrecarga.id="precargaImagenes";
	divPrecarga.style.visibility="hidden";
	divPrecarga.style.display="none";
	var imagenEstandar=document.createElement("img");
	imagenEstandar.setAttribute("src","img/animacionArcadiaNeutra.gif");
	var imagenEnfado=document.createElement("img");
	imagenEnfado.setAttribute("src","img/animacionArcadiaEnfado.gif");
	var imagenRespuesta=document.createElement("img");
	imagenRespuesta.setAttribute("src","img/animacionArcadiaRespuesta.gif");
	var imagenTriste=document.createElement("img");
	imagenTriste.setAttribute("src","img/animacionArcadiaTriste.gif");
	divPrecarga.appendChild(imagenEstandar);
	divPrecarga.appendChild(imagenEnfado);
	divPrecarga.appendChild(imagenRespuesta);
	divPrecarga.appendChild(imagenTriste);
	var divContenido=document.createElement("div");
	divContenido.id="contenidoArcadia";
	var divChat=document.createElement("div");
	divChat.id="chat";
	divChat.className="chat";
	divChat.setAttribute("style","padding-left:10px;padding-right:10px;padding-top:10px;padding-bottom:10px");
	//var imgMover=document.createElement("img");
	//imgMover.id="botonMover";
	//imgMover.setAttribute("src", "cruz.gif");
	var imagenArcadia=document.createElement("img");
	imagenArcadia.id="imagenArcadia";
	imagenArcadia.setAttribute("src","img/animacionArcadiaNeutra.gif");
	var divConsulta=document.createElement("div");
	divConsulta.id="consulta";
	divConsulta.className="consulta";
	var divTexto=document.createElement("div");
	divTexto.setAttribute("id","divTexto");
	divConsulta.appendChild(divTexto);
	var table=document.createElement("table");
	var tbody=document.createElement("tbody");
	var tr=document.createElement("tr");
	var trbotones=document.createElement("tr");
	var td=document.createElement("td");
	var tdbotones=document.createElement("td");
	table.setAttribute("width","100%");
	tdbotones.setAttribute("style","text-align:right");
	td.innerHTML="<input type=\"text\" id=\"consultaArcadia\" onKeyPress=\"return disableEnterKey(event);\" style=\"width:100%\">";
	tdbotones.innerHTML="<input type=\"button\" id=\"sendConsulta\" onClick=\"enviarConsulta();\" value=\"Enviar\">";
	tdbotones.innerHTML+="&nbsp;<input type=\"button\" id=\"nuevaConsulta\" onClick=\"insertarTexto('Nueva consulta');\" value=\"Nueva Consulta\">";
	tr.appendChild(td);
	trbotones.appendChild(tdbotones);
	tbody.appendChild(tr);
	tbody.appendChild(trbotones);
	table.appendChild(tbody);
	//divConsulta.appendChild(table);
	divTexto.appendChild(table);
//Tabla para notificaciones
	table=document.createElement("table");
	table.className="notificaciones";
	tbody=document.createElement("tbody");
	tr=document.createElement("tr");
	//tr.className="notificaciones";
	td=document.createElement("td");
	td.className="notificaciones";
	td.id="notificaciones";
	td.innerHTML="";
	tr.appendChild(td);
	tbody.appendChild(tr);
	table.appendChild(tbody);
//	table.style.border="0px none";
	divConsulta.appendChild(table);
	
	var table1=document.createElement("table");
	var tbody1=document.createElement("tbody");
	var tr1=document.createElement("tr");
	var td1=document.createElement("td");
	table1.setAttribute("width","100%");
	tr1.appendChild(td1);
	td1.setAttribute("width","40px");
	td1=document.createElement("td");
	td1.setAttribute("align","center");
	td1.innerHTML="<p><img id=\"imagenArcadia\" src=\"img/animacionArcadiaNeutra.gif\"></p>";
	tr1.appendChild(td1);
	td1.setAttribute("width","200px");
	td1=document.createElement("td");
	td1.innerHTML="<a href=\"javascript:cerrarChat();\"><img src=\"img/iconoCerrar.png\"></a>";
	td1.setAttribute("width","20px");
	tr1.appendChild(td1);
	tbody1.appendChild(tr1);
	table1.appendChild(tbody1);
	divContenido.appendChild(table1);
	table1=document.createElement("table");
	tbody1=document.createElement("tbody");
	table1.appendChild(tbody1);
	var tr2=document.createElement("tr");
	var td2=document.createElement("td");
	tr2.appendChild(td2);
	td2.setAttribute("id","textoAmbito");
	tbody1.appendChild(tr2);
	table1.appendChild(tbody1);
	//divContenido.appendChild(imgMover);
	divContenido.appendChild(table1);
	
	divArcadia.appendChild(divContenido);
	divArcadia.appendChild(divChat);
	divArcadia.appendChild(divConsulta);
	
	/*Bloque de valoraci\u00F3n de la herramienta*/
	divConsulta=document.createElement("div");
	divConsulta.setAttribute("id","divUtilidad");
	table=document.createElement("table");
	tbody=document.createElement("tbody");
	tr=document.createElement("tr");
	td=document.createElement("td");
	divConsulta.appendChild(table);
	table.appendChild(tbody);
	tbody.appendChild(tr);
	tr.appendChild(td);
	//td.innerHTML="\u00BFLe ha sido \u00FAtil esta herramienta? <a href=\"javascript:lanzarPositivo();\"><b><u>S\u00ED</u></b></a> / <a href=\"javascript:lanzarNegativoValorar();\"><b><u>No</u></b></a>";
	divArcadia.appendChild(divConsulta);
	divArcadia.style.visibility="hidden";
	divArcadia.style.display="none";
	body.appendChild(divArcadia);
	$("#arcadia").resizable();
	//$("#arcadia").draggable();
	
}
function posicionarArcadia()
{
	crearArcadia();
	var divArcadia=document.getElementById("arcadia");
	var divMenu=document.getElementById("contenedorder");
	//var offsets=divMenu.getBoundingClientRect();
	
	//divArcadia.style.width="320px";
	divArcadia.style.overflow="hidden";
	divArcadia.style.height="0px";
	divArcadia.style.visibility="hidden";
	divArcadia.style.display="none";
	var pos=$("#contenedorSub").position();
	var pos2=$("#contenedorder").position();
	/*$("#arcadia").css({
		position:"absolute",
		top:pos.top+"px",
		left:(pos2.left)+"px"
	});*/
}
function concatenar(quien,div,texto)
{
	var html=div.innerHTML;
	var linea="";
	var alineacion="left";
	if (quien=="Arcadia")
		{
		quien="<span style='color:red'>AEAT</span>";
		alineacion="left";
		}
	else
		{
		texto=texto.replace(/</g,"&lt;");
		texto=texto.replace(/>/g,"&gt;");
		quien="<span style='color:blue'>"+quien+"</span>";
		alineacion="right";
		}
	linea="<li style=\"margin-bottom:8px;margin-top:8px;text-align:"+alineacion+"\"\>"+quien+":"+texto+"</li></ul>";
	html=html.replace("</ul>",linea);
	html=html.replace("</UL>",linea);
	div.innerHTML=html;
	div.scrollTop=div.scrollHeight;
}
function cambiarExpresion(expresion)
{
	var img=document.getElementById("imagenArcadia");
	clearInterval(programado);
	img.src="img/animacionArcadia"+expresion+".gif";
	if (expresion=="Triste")
	{
	programado=setInterval(function (){cargarExpresion(img,expresion)},2000);
	}
	if (expresion=="Enfado")
	{
	programado=setInterval(function (){cargarExpresion(img,expresion)},3500);
	}
	if (expresion=="Respuesta")
	{
	programado=setInterval(function (){cargarExpresion(img,expresion)},3500);
	}
	if (expresion=="EnfadoRespuesta")
	{
	programado=setInterval(function (){cargarExpresion(img,expresion)},6260);
	}

}
function cargarExpresion(img,expresion)
{
	if (img.src.indexOf(expresion)>=0)
		{
			img.src="img/animacionArcadiaNeutra.gif";
			clearInterval(programado);
		}
	else
		{
			clearInterval(programado);
			img.src="img/animacionArcadia"+expresion+".gif";
		}
}
function procesarAccion(accion,insulto)
{
	if (insulto=="")
		{
		if (accion=="SINRESULTADO")
			{
				cambiarExpresion("Triste");
			}
		else if (accion=="RESPUESTA")
			{
				intentos++;
				cambiarExpresion("Respuesta");
			}
			else
			{
				cambiarExpresion("Respuesta");
			}
		}
	else
		{
		if (accion=="RESPUESTA")
			{
			intentos++;
			cambiarExpresion("EnfadoRespuesta");
			}
		else
			cambiarExpresion("Enfado");
		}
}
function insertarTexto(valor)
{
	var texto=document.getElementById("consultaArcadia");
	texto.value=valor;
	enviarConsulta();
}
function nombreAmbitoFormato()
{
	var ambito=document.getElementById("ambito").value;
	if (ambito=="Informatica")
		return "<b><span style=\"color:CadetBlue\">SII (Inform\u00E1tica)</span></b>";
	else
		return "<b><span style=\"color:DarkRed\">SII (Informaci\u00F3n Tributaria)</span></b>";	
}
function nombreAmbitoOpuestoFormato()
{
	var ambito=document.getElementById("ambito").value;
	if (ambito!="Informatica")
		return "<b><span style=\"color:CadetBlue\">SII (Inform\u00E1tica)</span></b>";
	else
		return "<b><span style=\"color:DarkRed\">SII (Informaci\u00F3n Tributaria)</span></b>";	
}
function nombreAmbito()
{
	var ambito=document.getElementById("ambito").value;
	if (ambito=="Informatica")
		return "SII (Inform\u00E1tica)";
	else
		return "SII (Informaci\u00F3n Tributaria)";	
}
function nombreAmbitoOpuesto()
{
	var ambito=document.getElementById("ambito").value;
	if (ambito!="Informatica")
		return "SII (Inform\u00E1tica)";
	else
		return "SII (Informaci\u00F3n Tributaria)";	
}
function ambitoOpuesto()
{
	var ambito=document.getElementById("ambito").value;
	if (ambito=="Informatica")
		return "Gestion";
	else
		return "Informatica";	
}
function ambitoOpuestoTildes()
{
	var ambito=document.getElementById("ambito").value;
	if (ambito=="Informatica")
		return "Informaci\u00F3n Tributaria del SII";
	else
		return "Inform\u00E1tica";	
}
function recargarOpener(ambito)
{
	var opener=window.opener;
	if (opener!=null)
		{
		var direccion=opener.location.href;
		direccion=direccion.substring(0,direccion.indexOf("&ambito="));
		direccion+="&ambito="+ambito;
		opener.location.href=direccion;
		console.log("Direcci\u00F3n recargada en "+direccion);
		}
}
function cambiarAmbito()
{
	//Si queremos trabajar en m\u00E1s de dos \u00E1mbitos a\u00F1adiremos un par\u00E1metro a esta funci\u00F3n
	var nAmbito=ambitoOpuesto();
	document.getElementById("ambito").value=nAmbito;
	recargarOpener(nAmbito);
	iniciarHistorico();
	reiniciarConversacion("");
}
function ocultarOpciones(id)
{
	var div=document.getElementById(id+"opt");
	if (div!=null)
		{
		div.innerHTML="";
		}
}

function migrarConversacion()
{
	/*En este punto la pregunta ya est\u00E1 enviada, tenemos que escribir
	 * la respuesta del Asistente Virtual de \u00E1mbito contrario
	 * y cambiar el mensaje de Asistente Virtual - \u00C1mbito
	 * y actualizar el contexto al nuevo*/
	categoriaActiva=document.getElementById("categoriaSeleccionada").value;
	var contextoNuevo=document.getElementById("ContextoAlt");
	var ambito=document.getElementById("ambito");
	actualizarContexto(contextoNuevo.value);
	ambito.value=ambitoOpuesto();
	var tdAmbito=document.getElementById("textoAmbito");
	tdAmbito.innerHTML="Est\u00E1 usted hablando con el Asistente Virtual para "+nombreAmbitoFormato();
	tdAmbito.innerHTML+="<br>Ha seleccionado: <b>"+categoriaActiva+"</b>. Si desea seleccionar otra categor\u00EDa pulse <a href=\"javascript:reseleccionarCategorias('"+ambito.value+"');\">aqu\u00ED</a>.";
	var chat=document.getElementById("chat");
	//chat.innerHTML="";
	var texto=document.getElementById("consultaArcadia");
	var contexto=document.getElementById("Contexto");
	concatenar("Usted",chat,ultimaConsultaEnviada);
	concatenar("Arcadia",chat,procesarRespuestaAlternativa(tituloAlt));
	var idConv=document.getElementById("IdConversacion");
	var idConvAlt=document.getElementById("IdConversacionAlt");
	ejecutarAgenteEvaluacion(idConv.value,"Remitido-"+encodeURI(idConvAlt.value),false);
	contexto.Value=contextoNuevo.value;
	idConv.value=idConvAlt.value;
	ultimaAccionValidacion=false;
	yaRemitido=true;
}
function procesarRespuestaAlternativa(resp)
{
	
	var ahora=Math.random().toString(36).replace(/[^a-z]+/g,'');
	var opciones="";
	var cambio="";
	var ambito="";
	var accion="";
	var enlace="";
	notificacion("");
	var insulto="";
	var etiquetasConsultaTemp="";
	var enlacesR="";
	var alcanzadoLimite=false;

	var textoValidacion="";
	resp="<RESPUESTA>"+resp+"</RESPUESTA>";
	var xmldoc=null;
	if (window.DOMParser)
	{
	var parser=new DOMParser();
	xmldoc=parser.parseFromString(resp,"application/xml");
	}
else
	{
	xmldoc=new ActiveXObject("Microsoft.XMLDOM");
	xmldoc.loadXML(resp);
	}
	var titulo="";
	try
	{
	if (xmldoc.getElementsByTagName("RESPUESTA")[0].childNodes[0]!='undefined')
		{
		titulo=xmldoc.getElementsByTagName("RESPUESTA")[0].childNodes[0].nodeValue;
		}
	}
	catch(e)
	{
		titulo="";
	}
		try
		{
			var numHijos=xmldoc.getElementsByTagName("RESPUESTA")[0].childNodes.length;
			if (numHijos>0)
			{
				var hijos=xmldoc.getElementsByTagName("RESPUESTA")[0].childNodes;
				for (var x=0;x<hijos.length;x++)
				{
					if (hijos[x].nodeName.toLowerCase()=="embed")
					{
						//Este valor recupera el enlace de la respuesta codificada y lo incrusta
						//en un iframe - Ej: el Localizador de Prestaci\u00F3n de Servicios
						incrustarPlantilla(hijos[x].textContent);
					}
					if (hijos[x].nodeName.toLowerCase()=="opt")
						{
							//if (opciones=="") opciones="<br>";
							opciones+="<input type=\"radio\" name=\""+titulo+"\" onClick=\"insertarTexto('"+hijos[x].textContent+"');ocultarOpciones('"+ahora+"');\">"+hijos[x].textContent+"</input><br>";
						}
					if (hijos[x].nodeName.toLowerCase()=="chg")
					{
						if (cambio=="")
							{
							cambio="<br>";
							cambio+="<input type=\"radio\" onClick=\"cambiarAmbito();\">"+hijos[x].textContent+"</input><br>";
							}
					}
					if (hijos[x].nodeName.toLowerCase()=="ht")
					{
						//Este valor carga el html asociado al c\u00F3digo que indica
						//Y lo muestra en el div de contenido de la interfaz
						//Ese c\u00F3digo est\u00E1 creado en AvConfig.nsf
						cargarPlantilla(hijos[x].textContent);
					}
					if (hijos[x].nodeName.toLowerCase()=="cod")
					{
						//Este valor carga el html asociado al c\u00F3digo que indica
						//Y lo muestra en el div de contenido de la interfaz
						//Ese c\u00F3digo est\u00E1 creado en AvConfig.nsf
						var jsonTemp=cargarCodigo(hijos[x].textContent);
						var objeto=JSON.parse(jsonTemp);
						
						titulo=objeto.entrada.texto;
						enlace=objeto.entrada.enlace;
						accion=objeto.entrada.accion;
						enlacesR=objeto.entrada.enlacesR;
					}
				
					if (hijos[x].nodeName.toLowerCase()=="gsa")
					{
						ambito=document.getElementById("ambito").value;
						if (ambito=="") ambito="Gestion";
						var cadenaBus=document.getElementById("palabrasConsulta");
						if (cadenaBus!='undefined')
							{
							var temp=cadenaBus.value;
							temp=temp.replace("/ /g","+");
							if (temp!='')
								{
								buscar_resultados_gsa(temp,ambito);
								}
							
							}
						
					}
					if (hijos[x].nodeName.toLowerCase()=="soporte")
					{
						ambito=document.getElementById("ambito").value;
						if (ambito=="") ambito="Gestion";
						var cadenaBus=document.getElementById("palabrasConsulta");
						titulo+="\u00BFDesea ponerse en contacto con nosotros a trav\u00E9s del formulario de correo electr\u00F3nico?<br><ul><li><input type=\"radio\" onClick=\"continuarConversacion();\"> No, quiero continuar la conversaci\u00F3n</li><li><input type='radio' onClick='contactarCorreo();';>S\u00ED, contactar con la AEAT por correo electr\u00F3nico</li></ul>";
						//enlazarFormularioSoporte(ambito);
						//enlazarSoporte(ambito);
					}
					/*if (hijos[x].nodeName.toLowerCase()=="final")
					{
						textoValidacion=cargarValidacion();
					}*/
					
				}
				if (opciones!="")titulo+="<div id='"+ahora+"opt'>";
				titulo+=opciones;
				if (opciones!="")titulo+="</div>";
				titulo+=cambio;
				if (alcanzadoLimite)
					{
					ambito=document.getElementById("ambito").value;
					if (ambito=="") ambito="Gestion";
					var cadenaBus=document.getElementById("palabrasConsulta");
					if (cadenaBus!='undefined')
						{
						var temp=cadenaBus.value;
						temp=temp.replace("/ /g","+");
						if (temp!='')
							{
							if (titulo!="") titulo+="\n";
							titulo+="Me temo que me est\u00E1 costando encontrar una respueta a su consulta. Le mostramos una lista de los resultados m\u00E1s similares dentro de nuestra web.\nSi lo desea, tambi\u00E9n puede:<br><ul><li><input type=\"radio\" onClick=\"continuarConversacion();\"> Continuar la conversaci\u00F3n</li><li><input type='radio' onClick='insertarTexto(\"Nueva consulta\");'>Realizar una nueva consulta</li><li><input type='radio' onClick='cambiarAmbito();'>Consultar al Asistente Virtual de "+ambitoOpuestoTildes()+"</li><li><input type='radio' onClick='contactarCorreo();';>Contactar con la AEAT por correo electr\u00F3nico</li></ul>";
							buscar_resultados_gsa(temp,ambito);
							}
						
						}
					}
			}
		}
		catch (e)
		{
			console.log(e);
			opciones="";
		}	
	
	
	return titulo;
}
function incrustarPlantilla(codigo)
{
	//var ambito=document.getElementById("ambito").value;
	var urlBusqueda="ConsultarCodigoIncrustar?OpenAgent&codigo="+codigo;
	var divResultados=document.getElementById("contenido1");
	var divPadre=document.getElementById("contenedorSub");
	var id="";
	var xhttp;
	if (window.XMLHttpRequest)
	{
		xhttp=new XMLHttpRequest();
	}
	else
	{
		xhttp=new ActiveXObject("Microsoft.XMLHTTP");
	}
	xhttp.onreadystatechange=function()
	{
		if (xhttp.readyState==4 && xhttp.status==200)
		{
		divResultados.innerHTML=xhttp.responseText;
		}
	}
	xhttp.open("GET",urlBusqueda,false);
	xhttp.send();
}
function procesarRespuesta(quien,div,xml)
{
	var html=div.innerHTML;
	var mensajeRespuestaAlt="";
	var ahora=Math.random().toString(36).replace(/[^a-z]+/g,'');
	var xmldoc;
	var opciones="";
	var cambio="";
	var ambito="";
	var accion="";
	var enlace="";
	notificacion("");
	var insulto="";
	var etiquetasConsultaTemp="";
	var enlacesR="";
	var alcanzadoLimite=false;
	var restantes=(document.getElementById("intentosRestantes").value)*1;
	var textoValidacion="";
	restantes--;
	document.getElementById("intentosRestantes").value=restantes;
	alcanzadoLimite=(restantes=='-1');
	//alcanzadoLimite=true;//Para pruebas
	if ((xml!="<NEGACION>") & (xml!="<AFIRMACION>"))
	{
	if (window.DOMParser)
		{
		var parser=new DOMParser();
		xmldoc=parser.parseFromString(xml,"application/xml");
		}
	else
		{
		xmldoc=new ActiveXObject("Microsoft.XMLDOM");
		xmldoc.loadXML(xml);
		}
	var linea="";
	if (quien!="Arcadia")
		{
		linea="<li>"+quien+":"+xml+"</li></ul>";
		html=html.replace("</ul>",linea);
		div.innerHTML=html;
		div.scrollTop=div.scrollHeight;
		}
	else
		{
		var titulo="";
		try
		{
		if (xmldoc.getElementsByTagName("TITULO")[0].childNodes[0]!='undefined')
			{
			titulo=xmldoc.getElementsByTagName("TITULO")[0].childNodes[0].nodeValue;
			}
		}
		catch(e)
		{
			titulo="";
		}
		try
		{
			var numHijos=xmldoc.getElementsByTagName("TITULO")[0].childNodes.length;
			if (numHijos>0)
			{
				var hijos=xmldoc.getElementsByTagName("TITULO")[0].childNodes;
				for (var x=0;x<hijos.length;x++)
				{
					if (hijos[x].nodeName.toLowerCase()=="embed")
					{
						//Este valor recupera el enlace de la respuesta codificada y lo incrusta
						//en un iframe - Ej: el Localizador de Prestaci\u00F3n de Servicios
						incrustarPlantilla(hijos[x].textContent);
					}
					/*if (hijos[x].nodeName.toLowerCase.indexOf("alt")==0)
						{
						titulo+="<INSERTALTBUSQUEDA>";
						}*/
					if (hijos[x].nodeName.toLowerCase()=="opt")
						{
							//if (opciones=="") opciones="<br>";
							opciones+="<input type=\"radio\" name=\""+titulo+"\" onClick=\"insertarTexto('"+hijos[x].textContent+"');ocultarOpciones('"+ahora+"');\">"+hijos[x].textContent+"</input><br>";
						}
					if (hijos[x].nodeName.toLowerCase()=="chg")
					{
						if (cambio=="")
							{
							cambio="<br>";
							cambio+="<input type=\"radio\" onClick=\"cambiarAmbito();\">"+hijos[x].textContent+"</input><br>";
							}
					}
					if (hijos[x].nodeName.toLowerCase()=="ht")
					{
						//Este valor carga el html asociado al c\u00F3digo que indica
						//Y lo muestra en el div de contenido de la interfaz
						//Ese c\u00F3digo est\u00E1 creado en AvConfig.nsf
						cargarPlantilla(hijos[x].textContent);
					}
					if (hijos[x].nodeName.toLowerCase()=="cod")
					{
						//Este valor carga el html asociado al c\u00F3digo que indica
						//Y lo muestra en el div de contenido de la interfaz
						//Ese c\u00F3digo est\u00E1 creado en AvConfig.nsf
						var jsonTemp=cargarCodigo(hijos[x].textContent);
						var objeto=JSON.parse(jsonTemp);
						
						titulo=objeto.entrada.texto;
						enlace=objeto.entrada.enlace;
						accion=objeto.entrada.accion;
						enlacesR=objeto.entrada.enlacesR;
					}
				
					if (hijos[x].nodeName.toLowerCase()=="")
					{
						ambito=document.getElementById("ambito").value;
						if (ambito=="") ambito="Gestion";
						var cadenaBus=document.getElementById("palabrasConsulta");
						if (cadenaBus!='undefined')
							{
							var temp=cadenaBus.value;
							temp=temp.replace("/ /g","+");
							if (temp!='')
								{
								buscar_resultados_gsa(temp,ambito);
								}
							
							}
						
					}
					if (hijos[x].nodeName.toLowerCase()=="soporte")
					{
						ambito=document.getElementById("ambito").value;
						if (ambito=="") ambito="Gestion";
						var cadenaBus=document.getElementById("palabrasConsulta");
						titulo+="\u00BFDesea ponerse en contacto con nosotros a trav\u00E9s del formulario de correo electr\u00F3nico?<br><ul><li><input type=\"radio\" onClick=\"continuarConversacion();\"> No, quiero continuar la conversaci\u00F3n</li><li><input type='radio' onClick='contactarCorreo();';>S\u00ED, contactar con la AEAT por correo electr\u00F3nico</li></ul>";
						//enlazarFormularioSoporte(ambito);
						//enlazarSoporte(ambito);
					}
					/*if (hijos[x].nodeName.toLowerCase()=="final")
					{
						textoValidacion=cargarValidacion();
					}*/
					
				}
				if (opciones!="")titulo+="<div id='"+ahora+"opt'>";
				titulo+=opciones;
				if (opciones!="")titulo+="</div>";
				titulo+=cambio;
				if (alcanzadoLimite)
					{
					ambito=document.getElementById("ambito").value;
					if (ambito=="") ambito="Gestion";
					var cadenaBus=document.getElementById("palabrasConsulta");
					if (cadenaBus!='undefined')
						{
						var temp=cadenaBus.value;
						temp=temp.replace("/ /g","+");
						if (temp!='')
							{
							if (titulo!="") titulo+="\n";
							titulo+="Me temo que me est\u00E1 costando encontrar una respueta a su consulta. Le mostramos una lista de los resultados m\u00E1s similares dentro de nuestra web.\nSi lo desea, tambi\u00E9n puede:<br><ul><li><input type=\"radio\" onClick=\"continuarConversacion();\"> Continuar la conversaci\u00F3n</li><li><input type='radio' onClick='insertarTexto(\"Nueva consulta\");'>Realizar una nueva consulta</li><li><input type='radio' onClick='cambiarAmbito();'>Consultar al Asistente Virtual de "+ambitoOpuestoTildes()+"</li><li><input type='radio' onClick='contactarCorreo();';>Contactar con la AEAT por correo electr\u00F3nico</li></ul>";
							buscar_resultados_gsa(temp,ambito);
							}
						
						}
					}
			}
		}
		catch (e)
		{
			console.log(e);
			opciones="";
		}
		var contextoAlt="";
	
		try
		{
		if (xmldoc.getElementsByTagName("CONTEXTOALT")[0].childNodes[0]!='undefined')
			{
			contextoAlt=xmldoc.getElementsByTagName("CONTEXTOALT")[0].childNodes[0].nodeValue;
			var objetoContexto=JSON.parse(contextoAlt);
			document.getElementById("IdConversacionAlt").value=objetoContexto.conversation_id;
			}
		}
		catch(e)
		{
			contextoAlt="";
			
		}		
		document.getElementById("ContextoAlt").value=contextoAlt;
		tituloAlt="";
		try
		{
		if (xmldoc.getElementsByTagName("TEXTOTITULOALT")[0].childNodes[0]!='undefined')
			{
			//tituloAlt=xmldoc.getElementsByTagName("TEXTOTITULOALT")[0].childNodes[0].innerHTML;
			// la l\u00EDnea anterior no funciona en IE
			tituloAlt=xml.substring(xml.indexOf("<TEXTOTITULOALT>")+16,xml.indexOf("</TEXTOTITULOALT>"));
			}
		}
		catch(e)
		{
			tituloAlt="";
		}
		/*De momento con \u00E9sto no hacemos mucho, s\u00F3lo detectar que sea otro 
		 * "remitir al \u00E1mbito contrario" para no meternos en un bucle*/
		var mensajeRespuestaAlternativa="";
		if ((xml.indexOf("RESPUESTAALT")>0) && tituloAlt.indexOf("<ALT")<0)
			{
			if (!yaRemitido) titulo="Est\u00E1 usted hablando con el Asistente Virtual de "+nombreAmbito()+ " y hemos detectado que el Asistente Virtual de "+nombreAmbitoOpuesto()+" puede tener informaci\u00F3n sobre su consulta. Si lo desea puede continuar esta conversaci\u00F3n con el Asistente Virtual de "+nombreAmbito()+" o <a style=\"color:#0000FF\" href=\"javascript:migrarConversacion();\">remitir su consulta al Asistente Virtual de "+nombreAmbitoOpuesto()+" pulsando aqu\u00ED</a>";
			}
		var contexto="";
		
		try
		{
		if (xmldoc.getElementsByTagName("CONTEXTO")[0].childNodes[0]!='undefined')
			{
			contexto=xmldoc.getElementsByTagName("CONTEXTO")[0].childNodes[0].nodeValue;
			}
		}
		catch(e)
		{
			titulo="";
		}
		
		try
		{
		if (xmldoc.getElementsByTagName("ACCION")[0].childNodes[0]!='undefined')
			{
			accion=xmldoc.getElementsByTagName("ACCION")[0].childNodes[0].nodeValue;
			}
		}
		catch(e)
		{
			accion="";
		}

		try
		{
		if (xmldoc.getElementsByTagName("ENLACE")[0].childNodes[0]!='undefined')
			{
			enlace=xmldoc.getElementsByTagName("ENLACE")[0].childNodes[0].nodeValue;
			}
		}
		catch(e)
		{
		}

		try
		{
		if (xmldoc.getElementsByTagName("INSULTO")[0].childNodes[0]!='undefined')
			{
			insulto=xmldoc.getElementsByTagName("INSULTO")[0].childNodes[0].nodeValue;
			}
		}
		catch(e)
		{
			insulto="";
		}

		try
		{
			if (xmldoc.getElementsByTagName("TAGS")[0].childNodes[0]!='undefined') 
			{
				etiquetasConsultaTemp=xmldoc.getElementsByTagName("TAGS")[0].childNodes[0].nodeValue;
			}
		}
		catch(e)
		{
			etiquetasConsultaTemp="";
		}

		if (etiquetasConsultaTemp!="") etiquetasConsulta=etiquetasConsultaTemp
		try
		{
		if (xmldoc.getElementsByTagName("IDRESPUESTA")[0].childNodes[0]!='undefined') 
			{
				respuestasEmitidas+=xmldoc.getElementsByTagName("IDRESPUESTA")[0].childNodes[0].nodeValue+";";
				indice++;
			}
		}
		catch(e)
			{

			}
		try
		{
		if (xmldoc.getElementsByTagName("ENTRADA")[0].childNodes[0]!='undefined') 
			{
				enlace="";
				listado=xmldoc.getElementsByTagName("ENTRADA");
				titulo+="Me temo que me est\u00E1 costando encontrar lo que busca. Le muestro una _LINK_lista de los resultados m\u00E1s relevantes_/LINK_ referentes a su consulta. No obstante, si lo desea puede seguir pregunt\u00E1ndome."
				registrarEntrada("<RESPUESTA>Me temo que me est\u00E1 costando encontrar lo que busca. Le muestro una lista de los resultados m\u00E1s relevantes referentes a su consulta. No obstante, si lo desea puede seguir pregunt\u00E1ndome.</RESPUESTA>");
				pintarHistorial(listado);
				//Beep("loquebusca.wav");
				Beep("resultados.wav");
				
			}
		}
		catch(e)
			{

			}
		}
	
	}
	else if (xml=="<AFIRMACION>")
		{
		insulto="";
		enlace="";
		accion="AFIRMACION";
		titulo="Me alegro de haberle sido de utilidad. Si tiene alguna consulta adicional no dude en preguntarme pulsando Nueva consulta."
		registrarEntrada("<RESPUESTA>"+titulo+"</RESPUESTA>");
		//Beep("exito.wav");
		reiniciarConversacion("");
		}
	else//negaci\u00F3n
	{
		insulto="";
		enlace="";
		accion="SINRESULTADO";
		titulo="Lo siento. \u00BFPuede darme algo m\u00E1s de informaci\u00F3n?"
		registrarEntrada("<RESPUESTA>"+titulo+"</RESPUESTA>");
		//Beep("podria.wav");
	}
	if (enlace!="" & !alcanzadoLimite)
		{
		cargarRespuestaConHistorial("contenedorizq",enlace,"",enlacesR);
		//Beep("refiere.wav");
		}
	if (insulto!="")
		{
			concatenar("Arcadia",div,insulto);
			//Beep("Forma.wav");
		}
	procesarAccion(accion,insulto);
	var llamada="cargarRespuesta(\"contenedorizq\",\""+enlace+"\",\""+titulo.replace(/"/g,'\\"')+"\",\""+enlacesR+"\");'";
//	nuevoEnlace="<A TARGET='_self' href='#' onClick='addHistorial("+llamada+");cargarRespuesta(\"contenedorizq\",\""+link+"\",\""+titulo.replace(/"/g,'\\"')+"\",\"volver\");'>";
	titulo=titulo.replace("_LINK_","<a target=\"_self\" href='#' onClick=\"cargarRespuestaIndice('contenedorizq','"+enlace+"',"+getIndice()+",'"+enlacesR+"');\">");
	titulo=titulo.replace("_/LINK_","</a>");
	titulo=titulo.replace(new RegExp("&lt;",'g'),"<");
	titulo=titulo.replace(new RegExp("&gt;",'g'),">");
	titulo+=textoValidacion;
	concatenar("Arcadia",div,titulo);
	actualizarContexto(contexto);
	tituloRespuestaActual=titulo;
		//Respuesta de Arcadia, procesamos el xml
		


}
function lanzarPositivoCerrando()
{
	ultimaAccionValidacion=true;
	restaurarEntrada();//Para poder volver a escribir
	var divAct=document.getElementById("validacionRespuesta");
	var idc=document.getElementById("IdConversacion").value;
	ejecutarAgenteEvaluacion(idc,"Positivo-Cerrando",true);
}
function exportarConversacion()
{
	var ventanaNueva=window.open();
	var doc=ventanaNueva.document;
	var fecha=new Date();
	
	doc.open();
	doc.write("<HTML>");
	doc.write("<head>");
	doc.write("<link href=\"/static_files/common/css/xzhtcs04.css\" rel=\"stylesheet\" type=\"text/css\">");
	doc.write("<TITLE>Conversaci\u00F3n exportada</TITLE>");
	doc.write("</head>");
	doc.write("<BODY>");
	doc.write("<div id=\"body\">");
	var inner="<div id=\"AEAT_header\"><div id=\"topIzquierda\"><div id=\"logoAEAT\"><ul><li><a href=\"https://www.agenciatributaria.gob.es/AEAT.sede/Inicio/Inicio.shtml\" target=\"_self\"><img alt=\"Logotipo del Gobierno de Espa\u00F1a\" src=\"/static_files/common/internet/img/escudo_gobierno.gif\"></a></li><li><a href=\"http://www.agenciatributaria.es\" target=\"_self\"><img alt=\"Portal de la Agencia Tributaria\" src=\"/static_files/common/internet/img/Logo_Agencia.png\"></a></li><li><a href=\"https://www.agenciatributaria.gob.es/AEAT.sede/Inicio/Inicio.shtml\" target=\"_self\"><img alt=\"Sede electr\u00F3nica - Agencia Tributaria\" src=\"/static_files/common/internet/img/logo_sede_ES.gif\"></a></li></ul>	</div>	<h1 class=\"oculto\">Sede Electr\u00F3nica - Agencia Tributaria:</h1></div><div id=\"topDerecha\">	<div class=\"topVarios\">		<div class=\"acciones\"></div>	</div>	<div class=\"clear\"></div></div><div class=\"clear\"></div></div>";
	doc.write(inner);
	doc.write("<div id=\"contenedor\"><div id=\"contenedorSub\">");
	doc.write("<div class=\"mt\"><h1 class=\"tituloCanal\">");
	doc.write("Conversaci\u00F3n mantenida con el Asistente Virtual de "+nombreAmbito());
	doc.write("</h1></div><div id=\"contenidoPrincipal\" class=\"mt\">");
	doc.write("<p>Fecha y hora:"+fecha.getDate()+"-"+(fecha.getMonth()*1+1)+"-"+fecha.getFullYear()+" "+fecha.getHours()+":"+fecha.getMinutes()+"</p>");
	doc.write("<p>Correo electr\u00F3nico de la consulta: "+document.getElementById("email").value+"</p>");
	doc.write("<br><table>");
	var chat=document.getElementById("chat");
	var lineas=chat.getElementsByTagName("li");
	for (var i=0;i<lineas.length-1;i++)
		{
		doc.write("<tr>");
		doc.write("<td>");
		
		doc.write(lineas[i].innerHTML);
		doc.write("</td>");
		doc.write("</tr>");

		}
	doc.write("<tr>");
	doc.write("<td>");
	doc.write("Fin de la conversaci\u00F3n");
	doc.write("</td>");
	doc.write("</tr>");
	doc.write("</table>");
	doc.write("<input type=\"button\" onClick=\"window.print();\" value=\"Imprimir conversaci\u00F3n\">");
	doc.write("</div></div></div>");//div contenedor y contenedorSub
	doc.write("</div>");//div body
	doc.write("</BODY>");
	doc.write("</HTML>");
	doc.close();
}
function lanzarPositivo()
{
	ultimaAccionValidacion=true;
	restaurarEntrada();//Para poder volver a escribir
	var divAct=document.getElementById("validacionRespuesta");
	//ocultarTransparenciaGradual(divAct);
	var idc=document.getElementById("IdConversacion").value;
	ejecutarAgenteEvaluacion(idc,"Positivo",true);
	concatenar("Arcadia",document.getElementById("chat"),"Me alegro de haberle sido de utilidad. Si tiene alguna consulta m\u00E1s estoy a su disposici\u00F3n.");
	/*
	 * Creamos internamente una nueva consulta
	 * */
	
		iniciarHistorico();
		//var correo=document.getElementById("email").value;
		//solicitarIdConversacion(correo);
		//var divContenido=document.getElementById("contenido1");
		//if (divContenido==null) 
		//{
		//var contenedorSub=document.getElementById("contenedorSub");
		//divContenido=document.createElement("div");
		//divContenido.setAttribute("id","contenido1");
		//contenedorSub.appendChild(divContenido);
		//}
		//divContenido.innerHTML="";
		//var divRelacionados=document.getElementById("contenidoRelacionados");
		//if (divRelacionados!=null) divRelacionados.parentNode.removeChild(divRelacionados);
		continuarNuevaConversacion();
		//reiniciarConversacion("\u00BFEn qu\u00E9 puedo ayudarle?");
		var divAct=document.getElementById("validacionRespuesta");
		//ocultarTransparenciaGradual(divAct);
		restaurarEntrada();
		eliminarValidacion();
		//registrarEntrada("\u00BFEn qu\u00E9 puedo ayudarle?");
		
	/*
	 * Fin nueva consulta encubierta
	 */
	
}
function eliminarValidacion()
{
	var div=document.getElementById("validacionRespuesta");
	if (div!=null)
		{
		div.parentNode.removeChild(div);
		}
	esperandoValidacion=false;
	
}
function ejecutarAgenteEvaluacion(idconv,resultado,mostraralert)
{
	var url="registrarEvaluacionUsuario?OpenAgent&operacion="+idconv+resultado;
	if (window.XMLHttpRequest)
	{
	xmlhttp=new XMLHttpRequest();
	xmlhttp.overrideMimeType('text/xml');
	}
else
	{
	xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
	}
xmlhttp.onreadystatechange=function()
	{
		if (xmlhttp.readyState==4 && xmlhttp.status==200)
		{
			//if (mostraralert) alert("Su valoraci\u00F3n ha quedado registrada.\nGracias por su colaboraci\u00F3n.");
			eliminarValidacion();
		}
	}
xmlhttp.open("GET",url,true);
xmlhttp.send();
}


function contactarCorreo()
{
	var divContenido=document.getElementById("contenido1");
	var divArcadia=document.getElementById("arcadia");
	divArcadia.style.visibility="hidden";
	divArcadia.style.display="none";
	divContenido.style.visibility="hidden";
	divContenido.style.display="none";
	var interesar=document.getElementById("interesar");
	var contactar=document.getElementById("contactar");
	interesar.style.visibility="visible";
	interesar.style.display="block";
	contactar.style.visibility="visible";
	contactar.style.display="block";
	var divInicioAsistente=document.getElementById("entradaAsistente");
	var divFormulario=document.getElementById("formularioConsulta");
	divInicioAsistente.style.visibility="visible";
	divInicioAsistente.style.display="block";
	divFormulario.style.visibility="visible";
	divFormulario.style.display="block";
	editor.resize("100%",'400',true);
	var idc=document.getElementById("IdConversacion").value;
	ejecutarAgenteEvaluacion(idc,"Correo-Intencion",(numNegativos==3));
	cargarHistorial(idc);
	/*Ahora indicamos al contribuyente que se va a enviar la conversaci\u00F3n con el Asistente
	 * y le damos la opci\u00F3n de consultarla*/
	
}
function lanzarNegativoCancelar()
{
	ultimaAccionValidacion=true;
	restaurarEntrada();
	var divAct=document.getElementById("validacionRespuesta");
	numNegativos++;
	var idc=document.getElementById("IdConversacion").value;
	ejecutarAgenteEvaluacion(idc,"Negativo-Cancelar",(numNegativos==3));
	esperandoValidacion=false;
}
function lanzarNegativo()
{
	ultimaAccionValidacion=true;
	restaurarEntrada();
	var divAct=document.getElementById("validacionRespuesta");
	numNegativos++;
	//ocultarTransparenciaGradual(divAct);

	var idc=document.getElementById("IdConversacion").value;
	ejecutarAgenteEvaluacion(idc,"Negativo",(numNegativos==3));
	if (numNegativos==2) 
	{
		ambito=document.getElementById("ambito").value;
		if (ambito=="") ambito="Gestion";
		var cadenaBus=document.getElementById("palabrasConsulta");
		if (cadenaBus!='undefined')
			{
			var temp=cadenaBus.value;
			temp=temp.replace("/ /g","+");
			if (temp!='')
				{
				buscar_resultados_gsa(temp,ambito);
				}
			
			}
		
		
		//concatenar("Arcadia",document.getElementById("chat"),"Me temo que me est\u00E1 costando encontrar una respuesta para su consulta.<br>A continuaci\u00F3n le mostramos una lista de resultados relacionados de nuestro buscador, y si lo desea puede enviarnos una consulta por correo pulsando en el enlace que figura al final de los resultados.");
		//concatenar("Arcadia",document.getElementById("chat"),"Me temo que me est\u00E1 costando encontrar una respueta a su consulta. Le mostramos una lista de los resultados m\u00E1s similares dentro de nuestra web.\nNo obstante, si lo desea puede seguir pregunt\u00E1ndome o realizar una Nueva consulta. Tambi\u00E9n puede realizar su consulta al Asistente Virtual de "+ambitoOpuestoTildes()+" pulsando aqu\u00ED <br><input type='radio' onClick='cambiarAmbito();'>Consultar en \u00E1mbito de "+ambitoOpuestoTildes()+".");
		concatenar("Arcadia",document.getElementById("chat"),"Me temo que me est\u00E1 costando encontrar una respueta a su consulta. Le mostramos una lista de los resultados m\u00E1s similares dentro de nuestra web.\nSi lo desea, tambi\u00E9n puede:<br><ul><li><input type=\"radio\" onClick=\"continuarConversacion();\"> Continuar la conversaci\u00F3n</li><li><input type='radio' onClick='insertarTexto(\"Nueva consulta\");'>Realizar una nueva consulta</li><li><input type='radio' onClick='cambiarAmbito();'>Consultar al Asistente Virtual de "+ambitoOpuestoTildes()+"</li><li><input type='radio' onClick='contactarCorreo();';>Contactar con la AEAT por correo electr\u00F3nico</li></ul>");
		//"Me temo que me est\u00E1 costando encontrar una respueta a su consulta. Le mostramos una lista de los resultados m\u00E1s similares dentro de nuestra web.\nNo obstante, si lo desea puede seguir pregunt\u00E1ndome o realizar una Nueva consulta. Si lo desea tambi\u00E9n puede realizar su consulta al Asistente Virtual de "+ambitoOpuestoTildes()+"pulsando aqu\u00ED <br><input type='radio' onClick='cambiarAmbito();' value='Consultar en \u00E1mbito de "+ambitoOpuestoTildes()+"'/>.";
	}
	else
		{
		concatenar("Arcadia",document.getElementById("chat"),"Por favor, ind\u00EDqueme algo m\u00E1s de informaci\u00F3n sobre su consulta.");
		document.getElementById("consultaArcadia").focus();
		}
	esperandoValidacion=false;
}
function cargarValidacion()
{
	//var divNuevo=document.createElement('div');
	//divNuevo.id="validacionRespuesta";
	//divNuevo.className="validar";
	//var divContenido=document.getElementById("contenidoArcadia");
	//var divContenido=document.getElementById("consulta");
	//var offsets=divContenido.getBoundingClientRect();
	//divNuevo.style.top=80;
	var chat=document.getElementById("chat");

	
	//divNuevo.style.width="120px";
	//divNuevo.style.overflow="hidden";
	//divNuevo.style.height="35px";
	//divNuevo.style.top="30px";
	//divNuevo.style.left="130px";
	//divNuevo.style.visibility="visible";
	//divNuevo.style.opacity=0;
	//divNuevo.style.filter="alpha(opacity=0) progid:DXImageTransform.Microsoft.Shadow(Strength=5, Direction=135, Color='#111111')";
	//divNuevo.style.display="none";
	//divNuevo.style.left=250;	
	//divNuevo.className="validar";
	//divContenido.appendChild(divNuevo);
	//divNuevo.innerHTML="\u00BFLe ha servido esta respuesta? <input type=\"button\" value='S\u00ED' onClick='lanzarPositivo();'><input type=\"button\" value='No' onClick='lanzarNegativo();'>";
	//transparenciaGradual(divNuevo);
	
	activarValidacion();
	esperandoValidacion=true;
	//return "<input type=\"button\" value='S\u00ED' onClick='lanzarPositivo();'><input type=\"button\" value='No' onClick='lanzarNegativo();'>";
	return "</li><li style=\"text-align:right\"><div id=\"validacionRespuesta\"><a href=\"javascript:lanzarPositivo();\" title=\"Me ha servido la respuesta\"><img width=25px height=25px src=\"iconoLike.png\"></a><a href=\"javascript:lanzarNegativo();\" title=\"No era lo que preguntaba\"><img width=25px height=25px src=\"iconoNoLike.png\"></a></div>";
}
function comprobarElementos(d)
{
	comprobarImagenes(d);
	comprobarEnlaces(d);
}
function enlaceExterno(enlace)
{
	return (enlace.indexOf("LecturaContribuyentes")<0);
}
function comprobarEnlaces(d)
{
	var enlaces=d.getElementsByTagName("a");
	var link;
	var titulo;
	
	for (i=0;i<enlaces.length;i++)
		{
		link=enlaces[i].href;
		enlaces[i].target="_self";
		}
	enlaces=d.getElementsByTagName("enlacesinternos");
	var enlacesInternos=d.getElementsByTagName("link");
	var tituloEnlacesInternos=d.getElementsByTagName("linktitulo");
	var link;
	var titulo;
	var nuevoEnlace;
	var llamada;
	//linea+="<LI><BR><A TARGET='_self' href='#' onClick='cargarRespuestaListado(\"contenedorizq\",\""+valorNodo(lista[i].childNodes[2])+"\",\""+titulo.replace(/"/g,'\\"')+"\",\"volver\");'>";
	for (i=0;i<enlaces.length;i++)
		{
		link=enlacesInternos[i].text;
		titulo=tituloEnlacesInternos[i].text;
//		nuevoEnlace="<A TARGET='_self' href='#' onClick='cargarRespuestaListado(\"contenedorizq\",\""+link+"\",\""+titulo.replace(/"/g,'\\"')+"\",\"volver\");'>";
//		llamada="cargarRespuesta(\"contenedorizq\",\""+link+"\",\""+titulo.replace(/"/g,'\\"')+"\",\"volver\");'";
		nuevoEnlace="<A TARGET='_self' href='#' onClick='cargarRespuestaConHistorial(\"contenedorizq\",\""+link+"\",\""+titulo.replace(/"/g,'\\"')+"\");'>";
		enlaces[i].text=nuevoEnlace;
		}
	
}
function comprobarImagenes(d)
{
	var imagenes=d.getElementsByTagName("img");
	var anchodiv=d.offsetWidth;
	var l;
	var alto;
	var proporcion;
	for (i=0;i<imagenes.length;i++)
		{
		l=imagenes[i].width;
		if (l>=anchodiv)
			{
			proporcion=anchodiv/l;
			imagenes[i].width=anchodiv;
			alto=imagenes[i].height;
			
			imagenes[i].height=alto*proporcion;
			}
		}
}
function cargarRespuestaConHistorial(divId,url,blanco,linkR)
{
	//addHistorialFinal("cargarRespuestaIndice('"+divId+"','"+url+"',"+((getIndice()*1)+1)+")");
	cargarRespuesta(divId,url,linkR);
	//cargarRespuestaIndice(divId,url,getIndice());
}
function cargarRespuestaIndice(divId,url,indiceH,linkR)
{
	subindice=0;
	setIndice(indiceH);
	cargarRespuesta(divId,url,linkR);
}
function cargarEjercicio(ejercicio)
//Esta funci\u00F3n \u00FAnicamente se usar para el combo de la calculadora de plazos
{
	var tipoLR="";
	if (ejercicio.indexOf("&")>0)
		{
		//Tiene especificado tipo de factura
		tipoLR="&tipoLR="+ejercicio.split("&")[1];
		ejercicio=ejercicio.split("&")[0];
		}
	cargarRespuesta("contenedorizq","https://www2.agenciatributaria.gob.es/soporteaeat/Formularios.nsf/CalculoPlazos"+ejercicio+"?OpenPage"+tipoLR,"");
}
function cargarRespuesta(divId,url,enlacesR)
{
	if (url!="")
		{
//		addHistorial("cargarRespuesta('"+divId+"','"+url+"','"+volver+"');");
		//alert(url);
		//idRespuestaActual=url.substring(url.indexOf("vwPreguntasLecturaContribuyentesId")+35,url.indexOf("?OpenDocument"));
		//alert(idRespuestaActual);
		var xmlhttp;
		var div=document.getElementById(divId)
		if (window.XMLHttpRequest)
		{
			xmlhttp=new XMLHttpRequest();
		}
		else
		{
			xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
		}
		xmlhttp.onreadystatechange=function()
		{
		if (xmlhttp.readyState==4 && xmlhttp.status==200)
			{
			var divBotones="<div class=\"botones\">";
			var linkVolver="";
			//if (hasPrev())
			//{
//				linkVolver=	"<div class=\"anterior\" style=\"visibility:visible;><a href=\"#\" onClick=\""+getPrevURL()+"\" target=\"_self\">Anterior</a></div>";
				//}
			//else
			//{
//				linkVolver=	"<div class=\"anterior\" style=\"visibility:hidden;\"><a href=\"#\" onClick=\""+getPrevURL()+"\" target=\"_self\">Anterior</a></div>";
			//}

			//var linkNext="";
			//if (hasNext())
			//{
//				linkNext=	"<div class=\"siguiente\" style=\"visibility:visible;><a href=\"#\" onClick=\""+getNextURL()+"\" target=\"_self\">Siguiente</a></div>";
			//}
			//else
			//{
//				linkNext=	"<div class=\"siguiente\" style=\"visibility:hidden;><a href=\"#\" onClick=\""+getNextURL()+"\" target=\"_self\">Siguiente</a></div>";
			//}
			//div.innerHTML=xmlhttp.responseText;
			var respHTML=xmlhttp.responseText;
			var host=url.substring(0,url.indexOf(".es")+3);
			respHTML=respHTML.replace(/href=\"\//g,"href=\""+host+"/");
			respHTML=respHTML.replace(/_self/g,"_blank/");
			var divContenedorsub=document.getElementById("contenedorSub");
			var divContenido=document.getElementById("contenidoPrincipal");
			var divEntrada=document.getElementById("contenido1");
			/*divContenido.style.visibility="visible";
			divContenido.style.display="block";
			divEntrada.style.visibility="hidden";
			divEntrada.style.display="none";*/
			var parser=new DOMParser();
			var doc=parser.parseFromString(respHTML,"text/html");
			var divConten=doc.getElementById("contenedorizq");
			/*
			var html="<div class=\"mt\"><h1 class=\"tituloCanal\">Asistente Virtual SII</h1></div>";
			html+="<div id=\"contenidoPrincipal\" class=\"mt\" style=\"visibility:hidden;display:none\"></div>";
			html+="<div id=\"contenido1\" class=\"mt\">"+divConten.innerHTML+"<br></div>";
			*/
			var html=divConten.innerHTML;
			var html2="";
			if (enlacesR!="") 
				{
				html2+="<div class=\"mt\" id=\"contenidoRelacionados\"><br><ul><h1>Otros enlaces relacionados:</h1><br><ul>";
				var enlaces=enlacesR.split(";");
				var lnk="";
				for (var d=0;d<enlaces.length;d++)
					{
					lnk=enlaces[d].split(":::");
					html2+="<li><a href='"+lnk[1]+"' target='_blank'>"+lnk[0]+"</a></li>";
					}
				html2+="</ul><br></div>";
				}
			/*
			divContenido.innerHTML=html+"<br>";
			divContenido.setAttribute("onClick","javascript:window.open('"+url+"')");
			divContenido.setAttribute("title","Pulse para acceder al contenido original");
			divContenedorsub.innerHTML=html+"<br>"+html2;
			*/
			divEntrada.innerHTML=html+"<br>"+html2;
			}
	}
	xmlhttp.open("GET","recuperarHTMLConProxy?OpenAgent&url="+url,true);
	xmlhttp.send();
	
		}
	else
		{
			pintar(listado);
		}
}
/*function cargarRespuestaListado(divId,url,titulo,volver)
{
//	addHistorial("cargarRespuesta('"+divId+"','"+url+"','"+volver+"');");
//No se puede a\u00F1adir aqu\u00ED al historial porque incrementa el array hasta cuando le damos a volver
	idRespuestaActual=url.substring(url.indexOf("vwPreguntasLecturaContribuyentes")+33,url.indexOf("?OpenDocument"));
	tituloRespuestaActual=titulo;
	var xmlhttp;
	var div=document.getElementById(divId)
	if (window.XMLHttpRequest)
		{
		xmlhttp=new XMLHttpRequest();
		}
	else
		{
		xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
		}
	xmlhttp.onreadystatechange=function()
	{
		if (xmlhttp.readyState==4 && xmlhttp.status==200)
			{
			var linkVolver="";
			registrarEntrada("<TITULO>"+titulo+"</TITULO><ENLACE>"+url+"</ENLACE>");
			if (hasPrev())
			{
				linkVolver=	"<div class=\"volver\"><a href=\"#\" onClick=\""+getPrev()+"\" target=\"_self\">Volver</a></div>";
			}
			div.innerHTML=xmlhttp.responseText;
			var divContenido=document.getElementById("contenidoPrincipal");
			div.innerHTML=linkVolver+divContenido.innerHTML;
			var divPie=document.getElementById("utilidad");
			if (divPie!=null) divPie.innerHTML="";
			comprobarElementos(div);
			cargarValidacion();
			}
	}
	xmlhttp.open("GET",url,true);
	xmlhttp.send();
}
*/
function registrarEntrada(linea)
{
	var ambito=document.getElementById("ambito").value;
	var url="registrarRespuestas?OpenAgent&idc="+idConversacion+"&texto="+linea+"&ambito="+ambito;
	var xmlhttp;
	if (window.XMLHttpRequest)
		{
		xmlhttp=new XMLHttpRequest();
		xmlhttp.overrideMimeType('text/xml');
		}
	else
		{
		xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
		}
	//xmlhttp.onreadystatechange=function()
	//	{
	//		if (xmlhttp.readyState==4 && xmlhttp.status==200)
	//		{
	//			procesarRespuesta("Arcadia",div,xmlhttp.responseText);
	//		}
	//	}
	xmlhttp.open("POST",url,true);
	xmlhttp.send();
}

function cargarXML(div,texto,contexto,ant,id)
{
	var ambito=document.getElementById("ambito").value;
	var correo=document.getElementById("email").value;
	var url="analizarConsultaDual?OpenAgent&consulta="+encodeURI(texto.value)+"&contexto="+contexto.value+"&anota="+etiquetasConsulta+"&ant="+ant+"&idc="+id+"&intentos=0&random="+Math.random()+"&ambito="+ambito+"&correo="+correo;
	
	//var urlMax="analizarConsulta?OpenAgent&consulta="+texto.value+"&anota="+etiquetasConsulta+"&ant="+ant+"&idc="+id+"&intentos=max&random="+Math.random();
	var xmlhttp;
	//alert(texto.value.toLowerCase());
	notificacion("Un momento por favor...");
//	if ((texto.value.toLowerCase()!="no") & (texto.value.toLowerCase()!="s\u00ED") & (texto.value.toLowerCase()!="si"))
//	{
		if (window.XMLHttpRequest)
			{
			xmlhttp=new XMLHttpRequest();
			xmlhttp.overrideMimeType('text/xml');
			}
		else
			{
			xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
			}
		xmlhttp.onreadystatechange=function()
			{
				if (xmlhttp.readyState==4 && xmlhttp.status==200)
				{
					procesarRespuesta("Arcadia",div,xmlhttp.responseText);
					//document.getElementById("divUtilidad").innerHTML="\u00BFLe ha sido \u00FAtil esta herramienta? <a href=\"javascript:lanzarPositivo();\"><b><u>S\u00ED</u></b></a> / <a href=\"javascript:lanzarPositivo();\"><b><u>S\u00ED, y quiero una copia de la conversaci\u00F3n</u></b></a> / <a href=\"javascript:lanzarNegativoValorar();\"><b><u>No</u></b></a>";
					document.getElementById("divUtilidad").innerHTML="Si le ha sido \u00FAtil esta herramienta, puede imprimir una copia de la conversaci\u00F3n:<br> <a href=\"javascript:lanzarPositivo();exportarConversacion();\"><b><u>S\u00ED, me ha sido \u00FAtil</u></b></a> / <a href=\"javascript:lanzarNegativoValorar();\"><b><u>No me ha sido \u00FAtil</u></b></a>";
					document.getElementById("divUtilidad").style="margin-left:10px";
				}
			}
		//if (intentos!=2)
		//{
			xmlhttp.open("GET",url,true);
	//	}
		//else
		//{
	//		xmlhttp.open("GET",urlMax,true);
	//	}
			//xmlhttp.setRequestHeader('Content-type','application/x-www-form-urlencoded;charset=UTF-8');
		xmlhttp.send();
//	}
//	else if ((texto.value.toLowerCase()=="s\u00ED") | (texto.value.toLowerCase()=="si"))
//		{
			//registrarEntrada("<CONSULTA>S\u00ED</CONSULTA>");
			//registrarEntrada("<TITULORESPUESTAVALIDA>"+tituloRespuestaActual+"</TITULORESPUESTAVALIDA>")
			//registrarEntrada("<RESPUESTAVALIDA>"+idRespuestaActual+"</RESPUESTAVALIDA>")
//			procesarRespuesta("Arcadia",div,"<AFIRMACION>");
//		}
//	else
//		{
			//registrarEntrada("<CONSULTA>No</CONSULTA>");
//			procesarRespuesta("Arcadia",div,"<NEGACION>");
//		}
}
function limpiarTildes(cadena)
{
	
	cadena=cadena.replace(/[\u00D3|\u00D2|\u00D6|\u00D4]/g,"O");
	cadena=cadena.replace(/[\u00CD|\u00CC|\u00CF|\u00CE]/g,"I");
	cadena=cadena.replace(/[\u00C1|\u00C0|\u00C4|\u00C2]/g,"A");
	cadena=cadena.replace(/[\u00C9|\u00C8|\u00CB|\u00CA]/g,"E");
	cadena=cadena.replace(/[\u00DA|\u00D9|\u00DC|\u00DB]/g,"U");
	
	cadena=cadena.replace(/[?|\u00BF|!|\u00A1|%]/g,"");
	
	cadena=cadena.replace(/[\u00E9|\u00E8|\u00EB|\u00EA]/g,"e");
	cadena=cadena.replace(/[\u00FA|\u00F9|\u00FC|\u00FB]/g,"u");
	cadena=cadena.replace(/[\u00ED|\u00EC|\u00EF|\u00EE]/g,"i");
	cadena=cadena.replace(/[\u00E1|\u00E4|\u00E0|\u00E2]/g,"a");
	cadena=cadena.replace(/[\u00F3|\u00F2|\u00F6|\u00F4]/g,"o");
	cadena=cadena.replace(/[#]/g,"");
	cadena=cadena.replace(/:/g," ");
	return cadena;
}
function limpiarSaludos(c)
{
	c=c.replace(/buenos dias/g,"");
	c=c.replace(/hola/g,"");
	c=c.replace(/buenas tardes/g,"");
	c=c.replace(/buenas noches/g,"");
	c=c.replace(/muchas gracias/g,"");
	c=c.replace(/gracias/g,"");
	c=c.replace(/muy agradecido/g,"");
	c=c.replace(/agradecido/g,"");
	c=c.replace(/\,/g,"");
	c=c.replace(/\./g,"");
	return c;
}
function procesarConsulta(div,cadena,contexto,ant,idc)
{
	
	cadena.value=limpiarTildes(cadena.value);
	/*
	 * Comprobamos si s\u00F3lo tiene saludo o agradecimiento o tiene algo m\u00E1s
	 * */
	
	var cadenaMin=cadena.value.toLowerCase();
	var cadenaSinSaludo=limpiarSaludos(cadenaMin);
	if (cadenaSinSaludo.trim()!="") cadena.value=cadenaSinSaludo;
	if ((cadenaMin=="si" || cadenaMin=="no") && esperandoValidacion)
	{
		if (cadenaMin=="si")
			lanzarPositivo();
		else if (cadenaMin=="no")
			lanzarNegativo();
	}
	else
	{
	var terminos=document.getElementById("palabrasConsulta");
	if (terminos!='undefined') 
		{
		if (terminos.value!='') 
			{
			terminos.value+=',';
			}
		terminos.value+=cadena.value;
			
		}
	cargarXML(div,cadena,contexto,ant,idc);
		}
	eliminarValidacion();
}
function disableEnterKey(e)
{
var key;
if (window.event)
	key=window.event.keyCode;
else
	key=e.which;

if (key==13) 
{
var boton=document.getElementById("Buscar2");
var deshabilitado=false;
if (boton==null) 
	deshabilitado=true;
else
	deshabilitado=boton.disabled;
if (!deshabilitado)
	boton.click();
else
	{
		enviarConsulta();
	}
}
return (key !=13);
}
function valorNodo(valor)
{
	return valor.innerText || valor.textContent || valor.nodeValue || valor.text; 
}
function pintarHistorial(lista)
{
	addHistorialFinal("pintarIndice(listado,"+((getIndice()*1)+1)+");")
	pintarIndice(lista,getIndice());
}

function pintarIndice (lista,ind)
{
	setIndice(ind);
	pintar(lista);
}
function cargarCodigo(codigo)
{
	//var ambito=document.getElementById("ambito").value;
	var urlBusqueda="ConsultarCodigoJson?OpenAgent&codigo="+codigo;
	var xhttp;
	var respuesta="";
	if (window.XMLHttpRequest)
	{
		xhttp=new XMLHttpRequest();
	}
	else
	{
		xhttp=new ActiveXObject("Microsoft.XMLHTTP");
	}
	xhttp.onreadystatechange=function()
	{
		if (xhttp.readyState==4 && xhttp.status==200)
		{
		respuesta=xhttp.responseText;
		}
	}
	xhttp.open("GET",urlBusqueda,false);
	xhttp.send();
	return respuesta;
}
function cargarPlantilla(codigo)
{
	//var ambito=document.getElementById("ambito").value;
	var urlBusqueda="ConsultarCodigo?OpenAgent&codigo="+codigo;
	var divResultados=document.getElementById("contenido1");
	var divPadre=document.getElementById("contenedorSub");
	var id="";
	var xhttp;
	if (window.XMLHttpRequest)
	{
		xhttp=new XMLHttpRequest();
	}
	else
	{
		xhttp=new ActiveXObject("Microsoft.XMLHTTP");
	}
	xhttp.onreadystatechange=function()
	{
		if (xhttp.readyState==4 && xhttp.status==200)
		{
		divResultados.innerHTML=xhttp.responseText;
		}
	}
	xhttp.open("GET",urlBusqueda,false);
	xhttp.send();
}
function enlazarSoporte(ambito)
{
	//var ambito=document.getElementById("ambito").value;
	var divCorreo=document.getElementById("consultaCorreo");
	var respuesta="";
	respuesta="<div class=\"mt\"><h1 class=\"tituloCanal\">Asistente Virtual SII</h1></div><div id=\"contenidoPrincipal\" class=\"mt\" style=\"visibility:hidden;display:none\"></div>";
	var urlBusqueda="enlazarSoporte?OpenAgent&ambito="+ambito;
	var divResultados=document.getElementById("contenedorSub");
	//divResultados.innerHTML="";
	var xhttp;
	if (window.XMLHttpRequest)
	{
		xhttp=new XMLHttpRequest();
	}
	else
	{
		xhttp=new ActiveXObject("Microsoft.XMLHTTP");
	}
	xhttp.onreadystatechange=function()
	{
		if (xhttp.readyState==4 && xhttp.status==200)
		{
			
		divResultados.innerHTML=respuesta+xhttp.responseText+"</div>";
		}
	}
	xhttp.open("GET",urlBusqueda,false);
	xhttp.send();
	//divCorreo.style.visibility="visible";
	//divCorreo.style.display="block";
	
}
function continuarConversacion()
{
	var inputtext=document.getElementById("consultaArcadia");
	inputtext.focus();
}
function buscar_resultados_gsa(cadena_busqueda,ambito)
{
	//var ambito=document.getElementById("ambito").value;
	var divCorreo=document.getElementById("consultaCorreo");
	var respuesta="";
	
	cadena_busqueda=cadena_busqueda.replace(/,/g,"+");
	var urlBusqueda="Consultar?OpenAgent&terminos="+cadena_busqueda+"&ambito="+ambito;
	var divResultados=document.getElementById("contenido1");
	//divResultados.innerHTML="";
	var xhttp;
	if (window.XMLHttpRequest)
	{
		xhttp=new XMLHttpRequest();
	}
	else
	{
		xhttp=new ActiveXObject("Microsoft.XMLHTTP");
	}
	xhttp.onreadystatechange=function()
	{
		if (xhttp.readyState==4 && xhttp.status==200)
		{
			
		divResultados.innerHTML=respuesta+xhttp.responseText+"</div>";
		}
	}
	xhttp.open("GET",urlBusqueda,false);
	xhttp.send();
	//divCorreo.style.visibility="visible";
	//divCorreo.style.display="block";
	
}
function pintar(lista)
{
	var linkVolver="";
	var divBotones="<div class=\"botones\">";
	if (hasPrev())
	{
		linkVolver=	"<div class=\"anterior\" style=\"visibility:visible;><a href=\"#\" onClick=\""+getPrevURL()+"\" target=\"_self\">Anterior</a></div>";
		}
	else
	{
		linkVolver=	"<div class=\"anterior\" style=\"visibility:hidden;\"><a href=\"#\" onClick=\""+getPrevURL()+"\" target=\"_self\">Anterior</a></div>";
	}

	var linkNext="";
	if (hasNext())
	{
		linkNext=	"<div class=\"siguiente\" style=\"visibility:visible;><a href=\"#\" onClick=\""+getNextURL()+"\" target=\"_self\">Siguiente</a></div>";
	}
	else
	{
		linkNext=	"<div class=\"siguiente\" style=\"visibility:hidden;><a href=\"#\" onClick=\""+getNextURL()+"\" target=\"_self\">Siguiente</a></div>";
	}
	var linea=divBotones+linkNext+linkVolver+"</div>";
	var titulo="";
	var divListadoRelevantes=document.createElement("div");
	divListadoRelevantes.id="listadoRelevantes";

	divListadoRelevantes.innerHTML="";
	var divTituloListado=document.createElement("div");
	divTituloListado.id="tituloListado";
	divTituloListado.className="topContenidoActivo";
	var h2=document.createElement("h2");
	h2.innerHTML="Otras respuestas relacionadas.";
	divTituloListado.appendChild(h2);
	divListadoRelevantes.appendChild(divTituloListado);
	var divContenidoListado=document.createElement("div");
	divContenidoListado.id="divContenidoListado";

	
	var ul=document.createElement("ul");

	//ul.className="novedades";
	var li;
	for (i=0;i<lista.length;i++)
		{
			linea="";
			li=document.createElement("li");
			titulo=valorNodo(lista[i].childNodes[0]);
			linea+="<BR><A TARGET='_self' href='#' onClick='cargarRespuesta(\"contenedorizq\",\""+valorNodo(lista[i].childNodes[2])+"\",\""+titulo.replace(/"/g,'\\"')+"\");'>";
			linea+=titulo+"</A>";
			li.innerHTML=linea;
			ul.appendChild(li);			
			
		}
	divContenidoListado.appendChild(ul);
	divContenidoListado.className="respuesta";
	divListadoRelevantes.appendChild(divContenidoListado);
	var divContenido=document.getElementById("contenedorizq");
	var divContenidoActivo=document.createElement("div");
	divContenidoActivo.innerHTML=divListadoRelevantes.innerHTML;
	divContenidoActivo.id="listadoRespuestas";
	divContenidoActivo.className="sombraContenidoActivo";
	divContenido.innerHTML=divBotones+linkNext+linkVolver+"</div><br>";
	//cargarValidacion();
	divContenido.appendChild(divContenidoActivo);
	var divderecho=document.getElementById("contenedorder");
	divContenidoActivo.style.height=divderecho.offsetHeight+"px";
	
}
function enviarConsulta()
{
	var texto=document.getElementById("consultaArcadia");
	ultimaConsultaEnviada=texto.value;
	var contexto=document.getElementById("Contexto");
	if (texto.value.toLowerCase()=='consulta nueva') texto.value="nueva consulta";
	if (texto.value.toLowerCase()!='nueva consulta')
		{ 
		ultimaAccionValidacion=false;
		if (texto.value!="")
			{
				//comprobacionUtilidad="";
				clearInterval(intervaloOpacidad);
				var anteriores=respuestasEmitidas;
				var divChat=document.getElementById("chat");
				concatenar("Usted",divChat,texto.value);
				
				procesarConsulta(divChat,texto,contexto,anteriores,idConversacion);
			}
		//var campo=document.getElementById("consultaArcadia");
		}
	else
		{
		yaRemitido=false;
		/*
		if (!ultimaAccionValidacion) 
		{
		confirmacion=confirm(mensaje);
		if (confirmacion)
			{
			lanzarPositivo();
			} 
		else
			{
			lanzarNegativo();
			}
		}
		*/
		/*
		 * Aqu\u00ED podr\u00EDamos incorporar la pregunta de si le ha servido o no si hiciera falta
		 * en vez del confirm, pero habr\u00EDa que crear una funci\u00F3n aparte para continuar con el reinicio
		 * */
		iniciarHistorico();
		//var correo=document.getElementById("email").value;
		//solicitarIdConversacion(correo);
		var divContenido=document.getElementById("contenido1");
		if (divContenido==null) 
		{
		var contenedorSub=document.getElementById("contenedorSub");
		divContenido=document.createElement("div");
		divContenido.setAttribute("id","contenido1");
		contenedorSub.appendChild(divContenido);
		}
		divContenido.innerHTML="";
		var divRelacionados=document.getElementById("contenidoRelacionados");
		if (divRelacionados!=null) divRelacionados.parentNode.removeChild(divRelacionados);
		inicioChat();
		//reiniciarConversacion("\u00BFEn qu\u00E9 puedo ayudarle?");
		var divAct=document.getElementById("validacionRespuesta");
		//ocultarTransparenciaGradual(divAct);
		eliminarValidacion();
		//registrarEntrada("\u00BFEn qu\u00E9 puedo ayudarle?");
		}
	texto.value="";

	
	//Deshabilitar temporalmente los botones de consulta
	deshabilitarTemporalmente();
}
function deshabilitarTemporalmente()
{
	var boton=document.getElementById("nuevaConsulta");
	var boton2=document.getElementById("sendConsulta");
var valor=boton2.value;
var valorNueva=boton.value;
var texto=document.getElementById("consultaArcadia");
boton2.setAttribute("disabled",true);
boton.setAttribute("disabled",true);
texto.setAttribute("disabled",true);
boton2.value="Espere...";
boton.value="Espere...";
setTimeout(function(){
	boton2.removeAttribute("disabled");
	boton.removeAttribute("disabled");
	texto.removeAttribute("disabled");
	boton2.value=valor;
	boton.value=valorNueva;
	texto.focus();
},1000)

}
//Si el navegador del cliente es Mozilla la variable siguiente valdr\u00E1 true
var moz = document.getElementById && !document.all;
//Flag que indica si estamos o no en proceso de arrastrar el rat\u00F3n
var estoyArrastrando = false;
//Variable para almacenar un puntero al objeto que estamos moviendo
var dobj;
var movido=false;
function presionarBoton(e) {
  //Obtenemos el elemento sobre el que se ha presionado el bot\u00F3n del rat\u00F3n
  var fobj = moz ? e.target : event.srcElement;
	
  // Buscamos el primer elemento en la que est\u00E9 contenido aquel sobre el que se ha pulsado
  // que pertenezca a la clase objMovible. Esto es necesario por si hemos pinchando sobre
  // un elemento contenido dentro de otro pero este \u00FAltimo es el que pertenece a la clase
  // objmovible
 // while (fobj.tagName.toLowerCase() != "html" && fobj.className != "objMovible") {
 //   fobj = moz ? fobj.parentNode : fobj.parentElement;


  if ((fobj.tagName.toLowerCase()=="img")& (fobj.id=="botonMover"))
	  {
  fobj=document.getElementById("arcadia");
  
  // Si hemos obtenido un objeto movible...
  if (fobj.className.indexOf("objMovible")>=0) {
    // Activamos el flag para indicar que se empieza a arrastrar
    estoyArrastrando = true;
    // Guardamos un puntero al objeto que se est\u00E1 moviendo en la variable global
    dobj = fobj;
  }
    // Devolvemos false para no realizar ninguna acci\u00F3n posterior
    return false;
  }
}
//Asociamos la funci\u00F3n al evento onmousedown
document.onmousedown = presionarBoton;


function arrastrarRaton(e){
  if (estoyArrastrando) {
    // Obtenemos las coordenadas X e Y del rat\u00F3n (de forma diferente dependiendo del navegador del cliente)
    newLeft = moz ? e.clientX : event.clientX;
    newTop = moz ? e.clientY : event.clientY;

movido=true;
    // Posicionamos el objeto en las nuevas coordenadas y aplicamos unas desviaciones
    // horizontal y vertical correspondientes a la mitad del ancho y alto del elemento
    // que movemos para colocar el puntero en el centro de la capa movible.
   //***** newLeft = newLeft - parseInt(dobj.style.width)/2;
    dobj.style.left =newLeft-4;
    //*****dobj.style.top = newTop- parseInt(dobj.style.height)/2;
    dobj.style.top = newTop-4;

    // Devolvemos false para no realizar ninguna acci\u00F3n posterior
    return false;
  }
}
//Asociamos la funci\u00F3n al evento onmousemove
document.onmousemove = arrastrarRaton;


function soltarBoton(e) {		 
  estoyArrastrando = false;
moz ? movido=false:movido=movido;
}
//Asociamos la funci\u00F3n al evento onmouseup
document.onmouseup = soltarBoton;
function estoyarrastrando()
{
var movidoaux=movido;

movido=false;
return !movidoaux;
}


incluirLibreriaBeep();
incluirLibreriaHistorico();
posicionarArcadia();
/*
window.onbeforeunload=function(evento)
{
	var confirmacion;
	if (typeof evento=='undefined')
		{
			evento=window.event;
		}
	if (evento)
		{
		if (esperandoValidacion || !ultimaAccionValidacion) 
			{
			confirmacion=confirm(mensaje);
			if (confirmacion)
				{
				lanzarPositivoCerrando();
				}
			else
				{
				lanzarNegativoCancelar();
				}
			}
			evento=window.event;
		}
	//return mensaje;
}
window.onunload=function(evento)
{
	var confirmacion;
	if (typeof evento=='undefined')
		{
			evento=window.event;
		}
	if (evento)
		{
		if (esperandoValidacion || !ultimaAccionValidacion) 
			{
			confirmacion=confirm(mensaje);
			if (confirmacion)
				{
				lanzarPositivoCerrando();
				}
			else
				{
				lanzarNegativoCancelar();
				}
			}
			evento=window.event;
		}
	//return mensaje;
}*/