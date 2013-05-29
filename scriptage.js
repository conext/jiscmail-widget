var current_group;
var response;
var dbg;

function magic_spell(text) {
    /* Pieces commented out because I wasn't able to test it. */
    var hashtag_exp = /#([a-zA-Z0-9]+)/g;
    var mention_exp = /@([a-zA-Z0-9]+)/g;
    var href_exp = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig;
    text = text.replace(href_exp, "<a href='$1' target='_blank'>$1</a>"); 
    text = text.replace(hashtag_exp, '<a href="https://twitter.com/search?q=%23$1" target="_blank">#$1</a>');
    text = text.replace(mention_exp, '<a href="https://twitter.com/$1" target="_blank">@$1</a>');
    return text;
}

function get_hashtag() {
    var group_name = current_group.split(":");
    var hashtag = "#" + group_name[group_name.length-1]; 
    return hashtag;
}

function clog(message) {
    console.log("JISCmail ~> " + message);
}

function default_parser(data) {
    decommission_splash();
    response = data;
    clog("in default_parser()");
    if (data.results.length == 0) {
        clog("no results.");
        render_empty_feed();
    } else {
        clog("> 0 results");
        render_results(data);
    }
}

function decommission_splash() {
    $('#splash').css('display', 'none');
    $('#content').css('display', 'block');
}

function render_empty_feed(group_name) {
    clog("in render_empty_feed()");
    messagebox(
        "No new messages.",
        "There doesn't seem to be anything happening for <span id='ht'>" + group_name + "</span>."
    ); 
}

function messagebox(message, description) {
    decommission_splash();
    $('#feed').hide();
    $('#link').hide();
    $('#messagebox').show();
    $('#mbox_title').text(message);
    $('#mbox_description').html(description);
}

function showLink(message, description) {
    decommission_splash();
    $('#linkhref').text("Visit mail list for " + message);
    $('#linkhref').attr("href","https://www.jiscmail.ac.uk/cgi-bin/webadmin?A0=" + message)
}

function entry() {
    /* enlarge your widget. satisfy your user. */
    gadgets.window.adjustHeight(295);
    window.addEventListener("message", function(ev) {
        console.log(ev.data);
        if (!ev.data) {
            clog("No group.");
            messagebox('No group selected.', 'Weird, I couldn\'t get your current group.');
        } else if (ev.data != current_group) {
            current_group = ev.data;
            var group_name = ev.data.split(":");
            group_name = group_name[group_name.length-1];
            clog("Your group: " + group_name);
            showLink(group_name);
        } else {
            clog("no changes required, same group.");
        }
    });

    top.postMessage("let's go!", top.location.origin);
}

