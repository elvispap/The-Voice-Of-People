<%@page import="java.net.URLEncoder"%>
<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">

<html>
<head>
<meta charset="ISO-8859-1">
<title>Welcome</title>


<link href="css/intro.css" type="text/css" rel="stylesheet"/>


<script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.min.js"></script>
<script type="text/javascript" src="http://maps.googleapis.com/maps/api/js?sensor=false" type="text/javascript"> </script> 
<script src="http://code.jquery.com/jquery-latest.min.js" type="text/javascript"></script>
<script type="text/javascript" src="https://www.google.com/jsapi"></script>
<script type="text/javascript" src="javascript/home.js" ></script>

<script type="text/javascript" src="javascript/common.js" ></script>

</head>
<body>
<div id="content_index">
    
    <jsp:include page="header_2.jsp"/>
    
    <div id="middle_bar">
        <div id="main_message_div">
            <div id="main_message_div_content" >
                <h3> Welcome visitor! This is Voice Of People, a place where you can express your ideas, influence, and create communities of people around the world </h3>
                <h3> Please click <a href="preview.jsp" id="preview_button" class="link_2"> here </a> to see a preview of what you can do at the Voice Of People</h3>
            </div>
           
        </div>
       
        <div id="sign_up_form">
            <div class="close_window" id="close_sign_up_form">close </div>
            <form action="register.jsp" method="post" id="contact-form" onsubmit="return test_password()" >
                <div class="sign_up_title">
                    <h3> The Voice Of People</h3>
                </div>
                <div id="social_media_logins">
                    
                    <div> 
                        <% 
                        String facebook_login_url = "http://www.facebook.com/dialog/oauth?client_id=351330975026209&redirect_uri=" + URLEncoder.encode("http://83.212.97.66:8080/TheVoiceOfPeople/facebook_login") + "&scope=email";
                        %>
                        <a href="<%= facebook_login_url %>">
                            <img alt="facebook login" src="img/facebook-login-button.png"/>
                        </a>
                    </div>
                </div> <br>
                <label> OR </label> <br><br>
                <label> Create an account </label>
                <div class="form_inputs_div">
                    <div class="form_input">
                        <input type="text"  class="post_input" name="username" id="username"  placeholder="Your username" size="30" required>
                    </div>
                    <div class="form_input">
                        <input type="email"  class="post_input" name="email" id="email" placeholder="Your email" size="30" required>
                    </div>
                    <div class="form_input">
                        <input type="password" class="post_input" name="password" id="password" placeholder="Password" size="30" required>
                     </div>
                    <div class="form_input">
                        <input type="password" class="post_input" name="password_confirm" id="password_confirm" placeholder="Repeat password" size="30" >
                    </div> <br/> 
                    <div >
                        <label  for="country">Your Country</label>
                        <select name="country" id="country">
                            <option value="greece">Greece</option>
                            <option value="germany">Germany</option>
                            <option value="italy">Italy</option>
                            <option value="france">France</option>
                            <option value="netherlands">Netherlands</option>
                            <option value="belgium">Belgium</option>
                            <option value="england">England</option>
                            <option value="ireland">Ireland</option>
                            <option value="spain">Spain</option>
                            <option value="portugal">Portugal</option>
                            <option value="sweeden">Sweeden</option>
                            <option value="finland">Finland</option>
                            <option value="other">Other</option>
                        </select>
                    </div> <br/>
                    <div class="form-actions">
                        <button type="submit" class="button"> Sign up </button>
                        <button type="reset" class="button"> Reset </button>
                    </div>
                </div>
            </form>
            <div id="privacy">
                <p > * By clicking Sign up, you agree to the The Voice Of People's User Agreement, Privacy Policy and Cookie Policy. </p>
            </div>	
            <div id="has_account">
            </div>

        </div>

        
    </div>
    <div id="footer">
        <span style="font-size:12px">©</span>
        2014 Designed and Developed by <a class="company_logo" href="http://codenozee.com/">Codenozee</a>
    </div>   
</div>

</body>

</html>

