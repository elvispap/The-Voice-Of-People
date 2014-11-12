var geocoder;
var map;
var all_markers = {};
var out=null;
var likes=0;
var deslikes=0;

var world_markers = [];
var worldInt ;
var show_w=false;

var sports_markers = [];
var sportsInt = false;
var show_s=false;

var technology_markers = [];
var techInt = false;
var show_t=false;

var politics_markers = [];
var politicsInt = false;
var show_p=false;

var other_markers = [];
var otherInt = false;
var show_o=false;

var info_window = new Array();

$(document).ready(function(){
	
        google.maps.event.addDomListener(window, 'load', initialize);
	show_top_posts();
       
        google.maps.event.addListenerOnce(map, 'idle', function(){
        
        });

	
        
});





$(document).on("click","#post_address_btn", function(){
   
    if ($("#post_address").val() == ""){
       $("#post_address").css ({"border":"red solid 1px"});
       setTimeout(function(){
           $("#post_address").css ({"border":"grey solid 1px"});
       },2000);
    }else
        codeAddress($("#post_address").val());
		
})



$(document).on("click","#registration", function(){
    
    $("#sign_up_form").fadeIn(900);
		
});
$(document).on("click","#close_sign_up_form", function(){
    
    $("#sign_up_form").fadeOut(900);
		
});
$(document).on("click","#close_post_div", function(){
    
    $("#post_div").fadeOut(900);
	
});

$(document).on("click","#post", function(){
    $("#post_div").fadeIn(900);
		
});
	
$(document).on("click","#view_post", function(){
    
    $("#recent_posts").fadeIn(10);

});



$(document).on("click","#followers_number", function(){
    if ($(".followers_list").html()==''){
        console.log("no html");
    }
    else{
       $("#user_posts_map_div").fadeOut(800);
       $("#followers_div").fadeIn(800);
    }
});

$(document).on("click","#following_number", function(){
    if ($(".followers_list").html()==''){
       console.log("no html");
    }
    else {
        $("#user_posts").fadeOut(800);
        $("#following_div").fadeIn(800);
    }
});

$(document).on("click","#close_followers_div", function(){
    
    $("#user_posts").fadeIn(800);
    $("#followers_div").fadeOut(800);

});

$(document).on("click","#close_following_div", function(){
    
        $("#user_posts").fadeIn(800);
        $("#following_div").fadeOut(800);
   

});

$(document).on("click","#hide_main_col", function(){

    $("#map_canvas").animate({
        width: '100%', 
        height: 800, 
        marginLeft:0, 
        marginTop: 0
    }, resized);

    var currCenter = map.getCenter();
    //google.maps.event.trigger(map, 'resize');
    map.setCenter(currCenter);

    $("#hide_main_col").hide();
    $("#show_main_col").fadeIn(1100);
       
});

$(document).on("click","#show_main_col", function(){
        
    $("#map_canvas").animate({
        width:'75%'},1300);
  
    $("#show_main_col").hide();
    $("#hide_main_col").fadeIn(3500);
});

$(document).on("click",".nav_button", function(){
    
    $id = this.id;
    get_content($id);
});

$(document).on("click","#recent_posts", function(){
    show_recent_posts()
  
//    setInterval(function(){show_recent_posts()},10000);		// call show_recent_posts function every 10sec
});

$(document).on("click","#top_posts", function(){
   
    show_top_posts();    
   
});

$(document).on("click","#follow_posts", function(){
    
    show_following_posts();    
   
});

$(document).on("mouseover","#followBtn", function(){
    
    if($("#followBTN").text() == "Following"){
        $("#followBTN").text("Unfollow");
    }
  
});


$(document).on("click",".post", function(){
    var position = $(this).attr('id');
    var coords = position.split(",");

    map.setZoom(14);
    map.setCenter(new google.maps.LatLng(coords[0],coords[1]));
    $id = $(this).attr("id");
    google.maps.event.trigger(all_markers[$id], 'click');
});

$(document).on("click","#show_location", function(){
   
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else { 
        alert("Geolocation is not supported by this browser.");
    }
   
});

