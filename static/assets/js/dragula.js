(function($) {
  'use strict';
  var iconTochange;
  dragula([document.getElementById("dragula-left"), document.getElementById("dragula-right")]);
  dragula([document.getElementById("profile-list-left"), document.getElementById("profile-list-right")]);
  dragula([document.getElementById("dragula-event-left"), document.getElementById("dragula-event-right")])
    .on('drop', function(el) {
      console.log($(el));
      iconTochange = $(el).find('.icon-check');
      if (iconTochange.hasClass('text-primary')) {
        iconTochange.removeClass('text-primary').addClass('text-primary');
      } else if (iconTochange.hasClass('text-primary')) {
        iconTochange.removeClass('text-primary').addClass('text-primary');
      }
    })
})(jQuery);
