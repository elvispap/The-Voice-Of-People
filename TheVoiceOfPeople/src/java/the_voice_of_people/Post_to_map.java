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

public class Post_to_map extends HttpServlet{
	
	@Override
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		
		
		String post_title = request.getParameter("post_title");
		String post_category = request.getParameter("post_category");
		String post_location1 = request.getParameter("post_location1");
		String post_location2 = request.getParameter("post_location2");
		String post_url = request.getParameter("post_url");
		String summary = request.getParameter("summary");
		
                PrintWriter out = response.getWriter();
                HttpSession session = request.getSession(true);
		DateFormat dateFormat = new SimpleDateFormat("yyyy/MM/dd H:mm");
		Date date = new Date();
		String category_2 = "";
		response.setContentType("txt/html");
                
                if (session.getAttribute("userID") == null) {
                    RequestDispatcher dispatcher = request.getRequestDispatcher("index.jsp");
                    dispatcher.forward(request, response);
                }
                else if (post_location1 == null || post_location2 == null ) {
                    out.write("THERE WAS AN ERROR");
                    out.close();
		}
		String querry = "";
		if (post_url.equals("")){
			post_url = "none";
		}
                if (summary.equals("")){
			summary = "none";
		}
		
		try {
			
                    Class.forName("com.mysql.jdbc.Driver");
                    String category = post_category.toLowerCase();
                    Connection con = DriverManager.getConnection("jdbc:mysql://localhost:3306/3w","root","197056");
                    Statement connect = con.createStatement();
                    Statement connect2 = con.createStatement();

                    String querry1 = "select * from categories where title='" + category + "'";
                    ResultSet  qr = connect.executeQuery(querry1);

                    if (qr.next()){

                       category_2 = qr.getString("ID");

                    } 
                    int likes = 0;
                    String querry2 = "insert into post(title,id_categories,url,summary,id_user,time_date,longitude,latitude,likes) values ('" + post_title + "','" + 
                                                    category_2 + "','" + post_url + "','" + summary + "','" + session.getAttribute("userID") + "','" + dateFormat.format(date) + "','" + post_location1 + "','" + post_location2 + "','" + likes + "')";
                    int usr = connect.executeUpdate(querry2);

                        if (usr>0){  			// the post saved successfully in database  
                            querry = "SELECT `AUTO_INCREMENT` FROM  INFORMATION_SCHEMA.TABLES WHERE TABLE_SCHEMA = '3w' AND TABLE_NAME='post'";
                            ResultSet qr1 = connect.executeQuery(querry);
                            if(qr1.next()){

                                querry ="select * from user where ID='" + session.getAttribute("userID") + "'";
                                ResultSet  qr2 = connect2.executeQuery(querry);

                                if(qr2.next()){
                                    //qr2 = connect2.executeQuery(querry);
                                    out.write(qr1.getString("auto_increment") + "," + qr2.getString("username"));		// return back the id and the user name of the last post of table post
                                    out.close(); 
                                }
                            }
                    }
                    else {

                        out.write("ERROR");
                        out.close();
                    }
		} catch (SQLException e) {
                    e.printStackTrace();
                    out.write("CATCHERROR1");
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