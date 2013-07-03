/* FeedEk jQuery RSS/ATOM Feed Plugin v1.1.2
 *  http://jquery-plugins.net/FeedEk/FeedEk.html
 *  Author : Engin KIZIL http://www.enginkizil.com
 *  http://opensource.org/licenses/mit-license.php
 */

(function ($) {
    $.fn.FeedEk = function (opt) {
        var def = $.extend({
            FeedUrl: "http://rss.cnn.com/rss/edition.rss",
            MaxCount: 5,
            ShowDesc: true,
            ShowPubDate: true,
            CharacterLimit: 0,
            TitleLinkTarget: "_blank",
            groupName: ""
        }, opt);

        var id = $(this).attr("id");
        var i;
        $("#" + id).empty().append('<img src="https://jiscmail-widget.identitylabs.org/loader.gif" />');
        $.ajax({
            url: "http://ajax.googleapis.com/ajax/services/feed/load?v=1.0&num=" + def.MaxCount + "&output=json&q=" + encodeURIComponent(def.FeedUrl) + "&hl=en&callback=?",
            dataType: "json",
            success: function (data) {
                $("#" + id).empty();
                var s = "";
                if (data.responseData && data.responseData.feed.entries.length > 0) {
                    $.each(data.responseData.feed.entries, function (e, item) {
                        s += '<li><div class="itemTitle"><a href="' + item.link + '" target="' + def.TitleLinkTarget + '" >' + item.title + "</a></div>";
                        if (def.ShowPubDate) {
                            i = new Date(item.publishedDate);
                            s += '<div class="itemDate">' + i.toLocaleDateString() + "</div>";
                        }
                        if (def.ShowDesc) {
                            if (def.DescCharacterLimit > 0 && item.content.length > def.DescCharacterLimit) {
                                s += '<div class="itemContent">' + item.content.substr(0, def.DescCharacterLimit) + "...</div>";
                            }
                            else {
                                s += '<div class="itemContent">' + item.content + "</div>";
                            }
                        }
                    });
                    $("#" + id).append('<ul class="feedEkList">' + s + "</ul>");
                } else {
                    clog("in render_empty_feed()");
                    rssBox(
                        "No new messages.",
                        "There doesn't seem to be anything happening for <span id='ht'>" + def.groupName + "</span>."
                    );
                }
            },
            error: function() {
                clog("in render_empty_feed()");
                rssBox(
                    "No new messages.",
                    "There doesn't seem to be anything happening for <span id='ht'>" + def.groupName + "</span>."
                );
            }

        });
    };
})(jQuery);
