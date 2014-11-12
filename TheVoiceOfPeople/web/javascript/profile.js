var geocoder;
var map_location;
var profile_map;

var all_markers = {};
var world_markers = [];
var worldInt ;
var show_w=false;

var sport_markers = [];
var sportsInt = false;
var show_s=false;

var tech_markers = [];
var techInt = false;
var show_t=false;

var politic_markers = [];
var politicsInt = false;
var show_p=false;

var other_markers = [];
var otherInt = false;
var show_o=false;



$(document).ready(function(){
   
    google.maps.event.addDomListener(window, 'load', initialize);
    
    if(!$.trim($("#user_posts").html()).length){
        $("#user_posts").append("No post yet....");
    }
    
    // change the type of time for each post
    $(".post_time").each(function(i,obj){
        var post_time_date = $(this).text();
        $(this).text($.timeago(post_time_date));
    });
   
});



$(document).on("click","#number_of_followers", function(){
    
    var source = $("#user_id_value_2").text();
    
    $.ajax({
            type: "post",
            url: "followers_followings_list",
            data: {"source":source,"action":"followers"},
            success : function(data) {
                console.log(data);
                if (data == "ERROR") 
                    alert("There was an error,please try again");
                else {
                    $("#followers_div").empty().append(data);
                    if (!$.trim($("#followers_list").html()).length){
                        $("#followers_list").append("Still, no followers");
                    }
                    else{
                        $("#followers_div").empty().append(data);
                    }
                    $("#user_profile_settings").fadeOut(300);
                    $("#user_posts_map_div").fadeOut(300);
                    $("#following_div").fadeOut(300);
                    
                    $("#followers_div").fadeIn(300);   // show the followers 
                }
              
            }
    });

});

$(document).on("click","#number_of_followings", function(){
    
    var source = $("#user_id_value_2").text();
  
    $.ajax({
        type: "post",
        url: "followers_followings_list",
        data: {"source":source,"action":"followings"},
        success : function(data) {

            if (data == "ERROR"){
                alert("There was an error,please try again");
            }else{
                $("#following_div").empty().append(data);
                if (!$.trim($("#followings_list").html()).length){
                    $("#followings_list").append("Still, no followings");
                }
                else{
                    $("#following_div").empty().append(data);
                }
                
                $("#user_profile_settings").fadeOut(300);
                $("#user_posts_map_div").fadeOut(300);
                $("#followers_div").fadeOut(300);

                $("#following_div").fadeIn(300);   // show the followings 
            }

        }
  });
 
});

$(document).on("click",".delete_post_btn", function(){
   
    var post_id = $(this).attr('id');
    $(this).parent().closest(".post").remove();
    
    $("#window_msg").empty().append("<h2> Your post was successfully deleted!</h2>");
    $("#window_msg").fadeIn(1200,function(){
        $("#window_msg").fadeOut(1200);
    });
    $.ajax({
        type: "post",
        url: "delete_post",
        data: {"post_id":post_id},
        success : function(data) {
            
            if (data != "ERROR"){
                $val = $("#number_of_posts").text();
                $("#number_of_posts").text($val - 1);
                if(!$.trim($("#user_posts").html()).length){
                    $("#user_posts").append("No post yet....");
                }
            }
        }
  });
 
});


$(document).on("click","#number_of_posts", function(){
    
    $("#user_profile_settings").fadeOut(300);
    $("#followers_div").fadeOut(300);
    $("#following_div").fadeOut(300);
    
    $("#user_posts_map_div").fadeIn(300);   // show the map and the posts
    
    
 });

$(document).on("click",".close_window", function(){

    $("#user_profile_settings").fadeOut(1400);
    $("#followers_div").fadeOut(1400);
    $("#following_div").fadeOut(1400);
    
    $("#user_posts_map_div").fadeIn(1400);   // show the map and the posts
    
});

$(document).on("mouseover","#followBtn", function(){
    
    $content = $("#followBtn").text();
    
    if($.trim($content) == "Following"){
       $("#followBtn").text("Unfollow");
    }
    
});

$(document).on("mouseout","#followBtn", function(){
    
    $content = $("#followBtn").text();
    if($.trim($content) == "Unfollow"){
        $("#followBtn").text("Following");
    }
});

$(document).on("mouseover",".followBtn_list", function(){
    
    $content = $(this).text();
    
    if($.trim($content) == "Following"){
       $(this).text("Unfollow");
    }
    
});

$(document).on("mouseout",".followBtn_list", function(){
    
    $content = $(this).text();
    if($.trim($content) == "Unfollow"){
        $(this).text("Following");
    }
});

//$(document).on("mouseover",".followers_list_item", function(){
//   
//    $(this).find(".followBtn_list_div").fadeIn(400);
//});
//
//$(document).on("mouseout",".followers_list_item", function(){
//    
//    $(this).find(".followBtn_list_div").fadeOut(400);
//});

$(document).on("click",".post", function(){
    var position = $(this).attr('id');
    var coords = position.split(",");
//    map.setZoom(14);
//    map.setCenter(new google.maps.LatLng(coords[0],coords[1]));
    $id = $(this).attr("id");
    google.maps.event.trigger(all_markers[$id], 'click');
    
});
    
