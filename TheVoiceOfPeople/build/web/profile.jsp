<%@page import="java.io.File"%>
<%@page import="java.sql.ResultSet"%>
<%@page import="java.sql.Statement"%>
<%@page import="java.sql.Connection"%>
<%@page import="java.sql.DriverManager"%>
<%@page session="true" %>

<%
if (session.getAttribute("userID")==null) {
    response.sendRedirect("preview.jsp");
}
else {
	
    String user_id = request.getParameter("id_user");			//called from another user to see a profile 
//    Object my_id = session.getAttribute("userID");
   
    Class.forName("com.mysql.jdbc.Driver");
    Connection con = DriverManager.getConnection("jdbc:mysql://localhost:3306/3w","root","********");
    Statement connect = con.createStatement();
    Statement connect1 = con.createStatement();
    Statement connect2 = con.createStatement();
    Statement connect3 = con.createStatement();
    Statement connect14 = con.createStatement();
   
    
    String querry;
    String querry1;
    String SAVE_DIR = "profiles_images";
    String appPath = request.getServletContext().getRealPath("");
    String savePath = appPath + File.separator + SAVE_DIR;

  %>
	<!DOCTYPE html>
	<html>
	<head>
	<meta charset="ISO-8859-1">
        <% 
        if(user_id == null || user_id.equals(session.getAttribute("userID")) ) {
                %>
                <title>My Profile</title>
                <%
        }
        else {
                %>
                <title>Profile</title>
                <% 	
        } %>
	
	<link href="css/intro.css" type="text/css" rel="stylesheet"/>
	<link href="css/profile.css" type="text/css" rel="stylesheet"/>
       
        <link type="text/css" rel="stylesheet" href="css/animations.css">
	<link href="css/hover.css" type="text/css" rel="stylesheet"/>
        
        <script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.min.js"></script>
        <script type="text/javascript" src="http://maps.googleapis.com/maps/api/js?sensor=true" type="text/javascript"></script> 
        <script src='http://code.jquery.com/jquery-latest.min.js' type='text/javascript'> </script>
        <script type="text/javascript" src="http://google-maps-utility-library-v3.googlecode.com/svn/trunk/markerclusterer/src/markerclusterer.js"></script>

        <script type="text/javascript" src="javascript/profile.js" ></script>
        <script type="text/javascript" src="javascript/common.js" ></script>

         <script type="text/javascript" src="http://google-maps-utility-library-v3.googlecode.com/svn/trunk/infobox/src/infobox.js"></script>
         <script type="text/javascript" src="javascript/lib/jquery.timeago.js"></script>
        </head>
	<body>
	<div id="content">
                <jsp:include page="header.jsp"/>
		
		<div id="main_content">
			<div id="profile_content">
				<div id="upper_line"> 
				<% 
                                    if(user_id == null || user_id.equals(session.getAttribute("userID")) ) {
                                            %>
                                            <button class="button" id="edit_profile" style="float: right" onclick="show_profile_settings()"> Edit Profile </button>
                                           
                                            <%
                                    }
                                    else {
                                            %>
                                            
                                            <%  
                                                querry = "select * from follow where source='" + session.getAttribute("userID") + "' and target='" + user_id + "'";
                                                ResultSet  qr2 = connect.executeQuery(querry);
                                                if (qr2.next()) {%>
                                                    <button id="followBtn" class="button" style="float: right;" onclick="follow_unfollow('<%=user_id%> ',' <%=session.getAttribute("userID")%>','profile');" > Following </button>
                                              <%}else {%>
                                                    <button id="followBtn" class="button"  style="float: right;" onclick="follow_unfollow('<%=user_id%> ',' <%=session.getAttribute("userID")%>','profile');" > Follow </button> 
                                                    
                                             <%      
                                              } 
                                              
                                    }%>
                                    
                                </div>
				<div id="profile_image">
                                    <img alt="profile_image"  width='130' height='130' src="img/profile_images/profile_image.jpg"/>
                                    <% if(user_id != null) {%>
                                        <span id="user_id_value_2"> <%= user_id %> </span>
                                    <%}else {%>
                                        <span id="user_id_value_2">NO</span>
                                    <%}%>
				</div> 
				<div id="profile_details">
					<div id="profile_details_col1">
                                            <h2 class="text_1" id="username"> 
                                            <%    
                                                if (user_id==null)
                                                    querry = "select username from user where ID='" + session.getAttribute("userID") + "'";
                                                else
                                                    querry = "select username from user where ID='" + user_id + "'";

                                                ResultSet  qr1 = connect.executeQuery(querry);
                                                if (qr1.next())
                                                    out.println(qr1.getString("username"));  


                                            %> 
					    </h2> 
                                            
						<h3 class="text_1" id="country"> 
                                                    <%  
                                                        if (user_id==null)		
                                                            querry = "select location from user where ID='" + session.getAttribute("userID") + "'";
                                                        else
                                                            querry = "select location from user where ID='" + user_id + "'"; 
                                                        ResultSet  qr3 = connect.executeQuery(querry);
                                                        if (qr3.next())
                                                              out.println(qr3.getString("location"));  
                                                    %>  
                                                </h3> 
                                                <div id="fields_of_interest"> 
                                                    
                                                    <% 
                                                    
                                                    if(user_id==null){
                                                        querry = "select id_category from user_categories where id_user='"+ session.getAttribute("userID") + "'";
                                                        querry1 = "select count(*) as count from user_categories where id_user='"+ session.getAttribute("userID") + "'"; 
                                                    }
                                                    else{
                                                        querry = "select id_category from user_categories where id_user='"+ user_id + "'";
                                                        querry1 = "select count(*) as count from user_categories where id_user='"+ user_id + "'"; 
                                                    }
                                                    ResultSet qr14 = connect2.executeQuery(querry);
                                                    if (qr14.next())
                                                        out.println("<label id='fields_of_interest_label'> Fields of interests:  </label>");
                                                    qr14 = connect2.executeQuery(querry);
                                                    out.println("<nav>");
                                                    
                                                    ResultSet qr22 = connect3.executeQuery(querry1);
                                                    int res=0;
                                                    if(qr22.next())
                                                        res = Integer.parseInt(qr22.getString("count"));
                                                    int c = 0;
                                                   
                                                    while(qr14.next()){
                                                        c++;
                                                        querry = "select title from categories where ID='"+ qr14.getString("id_category") + "'";
                                                        ResultSet qr15 = connect14.executeQuery(querry);
                                                        out.println("<a class=''>");
                                                        if (qr15.next())
                                                            out.println(qr15.getString("title"));
                                                        if (c != res)
                                                            out.println(",");
                                                        out.println("</a>");
                                                        
                                                    }
                                                     out.println("</nav>");
                                                    %>
                                                
                                                </div>
						
					</div>
					
					<div id="profile_details_col2">
                                            <div id="main_profile_detalils">
                                                <!-------------- NUMBER OF POSTS ------->
						
                                                <div class="menu_links_element_3">
                                                    <img id="" src="img/post_icon.png" width="18" hright="18"/>
                                                    <span class='up_text' id='number_of_posts'>
                                                        <% 
                                                        if (user_id==null){	    
                                                            querry = "select count(*) as count from post where id_user='"+  session.getAttribute("userID") + "'";
                                                        }else{
                                                            querry = "select count(*) as count from post where id_user='"+  user_id + "'";
                                                        }
                                                        ResultSet  qr4 = connect.executeQuery(querry);
                                                
                                                        if(qr4.next()){ 
                                                            out.println(qr4.getString("count"));
                                                        }
                                                        else {
                                                            out.println("0");
                                                        }
                                                        %>
                                                    </span>
                                                    
                                                    <label class="up_text link">Posts</label>
                                                </div>
                                                <br/>
                                                
						<!-------------- NUMBER OF PETITIONS ------->
<!--                                                <div class="menu_links_element_3">
                                                   
                                                        <img id="" src="img/idea_icon.png" width="18" hright="18"/>
                                                         <span class="up_text">
                                                         0
                                                        </span>
                                                        <label class="up_text link">Petitions</label>
                                                </div>
                                                <br/>-->
						
                                                <!-------------- NUMBER OF FOLLOWERS ------->
                                              
                                                <div class="menu_links_element_3" id="number_of_followers">
                                                    <img id="" src="img/follow_icon.png" width="20" hright="20"/>
                                                    <span class='up_text' id='followers_number'>
                                                        <% 
                                                         if (user_id == null){	    
                                                            querry = "select count(*) as count from follow where target='" + session.getAttribute("userID") + "'";
                                                        }else {
                                                            querry = "select count(*) as count from follow where target='" + user_id + "'";
                                                        }
                                                        ResultSet  qr2 = connect.executeQuery(querry);
                                                        if(qr2.next()){ 
                                                            out.println(qr2.getString("count"));
                                                        }
                                                        else {
                                                            out.println("0");
                                                        }
                                                        %>
                                                    </span>
                                                    <label class="up_text link">Followers</label>
                                                </div>
                                                <br/>
                                                
                                                <br/>
						<!-------------- NUMBER OF FOLLOWINGS ------->
                                               
                                                <div class="menu_links_element_3" id="number_of_followings">
                                                    <img id="" src="img/follow_icon.png" width="20" hright="20"/>
                                                    
                                                    <span class='up_text' id='followings_number'>
                                                        <% 
                                                        if (user_id==null){	    
                                                            querry = "select count(*) as count from follow where source='" + session.getAttribute("userID") + "'";
                                                        }else{
                                                            querry = "select count(*) as count from follow where source='" + user_id + "'";
                                                        }
                                                        ResultSet  qr13 = connect.executeQuery(querry);
                                                        if(qr13.next()){ 
                                                            out.println(qr13.getString("count"));
                                                        }
                                                        else {
                                                            out.println("0");
                                                        }
                                                        %>
                                                    </span>
                                                    <label class="up_text link">Followings</label>
                                                </div>
                                              
                                                <br/>
                                            </div>    
					</div>
				</div>
                               
                                <!----------------------------- USER POSTS -------------------------------->
				<div class='main_profile_content' id="user_posts_map_div"> 
                                    <div id="user_posts"> 
                                            
                                            <% 

                                                String likes=null;
                                                String deslikes=null;
                                                String id_post=null;
                                                if (user_id == null)
                                                     querry = "select ID,title,summary,time_date,url,longitude,latitude from post where id_user='"+  session.getAttribute("userID") + "'order by time_date desc"; 
                                                else
                                                     querry = "select ID,title,summary,time_date,url,longitude,latitude from post where id_user='"+ user_id + "'order by time_date desc"; 
                                                ResultSet qr5 = connect1.executeQuery(querry);

                                                while(qr5.next()){

                                                    id_post = qr5.getString("ID");

                                                    querry="select likes from post where ID='"+ id_post+"'";	 //likes
                                                    ResultSet qr6 = connect.executeQuery(querry);
                                                    if(qr6.next()){
                                                            likes=qr6.getString("likes");
                                                    }
                                                    String querry6="select count(*) as count1 from like_unlike where id_post='"+ id_post + "' and action=1";	 //deslikes
                                                    ResultSet qr7 = connect.executeQuery(querry6);
                                                    if(qr7.next()){
                                                            deslikes=qr7.getString("count1");

                                                    }
                                                    out.println("<div class='' id="+qr5.getString("ID")+ ">");
                                                        out.println("<a href='#' class='post' id="+qr5.getString("longitude")+ ","+qr5.getString("latitude")+">");
                                                        out.println("<div class='post_title_btn_div'>");
                                                            out.println("<div class='user_post_title'>");
                                                                out.println(qr5.getString("title"));
                                                            out.println("</div>");
                                                            if (user_id == null || user_id.equals(session.getAttribute("userID"))){
                                                                out.println("<div class='del_button'>");
                                                                    out.println("<img  class='delete_post_btn' src='img/del_button.png' id="+qr5.getString("ID")+">");
                                                                out.println("</div>");
                                                                
                                                            }
                                                        out.println("</div>");
                                                        out.println("<br/>");
                                                        
                                                        
                                                        out.println("<div class='link user_post_summary'>");
                                                        out.println(qr5.getString("summary"));
                                                        out.println("</div>");
                                                        out.println("</a>");
                                                        out.println("<br/>");
                                                        
                                                        out.println("<div class='time_icon'>");
                                                        out.println("<img class='post_icon_2' src='img/time_icon.png' />");
                                                        out.println("<span class='post_time'>"+ qr5.getString("time_date") +"</span>"); 
                                                        out.println("</div>");
                                                        out.println("<br/>");
                                                        out.println(likes);
                                                        out.println("<img src='img/like_2.png' height='21' width='21'/>");
                                                        out.println(deslikes);
                                                        out.println("<img src='img/deslike_2.png' height='21' width='21'/>");
                                                        String url = qr5.getString("url");
                                                        if (!url.equals("none")){
                                                             out.println("<a class='link profile_post_url' href=/"+url+">");
                                                             out.println(url);
                                                             out.println("</a>");
                                                             out.println("<br/>");
                                                        }
                                                        out.println("<hr>");
                                                    out.println("</div>");

                                               }
                                    %>
                                           
                                    </div>
                                    <div id="profile_map"> </div>
                                </div>
                                <!-----------------------------USER PROFILE SETTINGS-------------------------------->
				<div class='window_div main_profile_content' id="user_profile_settings" >
                                    <div id="profile_settings"> 
                                        <span class="close_window">close </span>
                                        <div id="row1">
                                            <h3>Photo profile:</h3>
                                            <form action="image_uploader" enctype="multipart/form-data" method="POST" onclick="return test_image_val()">
                                                <input id="image_profile_input" type="file" name="file" size="10"/>
                                                <button type="Submit" class="button"> Change </button>
                                            </form>

                                        </div>
                                        <hr>
                                        <div id="row2"> 
                                            <h3>Country:</h3> <input type="text" size="40" id="user_country"/> 
                                            <hr>	
                                        </div>
                                        <div id="row3">
                                            <h3>Interests:</h3> 
                                            <div id="interests1">
                                                <input type="checkbox" name="" value="World" id="ch1" />World<br/>
                                                <input type="checkbox" name="" value="Politics" id="ch2" />Politics<br/> 
                                                <input type="checkbox" name="" value="Technology" id="ch3" />Technology<br/> 
                                                <input type="checkbox" name="" value="Sports" id="ch4" />Sports<br/>
                                                <input type="checkbox" name="" value="Other" id="ch5" />Other<br/>  
                                            </div>
                                        </div>

                                        <button id="submit" onclick="save_settings()" class="button"> Save settings </button>
                                    </div>
                                </div>
                                 <!-----------------------------USER FOLLOWERS DIV-------------------------------->
                                <div class='main_profile_content' id="followers_div"></div> 
                                 <!-----------------------------USER FOLLOWINGS DIV-------------------------------->
                                <div class='main_profile_content' id="following_div"></div>
                                                        
    </div>
   
    <div  class="modal_window" id="window_msg" >
    </div>
</div>
<jsp:include page="footer.jsp"/>
</div>

</body>
 
</html>

<% 
} 
%>
