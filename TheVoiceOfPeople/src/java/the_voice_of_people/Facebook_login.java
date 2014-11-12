package the_voice_of_people;

import org.json.JSONObject;
import org.json.JSONException;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.IOException;
import java.io.PrintWriter;

import java.net.URL;
import java.net.URLConnection;
import java.net.URLEncoder;
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

public class Facebook_login extends HttpServlet {

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {  
        
        HttpSession session = request.getSession(true);
        PrintWriter out = response.getWriter();
//        response.setContentType("txt/html");
        
        String code = request.getParameter("code");
       
        if (code == null || code.equals("")) {
            RequestDispatcher dispatcher = request.getRequestDispatcher("index.jsp");
            dispatcher.forward(request, response);
        }
        String token = null;
        try {
            String g = "https://graph.facebook.com/oauth/access_token?client_id=351330975026209&redirect_uri=" + URLEncoder.encode("http://83.212.97.66:8080/TheVoiceOfPeople/facebook_login", "UTF-8") + "&client_secret=adadf6bc91d7d1aefc499e9af126ede1&code=" + code;
            URL u = new URL(g);
            URLConnection c = u.openConnection();
            BufferedReader in = new BufferedReader(new InputStreamReader(c.getInputStream()));
            String inputLine;
            StringBuffer b = new StringBuffer();
            while ((inputLine = in.readLine()) != null)
                b.append(inputLine + "\n");            
            in.close();
            token = b.toString();
            if (token.startsWith("{"))
                throw new Exception("error on requesting token: " + token + " with code: " + code);
        } 
        catch (Exception e) {
            // an error occurred, handle this
        }

        String graph = null;
        try {
            String g = "https://graph.facebook.com/me?" + token;
            URL u = new URL(g);
            URLConnection c = u.openConnection();
            BufferedReader in = new BufferedReader(new InputStreamReader(c.getInputStream()));
            String inputLine;
            StringBuffer b = new StringBuffer();
            while ((inputLine = in.readLine()) != null)
                b.append(inputLine + "\n");            
            in.close();
            graph = b.toString();
        } catch (Exception e) {
            // an error occurred, handle this
        }
       
           
        try {
            Class.forName("com.mysql.jdbc.Driver");
        } catch (ClassNotFoundException e) {
            e.printStackTrace();
        }
        try {
            String facebookId;
            String firstName;
            String middleNames;
            String lastName;
            String email;
            String location;
            String user_id;

            JSONObject json = new JSONObject(graph);
            facebookId = json.getString("id");
            firstName = json.getString("first_name");
            lastName = json.getString("last_name").toLowerCase();
            email = json.getString("email");

            Connection con;
            con = DriverManager.getConnection("jdbc:mysql://localhost:3306/3w","root","********");
            Statement connect = con.createStatement();

            String country = ""; 
            String querry;
            querry = "select * from user where email='" + email + "'";
            ResultSet  qr = connect.executeQuery(querry);
            
            if (!qr.next()) {            // there is not any entry at database with this email
                querry = "insert into user(email,password,username,location) values ('" + email + "','" + facebookId + "','" + lastName + "','" + country +"')";
                int usr = connect.executeUpdate(querry);
                if (usr < 0){
                    RequestDispatcher dispatcher = request.getRequestDispatcher("index.jsp");
                    dispatcher.forward(request, response);
                }   
               
            }
            
            String str1 = qr.getString("username");
            String userid = qr.getString("ID");
            
            session = request.getSession(true);
            session.setAttribute("userName", str1 );  
            session.setAttribute("userID",userid);


            Cookie loginCookie = new Cookie("JSESSIONID",session.getId());
            loginCookie.setMaxAge(30*600); 			//setting cookie to expire in 300 min
            response.addCookie(loginCookie);

            RequestDispatcher dispatcher = request.getRequestDispatcher("welcome.jsp");
            dispatcher.forward(request, response);
            
            

        } catch (SQLException e) {
                // TODO Auto-generated catch block
                e.printStackTrace();

        } catch (JSONException e) {
            // an error occurred, handle this
        }

    }
    protected void doGet(HttpServletRequest request,HttpServletResponse response) throws IOException,ServletException{
        this.doPost(request,response);
    }
    
}
