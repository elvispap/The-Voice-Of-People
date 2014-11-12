package the_voice_of_people;

import java.io.IOException;
import java.io.InputStream;
import java.io.PrintWriter;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

public class Profile_settings extends HttpServlet {

	HttpSession session;
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		
		
	PrintWriter out = response.getWriter();
		
    	session = request.getSession(true);

    	String userID=(String) session.getAttribute("userID");
    	System.out.println(userID);
    	response.setContentType("txt/html");
    	if (session.getAttribute("userID")==null) {
    		out.write("ERROR");
		out.close();
    	}
    	
    	
	    String location = request.getParameter("location");
	    InputStream inputStream = null;
		//Part filePart = (Part) request.getPart("photo");
		

//	    if (filePart != null) {
//	        // prints out some information for debugging
//	        System.out.println(((javax.servlet.http.Part) filePart).getName());
//	        System.out.println(((javax.servlet.http.Part) filePart).getSize());
//	        System.out.println(((ServletRequest) filePart).getContentType());
//	        
//	        // obtains input stream of the upload file
//	        inputStream = ((ServletRequest) filePart).getInputStream();
//	     }
	    
		String all_interests= "world,sports,technology,politics,other";
		
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
			String category_id=null;
		    String querry3=null;
		    
			
			String querry1 = "update user set location='" + location + "' where ID='" + userID  +"'";
		    connect.executeUpdate(querry1);
		    
		    String[] interest = all_interests.split(",");
		    
		    for(int i=0;i<interest.length; i++){
		    	
	    		String querry2 = "select ID from categories where title='" + interest[i]  +"'";
			    ResultSet  set_interests = connect.executeQuery(querry2);
			    if (set_interests.next()) {
			    	category_id=set_interests.getString("ID");
			    }
			    
			    querry3="select id_category from user_categories where id_user='" + userID  + "' and id_category='" + category_id  +"'";
			    ResultSet  result = connect.executeQuery(querry3);
			   
			    if(result.next()){
			    	if (request.getParameter(interest[i]).equals("FALSE")) {
			    		querry3 = "delete from user_categories where id_user='" + userID  + "' and id_category='" + category_id  +"'";
				    	connect.executeUpdate(querry3);
			    	}
			    	
			    }
			    else if (request.getParameter(interest[i]).equals("TRUE")){
			    	
			    	querry3 = "insert into user_categories values('"+ userID +"','"+ category_id +"') ";
			    	connect.executeUpdate(querry3);
			    	System.out.println("Point 1");
			    }
			    
	    	}
		    	
	    	out.write("SUCCESSFULLY_UPDATE");		  		    
		    
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	    
	}
	
	protected void doGet(HttpServletRequest request,HttpServletResponse response) throws IOException,ServletException{
		
		PrintWriter out = response.getWriter();
	/*	Cookie[] requestCookies = request.getCookies();
		if(requestCookies != null)
			 System.out.println("There is a cookie");
		else
			System.out.println("no cookies");
        for(Cookie c : requestCookies){
        	
        	System.out.println("Value="+c.getValue());
            
        }*/
		 
	    session = request.getSession(true);
		String userID=(String) session.getAttribute("userID");
		
    	
	    if (session.getAttribute("userID")==null) {
    		out.write("ERROR");
                out.close();
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
			
			Statement connect1 = con.createStatement();
			Statement connect2 = con.createStatement();
			response.setContentType("text/xml;charset=UTF-8");
			
                        out = response.getWriter();

                        ResultSet qr=null;
                        ResultSet qr2=null;
                        out.append("<?xml version=\"1.0\" encoding=\"UTF-8\"?>");
                        out.append("<profile_settings>");

                        String querry = "select location from user where ID='"+userID+"'";
			qr = connect1.executeQuery(querry);
		    
			if(!qr.next())
				out.write("ERROR");
			else{
				out.append("<location>" + qr.getString("location") + "</location>");
				
				querry = "select * from categories";
				qr = connect1.executeQuery(querry);
				
				while(qr.next()){
					out.append("<interest>");
					out.append("<title>"+qr.getString("title")+"</title>");
					out.append("<checked>");
					
					querry="select * from user_categories where id_user='"+userID+"' and id_category='"+qr.getString("ID")+"'";
					qr2 = connect2.executeQuery(querry);
					
					if(qr2.next())
                                            out.append("TRUE");
					else
                                            out.append("FALSE");
					
					out.append("</checked>");
					
					out.append("</interest>");
				}
				
			}
			
			out.append("</profile_settings>");
			
	    }
	    catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		
		    }

}



