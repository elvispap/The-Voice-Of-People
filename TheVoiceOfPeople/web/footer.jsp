<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<%
if (session.getAttribute("userID")==null) {
    response.sendRedirect("index.jsp");
}
else { %>    
<div id="footer">
    <span style="font-size:11px">©</span>
    2014 Designed and Developed by
    <a class="company_logo" href="http://codenozee.com/">Codenozee</a>
</div>

<% }%>