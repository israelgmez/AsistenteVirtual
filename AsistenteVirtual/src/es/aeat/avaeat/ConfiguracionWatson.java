package es.aeat.avaeat;

import java.io.IOException;
import java.net.HttpURLConnection;
import java.net.InetSocketAddress;
import java.net.MalformedURLException;
import java.net.Proxy;
import java.net.URL;

import javax.net.ssl.HttpsURLConnection;




public class ConfiguracionWatson { 
private String endpoint="";
private String llamada="";
private String proxy="";
private String puerto="8883";
private String usuario="";
private String password="";
private String workspaceid="";
private String dbCfgStr="";
private String dbHistoricoStr="";
private String endpointTranslator="";
private String llamadaTranslator="";
private String llamadaIdentify="";
private String usrTranslator="";
private String passTranslator="";
private boolean traduccionActivada=false;
private String emailSoporte="";
private Double umbralWex=new Double(50);
private String entornoEjecucion="";
private Log log;
public String getProxy()
{
return proxy;
}
public String getProxyPort()
{
return puerto;
}
public int getProxyPortInt()
{
return Integer.parseInt(puerto);
}
public String getEntorno()
{
return entornoEjecucion;
}
public Double getUmbralWex() {
return umbralWex;
}
public void setUmbralWex(Double umbralWex) {
this.umbralWex = umbralWex;
}
public String getEmailSoporte() {
return emailSoporte;
}
public void setEmailSoporte(String emailSoporte) {
this.emailSoporte = emailSoporte;
}

private int maxIntentos=5;
private String urlGSA="";
private String urlWex="";
private String llamadaWexNodos="";
public String getLlamadaWexNodos()
{
return llamadaWexNodos;
}
private String llamadaWexAnalysis="";
public String getLlamadaWexAnalysis() {
return llamadaWexAnalysis;
}
public void setLlamadaWexAnalysis(String llamadaWexAnalysis) {
this.llamadaWexAnalysis = llamadaWexAnalysis;
}
private String llamadaWexSearch="";
public String getLlamadaWexSearch() {
return llamadaWexSearch;
}
public void setLlamadaWexSearch(String llamadaWexSearch) {
this.llamadaWexSearch = llamadaWexSearch;
}
public String getCategorias() {
return categorias;
}
public void setCategorias(String categorias) {
this.categorias = categorias;
}
public String getCategoriasAsistente() {
return categoriasAsistente;
}
public void setCategoriasAsistente(String categoriasAsistente) {
this.categoriasAsistente = categoriasAsistente;
}
private String categorias="";
private String categoriasAsistente="";
public String getUrlAv() {
return urlAv;
}
public void setUrlAv(String urlAv) {
this.urlAv = urlAv;
}
public String getUrlCfg() {
return urlCfg;
}
public void setUrlCfg(String urlCfg) {
this.urlCfg = urlCfg;
}
public String getUrlRecientes() {
return urlRecientes;
}
public void setUrlRecientes(String urlRecientes) {
this.urlRecientes = urlRecientes;
}
public String getUrlCompactadas() {
return urlCompactadas;
}
public void setUrlCompactadas(String urlCompactadas) {
this.urlCompactadas = urlCompactadas;
}
private String urlAv="";
private String urlCfg="";
private String urlRecientes="";
private String urlCompactadas="";

public String getEndpointTranslator() {
return endpointTranslator;
}
public void setEndpointTranslator(String endpointTranslator) {
this.endpointTranslator = endpointTranslator;
}
public String getLlamadaTranslator() {
return llamadaTranslator;
}
public void setLlamadaTranslator(String llamadaTranslator) {
this.llamadaTranslator = llamadaTranslator;
}
public String getLlamadaIdentify() {
return llamadaIdentify;
}
public void setLlamadaIdentify(String llamadaIdentify) {
this.llamadaIdentify = llamadaIdentify;
}
public String getUsrTranslator() {
return usrTranslator;
}
public void setUsrTranslator(String usrTranslator) {
this.usrTranslator = usrTranslator;
}
public String getPassTranslator() {
return passTranslator;
}
public void setPassTranslator(String passTranslator) {
this.passTranslator = passTranslator;
}
public boolean isTraduccionActivada() {
return traduccionActivada;
}
public void setTraduccionActivada(boolean traduccionActivada) {
this.traduccionActivada = traduccionActivada;
}


public int getMaxIntentos()
{
return maxIntentos;
}
public String getWorkspaceId()
{
return workspaceid;
}
private void setConfiguracionTranslator(String usrT,String passT,String urlT,String trad,String ident,boolean enabled)
{
endpointTranslator=urlT;
llamadaTranslator=trad;
llamadaIdentify=ident;
usrTranslator=usrT;
passTranslator=passT;
setTraduccionActivada(enabled);
}
private void setConfiguracionWatson(String user,String pass,String ws,String endp,String llam,String prox,String port,int max,String url,String urlW,String urlWNodos,String urlAnalisis,String urlBusqueda,Double umbralW,String urlAsistente,String urlConfig,String urlRec,String urlCompac,String email)
{
endpoint=endp;
llamada=llam;
proxy=prox;
puerto=port;
password=pass;
usuario=user;
workspaceid=ws;
maxIntentos=max;
urlGSA=url;
urlWex=urlW;
llamadaWexNodos=urlWNodos;
urlAv=urlAsistente;
urlCfg=urlConfig;
urlRecientes=urlRec;
urlCompactadas=urlCompac;
emailSoporte=email;
llamadaWexAnalysis=urlAnalisis;
llamadaWexSearch=urlBusqueda;
umbralWex=umbralW;
}
public ConfiguracionWatson(String entorno,boolean remota)
{
try {
//Lo primero es averiguar el entorno: Producción o Desarrollo, para coger la AvConfig conrrespondiente

entornoEjecucion=entorno;

log=new Log(System.getenv("app"));

entorno=System.getenv("Entorno");

if (entorno.equals("Desarrollo"))
entorno="Dev";
else
if (entorno.equals("Producción"))
entorno="Prod";
else
if (entorno.equals("Produccion"))
entorno="Prod";

dbHistoricoStr=System.getenv("urlHistoricoReciente"+entorno);
//dbHistorico=s.getDatabase("",dbHistoricoStr);
setConfiguracionWatson(System.getenv("Usuario"+entorno),System.getenv("Password"+entorno),System.getenv("WorkspaceId"+entorno),System.getenv("Endpoint"+entorno),System.getenv("Llamada"+entorno),System.getenv("Proxy"+entorno),System.getenv("Puerto"+entorno),Integer.parseInt(System.getenv("NumIntentos"+entorno)),System.getenv("urlGSA"+entorno),System.getenv("urlWex"+entorno),System.getenv("urlWexNodos"+entorno),System.getenv("urlWexAnalysis"+entorno),System.getenv("urlWexSearch"+entorno),new Double(System.getenv("umbralWex"+entorno)),System.getenv("urlAsistente"+entorno),System.getenv("urlConfiguracion"+entorno),System.getenv("urlHistoricoReciente"+entorno),System.getenv("urlHistoricoCompactadas"+entorno),System.getenv("emailSoporte"+entorno));
setConfiguracionTranslator(System.getenv("UsuarioTranslator"),System.getenv("PasswordTranslator"),System.getenv("EndpointTranslator"),System.getenv("LlamadaTranslate"),System.getenv("LlamadaIdentify"),!System.getenv("ActivarTraduccion").equals(""));
setCategorias(System.getenv("Categorias"+entorno));
setCategoriasAsistente(System.getenv("CategoriasAsistente"+entorno));
} catch (Exception e) {
// TODO Auto-generated catch block
log.writeLog(e);
}
}
public ConfiguracionWatson(String entorno,String ambito)
{
try {
//Lo primero es averiguar el entorno: Producción o Desarrollo, para coger la AvConfig conrrespondiente

entornoEjecucion=entorno;
log=new Log(ambito);

if (entorno.equals("Desarrollo"))
entorno="Dev";
else
if (entorno.equals("Producción"))
entorno="Prod";
dbCfgStr=System.getenv("urlConfiguracion"+entorno);
dbHistoricoStr=System.getenv("urlHistoricoReciente"+entorno);

setConfiguracionWatson(System.getenv("Usuario"+entorno),System.getenv("Password"+entorno),System.getenv("WorkspaceId"+entorno),System.getenv("Endpoint"+entorno),System.getenv("Llamada"+entorno),System.getenv("Proxy"+entorno),System.getenv("Puerto"+entorno),Integer.parseInt(System.getenv("NumIntentos"+entorno)),System.getenv("urlGSA"+entorno),System.getenv("urlWex"+entorno),System.getenv("urlWexNodos"+entorno),System.getenv("urlWexAnalysis"+entorno),System.getenv("urlWexSearch"+entorno),new Double(System.getenv("umbralWex"+entorno)),System.getenv("urlAsistente"+entorno),System.getenv("urlConfiguracion"+entorno),System.getenv("urlHistoricoReciente"+entorno),System.getenv("urlHistoricoCompactadas"+entorno),System.getenv("emailSoporte"+entorno));
setConfiguracionTranslator(System.getenv("UsuarioTranslator"),System.getenv("PasswordTranslator"),System.getenv("EndpointTranslator"),System.getenv("LlamadaTranslate"),System.getenv("LlamadaIdentify"),!System.getenv("ActivarTraduccion").equals(""));
setCategorias(System.getenv("Categorias"+entorno));
setCategoriasAsistente(System.getenv("CategoriasAsistente"+entorno));
//log.writeLog(entorno);
} catch (Exception e) {
// TODO Auto-generated catch block
log.writeLog(e);
}
}
public HttpsURLConnection getConexionWatsonWS()
{
String basicAuth="Basic "+new sun.misc.BASE64Encoder().encode((usuario+":"+password).getBytes());
String direccion=endpoint;
if (!endpoint.substring(endpoint.length()-1,endpoint.length()).equals("/")) endpoint+="/";
direccion+=workspaceid+llamada.replaceAll("message","")+"&export=true";
        URL url;
try {
url = new URL(direccion);
Proxy proxyaeat=new Proxy(Proxy.Type.HTTP,new InetSocketAddress(proxy,Integer.parseInt(puerto)));
       HttpsURLConnection con=(HttpsURLConnection) url.openConnection(proxyaeat);
        con.setRequestMethod("GET");
        con.setRequestProperty("Authorization",basicAuth);
        con.setRequestProperty("Accept", "application/json");
        con.setRequestProperty("Accept-Charset", "UTF-8");
        con.setRequestProperty("Content-Type","application/json;charset=utf-8");
        con.setDoOutput(true);
return con;
} catch (MalformedURLException e) {
// TODO Auto-generated catch block
log.writeLog(e);
return null;
} catch (IOException e) {
// TODO Auto-generated catch block
log.writeLog(e);
return null;
}
        
}
public HttpsURLConnection getConexionWatson()
{
return getConexionWatson("/"+llamada);
}
public String getVersion()
{
return llamada.substring(llamada.indexOf("version"),llamada.length());
}
public HttpsURLConnection getConexionWatson(String call)
{
String basicAuth="Basic "+new sun.misc.BASE64Encoder().encode((usuario+":"+password).getBytes());
String direccion=endpoint;
if (!endpoint.substring(endpoint.length()-1,endpoint.length()).equals("/")) endpoint+="/";
direccion+=workspaceid+call;
        URL url;
try {
url = new URL(direccion);
Proxy proxyaeat=new Proxy(Proxy.Type.HTTP,new InetSocketAddress(proxy,Integer.parseInt(puerto)));
       HttpsURLConnection con=(HttpsURLConnection) url.openConnection(proxyaeat);
        con.setRequestMethod("POST");
        con.setRequestProperty("Authorization",basicAuth);
        con.setRequestProperty("Accept", "application/json");
        con.setRequestProperty("Accept-Charset", "UTF-8");
        con.setRequestProperty("Content-Type","application/json;charset=utf-8");
        con.setDoOutput(true);
return con;
} catch (MalformedURLException e) {
// TODO Auto-generated catch block
log.writeLog(e);
return null;
} catch (IOException e) {
// TODO Auto-generated catch block
log.writeLog(e);
return null;
}
        
}
public HttpsURLConnection getConexionWatsonTranslator(String call,String accept,String charset,String contentType)
{
String basicAuth="Basic "+new sun.misc.BASE64Encoder().encode((usrTranslator+":"+passTranslator).getBytes());
String direccion=endpointTranslator;
if (!endpoint.substring(endpoint.length()-1,endpoint.length()).equals("/")) endpoint+="/";
direccion+=call;
        URL url;
try {
url = new URL(direccion);
Proxy proxyaeat=new Proxy(Proxy.Type.HTTP,new InetSocketAddress(proxy,Integer.parseInt(puerto)));
       HttpsURLConnection con=(HttpsURLConnection) url.openConnection(proxyaeat);
        con.setRequestMethod("POST");
        con.setRequestProperty("Authorization",basicAuth);
        con.setRequestProperty("Accept", accept);
        con.setRequestProperty("Accept-Charset", charset);
        con.setRequestProperty("Content-Type",contentType);
        con.setDoOutput(true);
return con;
} catch (MalformedURLException e) {
// TODO Auto-generated catch block
e.printStackTrace();
return null;
} catch (IOException e) {
// TODO Auto-generated catch block
log.writeLog(e);
return null;
}
        
}
public HttpsURLConnection getConexionWatsonTranslator(String call)
{
String basicAuth="Basic "+new sun.misc.BASE64Encoder().encode((usrTranslator+":"+passTranslator).getBytes());
String direccion=endpointTranslator;
if (!endpoint.substring(endpoint.length()-1,endpoint.length()).equals("/")) endpoint+="/";
direccion+=call;
        URL url;
try {
url = new URL(direccion);
Proxy proxyaeat=new Proxy(Proxy.Type.HTTP,new InetSocketAddress(proxy,Integer.parseInt(puerto)));
       HttpsURLConnection con=(HttpsURLConnection) url.openConnection(proxyaeat);
        con.setRequestMethod("POST");
        con.setRequestProperty("Authorization",basicAuth);
        con.setRequestProperty("Accept", "application/json");
        con.setRequestProperty("Accept-Charset", "UTF-8");
        con.setRequestProperty("Content-Type","application/json;charset=utf-8");
        con.setDoOutput(true);
return con;
} catch (MalformedURLException e) {
// TODO Auto-generated catch block
log.writeLog(e);
return null;
} catch (IOException e) {
// TODO Auto-generated catch block
log.writeLog(e);
return null;
}
        
}


public HttpURLConnection getConexionWex(String llamada,boolean proxyActivo)
{
String direccion=urlWex;
direccion+=llamada;
        URL url;
try {
url = new URL(direccion);
HttpURLConnection con=null;
//Proxy proxyaeat=new Proxy(Proxy.Type.HTTP,new InetSocketAddress(proxy,Integer.parseInt(puerto)));
if (proxyActivo)
{
Proxy proxyaeat=new Proxy(Proxy.Type.HTTP,new InetSocketAddress(proxy,Integer.parseInt(puerto)));
con=(HttpURLConnection) url.openConnection(proxyaeat);
}
else
{
con=(HttpURLConnection) url.openConnection();
}
       
        con.setRequestProperty("Accept", "text/html");
        con.setRequestProperty("Accept-Charset", "UTF-8");
return con;
} catch (MalformedURLException e) {
// TODO Auto-generated catch block
log.writeLog(e);
return null;
} catch (IOException e) {
// TODO Auto-generated catch block
log.writeLog(e);
return null;
}
        
}
public HttpsURLConnection getConexionGSA(String terminos)
{
String direccion=urlGSA;
if (!direccion.substring(direccion.length()-1,direccion.length()).equals("+")) endpoint+="+";
direccion+=terminos.replaceAll(" ","+");
        URL url;
try {
url = new URL(direccion);
//Proxy proxyaeat=new Proxy(Proxy.Type.HTTP,new InetSocketAddress(proxy,Integer.parseInt(puerto)));
Proxy proxyaeat=new Proxy(Proxy.Type.HTTP,new InetSocketAddress(proxy,Integer.parseInt(puerto)));
       HttpsURLConnection con=(HttpsURLConnection) url.openConnection(proxyaeat);
        con.setRequestProperty("Accept", "text/html");
        con.setRequestProperty("Accept-Charset", "UTF-8");
return con;
} catch (MalformedURLException e) {
// TODO Auto-generated catch block
log.writeLog(e);
return null;
} catch (IOException e) {
// TODO Auto-generated catch block
log.writeLog(e);
return null;
}
        
}
}
