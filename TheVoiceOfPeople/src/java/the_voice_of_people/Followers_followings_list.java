package the_voice_of_people;

import java.io.IOException;
import java.io.PrintWriter;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.servlet.RequestDispatcher;

import javax.servlet.ServletException;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

public class Followers_followings_list extends HttpServlet {
	
	
        
        protected void doGet(HttpServletRequest request,HttpServletResponse response) throws IOException,ServletException{
		
		PrintWriter out = response.getWriter();
		response.setContentType("txt/html");
                HttpSession session = request.getSession(true);
                
                String user_id = request.getParameter("source");
                String action = request.getParameter("action");
                
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
                        Statement connect2 = con.createStatement();
                       
                        String querry;
                        
                        String source = "";
                        String target = "";
                        ResultSet  qr1 = null;
                        ResultSet  qr2 = null;
                        
                        out.println("<div class=\"follow_div_content\">");
                            out.println("<span class=\"close_window\">close </span>");
                            if (action.equals("followers"))
                                out.println("<div id='followers_list' class='followers_list'>");
                            else
                                out.println("<div id='followings_list' class='followers_list'>");
                            if (action.equals("followers")){ 
                              
                                if(user_id.equals("NO")){
                                    querry = "select * from follow where target='"+ session.getAttribute("userID") +"'";	
                                }
                                else{
                                    querry = "select * from follow where target='"+ user_id +"'";
                                }
                                
                            }else{
                                if(user_id.equals("NO")){
                                    querry = "select * from follow where source='"+ session.getAttribute("userID") +"'";	
                                }else{
                                    querry = "select * from follow where source='"+ user_id +"'";
                                }
                            }
                            qr1 = connect.executeQuery(querry);
                            
                            String path = "";
                            
                            while(qr1.next()){
                                out.println("<div class='followers_list_item'>");
                                
                                source = qr1.getString("source");
                                target = qr1.getString("target");
                                
                                if (action.equals("followers")){ 
                                    path = source;
                                }else{
                                    path = target;
                                }
                               
                                if (session.getAttribute("userID").equals(path)){
                                    out.println("<a class='' href='profile.jsp'>");
                                }
                                else{
                                    out.println("<a class='' href='profile.jsp?id_user="+path+"'>");
                                }
                                //out.println("<img class='followers_img' src='img/profile_images/"+path+".jpg'>");
                                out.println("<img class='followers_img' src='img/profile_images/profile_image.jpg'>");
                                querry = "select * from user where ID="+ path +"";
                                qr2 = connect2.executeQuery(querry);
                                out.println("<div class='followers_name'>");
                                if (qr2.next()){
                                    out.println(qr2.getString("username"));
                                }
                                out.println("</div>");
                                out.println("</a>");
                                if (action.equals("followings")){
                                    if (user_id.equals("NO")) {
                                       
                                        out.println("<div class='followBtn_list_div'>");
                                            out.println("<button class='button followBtn_list' class='button button2' onclick='follow_unfollow("+target + "," + session.getAttribute("userID")+")'>Following </button> ");
                                        out.println("</div>");
                                    }
                                }
                                
                                
                                
                                out.println("</div>");   // div followers_list_item
                            }
                            out.println("</div>");      // div followers_list
                        out.println("</div>");      // follow_div_content
                      

                }catch (SQLException e) {
                        // TODO Auto-generated catch block
                        e.printStackTrace();
                }

		
		
	}
	
	
        @Override
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException { 
		this.doGet(request,response);
	}
 

}
