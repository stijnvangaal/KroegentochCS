$(document).ready(function () {
    var create_race_button = $('#create_race');
    update_list();
    create_race_button.on('click', function () {
        var title = $('#title').val();
        var ownerId = undefined; // TODO
        var race = {title: title, ownerId: ownerId};
        $.ajax({
            url: '/races',
            type: 'PUT',
            data: race
        }).done(function () {
            update_list();
        });
    });
});

function delete_race(sender) {
    var id = $(sender.target).data('id');
    $.ajax({
        url: '/races/' + id,
        type: 'DELETE',
    }).done(function () {
        update_list();
    });
}

function update_list() {
    var races = $('.races');
    races.empty();
    $.ajax('/races')
        .done(function (data) {
            $.each(data, function (key, value) {
                var id = value._id;
                var title = value.title;
                var owner = value.owner;
                var user_count = value.users.length;
                race = "<div data-id='" + id + "'><h2>" + title + "</h2><p>Owned by: " + owner + "</p><p>" + user_count + " users</p><button class='delete_race' data-id='" + id + "'>Delete</button></div>";
                races.append(race);
            });
            $('.delete_race').click(delete_race);
        });

}

