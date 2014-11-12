 <div id="main_col_map_container"> 
            <div id="left_main_col">
                <div id="row_1" >
                    <div id="main_menu_hide_col">
                        <div id="main_menu">
                           <nav> 
                               <div class="menu_links_element_2">
                                   <img id="" src="img/top_icon.png" width="16" hright="16"/>
                                   <a class="link" id="top_posts">Top</a>
                               </div>
                               <div class="menu_links_element_2">
                                   <img id="" src="img/time_icon.png" width="16" hright="16"/>
                                   <a class="link" id="recent_posts">Latest</a>
                               </div>
                               <div class="menu_links_element_2">
                                   <img id="" src="img/follow_icon.png" width="22" hright="22"/>
                                   <a class="up_text_2 link" id="follow_posts" >Following</a>
                               </div>
                               <%
                               if (session.getAttribute("userID") == null) {%>
                                   <span id="user_session_id">NO</span>
                               <%}else{%>
                                    <span id="user_session_id"><%=session.getAttribute("userID")%> </span>
                               <%}%>
                           </nav>
                       </div>
                       <div class="" id="hide_main_col">
                           <img class="pointer show_hide_btn" src="img/left_arrow.png" alt="hide content" height="24" width="24">
                       </div>
                    </div>
                    <div id="interests"> 
                        <input type="checkbox" class="category_filter" name="world" value="world" id="world">world
                        <input type="checkbox" class="category_filter" name="sports" value="sports" id="sports">sports
                        <input type="checkbox" class="category_filter" name="politics" value="politics" id="politics">politics
                        <input type="checkbox" class="category_filter" name="technology" value="technology" id="technology">technology
                        <input type="checkbox" class="category_filter" name="other" value="other" id="other">other
                    </div>
                </div> 
                <div id="row_2_content"> 
                </div>

                <div id="row_2_top_posts">

                </div>
                <div id="row_2_recent_posts">

                </div>
               <div id="row_2_following_posts">

                </div>
            </div>
            <div class="" id="show_main_col"> 
                <img class="pointer show_hide_btn" src="img/right_arrow.png" alt="show content" height="24" width="24"> 
            </div> 
            <input id="search_by_location_input" class="controls" type="text" placeholder="Search for a place.." size="25"  results>                
            <div id="map_canvas">
            </div>
        </div>