/* function performAjaxSubmit() {
    
        
        var sampleFile = document.getElementById("post_image").files[0];

        var formdata = new FormData();

        

        formdata.append("sampleFile", sampleFile);

        var xhr = new XMLHttpRequest();       

        xhr.open("POST","/FileUploader", true);

        xhr.send(formdata);

        xhr.onload = function(e) {

            if (this.status == 200) {

               alert(this.responseText);

            }

        };                    

}   */

 


function showPosition(position) {
   
    map.setCenter(new google.maps.LatLng(position.coords.latitude,position.coords.longitude));
    $("#post_location1").val(position.coords.latitude);
    $("#post_location2").val(position.coords.longitude);
    get_country_name(position.coords.latitude,position.coords.longitude);
  
    
   
}
function get_country_name(latitude,longitude) {
    
    geocoder = new google.maps.Geocoder();
    var latlng = new google.maps.LatLng(latitude, longitude);
    //alert("Else loop" + latlng);
    geocoder.geocode({'latLng': latlng}, function(results, status) {
     
       
         if (status == google.maps.GeocoderStatus.OK)
          {
                 if (results[0])
                 {
                     var add= results[0].formatted_address ;
                     var  value=add.split(",");

                     count=value.length;
                     country=value[count-1];
                     state=value[count-2];
                     city=value[count-3];
                     $("#post_address").val(state +","+country);
                    


                 }
                 else 
                 {
           alert("address not found");
                 }
         }
          else
         {
         //document.getElementById("location").innerHTML="Geocoder failed due to: " + status;
         //alert("Geocoder failed due to: " + status);
         }
     });
  }

function performAjaxSubmit() {
        
        var sampleFile = document.getElementById("sampleFile").files[0];

        var formdata = new FormData();
        
        formdata.append("sampleFile", sampleFile);	        		

        var xhr = new XMLHttpRequest();

        xhr.open("POST","/TheVoiceOfPeople/FileUploader", true);
        xhr.send(formdata);

        xhr.onload = function(e) {
                if (this.status == 200) {
                   alert(this.responseText);
                }
        };	        		
    }

function show_reg_form() {
    $("#sign_up_form").fadeIn(10);
}
function showlocation() {
   // One-shot position request.
   navigator.geolocation.getCurrentPosition(success,fail,{timeout: 10000});
}
 
