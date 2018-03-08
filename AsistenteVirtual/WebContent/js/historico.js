var historial=new Array();
var indiceHistorial=-1;
var longitudHistorial=0;

function mostrarHistorial()
{
	var historialStr="";
	for (i=0; i<historial.length;i++)
		{
			historialStr+=historial[i]+";";
		}
return historialStr;
}
function iniciarHistorico()
{
	longitudHistorial=0;
	indiceHistorial=-1;
}
function getLongitud()
{
	return longitudHistorial;
}
function setLongitud(l)
{
	longitudHistorial=l;
}
function addHistorialFinal(direccion)
{
	setIndice(getLongitud());
	setLongitud(getLongitud()+1);
	historial[getIndice()]=direccion;
}

function addHistorial(direccion)
{
	setIndice(getIndice()+1);
	setLongitud(getLongitud()+1);
	truncarHistorial(getIndice());
	historial[indiceHistorial]=direccion;
//	mostrarHistorial();
}
function truncarHistorial(l)
{
	setLongitud(l+1);
	setIndice(l);
	
}

function hasPrev()
{
	var i=getIndice();
	return i>0;
}
function getPrev()
{
	return historial[indiceHistorial-1];
}
function getNext()
{
	return historial[indiceHistorial+1];
}
function getPrevURL()
{
	return historial[getIndice()-1];
}
function getNextURL()
{
	return historial[getIndice()+1];
}
function hasNext()
{
	var i=getIndice();
	return i<(longitudHistorial-1);
}
function setIndice(i)
{
	indiceHistorial=i;
}
function getIndice()
{
	return indiceHistorial;
}