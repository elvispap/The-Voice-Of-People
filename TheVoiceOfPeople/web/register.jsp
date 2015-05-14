<%@page import="java.sql.DriverManager"%>
<%@page import="java.sql.ResultSet"%>
<%@page import="java.sql.Statement"%>
<%@page import="java.sql.Connection"%>

<%

    String username = request.getParameter("username");
    String e_mail = request.getParameter("email");
    String pass_1 = request.getParameter("password");
    String pass_2 = request.getParameter("password_confirm");
    String country = request.getParameter("country");

    if (username == null || e_mail == null || pass_1 == null ) {
        response.sendRedirect("index.jsp");
    }

    Class.forName("com.mysql.jdbc.Driver");
    Connection con = DriverManager.getConnection("jdbc:mysql://localhost:3306/3w","root","*****");
    Statement connect = con.createStatement();
    String querry1 = "select * from user where email='" + e_mail + "'";
    ResultSet  qr = connect.executeQuery(querry1);
    
%>
        <html>
        <head>
            <meta charset="ISO-8859-1">
            <title>Register to The Voice Of People</title>
            <link href="css/register.css" type="text/css" rel="stylesheet"/>
        </head>
        <body >
            
             <div id="upper_bar">
                <span> <h1> The Voice Of People </h1> </span>
                <p class=""> Say your idea,your message,share it to the world and find new people  </p>
            </div>
            <div id="main_body">
                <%  if (!qr.next()) {  		// the user haven't a entry in database (here I check it through email)
                        String querry2="insert into user(email,password,username,location) values ('" + e_mail + "','" + pass_1 + "','" + username + "','" + country +"')";
                        int usr = connect.executeUpdate(querry2);
                %>
                    <h2> Welcome to The Voice of People </h2> <br/>
                    <p >Congratulation <%= username %>! Registration was successful.Now you can <a class="link_2" href="index.jsp"> log in. </a></p>
                <%}else { %> 
                    <h2 >Registration</h2> <br/>
                    <p >You already have an account with email : <%= e_mail %>. Please go <a class="link_2" href=index.jsp> back </a> and then log in! </p>
                <% } %>
            </div>
            <jsp:include page="footer_2.jsp"/>

        </body>
        </html>
