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

public class Return_markers extends HttpServlet{
	
	@Override
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		
            response.setContentType("text/xml;charset=UTF-8");
	    PrintWriter out = response.getWriter();
            
	    HttpSession session = request.getSession(true);
            String source_page = request.getParameter("source");
          
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
                String post_id=null;
                String querry=null;
                ResultSet qr=null;
            
                if(source_page.equals("index")){
                    querry = "select ID,title,summary,id_user,time_date,longitude,latitude,url,id_categories from post ";
                }
                else{
                    if (source_page.equals("NO")){
                        querry = "select ID,title,summary,id_user,time_date,longitude,latitude,url,id_categories from post where id_user='"+ session.getAttribute("userID") + "'";
                    }
                    else{
                        querry = "select ID,title,summary,id_user,time_date,longitude,latitude,url,id_categories from post where id_user='"+ source_page + "'";
                    }
                }
                
                qr = connect1.executeQuery(querry);
                out.append("<?xml version=\"1.0\" encoding=\"UTF-8\"?>");
                out.append("<markers_description>");
                while(qr.next()){

                    post_id = qr.getString("ID");
                   
                    out.append("<marker>");
                    out.append("<longitude>").append(qr.getString("longitude")).append("</longitude>");
	            out.append("<latitude>").append(qr.getString("latitude")).append("</latitude>");
                    out.append("<id_categories>").append(qr.getString("id_categories")).append("</id_categories>");
                    out.append("<ID>").append(post_id).append("</ID>");
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