function success(position) {
    
    document.getElementById('post_location1').innerHTML = position.coords.latitude;
    document.getElementById('post_location2').innerHTML = position.coords.longitude;
}
function fail(error) {
    console.log('error: '+ error.message); 
}
function show_following_posts() {
        
        var session_id = $("#user_session_id").text();
        
        if (session_id == "NO"){
            $("#row_2_content").fadeOut(300,function(){
                $("#row_2_content").empty().append("Please,sign up..");
                $("#row_2_content").fadeIn(300);
            });
        }
        else{
            $.ajax({
            type: "get",
            url: "following_posts",
            data: {},
            success : function(data) {
                
                var result = data.getElementsByTagName("results");

                if ((result[0].childNodes[0].nodeValue) == "yes" ) {
                    
                    title = data.getElementsByTagName("title");
                    summary = data.getElementsByTagName("summary");
                    time_date = data.getElementsByTagName("time_date");
                    longitude = data.getElementsByTagName("longitude");
                    latitude = data.getElementsByTagName("latitude");
                    url = data.getElementsByTagName("url");
                    id_categories = data.getElementsByTagName("id_categories");
                    id_user = data.getElementsByTagName("id_user");
                    username = data.getElementsByTagName("username");
                    ID = data.getElementsByTagName("ID");
                    likes = data.getElementsByTagName("likes");
                    deslikes = data.getElementsByTagName("deslikes");
                   
                    for (var i=0;i<title.length;i++) {
                        var new_time_date = $.timeago(time_date[i].childNodes[0].nodeValue);
                        var category = get_category_name(id_categories[i].childNodes[0].nodeValue);
                        
                        $content = "<div class='"+category+"' id='"+ID[i].childNodes[0].nodeValue+"'>"+
                                        "<div class=''>"+
                                            "<a href='#' class='post link' id="+longitude[i].childNodes[0].nodeValue+","+latitude[i].childNodes[0].nodeValue+">"+ 
                                            "<label class='link_2'>"+title[i].childNodes[0].nodeValue + "</label><br>"+ 
                                            "<p>"+summary[i].childNodes[0].nodeValue + "</p>"+
                                            "</a>"+
                                        "</div>"+
                                        "<br> <div class='name_image'>"+
                                        //"<img src='img/profile_images/"+id_user[i].childNodes[0].nodeValue+".jpg' height='20' width='20'/>"+
                                        "<img src='img/profile_images/profile_image.jpg' height='20' width='20'/>"+
                                        "<a href='profile.jsp?id_user="+ 
                                        id_user[i].childNodes[0].nodeValue+"' class='link'> "+  username[i].childNodes[0].nodeValue + "</a></div>" + 
                                        "<div class='index_likes_deslikes'>"+
                                            "<label class='score'>score:</label><span>"+likes[i].childNodes[0].nodeValue+"</span>"+
                                            "<div class='index_time_icon'><img class='post_icon' src='img/time_icon.png'/><span>" + new_time_date +"</span></div><br>"+
                                       "</div><hr>"+
                                    "</div>";
                        $("#row_2_following_posts").append($content);
                        
                        $("#row_2_content").fadeOut(300,function(){
                            $("#row_2_content").empty().append($("#row_2_following_posts").html());
                            $("#row_2_content").fadeIn(300);
                        });
                    }
                    
                    
                    
                    }
                    else
                        console.log("no results");

                },
                error: function(XMLHttpRequest, textStatus, errorThrown) { 
                    console.log("Status: " + textStatus);
                    $("#row_2_content").fadeOut(300,function(){
                        $("#row_2_content").empty().append("You are not following anyone yet...");
                        $("#row_2_content").fadeIn(300);
                    });
                } 
            });
	
        }
}
function show_recent_posts() {
    
    var session_id = $("#user_session_id").text();

    if (session_id == "NO"){
        $("#row_2_content").fadeOut(300,function(){
            $("#row_2_content").empty().append("Please,sign up..");
            $("#row_2_content").fadeIn(300);
        });
    }
    else{
        var date = new Date();
        var current_time = date.getFullYear() + "-" + date.getMonth() + "-" + date.getDate() + " " +  date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();

        $.ajax({
            type: "get",
            url: "recent_posts",
            data: {},
            success : function(data) {
                console.log(data);
                var result = data.getElementsByTagName("results");

                if ((result[0].childNodes[0].nodeValue) === "yes" ) {

                    title = data.getElementsByTagName("title");
                    summary = data.getElementsByTagName("summary");
                    time_date = data.getElementsByTagName("time_date");
                    longitude = data.getElementsByTagName("longitude");
                    latitude = data.getElementsByTagName("latitude");
                    url = data.getElementsByTagName("url");
                    id_categories = data.getElementsByTagName("id_categories");
                    id_user = data.getElementsByTagName("id_user");
                    username = data.getElementsByTagName("username");
                    ID = data.getElementsByTagName("ID");
                    likes = data.getElementsByTagName("likes");
                    deslikes = data.getElementsByTagName("deslikes");


                    for (var i=0;i<title.length;i++) {
                        var time_date = $.timeago(time_date[i].childNodes[0].nodeValue);
                        var value = time_date[0].childNodes[0].nodeValue.split(" ");
                        var time = value[1];	
                        var category = get_category_name(id_categories[i].childNodes[0].nodeValue);
                        $content = "<div class='"+category+"' id='"+ID[i].childNodes[0].nodeValue+"'>"+
                                        "<div class=''>"+
                                            "<a href='#' class='post link' id="+longitude[i].childNodes[0].nodeValue+","+latitude[i].childNodes[0].nodeValue+">"+ 
                                            "<label class='link_2'>"+title[i].childNodes[0].nodeValue + "</label><br>"+ 
                                            "<p>"+summary[i].childNodes[0].nodeValue + "</p>"+
                                            "</a>"+
                                        "</div>"+
                                        "<br> <div class='name_image'>"+
                                        //"<img src='img/profile_images/"+id_user[i].childNodes[0].nodeValue+".jpg' height='20' width='20'/>"+
                                        "<img src='img/profile_images/profile_image.jpg' height='20' width='20'/>"+
                                        "<a href='profile.jsp?id_user="+ 
                                        id_user[i].childNodes[0].nodeValue+"' class='link'> "+  username[i].childNodes[0].nodeValue + "</a></div>" + 
                                       "<div class='index_likes_deslikes'>"+
                                            "<label class='score'>score:</label><span>"+likes[i].childNodes[0].nodeValue+"</span>"+
                                            "<div class='index_time_icon'><img class='post_icon' src='img/time_icon.png'/><span>" + time_date +"</span></div><br>"+
                                       "</div><hr>"+
                                    "</div>";

                        $("#row_2_recent_posts").append ($content);
                        //$("#row_2_content").append($("#row_2_recent_posts").html());
                        $("#row_2_content").fadeOut(300,function(){
                            $("#row_2_content").empty().append($("#row_2_recent_posts").html());
                            $("#row_2_content").fadeIn(300);
                        });
                    }


                }
                else
                    alert("no results");

            },
            error: function(XMLHttpRequest, textStatus, errorThrown) { 
                console.log("Status: " + textStatus); 
            } 
        });

    }
}

