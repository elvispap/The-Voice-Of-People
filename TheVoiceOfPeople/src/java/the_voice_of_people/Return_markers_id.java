package the_voice_of_people;

import java.io.IOException;
import java.io.PrintWriter;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
//import com.mysql.jdbc.ResultSetMetaData;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.sql.Connection;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;
import javax.servlet.RequestDispatcher;

public class Return_markers_id extends HttpServlet{
	
	@Override
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		
            response.setContentType("text/xml;charset=UTF-8");
	    PrintWriter out = response.getWriter();
            
	    HttpSession session = request.getSession(true);
            String marker_id = request.getParameter("marker_id");
          
            try {
		Class.forName("com.mysql.jdbc.Driver");
            } catch (ClassNotFoundException e) {
                // TODO} Auto-generated catch blockl
                e.printStackTrace();
            }
	    try {
                Connection con;
                con = DriverManager.getConnection("jdbc:mysql://localhost:3306/3w","root","********");

                Statement connect1 = con.createStatement();
                Statement connect2 = con.createStatement();
                Statement connect3 = con.createStatement();
                Statement connect4 = con.createStatement();
			

                String post_id=null;
                String querry=null;
                String user_id=null;
                String likes=null;
                String deslikes=null;
                String username=null;
                
                ResultSet qr=null;
                ResultSet qr2=null;
                ResultSet qr3=null;
                ResultSet qr4=null;
		
                querry = "select ID,title,summary,id_user,time_date,url from post where ID='"+ marker_id + "'";
                  
                qr = connect1.executeQuery(querry);
                out.append("<?xml version=\"1.0\" encoding=\"UTF-8\"?>");
                out.append("<markers_description>");
                while(qr.next()){

                    post_id = qr.getString("ID");
                    user_id = qr.getString("id_user");

                    querry="select count(*) as count from like_unlike where id_post="+ post_id + " and action=0";	 //likes
                    qr2 = connect2.executeQuery(querry);
                    if(qr2.next()){
                        likes=qr2.getString("count");
                    }

                    querry="select count(*) as count from like_unlike where id_post="+  post_id + " and action=1";	//deslikes
                    qr3 = connect3.executeQuery(querry);
                    if(qr3.next()){
                        deslikes=qr3.getString("count");
                    }
                    querry="select username from user where ID='" + user_id + "'";	//the username
                    qr4 = connect4.executeQuery(querry);
                    if(qr4.next()){
                        username=qr4.getString("username");
                    }
                 
                    out.append("<marker>");
	            out.append("<title>").append(qr.getString("title")).append("</title>");
	            out.append("<summary>").append(qr.getString("summary")).append("</summary>");
	            out.append("<time_date>").append(qr.getString("time_date")).append("</time_date>");
                    out.append("<url>").append(qr.getString("url")).append("</url>");
                    out.append("<id_user>").append(qr.getString("id_user")).append("</id_user>");
	            out.append("<username>").append(username).append("</username>");
	            out.append("<ID>").append(post_id).append("</ID>");
	            out.append("<likes>").append(likes).append("</likes>");
	            out.append("<deslikes>").append(deslikes).append("</deslikes>");
	            out.append("</marker>");
	            
	    	}
	    	out.append("</markers_description>");
		    
            } catch (SQLException e) {
                    // TODO Auto-generated catch block
                    e.printStackTrace();
            }
		
	    
	}
	
	protected void doPost(HttpServletRequest request,HttpServletResponse response) 
		    throws IOException,ServletException{
		        this.doGet(request,response);
		    }
 
}
