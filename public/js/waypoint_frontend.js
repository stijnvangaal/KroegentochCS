var socket = io.connect('http://mysterious-lake-75653.herokuapp.com');
$(document).ready(function(){
    // append race title to page title
    var raceId = $('.container').data("id");
    $.ajax("Races/" + raceId).done(function(data){
        var title = data.title;
        $('.title').append(" - " + title);
    });

    // prepare waypoint list
    update_wp_list();

    // search button click listener
    $('#search_location').click(search);
});

function search(sender){
    var searchString = $('#locsearch').val();
    var foundDiv = $('.found_locations');
    $.ajax("locations?name=" + searchString).done(function(data){
        foundDiv.empty();
        foundDiv.append("<h2>Search results</h2>");
        $.each(data.results, function(key, location){
            var button = "<button class='add_wp_to_race' data-name='" + escape(location.name) + "' data-place_id='" + escape(location.place_id) + "' data-vicinity='" + escape(location.vicinity) + "'>Add waypoint to race</button>";
            var html_string = "<p>" + location.name + button;
            foundDiv.append(html_string);
        });
        $(".add_wp_to_race").click(add_waypoint);
    });
}

function update_wp_list(){
    var raceId = $('.container').data('id');
    var waypointsDiv = $('.waypoints');
    $.ajax("/Races/" + raceId).done(function(data){
        var waypoints = data.waypoints;
        waypointsDiv.empty();
        waypointsDiv.append("<h2>Your waypoints</h2>");
        if (waypoints.length == 0){
            waypointsDiv.append("<p>You have no waypoints yet</p>");
        }
        $.each(waypoints, function(key, waypoint){
            var deleteButton = "<button class='remove_wp' data-waypoint_id='" + waypoint._id + "'>Remove</button>";
            var htmlString = "<div class='waypoint'><strong>" + unescape(waypoint.name) + "</strong>" + deleteButton + "<br/>" + unescape(waypoint.vicinity) + "</div>";
            waypointsDiv.append(htmlString);
        });
        $(".remove_wp").click(remove_waypoint);
    })
}

function add_waypoint(sender){
    var button = $(sender.target);
    var place_id = button.data("place_id");
    var vicinity = button.data("vicinity");
    var name = button.data("name");
    var raceId = $('.container').data('id');

    $.ajax({
        url: '/waypoints/',
        type: 'POST',
        data: {
            placeId: place_id,
            name: name,
            vicinity: vicinity
        }
    }).done(function(data){
        var waypointId = data._id;
        $.ajax({
            url: '/races/' + raceId + '/waypoints',
            type: 'POST',
            data: {"waypoints": waypointId}
        }).done(function(){
            update_wp_list();
            socket.emit('waypointUpdated');
        });
    });
}

function remove_waypoint(sender){
    var button = $(sender.target);
    var wp_id = button.data("waypoint_id");
    $.ajax({
        url: "/waypoints/" + wp_id,
        type: "DELETE"
    }).done(function(){
        update_wp_list();
        socket.emit('waypointUpdated');
    });
}

socket.on('waypointsUpdated', function(){
    console.log("WAYPOINT UPDATE");
    update_wp_list();
});