function show_top_posts() {
	
        $.ajax({
            type: "get",
            url: "top_posts",
            data: {},
            success : function(data) {
                
                var result = data.getElementsByTagName("results");

                if ((result[0].childNodes[0].nodeValue) == "yes" ) {
                    
                    title = data.getElementsByTagName("title");
                    summary = data.getElementsByTagName("summary");
                    time_date = data.getElementsByTagName("time_date");
                    longitude = data.getElementsByTagName("longitude");
                    latitude = data.getElementsByTagName("latitude");
                    url = data.getElementsByTagName("url");
                    id_categories = data.getElementsByTagName("id_categories");
                    id_user = data.getElementsByTagName("id_user");
                    username = data.getElementsByTagName("username");
                    ID = data.getElementsByTagName("ID");
                    likes = data.getElementsByTagName("likes");
                    deslikes = data.getElementsByTagName("deslikes");
                   
                    for (var i=0;i<title.length;i++) {
                        $time_date = $.timeago(time_date[i].childNodes[0].nodeValue);
                        var category = get_category_name(id_categories[i].childNodes[0].nodeValue);
                        $content = "<div class='"+category+"' id='"+ID[i].childNodes[0].nodeValue+"'>"+
                                        "<div class=''>"+
                                            "<a href='#' class='post link' id="+longitude[i].childNodes[0].nodeValue+","+latitude[i].childNodes[0].nodeValue+">"+ 
                                            "<label class='link_2'>"+title[i].childNodes[0].nodeValue + "</label><br>"+ 
                                            "<p>"+summary[i].childNodes[0].nodeValue + "</p>"+
                                            "</a>"+
                                        "</div>"+
                                        "<br><div class='name_image'>"+
                                        //"<img src='img/profile_images/"+id_user[i].childNodes[0].nodeValue+".jpg' height='20' width='20'/>"+ 
                                        "<img src='img/profile_images/profile_image.jpg' height='20' width='20'/>"+
                                        "<a href='profile.jsp?id_user="+id_user[i].childNodes[0].nodeValue+"' class='link'> "+  username[i].childNodes[0].nodeValue + "</a></div>" + 
                                       
                                        "<div class='index_likes_deslikes'>"+
                                            "<label class='score'>score:</label><span>"+likes[i].childNodes[0].nodeValue+"</span>"+
                                            "<div class='index_time_icon'>"+
                                                "<img class='post_icon' src='img/time_icon.png'/>"+
                                                "<span>" + $time_date +"\</span>"+
                                            "</div><br>"+
                                       "</div><hr>"+
                                    "</div>";
                        $("#row_2_top_posts").append($content);
                        
                        $("#row_2_content").fadeOut(300,function(){
                            $("#row_2_content").empty().append($("#row_2_top_posts").html());
                            $("#row_2_content").fadeIn(300);
                        });
                    }
                }
                else
                    console.log("no results");

            },
            error: function(XMLHttpRequest, textStatus, errorThrown) { 
                console.log("Status: " + textStatus); 
            } 
	});
	

}