function test_image_val(){
//    if($("#image_profile_input").val()==""){
//        $("#image_profile_input").css({"border":"1px solid red"});
//        return false;
//    }
//    else{
//        return false;
//    }
return true;
    
}


function save_settings() {  
	
	var ch1,ch2,ch3,ch4,ch5;
        var country = $("#user_country").val();
	
	if ($("#ch1").is(":checked")) 
		ch1="TRUE";
	else
		ch1="FALSE";
	if ($("#ch2").is(":checked")) 
		ch2="TRUE";
	else
		ch2="FALSE";
	
	if ($("#ch3").is(":checked")) 
		ch3="TRUE";
	else
		ch3="FALSE";
	if ($("#ch4").is(":checked")) 
		ch4="TRUE";
	else
		ch4="FALSE";
	if ($("#ch5").is(":checked")) 
		ch5="TRUE";
	
	else
            ch5="FALSE";
	
	$.ajax({
		type: "post",
		url: "profile_settings",
		data: {"world":ch1,"sports":ch4,"technology":ch3,"politics":ch2,"other":ch5,"location":country},
		success : function(data) {
                   
                    $("#window_msg").empty().append("<h2> Your settings was succesfully saved  </h2>");
                    $("#window_msg").fadeIn(1200,function(){
                        $("#window_msg").fadeOut(1200);
                    });
                    //window.location.href = "http://localhost:8084/TheVoiceOfPeople/profile.jsp";
                    window.location.href = "http://83.212.97.66:8080/TheVoiceOfPeople/profile.jsp";
		}	
	});
}


function showProfileMarkers(data) {
	
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
                map: profile_map    ,
                id: ID[i].childNodes[0].nodeValue,
                visible:true,
                animation: google.maps.Animation.DROP,
                icon: marker_icon
            });
           
            if (id_categories[i].childNodes[0].nodeValue == 1)
                world_markers.push(marker);
            else if (id_categories[i].childNodes[0].nodeValue == 2)
                politic_markers.push(marker);
            else if(id_categories[i].childNodes[0].nodeValue == 3)
                sport_markers.push(marker);
            else if(id_categories[i].childNodes[0].nodeValue == 4)
                tech_markers.push(marker);	
            else
                other_markers.push(marker);
            var marker_id = longitude[i].childNodes[0].nodeValue +","+latitude[i].childNodes[0].nodeValue;
            all_markers[marker_id] = marker;
            setContent(marker);
            markers.push(marker);
        }
        
        var mcOptions = {gridSize: 50, maxZoom: 15};
        var markerCluster = new MarkerClusterer(profile_map, markers,mcOptions);

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
                                                "</div> <div class='time_icon'><img class='post_icon_2' src='img/time_icon.png'/> <span class=' post_time'>"+ time_date +"</span></div>"+
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
                                                        "<img src='img/deslike_2.png' height='21' width='21'/>"+
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
                                                    "<img class='post_icon_2' src='img/time_icon.png' />"+
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

function codeAddress(place_to_go) {
    
    var location = [];
    geocoder.geocode( { 'address': place_to_go}, function(results, status) {
        if (status == google.maps.GeocoderStatus.OK) {

            profile_map.setCenter(results[0].geometry.location);
//            location[0]=results[0].geometry.location.lat();
//            location[1]=results[0].geometry.location.lng();
//            map_location = location;
           
        } else {
            alert('Geocode was not successful for the following reason: ' + status);
        }
                
    });

}

function initialize() {
    
    geocoder = new google.maps.Geocoder();
    var country = $.trim($("#country").text());
    codeAddress(country);
   
    var myLatlng1 = new google.maps.LatLng(39.304063,21.845854);
    var mapOptions = {
                    center: myLatlng1,
                    zoom: 6,
                    styles: [	{		featureType:'water',		stylers:[{color:'#46bcec'},{visibility:'on'}]	},{		featureType:'landscape',		stylers:[{color:'#f2f2f2'}]	},{		featureType:'road',		stylers:[{saturation:-100},{lightness:45}]	},{		featureType:'road.highway',		stylers:[{visibility:'simplified'}]	},{		featureType:'road.arterial',		elementType:'labels.icon',		stylers:[{visibility:'off'}]	},{		featureType:'administrative',		elementType:'labels.text.fill',		stylers:[{color:'#444444'}]	},{		featureType:'transit',		stylers:[{visibility:'off'}]	},{		featureType:'poi',		stylers:[{visibility:'off'}]	}]
    };
    
    profile_map = new google.maps.Map(document.getElementById("profile_map"),mapOptions);
    google.maps.event.addListenerOnce(profile_map, 'idle', function() {
       
        $('#profile_map').css({
            height:'550px',
            width:'52%'
        });
       
    });
    
   

    google.maps.event.addListenerOnce(profile_map, 'zoom_changed', function() {
       
//        var currentZoom = map.getZoom();
//        myMarker.setRadius(currentZoom);
        console.log("zoom changed");
       
    });

    resized = function() {
        // simple animation callback - let maps know we resized
        google.maps.event.trigger(map, 'resize');
    };
    var source = $("#user_id_value_2").text();
 
    $.ajax({
        type: "get",
        url: "return_markers",
        data: {"source": source},
        success: function(data) {
            
            showProfileMarkers(data);
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) { 
            alert("Status: " + textStatus); 
        } 
    });
    
    
}

