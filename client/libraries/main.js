var rating = new ReactiveVar;
var edited_text = new ReactiveVar;
rating.set(0);

Template.steps.rendered = function() {
  this.$("#rate_slider").noUiSlider({
    start: 0, // Handle start position
  	step: 1, // Slider moves in increments of '10'
  	connect: 'lower', // Display a colored bar between the handles
  	direction: 'rtl', // Put '0' at the bottom of the slider
  	orientation: 'vertical', // Orient the slider vertically
  	range: { // Slider can select '0' to '100'
  		'min': 0,
  		'max': 100
  	}
  }).on('slide', function (ev, val) {
    rating.set(val);
  });
  $("#rate_slider").noUiSlider_pips({
    mode: 'positions',
    density: 2,
    values: [0, 20, 40, 60, 80, 100],
  });

  var text_one = "<h1>Title</h1>\
              <p>Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam egestas semper. Aenean ultricies mi vitae est. Mauris placerat eleifend leo.Donec eu libero sit amet quam egestas semper. Aenean ultricies mi vitae est. Mauris placerat eleifend leo.</p>\
              <p>Nulla voluptatem vero quae ipsam, quis alias, eaque aliquam atque libero adipisci sint obcaecati cupiditate aut at voluptatum consequatur, repellat, amet earum.</p>\
              <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Maiores rem quaerat fugiat odio vitae distinctio minima optio beatae deserunt excepturi velit nemo iste sint ullam, quam dicta, sed mollitia esse. Mauris placerat eleifend leo.</p>";

  $("#content").html(text_one);
  edited_text.set($("#content").html());

  $('#content').keyup(function() {
    edited_text.set($("#content").html());
  //   var diff = JsDiff.diffChars(text_one, edited_text.get());
  //   var edited = '';
  //   diff.forEach(function(part){
  //     var color = part.added ? 'green' : part.removed ? 'red' : 'grey';
  //     var span = document.createElement('div');
  //
  //     span.style.color = color;
  //     span.appendChild(document.createTextNode(part.value));
  //     var span_string = JSON.stringify(span);
  //     edited += span;
  //   });
  //   console.log(edited);
  //   $('#content').html(edited);
  });

}

Template.steps.helpers({
  count_words: function() {
    var s = edited_text.get()
    // created by http://stackoverflow.com/users/148388/liviucmg - really great function
    var count = !s ? 0 : (s.split(/^\s+$/).length === 2 ? 0 : 2 + s.split(/\s+/).length - s.split(/^\s+/).length - s.split(/\s+$/).length);
    return count;
  },
  rate_tile: function() {
    var cur_rating = rating.get();
    var element = document.getElementById('tile');
    var value_el = document.getElementById('value');

    if (element) {
      value_el.innerHTML = cur_rating;

      if (cur_rating == 0) {
        element.innerHTML = '';
        element.innerHTML = '<div class="tile no_changes"><i class="tile_icon fa fa-frown-o fa-5x"></i><h1>No Changes</h1></div>';
      }
      else if (cur_rating == 20) {
        element.innerHTML = '';
        element.innerHTML = '<div class="tile minor_changes"><i class="tile_icon fa fa-wrench fa-5x"></i><h1>Minor Changes</h1></div>';
      }
      else if (cur_rating == 40) {
        element.innerHTML = '';
        element.innerHTML = '<div class="tile small_changes"><i class="tile_icon fa fa-wrench fa-5x"></i><h1>Small Changes</h1></div>'
      }
      else if (cur_rating == 60) {
        element.innerHTML = '';
        element.innerHTML = '<div class="tile improvements"><i class="tile_icon fa fa-star-o fa-5x"></i><h1>Improvements</h1></div>'
      }
      else if (cur_rating == 80) {
        element.innerHTML = '';
        element.innerHTML = '<div class="tile great_improvements"><i class="tile_icon fa fa-star-o fa-5x"></i><h1>Great Improvements</h1></div>';
      }
      else if (cur_rating == 100) {
        element.innerHTML = '';
        element.innerHTML = '<div class="tile unique_improvements"><i class="tile_icon fa fa-star-o fa-5x"></i><h1>Unique Improvements</h1></div>';
      }
    }
  }
});
