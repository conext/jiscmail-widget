var current_group;
var response;
var dbg;

function clog(message) {
    console.log("JISCmail ~> " + message);
}

function decommission_splash() {
    $('#splash').css('display', 'none');
    $('#content').css('display', 'block');
}

function render_empty_feed(group_name) {
    clog("in render_empty_feed()");
    messagebox(
        "No messages available.",
        "If the archives for the <span id='ht'>" + group_name + "</span> list are private, it is not possible to show messages here. View the archives directly one the <a href=\"https://www.jiscmail.ac.uk/" + group_name + "\">JiscMail web site</a>."
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

function rssBox(message, description) {
    decommission_splash();
    $('#feed').hide();
    $('#messagebox').show();
    $('#mbox_title').text(message);
    $('#mbox_description').html(description);
}


function showLink(message, description) {
    decommission_splash();
    $('#linkhref').text(message.toUpperCase() + " Mailing List");
    $('#linkhref').attr("href","https://www.jiscmail.ac.uk/cgi-bin/webadmin?A0=" + message)
}

function entry() {
    /* enlarge your widget. satisfy your user. */
    gadgets.window.adjustHeight(295);
    window.addEventListener("message", function(ev) {
        console.log(ev.data);
        if (!ev.data) {
            clog("No group.");
            messagebox('No group selected.', 'Please select a group to work with this application.');
        } else if (ev.data != current_group) {
            current_group = ev.data;
            var group_name = ev.data.split(":");
            group_name = group_name[group_name.length-1];
            clog("Your group: " + group_name);
            showLink(group_name);
            $('#divRss').FeedEk({
                FeedUrl : 'https://www.jiscmail.ac.uk/cgi-bin/webadmin?RSS&v=2.0&L=' + group_name,
                MaxCount : 10,
                ShowDesc : false,
                ShowPubDate:true,
                DescCharacterLimit:80,
                TitleLinkTarget:'_blank',
                groupName: group_name
            });
        } else {
            clog("no changes required, same group.");
        }
    });

    top.postMessage("let's go!", top.location.origin);
}

