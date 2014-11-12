<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
    
<%
if (session.getAttribute("userID")==null) {
	response.sendRedirect("index.jsp");
}
else { %>

        <div id="upper_bar_2">
            <div id="main_bar_left"> 
                <a href="" class="link_2"> <h2> The Voice Of People </h2> </a>
            </div>
            <div id="main_bar_right">
                
                <div id="main_buttons">
                    <div id="menu">
                        <div id="profile_name_icon">  
                            <a href="profile.jsp"><img src="img/profile_images/profile_image.jpg" width="20" hright="20"/></a>
                            <a class="link" href="profile.jsp"><span> <%= session.getAttribute("userName") %></span></a>
                            <img id="opan_menu_links" src="img/down_arrow.png" width="18" hright="18"/>
                        </div>

                        <div id="menu_links">

                            <div class="menu_links_element">
                                <img id="" src="img/profile_icon.png" width="16" hright="16"/>
                                <a class="link" href="profile.jsp">Profile</a>
                            </div>
                            <div class="menu_links_element">
                                <img id="" src="img/setting_icon.png" width="16" hright="16"/>
                                <a class="link" id="profile_settings" href="#">Settings</a>
                            </div>
                            <div class="menu_links_element">
                                <img id="" src="img/logout_icon.png" width="15" hright="15"/>
                                <span class="link" id="logout"> Log out </span>
                            </div>
                        </div>
                    </div>
                </div>
                <div id="post_button"> 
                    <div class="menu_links_element_4">
                       <img id="" src="img/home_icon.png" width="20" hright="20"/>
                       <a class="link" href="welcome.jsp">Home</a>
                   </div>
                   <div class="menu_links_element_4">
                       <img id="" src="img/post_icon.png" width="18" hright="18"/>
                       <a id="post" class="link" >Post</a>
                   </div>
<!--                   <div class="menu_links_element_4">
                       <img id="" src="img/idea_icon.png" width="18" hright="18"/>
                       <a class="link" href="petition.jsp">Start a petition</a>
                   </div>-->
               </div>
            </div>
        </div>
      
		
<% }%>		