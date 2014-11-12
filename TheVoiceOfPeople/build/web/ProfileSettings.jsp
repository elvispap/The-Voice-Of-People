<%@page import="java.sql.DriverManager"%>
<%@page import="java.sql.ResultSet"%>
<%@page import="java.sql.Statement"%>
<%@page import="java.sql.Connection"%>

<%
if (session.getAttribute("userID")==null) {
	response.sendRedirect("index.jsp");
}
else {
	
	
	Class.forName("com.mysql.jdbc.Driver");
    Connection con = DriverManager.getConnection("jdbc:mysql://localhost:3306/3w","root","********");
    Statement connect = con.createStatement();
  
    
 
    
  %>
	<!DOCTYPE html>
	<html>
	<head>
	<meta charset="ISO-8859-1">
	<title>Profile Settings</title>
	<link href="css/intro.css" type="text/css" rel="stylesheet"/>
	<link href="css/profile.css" type="text/css" rel="stylesheet"/>
	
	<script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.min.js"></script>
	<script type="text/javascript" src="http://maps.googleapis.com/maps/api/js?sensor=false" type="text/javascript"></script> 
	<script src='http://code.jquery.com/jquery-latest.min.js' type='text/javascript'> </script>
	<script type="text/javascript" src="javascript/home.js" ></script>
	<script type="text/javascript" src="http://google-maps-utility-library-v3.googlecode.com/svn/trunk/infobox/src/infobox.js"></script>
	
	</head>
	<body>
	<div id="content">
		<div id="upper_bar">
			<div id="main_bar_left"> 
				<a href="" class="link"> <h2> Welcome to The World of Sharing </h2> </a>
			</div>
			<div id="main_bar_right">
				
				<div id="search_bar">
					<input id="search"type="text" placeholder="Here you can search..." size="25" > 
				</div>
				<div id="post_button"> 
					<a href="#" id="post" class="link"> Post to map </a>
				</div>
				<div id="main_buttons">
					<a href="welcome.jsp" class="link"> Home |</a>
					<a href="profile.jsp" class="link"> My profile |</a> 
					<a id="logout" class="link" > Logout </a>
				</div>
			</div>
		</div>
		<hr >
		<div id="main_content">
			<button id="change_photo"> Photo Profile </button>
			<div id="chnage_location"> </div>
		</div>
		
	</div>
	
	
	
	
	
	</body>
	</html>
<% 
} 
%>
