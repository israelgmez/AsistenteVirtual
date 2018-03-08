package es.aeat.avaeat;

import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * Servlet implementation class ListarConfiguracionSoporte
 */
@WebServlet("/ListarConfiguracionSoporte")
public class ListarConfiguracionSoporte extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public ListarConfiguracionSoporte() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		response.getWriter().append("{\"categorias\":[{\"categoria\":\"Consultas Generales\",\"subcategorias\":[]},{\"categoria\":\"Operaciones sobre facturas\",\"subcategorias\":[]},{\"categoria\":\"Errores en el proceso\",\"subcategorias\":[]},{\"categoria\":\"Certificados y Web Services\",\"subcategorias\":[]},{\"categoria\":\"Validar y Cotejar\",\"subcategorias\":[]}],\"categorias_asistente\":\"Consultas Generales;Operaciones sobre facturas;Errores en el proceso;Certificados y Web Services;Validar y Cotejar;\",\"servidor\":\"DOMPRODG.AEAT/AEAT/ES\",\"ruta\":\"mail99/BGCX01284L.nsf\"}");
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		doGet(request, response);
	}

}
