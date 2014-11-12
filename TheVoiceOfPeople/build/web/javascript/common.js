$(document).ready(function(){
	
    $("#world").attr('checked', true);
    $("#sport").attr('checked', true);
    $("#tech").attr('checked', true);
    $("#politic").attr('checked', true);
    $("#other").attr('checked', true);

   

    $("#world_interest").change(function() {
        alert("change");
        if ($("#world_interest").is(':checked')) {
            for(var i=0;i<markerWorld.length;i++)
                markerWorld[i].setMap(map);
        }
        else {
            for(var i=0;i<markerWorld.length;i++)
                markerWorld[i].setMap(null);
        }

    });

	
        
});

$(document).on("click","#profile_settings", function(){ 
    console.log("p");
    window.location.href = "http://localhost:8084/TheVoiceOfPeople/profile.jsp";	//request the welcome.jsp page
    //window.location.href = "http://83.212.97.66:8080/TheVoiceOfPeople/welcome.jsp";
    show_profile_settings();
    
});
$(document).on("click","#logout", function(){
    $.ajax({
        type: "get",
        url: "log_out",
        data: {},
        success : function(data) {
                if(data != "ERROR")  {
                       // window.location.href = "http://localhost:8084/TheVoiceOfPeople/index.jsp";
                       window.location.href = "http://83.212.97.66:8080/TheVoiceOfPeople/index.jsp";
                }
                else
                        alert("There was on error on log out,please try again");
        }
    });

});
       
	
$(document).on("click","#opan_menu_links", function(){
   
    $("#menu_links").slideToggle();

});

$(document).on("change",".category_filter", function(){
    
    $id = this.id;
    
    if ($("#"+$id).is(':checked')) {
        show_posts($id);
        for(var i=0;i<eval($id+"_markers").length;i++)
            eval($id+"_markers")[i].setMap(map);
    }
    else {
        hide_posts($id);
        
        for(var i=0;i<eval($id+"_markers").length;i++)
            eval($id+"_markers")[i].setMap(null);
    }
});


function show_profile_settings() {
	
	var title = [];
	var checked = [];
        var country;
	$.ajax({
            type: "get",
            url: "profile_settings",
            data: {},
            success : function(data) {
                
                $country = $(data).find("location").text();
                country = $country;
                
                $(data).find('interest').each(function(){

                    title.push($(this).find("title").text());  
                    checked.push($(this).find("checked").text());
                    
                });

                $("#user_country").attr("value",$country);
                if (checked[0] == "TRUE") {
                    $('#ch1').attr('checked','checked');
                }
                if (checked[1] == "TRUE") {
                    $('#ch2').attr('checked','checked');
                }
                if (checked[3] == "TRUE") {
                    $('#ch3').attr('checked','checked');
                }
                 if (checked[4] == "TRUE") {
                    $('#ch4').attr('checked','checked');
                }
                
                $("#user_posts_map_div").fadeOut(300);
                $("#followers_div").fadeOut(300);
                $("#followings_div").fadeOut(300);

                $("#user_profile_settings").fadeIn(300);   // show the followings 
                
            }
	});
	
        
	
}
function hide_posts(post_category_id){
    
    $('#row_2_content').find('.'+post_category_id+'').hide();
}
function show_posts(post_category_id){
   
    $('#row_2_content').find('.'+post_category_id+'').show();
}
function like_deslike(ID,action) {
    
   var msg_element = "#msg_"+ID+"";
   var like_element = "#like_"+ID+"";
   var deslike_element = "#deslike_"+ID+"";
   
   $.ajax({
        type: "post",
        url: "like_deslike",
        data: {"ID":ID ,"action":action},
        success : function(data) {
            console.log(data);   
            if (data == "LIKE_ERROR"){
                
                 $(msg_element).fadeOut(300,function(){
                    $(msg_element).text("You already have  liked this post");
                    $(msg_element).fadeIn(300);
                    $(msg_element).fadeOut(2500);
                });
            }else if (data == "DESLIKE_ERROR"){
                 
                 $(msg_element).fadeOut(300,function(){
                    $(msg_element).text("You already have  desliked this post");
                    $(msg_element).fadeIn(300);
                    $(msg_element).fadeOut(2500);
                });
            }else if (data == "SIGN_UP"){
                $(msg_element).fadeOut(300,function(){
                    $(msg_element).text("Please,sign up");
                    $(msg_element).fadeIn(300);
                    $(msg_element).fadeOut(2500);
                });
            }

            else {
                var newdata = data.split(",");
                var likes = parseInt(newdata[0]);
                var deslikes = parseInt(newdata[1]);
                $(like_element).text(likes);
                $(deslike_element).text(deslikes);
            }
        }
    });
}

