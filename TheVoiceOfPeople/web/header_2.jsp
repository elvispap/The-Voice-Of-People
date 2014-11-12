<%@page import="java.net.URLEncoder" %>
<div id="upper_bar">
    <div id="left_side">
        <a href="index.jsp" class="link_2"> <h1> The Voice Of People </h1> </a>
        <label class="link_2"> Say your idea,your message,share it to the world and find new people  </label>

    </div>
    <div id="login_div">
        <div id="login_btns">
            <div id="login_btns_main">
                <ul>
                    <li >
                        <label class="label" for="session_key_login">Email address</label>
                        <input id="email_login" type="email" size="20" tabindex="1" autofocus="" value="" name="email" required>
                    </li>
                    <li>
                        <label class="label" for="session_password_login">Password</label>
                        <input id="password_login" type="password" size="20" tabindex="2" value="" name="password" required>
                    </li>
                    <li>
                        <button class="button" type="submit" onclick="test_login()"> Log in </button> 

                    </li>
                </ul>
            </div>
            
        </div>
        <div id="messages">
            <div id="error_box"> 
                <span id="error_message"> </span> 
            </div>
            <div id="sign_up_div">
                <label class="link" id="registration" > Don't you have an account?</label>
            </div>
        </div>
    </div>
</div>