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
        <title>Start a Petition</title>
        <link href="css/intro.css" type="text/css" rel="stylesheet"/>
        <link type="text/css" rel="stylesheet" href="css/animations.css">
        <link href="css/hover.css" type="text/css" rel="stylesheet"/>

        <script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.min.js"></script>
        <script type="text/javascript" src="http://maps.googleapis.com/maps/api/js?sensor=true" type="text/javascript"></script> 
        <script src='http://code.jquery.com/jquery-latest.min.js' type='text/javascript'></script>
        <script type="text/javascript" src="http://google-maps-utility-library-v3.googlecode.com/svn/trunk/markerclusterer/src/markerclusterer.js"></script>

        <script type="text/javascript" src="javascript/home.js" ></script>
        <script type="text/javascript" src="javascript/common.js" ></script>
        <script type="text/javascript" src="http://google-maps-utility-library-v3.googlecode.com/svn/trunk/infobox/src/infobox.js"></script>

    </head>
    <body>
        <jsp:include page="header.jsp"/>

        <div id="petition_middle_bar"> 
            <div id="petition_middle_bar_content">
                <h3> This feature will be available soon..)</h3>
                <img src="img/happy_icon.jpg"/>
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