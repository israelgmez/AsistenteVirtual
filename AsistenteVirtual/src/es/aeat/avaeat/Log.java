package es.aeat.avaeat;

import java.io.BufferedWriter;
import java.io.FileWriter;
import java.io.PrintWriter;
import java.io.StringWriter;
import java.text.DateFormat;
import java.util.Date;



public class Log {
private String rutaDb="avaeat/Log.nsf";
private String app="";
private BufferedWriter bw = null;
private FileWriter fw = null;
private static final String LOGFILENAME = "asistentevirtual.log";

public Log(String aplicacion)
{
app=aplicacion;

}
public void writeLog(Exception e)
{
StringWriter sw=new StringWriter();
PrintWriter pw=new PrintWriter(sw);
e.printStackTrace(pw);
writeLog("Exception: "+sw.toString());
}
public void writeLog(String mensaje)
{
try
{
	FileWriter fw = new FileWriter(LOGFILENAME, true);
    BufferedWriter bw = new BufferedWriter(fw);
    PrintWriter pw=new PrintWriter(bw);
    
Date dt=new Date(System.currentTimeMillis());
pw.println(dt.toString()+" - "+app+" - "+mensaje);
bw.close();
pw.close();
fw.close();
}
catch (Exception e)
{
}
}

}
