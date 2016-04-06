var socket = io.connect('https://mysterious-lake-75653.herokuapp.com/');

$(document).ready(function(){
    var create_race_button = $('#create_race');
    update_list();
    create_race_button.on('click', create_race);
});

function update_list(){
    var races = $('.races');
    $.ajax('/races')
        .done(function(data){
            races.empty();
            $.each(data, function(key, value){
                var id = value._id;
                var title = value.title;
                var ownerName = value.owner.local.username;
                var user_count = value.users.length;
                var started = value.started;


                var editButton = "";
                var deleteButton = "";
                var startButton = "";
                if (value.owner._id == $(".new_race").data("user_id")){
                    editButton = "<button class='edit_race' data-id='" + id + "'>Edit</button>";
                    deleteButton = "<button class='delete_race' data-id='" + id + "'>Delete</button>";
                    if (started){
                        startButton = "<button disabled data-id='" + id + "'>Race started</button> <br/>";
                    } else{
                        startButton = "<button class='start_race' data-id='" + id + "'>Start race</button> <br/>";
                    }
                }

                var joinButton = "<button class='join_race' data-id='" + id + "'>Join</button>";
                var participating = false;
                $.each(value.users, function(key, user){
                    if (String(user._id) == $(".new_race").data("user_id")){
                        participating = true;
                    }
                });
                if (participating){
                    var joinButton = "<button class='leave_race' data-id='" + id + "'>Leave</button>";
                }
                race = "<div data-id='" + id + "'><h2>" + title + "</h2><p>Owned by: " + ownerName + "</p><p>" + user_count + " users</p>" + startButton + joinButton + editButton + deleteButton + "</div>";
                races.append(race);
            });
            $('.delete_race').click(delete_race);
            $('.edit_race').click(edit_race);
            $('.join_race').click(join_race);
            $('.leave_race').click(leave_race);
            $('.start_race').click(start_race);
        });
}

function create_race(sender){
    var title = $('#title').val();
    var race = {title: title};
    $.ajax({
        url: '/races',
        type: 'POST',
        data: race
    }).done(function(){
        update_list();
        socket.emit('raceUpdated');
    });
}
function delete_race(sender){
    var id = $(sender.target).data('id');
    $.ajax({
        url: '/races/' + id,
        type: 'DELETE'
    }).done(function(){
        update_list();
        socket.emit('raceUpdated');
    });
}

function edit_race(sender){
    var id = $(sender.target).data('id');
    var link = "manageWaypoints?id=" + id;
    window.location.href = link;
}

function join_race(sender){
    var id = $(sender.target).data('id');
    $.ajax({
        url: '/races/' + id + '/users',
        type: 'POST',
        data: {userId: $(".new_race").data("user_id")},
    }).done(function(){
        socket.emit('raceUpdated');
        update_list();
    });
}

function leave_race(sender){
    var id = $(sender.target).data('id');
    $.ajax({
        url: '/races/' + id + '/users/' + $(".new_race").data("user_id"),
        type: 'DELETE'
    }).done(function(){
        socket.emit('raceUpdated');
        update_list();
    });
}

function start_race(sender){
    var id = $(sender.target).data('id');
    $.ajax({
        url: '/races/' + id,
        type: 'PUT',
        data: {started: true}
    }).done(function(){
        socket.emit('raceUpdated');
        update_list();
    });
}

socket.on('racesUpdated', function(data){
    console.log("RACE UPDATE");
    update_list();
});
