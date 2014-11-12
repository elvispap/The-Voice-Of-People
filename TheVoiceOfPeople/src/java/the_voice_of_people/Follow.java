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


public class Follow extends HttpServlet{
	
	@Override
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		
	
            String follow_target = request.getParameter("follow_target");
            String follow_source = request.getParameter("follow_source");
            HttpSession session = request.getSession(true);
		
            if (session.getAttribute("userID")==null) {
                RequestDispatcher dispatcher = request.getRequestDispatcher("index.jsp");
                dispatcher.forward(request, response);
            }
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
                    con = DriverManager.getConnection("jdbc:mysql://localhost:3306/3w","root","********");
                    Statement connect = con.createStatement();
                    Statement connect1 = con.createStatement();
                    Statement connect2 = con.createStatement();
                    Statement connect3 = con.createStatement();
                    Statement connect4 = con.createStatement();
                    String querry;
                    
                    querry = "select * from follow where source='" + follow_source+"' and  target='" + follow_target+"'";
                    ResultSet  qr = connect.executeQuery(querry);

                    if (!qr.next()) {   // FOLLOW

                        querry = "insert into follow(source,target) values ('"+ follow_source + "','" + follow_target + "')";
                        int rst = connect1.executeUpdate(querry);
                        if(rst > 0){
                            querry = "select * from user where ID = '" + follow_target +"'";
                            ResultSet  qr1 = connect3.executeQuery(querry);
                            
                            if (qr1.next()){
                                String username = qr1.getString("username");
                                out.write("FOLLOW_"+username);
                                out.close();
                             }
                        }
                        else{
                            out.write("ERROR");
                            out.close();
                        }
                    }
                    else {    // UNFOLLOW
                        querry = "delete from follow where source='" + follow_source+"' and  target='" + follow_target+"'";
                        int rst = connect2.executeUpdate(querry);
                        if(rst > 0){
                            querry = "select * from user where ID = '" + follow_target +"'";
                            ResultSet qr2 = connect4.executeQuery(querry);
                           
                            if (qr2.next()){
                                String username = qr2.getString("username");
                                out.write("UNFOLLOW_"+username);
                                out.close();
                            }
                        }
                        else{
                            out.write("ERROR");
                            out.close();
                        }
                    }
                   
		    
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			out.write("CATCHERROR");
                        out.close();
		}
	    
	}
	
	protected void doGet(HttpServletRequest request,HttpServletResponse response) 
		    throws IOException,ServletException{
		        this.doPost(request,response);
		    }
 
}

