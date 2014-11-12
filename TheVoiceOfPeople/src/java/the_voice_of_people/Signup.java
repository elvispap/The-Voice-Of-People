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
import javax.servlet.RequestDispatcher;


public class Signup extends HttpServlet{
	
	@Override
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		
            String username = request.getParameter("username");
            String email = request.getParameter("email");
            String password = request.getParameter("password");
            String country = request.getParameter("country");
            HttpSession session = request.getSession(true);
		
            if (session.getAttribute("userID")==null) {
                RequestDispatcher dispatcher = request.getRequestDispatcher("index.jsp");
                dispatcher.forward(request, response);
            }
            try {
                    Class.forName("com.mysql.jdbc.Driver");
            } catch (ClassNotFoundException e) {
                    // TODO Auto-generated catch block
                    e.printStackTrace();
            }
	    try {
                    Connection con;
                    con = DriverManager.getConnection("jdbc:mysql://localhost:3306/3w","root","197056");
                    Statement connect = con.createStatement();

                    String querry1 = "select * from user where email='" + email + "'";
		    ResultSet  qr = connect.executeQuery(querry1);
			
		    response.setContentType("application/javascript");    
		    PrintWriter out = response.getWriter();
		    
		    if (!qr.next()) {  		// there is not any entry at database with this email
		    	String querry2="insert into user(email,password,username,location) values ('" + email + "','" + password + "','" + username + "','" + country +"')";
		    	int usr = connect.executeUpdate(querry2);
		    	if (usr>0)
                            out.write("SUCCESSFULLY_REGISTERED");
                        else {
                            out.write("ERROR");
                            out.close();
                        }
		   }
		    else {
		    	
		    	out.write("ALREADY_REGISTERED");
		    	out.close();
		    }
		    
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	    
	}
	
	protected void doGet(HttpServletRequest request,HttpServletResponse response) 
		    throws IOException,ServletException{
		        this.doPost(request,response);
		    }
 
}

