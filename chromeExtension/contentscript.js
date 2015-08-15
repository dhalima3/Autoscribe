$(function(){
  var selectedIndex = 0;
  var suggestionList = ['one', 'two', 'three'];

  /**
   * Creates a suggestion box at the $input
   */
  function createSuggestionBox($input) {
    selectedIndex = 0;
    $('.suggestionBox').remove();
    var $suggestionList = $('<ul/>').addClass('suggestions');
    for (var i in suggestionList) {
      var suggestion = suggestionList[i];
      var $suggestion = $('<li/>').addClass('suggestion').text(suggestion);
      $suggestionList.append($suggestion);
    }
    var $suggestionBox = $('<div/>').addClass('suggestionBox').append($suggestionList);
    var $inputFocus = $('input:focus');
    if ($inputFocus.length) {
      var left = $inputFocus[0].getBoundingClientRect().left;
      var top = $inputFocus[0].getBoundingClientRect().top;
      $suggestionBox.css({
        top: top,
        left: left
      });
      $input.after($suggestionBox);
      updateSuggestionSelection();
    }
  }

  function toggleSuggestionBox() {
    var $suggestionBox = $('.suggestionBox');
    if ($suggestionBox.length) {
      $suggestionBox.remove();
    } else {
      var $inputFocus = $('input:focus');
      createSuggestionBox($inputFocus);
    }
  }

  /**
   * Updates the UI of the selected box
   */
  function updateSuggestionSelection() {
    $('.suggestion').removeClass('selected');
    $('.suggestion:eq(' + selectedIndex + ')').addClass('selected');
  }

  /**
   * Uses the current selection. Enters the suggestion into the input box.
   */
  function useSuggestion() {
    var $inputFocus = $('input:focus');
    $inputFocus.val($inputFocus.val() + suggestionList[selectedIndex]);
    $('.suggestionBox').remove();
  }

  // Arrow key selection
  $('input', 'body').on('keydown', function(e) {
    switch (e.which) {
      // Up
      case 38:
        if (selectedIndex > 0) {
          --selectedIndex;
        } else {
          selectedIndex = suggestionList.length - 1;
        }
        updateSuggestionSelection();
        return false;
      break;
      // Down
      case 40:
        if (selectedIndex < suggestionList.length - 1) {
          ++selectedIndex;
        } else {
          selectedIndex = 0;
        }
        updateSuggestionSelection();
        return false;
      break;
      // Tab
      case 9:
      // Enter
      case 13:
        console.log('test');
        useSuggestion();
        return false;
      break;
      // Ctrl + Space
      case 32:
        if (e.ctrlKey) {
          toggleSuggestionBox();
          return false;
        }
    }
  });

  $('body').on('keyup', function() {
    return false;
  })

  // Start the suggestion box when focusing on a element
  $('input[type=text]').on('focus', function(e) {
    var $focusedInput = $(e.currentTarget);
    createSuggestionBox($focusedInput);
  });
});