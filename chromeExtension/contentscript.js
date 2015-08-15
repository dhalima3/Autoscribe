$(function(){
  var selectedIndex = 0;

  /**
   * Creates a suggestion box at the $input
   */
  function createSuggestionBox($input, suggestions) {
    selectedIndex = 0;
    var $suggestionList = $('<ul/>').addClass('suggestions');
    for (var i in suggestions) {
      var suggestion = suggestions[i];
      var $suggestion = $('<li/>').addClass('suggestion').text(suggestion);
      $suggestionList.append($suggestion);
    }
    var $suggestionBox = $('<div/>').addClass('codebox').append($suggestionList);
    $('.codebox').remove();
    $input.after($suggestionBox);
  }

  $('input[type=text]').on('focus', function(e) {
    var $focusedInput = $(e.currentTarget);
    createSuggestionBox($focusedInput, ['one', 'two', 'three']);
  });
});