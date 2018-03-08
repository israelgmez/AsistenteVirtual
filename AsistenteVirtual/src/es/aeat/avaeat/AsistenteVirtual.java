package es.aeat.avaeat;

import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.ibm.watson.developer_cloud.conversation.v1.Conversation;
import com.ibm.watson.developer_cloud.conversation.v1.model.InputData;
import com.ibm.watson.developer_cloud.conversation.v1.model.MessageOptions;
import com.ibm.watson.developer_cloud.conversation.v1.model.MessageResponse;

/**
 * Servlet implementation class AsistenteVirtual
 */
@WebServlet("/AsistenteVirtual")
public class AsistenteVirtual extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public AsistenteVirtual() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		response.getWriter().append("Served at: ").append(request.getContextPath());
		Conversation service = new Conversation("{2018-02-16}");
		service.setUsernameAndPassword("{679717c9-d046-4ff2-afe0-944425c49e1a}", "{dWVeIAPW5efh}");
		String workspaceId="19294a4c-f1b1-4de9-b1a0-3f70165b6876";
		
		


		InputData input = new InputData.Builder("Hello").build();

		MessageOptions options = new MessageOptions.Builder(workspaceId)
		  .input(input)
		  .build();

		MessageResponse res = service.message(options).execute();
		
		response.getWriter().print(res);
		response.getWriter().println("Respuesta recibida");

	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		doGet(request, response);
	}

}