$(document).on("click",".followBtn_list", function(){
    
    
    $(this).parent().closest(".followers_list_item").remove();
    
    if (!$.trim($("#followers_list").html()).length){
        
        $("#followers_list").fadeOut(300,function(){
            $("#followers_list").empty().append("Still, no followers....");
            $("#followers_list").fadeIn(300);
        });
       
    }
    else if (!$.trim($("#followings_list").html()).length){
        
        $("#followings_list").fadeOut(300,function(){
            $("#followings_list").empty().append("Still, no followings....");
            $("#followings_list").fadeIn(300);
        });
       
    }
});

function facebook_login(url){
    
    
   $.ajax({
        type: "post",
        url: "facebook_login",
        data: {},
        success : function(data) {
            
            if (data == "ERROR") {
                alert("Please,try again later");
            }
            else if (data == "SUCCESSFULLY_LOGIN") {
                //window.location.href = "http://localhost:8084/TheVoiceOfPeople/welcome.jsp";	//request the welcome.jsp page
                window.location.href = "http://83.212.97.66:8080/TheVoiceOfPeople/welcome.jsp";
            }
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) { 
           alert("Status: " + textStatus);
        } 

                
    });
    
}
function follow_unfollow(follow_target,follow_source,page){
    var source = $("#user_id_value_2").text();
    
    
    $.ajax({
        type: "post",
        url: "follow",
        data: {"follow_target":follow_target , "follow_source":follow_source},
        success : function(data) {
            
            if (data == "ERROR"){ 
                alert("There was an error,please try again");
            }else{
                var results = data.split("_");
                if (results[0] == "FOLLOW" ){
                
                    $("#followBtn_list").text("Following");
                    $("#followBtn").text("Following");
                    
                    var followers_value = parseInt($("#followers_number").text()) + 1;
                    $("#followers_number").text(followers_value);
                    
                    $("#window_msg").empty().append("<h2> You succesfully followed "+results[1]+"</h2>");
                    $("#window_msg").fadeIn(1200,function(){
                        $("#window_msg").fadeOut(1200);
                    });
                    
                }
                else if (results[0] == "UNFOLLOW" ){    
                    if(page){
                        $("#followBtn").text("Follow");
                    }
                    if (source == "NO"){
                        var followers_value = parseInt($("#followings_number").text()) - 1;
                        $("#followings_number").text(followers_value);
                    }
                    else{
                        var followers_value = parseInt($("#followers_number").text()) - 1;
                        $("#followers_number").text(followers_value);
                    }
                    $("#window_msg").empty().append("<h2> You succesfully unfollowed "+results[1]+"</h2>");
                    $("#window_msg").fadeIn(1200,function(){
                        $("#window_msg").fadeOut(1200);
                    });
                   
                }
            } 
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) { 
               alert("Status: " + textStatus);
             
        } 
    });
}

function getIcon(category){
	
    if (category === "world" || category==="1") {
         return "img/markers_icons/pin-blue-solid-1.png";
    }
    else if (category === "sports" || category==="3") {
       return "img/markers_icons/pin-green-solid-1.png";
    }
    else if (category === "technology" || category==="4") {
         return "img/markers_icons/pin-magenta-solid-1.png";
    }
    else if (category === "politics" || category==="2") {
         return "img/markers_icons/pin-red-solid-1.png";	
    }
    else   {
        return "img/markers_icons/pin-yellow-solid-1.png";  	
    }
}

function get_category_name(category){
	
    if (category==="1") {
         return "world";
    }
    else if (category==="2") {
       return "politics";
    }
    else if (category==="3") {
         return "sports";
    }
    else if (category==="4") {
         return "technology";	
    }
    else   {
        return "other";  	
    }
}