function reset() {
	
	
        $("#address").val("");
	$("#post_location1").val("");
	$("#post_location2").val("");
	
	$("#post_url").val("");
	$("#summary").val("");
}

function test_password() {
	
	var pass1=$("#password").val();
	var pass2=$("#password_confirm").val();
	
	if(pass1 != pass2) {
		
            $("#password_confirm").css ({"border":"red solid 2px"});
            return false;
	}
	else
            return true;
	
}

function test_login() {
	
	var user_email=$("#email_login").val();
	var user_password=$("#password_login").val();
	$.ajax({
		type: "post",
		url: "login",
		data: {"email":user_email , "password":user_password },
		success : function(data) {
		    var msg_element = document.getElementById('error_message');	
                    if (data == "ACCOUNT_DOESNT_EXIST") {
                        $(msg_element).fadeOut(300,function(){
                            $(msg_element).text("Account doesn't exist");
                            $(msg_element).fadeIn(150);
                            $(msg_element).fadeOut(3500);
                        });
                       
                    }
                    if (data=="WRONG_PASSWORD"){
                        $(msg_element).fadeOut(300,function(){
                            $(msg_element).text("Wrong password");
                            $(msg_element).fadeIn(150);
                            $(msg_element).fadeOut(3500);
                        });

                    }
                    else if (data == "SUCCESSFULLY_LOGIN") {
                        //window.location.href = "http://localhost:8084/TheVoiceOfPeople/welcome.jsp";	//request the welcome.jsp page
                        window.location.href = "http://83.212.97.66:8080/TheVoiceOfPeople/welcome.jsp";
                    }
		}
	});
	
}

function show_profile(postID){
	
        $.ajax({
		type: "post",
		url: "show_profile",
		data: {"postID":postID},
		success : function(data) {
			
		},
	    error: function(XMLHttpRequest, textStatus, errorThrown) { 
                alert("Status: " + textStatus); 
            } 
	});
	
	
}


function post_to_map() {

        var user_id = $("#user_id_value").text();
        var title = $("#post_title").val();
	var category = $("#post_category").val();
	var location1 = $("#post_location1").val();
	var location2 = $("#post_location2").val();
	var url="";
	
	
	url = $("#post_url").val();
	
	var summary = $("#summary").val();
	var category_1 = category.toLowerCase();

	if (title == "" ) {
            $("#post_title").css ({"border":"red solid 2px"});
            return false;
	}
	else if (location1 == "") {
            $("#post_location1").css ({"border":"red solid 2px"});
            return false;
	}
	else if (location2 == "") {
            $("#post_location2").css ({"border":"red solid 2px"});
            return false;
	}
	
	$.ajax({
            type: "post",
            url: "post_to_map",
            data: {"post_title":title , "post_category":category , "post_location1":location1 ,"post_location2":location2 , "post_url": url , "summary":summary},
            success : function(data) {
                console.log(data);
                
                if (data != "ERROR") {
                    var date = new Date();
                    var current_time = date.getFullYear() + "-" + date.getMonth() + "-" + date.getDate() + " " +  date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
                    var time_date = $.timeago(current_time);
                    var user_name_and_id = data.split(",");
                    var marker_id = parseInt(user_name_and_id[0]);
                    var username = user_name_and_id[1];
                    var like = "like";
                    var deslike = "deslike";
                    var ID = marker_id-1;
                    var myLatlng = new google.maps.LatLng(location1,location2);
                    var infowindow = new google.maps.InfoWindow({
                   
                        content : "<div class='marker_content' id=" + ID + "> <b>"+title+"</b>" + "<br/>"+"<hr>"+"<div class='post_sumarry'>"+summary+"</div>" +
                            "<div class='likes_deslikes_message'>"+
                                "<div class='like_deslike_btns'>"+
                                    "<button class='like' onclick='like_deslike(\"" + ID + "\", \""+like +"\")'>"+
                                        "<img src='img/like_2.png' height='21' width='21'/> "+
                                    "</button>"+
                                    "<span class='like_span' id="+"like_"+ID +">" + 0 + " </span>"+
                                    "<button  class='deslike' onclick='like_deslike(\"" + ID + "\", \""+deslike +"\")'>"+
                                        "<img src='img/deslike_2.png' height='21' width='21' />"+
                                    "</button>"+
                                    "<span class='deslike_span' id="+"deslike_"+ID +">" + 0 + "</span>"+
                                "</div>"+
                                "<span class='sign_up_message' id="+"msg_"+ID + "> </span>"+
                             "</div><br/>"+
                            "<div class='post_details'>"+
                                "<div class='name_image'>"+
                                    //"<img src='img/profile_images/"+user_id+".jpg' height='20' width='20'/>"+
                                    "<img src='img/profile_images/profile_image.jpg' height='20' width='20'/>"+
                                    "<a href='profile.jsp' class='link user_name' >" + username + "</a>"+
                                "</div>"+
                                "<div class='time_icon'><img class='post_icon' src='img/time_icon.png' /> <span class='post_time'>"+ time_date +"</span></div><br/>"+
                            "</div>"+
                        "</div>"

                    });
                    var marker_icon = getIcon(category_1);
                    var marker = new google.maps.Marker({
                        position: myLatlng,
                        map: map,
                        id: ID,
                        title: title,
                        visible:true,
                        animation: google.maps.Animation.DROP,
                        icon: marker_icon
                    });

                    google.maps.event.addListener(marker, 'click', function() {
                        infowindow.open(map,marker);

                    });

                }
                else {
                    alert("there was an error,please try again");
                }
            $("#post_div").fadeOut(900);
            }
	});
	
	
}


