package the_voice_of_people;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.ServletException;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import java.sql.Date;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.sql.Connection;
import java.text.SimpleDateFormat;
import javax.servlet.RequestDispatcher;


public class Login extends HttpServlet{
	
	@Override
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		
	
            String e_mail = request.getParameter("email");
            String pass = request.getParameter("password");
            HttpSession session = request.getSession(true);

            response.setContentType("txt/html");
	    PrintWriter out = response.getWriter();
	    
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
			
			String querry = "select * from user where email='" + e_mail+"'";
			ResultSet  qr = connect.executeQuery(querry);

		    if (!qr.next()) {  		// there is not any entry at database with this email
		    	out.write("ACCOUNT_DOESNT_EXIST");
		    	out.close();
		    	
			}
		    else {
		    	
		        querry = "select * from user where email='" + e_mail + "' and password='"+ pass +"'";
		    	qr = connect.executeQuery(querry);
		    	if (!qr.next()) {  		// there is not any entry at database with this email

                            out.write("WRONG_PASSWORD");
                            out.close();

                        }
		    	else
		    	{
		    			
                            String str1 = qr.getString("username");
                            String userid = qr.getString("ID");

                            session = request.getSession(true);
                            session.setAttribute("userName", str1 );  
                            session.setAttribute("userID",userid);


                            Cookie loginCookie = new Cookie("JSESSIONID",session.getId());
                            loginCookie.setMaxAge(30*600); 			//setting cookie to expire in 300 min
                            response.addCookie(loginCookie);

                            out.write("SUCCESSFULLY_LOGIN");
                            out.close();
		    	}
		    	
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

