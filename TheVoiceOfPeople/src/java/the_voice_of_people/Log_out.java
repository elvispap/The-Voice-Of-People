package the_voice_of_people;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

public class Log_out extends HttpServlet {
	
	HttpSession session;
	
	protected void doGet(HttpServletRequest request,HttpServletResponse response) throws IOException,ServletException{
		
		PrintWriter out = response.getWriter();
		response.setContentType("txt/html");
		session = request.getSession(true);
		
		if (session.getAttribute("userID")==null) {
                    out.write("ERROR");
                    out.close();
                }
		
		session.setAttribute("userID", null);
		session.invalidate();
		out.write("SUCCESSFULLY_LOGOUT");
		out.close();
	}
	
	
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException { 
		this.doGet(request,response);
	}
 

}
