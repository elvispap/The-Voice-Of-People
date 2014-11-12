package the_voice_of_people;

import java.io.IOException;
import java.io.PrintWriter;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import javax.servlet.RequestDispatcher;

import javax.servlet.ServletException;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

public class Profile extends HttpServlet{
	
	
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		this.doGet(request,response);
	}
	
	protected void doGet(HttpServletRequest request,HttpServletResponse response) throws IOException,ServletException{
		
		
		PrintWriter out = response.getWriter();
		
		HttpSession session = request.getSession(true);
		String userID=(String) session.getAttribute("userID");
		
    
	    
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
		System.out.println("point 1");
	    try {
			Connection con;
			con = DriverManager.getConnection("jdbc:mysql://localhost:3306/3w","root","197056");
			
			Statement connect1 = con.createStatement();
			Statement connect2 = con.createStatement();
			Statement connect3 = con.createStatement();
			
			response.setContentType("text/xml;charset=UTF-8");
			
			ResultSet qr1=null;
		    ResultSet qr2=null;
		    
		    String querry=null;
		    String likes=null;
			String deslikes=null;
			String id_post=null;
		    
		    out.append("<?xml version=\"1.0\" encoding=\"UTF-8\"?>");
		    System.out.println("point 2");
		    out.append("<profile>");
		    querry="select count(*) as count from post where id_user='"+  session.getAttribute("userID") + "'";
			qr1 = connect1.executeQuery(querry);
			System.out.println("point 3");
			if(qr1.next())
				out.append("<posts>" + qr1.getString("count") + "</posts>");
			   
		    querry = "select username,location from user where ID='"+userID+"'";
			qr1 = connect1.executeQuery(querry);
			System.out.println("point 4");
			if(!qr1.next()) {
				out.write("ERROR");
				out.close();
			}
			else{
				out.append("<username>" + qr1.getString("username") + "</username>");
				out.append("<location>" + qr1.getString("location") + "</location>");
				
				querry="select ID,title,summary,time_date,longitude,latitude from post where id_user='" +  session.getAttribute("userID") + "'";
				qr1 = connect1.executeQuery(querry);
				   
			    while(qr1.next()){
			       System.out.println("point 5");
				   id_post=qr1.getString("ID");
				   
				   querry="select count(*) as count from like_unlike where id_post="+ id_post  + " and like_deslike=0";	 //likes
				   qr2 = connect2.executeQuery(querry);
				   
				   if(qr2.next())
					   likes=qr2.getString("count");
					   
				   querry="select count(*) as count1 from like_unlike where id_post="+ id_post + " and like_deslike=1";	 //deslikes
				   qr2 = connect2.executeQuery(querry);
				   
				   if(qr2.next())
					   deslikes=qr2.getString("count1");
				   
				   out.append("<title>" + qr1.getString("title") + "</title>");
				   out.append("<summary>" + qr1.getString("summary") + "</summary>");
				   out.append("<longitude>" + qr1.getString("longitude") + "</longitude>");
				   out.append("<latitude>" + qr1.getString("latitude") + "</latitude>");
				   out.append("<time_date>" + qr1.getString("time_date") + "</time_date>");
				   out.append("<likes>" + likes + "</likes>");
				   out.append("<deslikes>" + deslikes + "</deslikes>");
				   
				}
				
		}
		out.append("</profile>");
		
			
	    }
	    catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		
	}
}
