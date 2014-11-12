<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
         pageEncoding="ISO-8859-1"%>
<%
    if (session.getAttribute("userID") == null) {
        response.sendRedirect("index.jsp");
    } else {
%>
<!DOCTYPE html>
<html>
    <head>
        <meta charset="ISO-8859-1">
        <title>Welcome</title>
        
        <link href="css/intro.css" type="text/css" rel="stylesheet"/>
        <link type="text/css" rel="stylesheet" href="css/animations.css">
        <link href="css/hover.css" type="text/css" rel="stylesheet"/>
        
        
        
        <script type="text/javascript" src="http://maps.googleapis.com/maps/api/js?sensor=true" type="text/javascript"></script> 
        <script src='http://code.jquery.com/jquery-latest.min.js' type='text/javascript'></script>
        <script type="text/javascript" src="http://google-maps-utility-library-v3.googlecode.com/svn/trunk/markerclusterer/src/markerclusterer.js"></script>
        <script src="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=places"></script>
        
        <script type="text/javascript" src="javascript/common.js" ></script>
        <script type="text/javascript" src="javascript/home.js" ></script>
        
        <script type="text/javascript" src="http://google-maps-utility-library-v3.googlecode.com/svn/trunk/infobox/src/infobox.js"></script>
        
        <script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.min.js"></script>
        <script type="text/javascript" src="javascript/lib/jquery.timeago.js"></script>
    
    </head>
    <body>
        <jsp:include page="header.jsp"/>

        <div id="middle_bar"> 
            <jsp:include page="map_container.jsp"/>
            <div id="marker_content"> </div>
            
            <div id="post_div">
                <div class="close_window" id="close_post_div">close </div>
                <div id="post_form_content">
                    <input class='post_input' type="text" name="post_title" id="post_title"value="" placeholder="Give a title of your post" size="35" required> <br/>
                    <div class='form_input'>
                        <label for="post_category">Select a category</label> 
                        <select name="post_category" id="post_category" >
                            <option value="World" selected>World</option>
                            <option value="Sports">Sports</option>
                            <option value="Technology">Technology</option>
                            <option value="Politics">Politics</option>
                            <option value="Other">Other</option>
                        </select> <br/>
                        <!--                <form id="form1">
                                            <input id="post_image" type="file" name="post_image" size="10"/>
                                            <button id="uploadBtn" type="Submit" class="button" onClick="performAjaxSubmit()"> Upload </button>
                                        </form>-->
                    </div>
                    <div class='form_input'>
                        <input class='post_input' id="post_address" type="text" value="" placeholder="Where you want to post ?" size="35" required> 
                        <input class="button" id="post_address_btn" type="button" value="go there">
                    </div>
                    <div class='form_input'>
                        <label> Or click <button id="show_location">here</button> to track you location </label>
                    </div>

                    <div class='form_input hidden_elem'><input class='post_input' type="number" name="post_location1" id="post_location1" value="" placeholder="Latitude" size="35" > </div>
                    <div class='form_input hidden_elem'><input class='post_input' type="number" name="post_location2" id="post_location2" value="" placeholder="Longitude" size="35" > </div>
                    <div class='form_input'><input class='post_input' type="text" name="post_url" id="post_url" value="" placeholder="give a url (optional)" size="35" > </div>
                    <div class='form_input'> <textarea class="post_input" name="summary" id="summary"  placeholder="Give a summary..." rows="3" maxlength="570" required> </textarea> </div>
                    <br/> 
                    <div style="text-align:center;"> 
                        <input class="button" type="submit" value="Post it" onclick="post_to_map()">
                        <input class="button" type="reset" value="Clear" onclick="reset()" >
                    </div>
                </div>

            </div>

            <jsp:include page="footer.jsp"/>
        </div>

    </div>

</body>
</html>
<%
    }
%>