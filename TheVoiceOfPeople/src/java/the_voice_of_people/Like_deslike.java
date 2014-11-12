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


public class Like_deslike extends HttpServlet{
	
	@Override
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
            
            response.setContentType("txt/html");
            PrintWriter out = response.getWriter();

            HttpSession session = request.getSession(true);

             if (session.getAttribute("userID")==null) {
                 out.write("SIGN_UP");
                 out.close();
             }
            String ID = request.getParameter("ID");
            String action = request.getParameter("action");

            try {

                Class.forName("com.mysql.jdbc.Driver");
                Connection con = DriverManager.getConnection("jdbc:mysql://localhost:3306/3w","root","********");

                Statement connect1 = con.createStatement();
                Statement connect2 = con.createStatement();
                Statement connect3 = con.createStatement();
                Statement connect4 = con.createStatement();
                Statement connect5 = con.createStatement();
                Statement connect6 = con.createStatement();
                ResultSet qr1 = null;
                ResultSet qr2 = null;
                ResultSet qr3 = null;
                ResultSet qr4 = null;

                Object value = request.getSession().getAttribute("userID");     // user_id
                String querry;
                if (action.equals("like")){
                    querry = "select * from like_unlike where id_user='" + value + "' and id_post='" + ID + "' and action='0'"  ;
                    qr1 = connect1.executeQuery(querry);
                    if(qr1.next()){     // the user have like it
                        out.write("LIKE_ERROR");
                        out.close();
                    }
                    else {      // the user may have deslike it
                        querry = "select * from like_unlike where id_user='" + value + "' and id_post='" + ID + "' and action='1'"  ;
                        qr2 = connect2.executeQuery(querry);
                        if(qr2.next()){     // the user have deslike it
                            querry = "update like_unlike set action = 0 where id_user='" + value + "' and id_post='" + ID + "'";
                            connect3.executeUpdate(querry);
                        }
                        else{
                            querry = "insert into like_unlike(id_user,id_post,action) values ('"+ value + "','" + ID + "',"+ 0 +")";
                            connect3.executeUpdate(querry);
                            
                        }
                        querry = "update post set likes = likes+1 where id='"+ID+"'";
                        connect4.executeUpdate(querry);
                        
                        querry = "select count(*) as count from like_unlike where id_post="+  ID + " and action = 1";	//deslikes
                        qr3 = connect5.executeQuery(querry);
                        String deslikes = "";
                        if(qr3.next())
                            deslikes = qr3.getString("count");
                       
                        querry = "select count(*) as count from like_unlike where id_post="+  ID + " and action = 0";	//likes
                        qr4 = connect6.executeQuery(querry);
                        String likes = "";
                        if(qr4.next())
                            likes = qr4.getString("count");
                        
                        out.write(likes+","+deslikes);
                        out.close();
                    }


                }
                else  {	//deslike
                    querry = "select * from like_unlike where id_user='" + value + "' and id_post='" + ID + "' and action='1'"  ;
                    qr1 = connect1.executeQuery(querry);
                    if(qr1.next()){     // the user have deslike it
                        out.write("DESLIKE_ERROR");
                        out.close();
                    }
                    else {      // the user may have like it
                        querry = "select * from like_unlike where id_user='" + value + "' and id_post='" + ID + "' and action='0'"  ;
                        qr2 = connect2.executeQuery(querry);
                        if(qr2.next()){     // the user have like it
                            querry = "update like_unlike set action = 1 where id_user='" + value + "' and id_post='" + ID + "'";
                            connect3.executeUpdate(querry);
                        }
                        else{
                            querry = "insert into like_unlike(id_user,id_post,action) values ('"+ value + "','" + ID + "',"+ 1 +")";
                            connect3.executeUpdate(querry);
                            
                        }
                        querry = "update post set likes = likes-1 where id='"+ID+"'";
                        connect4.executeUpdate(querry);
                        
                        querry = "select count(*) as count from like_unlike where id_post="+  ID + " and action = 1";	//deslikes
                        qr3 = connect5.executeQuery(querry);
                        String deslikes = "";
                        if(qr3.next())
                            deslikes = qr3.getString("count");
                       
                        querry = "select count(*) as count from like_unlike where id_post="+  ID + " and action = 0";	//likes
                        qr4 = connect6.executeQuery(querry);
                        String likes = "";
                        if(qr4.next())
                            likes = qr4.getString("count");
                        
                        out.write(likes+","+deslikes);
                        out.close();
                    }
                }
            } catch (SQLException e) {
                    // TODO Auto-generated catch block
                    e.printStackTrace();
            } catch (ClassNotFoundException e) {
                    // TODO Auto-generated catch block
                    e.printStackTrace();
            }
	    
	}
	
	protected void doGet(HttpServletRequest request,HttpServletResponse response) 
		    throws IOException,ServletException{
		        this.doPost(request,response);
		    }
 
}