function codeAddress(place_to_go) {
	
    var location=[];
    geocoder.geocode( { 'address': place_to_go}, function(results, status) {
        if (status == google.maps.GeocoderStatus.OK) {

            map.setCenter(results[0].geometry.location);
            location[0]=results[0].geometry.location.lat();
            location[1]=results[0].geometry.location.lng();
            $("#post_location1").val(location[0]);
            $("#post_location2").val(location[1]);

        } else {
            alert('Geocode was not successful for the following reason: ' + status);
        }
                
    });
}

function showMarkers(data) {
	
	var markers = [];
        var longitude = data.getElementsByTagName("longitude");
        var latitude = data.getElementsByTagName("latitude");
        var id_categories = data.getElementsByTagName("id_categories");
        var ID = data.getElementsByTagName("ID");
    
        for (var i=0;i<longitude.length;i++) {
            var marker_icon = getIcon(id_categories[i].childNodes[0].nodeValue) ;
            var myLatlng=new google.maps.LatLng(longitude[i].childNodes[0].nodeValue,latitude[i].childNodes[0].nodeValue);
            //icon = getIcon(id_categories[i].childNodes[0].nodeValue);
            var marker = new google.maps.Marker({
                position: myLatlng,
                map: map,
                id: ID[i].childNodes[0].nodeValue,
                visible:true,
                animation: google.maps.Animation.DROP,
                icon: marker_icon
            });

            if (id_categories[i].childNodes[0].nodeValue == 1)
                world_markers.push(marker);
            else if (id_categories[i].childNodes[0].nodeValue == 2)
                politics_markers.push(marker);
            else if(id_categories[i].childNodes[0].nodeValue == 3)
                sports_markers.push(marker);
            else if(id_categories[i].childNodes[0].nodeValue == 4)
                technology_markers.push(marker);	
            else
                other_markers.push(marker);
            var marker_id = longitude[i].childNodes[0].nodeValue +","+latitude[i].childNodes[0].nodeValue;
            all_markers[marker_id] = marker;
            setContent(marker);
            markers.push(marker);
        }
        var mcOptions = {gridSize: 50, maxZoom: 15};
        var markerCluster = new MarkerClusterer(map, markers,mcOptions);

}
function setContent(marker){
    
    google.maps.event.addListener(marker, 'click', function() {

        $.ajax({
            url:"return_markers_id",
            type: "get",
            data: {"marker_id":marker.id},
            success:function(data){
                
                var title = data.getElementsByTagName("title");
                var summary = data.getElementsByTagName("summary");
                var time_date = data.getElementsByTagName("time_date");
                var url = data.getElementsByTagName("url");
                var id_user= data.getElementsByTagName("id_user");
                var username= data.getElementsByTagName("username");
                var ID = data.getElementsByTagName("ID");
                var likes = data.getElementsByTagName("likes");
                var deslikes = data.getElementsByTagName("deslikes");
                var marker_content;
                var like = "like";
                var deslike = "deslike";
                var time_date = $.timeago(time_date[0].childNodes[0].nodeValue);
                if (url[0].childNodes[0].nodeValue === "none") {
                    marker_content = "<div class='marker_content' id=" + ID[0].childNodes[0].nodeValue + ">"+
                                            "<b>"+title[0].childNodes[0].nodeValue+"</b>" + "<br/>"+"<hr>"+
                                            "<div class='post_sumarry'>"+summary[0].childNodes[0].nodeValue+"</div>" +
                                            "<div class='likes_deslikes_message'>"+
                                                "<div class='like_deslike_btns'>"+
                                                    "<button class='like like_deslike' onclick='like_deslike(\"" + ID[0].childNodes[0].nodeValue + "\", \""+like +"\")'>"+
                                                        "<img src='img/like_2.png' height='21' width='21'/> "+
                                                    "</button>"+
                                                    "<span class='like_span' id="+"like_"+ID[0].childNodes[0].nodeValue +">" + likes[0].childNodes[0].nodeValue + " </span>"+
                                                    "<button  class='deslike like_deslike' onclick='like_deslike(\"" + ID[0].childNodes[0].nodeValue + "\", \""+deslike +"\")'>"+
                                                        "<img src='img/deslike_2.png' height='21' width='21' />"+
                                                    "</button>"+

                                                    "<span class='deslike_span' id="+"deslike_"+ID[0].childNodes[0].nodeValue +">" + deslikes[0].childNodes[0].nodeValue + "</span>"+
                                                "</div>"+
                                                "<span class='sign_up_message' id="+"msg_"+ID[0].childNodes[0].nodeValue + "> </span>"+
                                            "</div><br/>"+
                                            "<div class='post_details'>"+
                                                "<div class='name_image'>"+
                                                    //"<img src='img/profile_images/"+id_user[0].childNodes[0].nodeValue+".jpg' height='20' width='20'/>"+
                                                     "<img src='img/profile_images/profile_image.jpg' height='20' width='20'/>"+
                                                    "<a href='profile.jsp?id_user="+id_user[0].childNodes[0].nodeValue+"' class='link user_name' id="+ ID[0].childNodes[0].nodeValue +">" + username[0].childNodes[0].nodeValue + "</a>"+
                                                "</div><div class='time_icon'><img class='post_icon' src='img/time_icon.png'/> <span class='post_time'>"+ time_date +"</span></div>"+
                                            "</div>"+
                                        "</div>";

                } 
                else {
                      marker_content = "<div class='marker_content' id=" + ID[0].childNodes[0].nodeValue + ">"+
                                            "<b>"+title[0].childNodes[0].nodeValue+"</b>" + "<br/>"+"<hr>"+
                                            "<div class='post_sumarry'>"+summary[0].childNodes[0].nodeValue+"</div>" +
                                            "<div class='likes_deslikes_message'>"+
                                                "<div class='like_deslike_btns'>"+
                                                    "<button class='like like_deslike' onclick='like_deslike(\"" + ID[0].childNodes[0].nodeValue + "\", \""+like +"\")'>"+
                                                        "<img src='img/like_2.png' height='21' width='21'/> "+
                                                    "</button>"+
                                                    "<span class='like_span' id="+"like_"+ID[0].childNodes[0].nodeValue +">" + likes[0].childNodes[0].nodeValue + " </span>"+
                                                    "<button  class='deslike like_deslike' onclick='like_deslike(\"" + ID[0].childNodes[0].nodeValue + "\", \""+deslike +"\")'>"+
                                                        "<img src='img/deslike_2.png' height='21' width='21' />"+
                                                    "</button>"+

                                                    "<span class='deslike_span' id="+"deslike_"+ID[0].childNodes[0].nodeValue +">" + deslikes[0].childNodes[0].nodeValue + "</span>"+
                                                "</div>"+
                                                "<span class='sign_up_message' id="+"msg_"+ID[0].childNodes[0].nodeValue + "> </span>"+
                                            "</div><br/>"+
                                            "<div class='post_details'>"+
                                                "<div class='name_image'>"+
                                                    //"<img src='img/profile_images/"+id_user[0].childNodes[0].nodeValue+".jpg' height='20' width='20'/>"+
                                                     "<img src='img/profile_images/profile_image.jpg' height='20' width='20'/>"+
                                                    "<a href='profile.jsp?id_user="+id_user[0].childNodes[0].nodeValue+"' class='link user_name' id="+ ID[0].childNodes[0].nodeValue +">" + username[0].childNodes[0].nodeValue + "</a>"+
                                                "</div>"+
                                                "<div class='time_icon'>"+
                                                    "<img class='post_icon' src='img/time_icon.png' />"+
                                                    "<span class='post_time'>"+ time_date +"</span>"+
                                                    "<a class='post_url link' href=/"+url[0].childNodes[0].nodeValue+">URL</a>"+
                                                "</div>"+
                                               
                                            "</div>"+
                                        "</div>";

                }
             
                var infowindow = new google.maps.InfoWindow({
                    content: marker_content
                });

                infowindow.open(marker.get('map'), marker);

        }   
        });
    });

}

