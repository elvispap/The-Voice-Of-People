package the_voice_of_people;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.sql.Connection;
import java.util.Date;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.servlet.RequestDispatcher;

public class Delete_post extends HttpServlet{
	
	@Override
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		
		
		String post_id = request.getParameter("post_id");
		
                PrintWriter out = response.getWriter();
                HttpSession session = request.getSession(true);
		
		
		response.setContentType("txt/html");
                
                if (session.getAttribute("userID")==null) {
                    RequestDispatcher dispatcher = request.getRequestDispatcher("index.jsp");
                    dispatcher.forward(request, response);
                }
              
		try {
			
                    Class.forName("com.mysql.jdbc.Driver");
                    Connection con = DriverManager.getConnection("jdbc:mysql://localhost:3306/3w","root","********");
                    Statement connect = con.createStatement();
                   
                    String querry = "delete from post where ID = '"+post_id+"'";
                    int rst = connect.executeUpdate(querry);

                    if (rst > 0){
                        out.write("SUCCESFULLY DELETED");
                        out.close();
                    }
                    else{
                        out.write("ERROR");
                        out.close();
                    }
                   
                  
		} catch (SQLException e) {
                    e.printStackTrace();
                    out.println(e);
                    out.close();
                }
                catch (ClassNotFoundException ex) {
                    Logger.getLogger(Post_to_map.class.getName()).log(Level.SEVERE, null, ex);
                    out.write("CATCHERROR2");
                    out.close();
                }
	    
	}
	
	protected void doGet(HttpServletRequest request,HttpServletResponse response) 
		    throws IOException,ServletException{
		        this.doPost(request,response);
		    }
 
}