function initialize() {
	
    geocoder = new google.maps.Geocoder();
    var myLatlng1 = new google.maps.LatLng(39.304063,21.845854);
    var mapOptions = {
                    center: myLatlng1,
                    zoom: 6,
                    disableDefaultUI: true,
                    styles: [	{		featureType:'water',		stylers:[{color:'#46bcec'},{visibility:'on'}]	},{		featureType:'landscape',		stylers:[{color:'#f2f2f2'}]	},{		featureType:'road',		stylers:[{saturation:-100},{lightness:45}]	},{		featureType:'road.highway',		stylers:[{visibility:'simplified'}]	},{		featureType:'road.arterial',		elementType:'labels.icon',		stylers:[{visibility:'off'}]	},{		featureType:'administrative',		elementType:'labels.text.fill',		stylers:[{color:'#444444'}]	},{		featureType:'transit',		stylers:[{visibility:'off'}]	},{		featureType:'poi',		stylers:[{visibility:'off'}]	}]
    };
    map = new google.maps.Map(document.getElementById("map_canvas"),mapOptions);
    google.maps.event.addListenerOnce(map, 'idle', function() {
       
        $('#map_canvas').css({
           height:'800px',
           width:'75%'
        });
       
    });

//    google.maps.event.addListenerOnce(map, 'zoom_changed', function() {
//
//        console.log("zoom changed");
//       
//    });


    // Create the search box and link it to the UI element.
    var input = /** @type {HTMLInputElement} */(document.getElementById('search_by_location_input'));
    map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

     var searchBox = new google.maps.places.SearchBox(/** @type {HTMLInputElement} */(input));

    // Listen for the event fired when the user selects an item from the
    // pick list. Retrieve the matching places for that item.
    google.maps.event.addListener(searchBox, 'places_changed', function() {
        var places = searchBox.getPlaces();
        
        if (places.length == 0) {
          return;
        }
        var bounds = new google.maps.LatLngBounds();
        for (var i = 0, place; place = places[i]; i++) {
            bounds.extend(place.geometry.location);
        }

    map.fitBounds(bounds);
  });

    // Bias the SearchBox results towards places that are within the bounds of the
    // current map's viewport.
    google.maps.event.addListener(map, 'bounds_changed', function() {
      var bounds = map.getBounds();
      searchBox.setBounds(bounds);
    });
    
    resized = function() {
        // simple animation callback - let maps know we resized
        google.maps.event.trigger(map, 'resize');
    };
    
    var source = "index";
    $.ajax({
        type: "get",
        url: "return_markers",
        data: {"source": "index"},
        success: function(data) {
            
            showMarkers(data);
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) { 
            alert("Status: " + textStatus); 
        } 
    });
    
    
}