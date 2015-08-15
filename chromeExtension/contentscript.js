$(function(){
  var selectedIndex = 0;
  var suggestionList = ['one', 'two', 'three'];
  var $lastInputBox = null;

  /**
   * Creates a suggestion box at the $input
   */
  function createSuggestionBox($input,$current_input) {
    selectedIndex = 0;
    $('.suggestionBox').remove();
    var last_word = $current_input.value.split(" ").pop()
    var $suggestionList = $('<ul/>').addClass('suggestions');
    for (var i in suggestionList) {
      var suggestion = suggestionList[i];
      var $suggestion = $('<li/>').addClass('suggestion').text(suggestion);
      $suggestionList.append($suggestion);
    }
    var $suggestionBox = $('<div/>').addClass('suggestionBox').append($suggestionList);
    if ($lastInputBox.length) {
      var left = $lastInputBox[0].getBoundingClientRect().left;
      var top = $lastInputBox[0].getBoundingClientRect().top;
      $suggestionBox.css({
        top: top,
        left: left
      });
      $input.after($suggestionBox);
      updateSuggestionSelection();
    }

    // Add mouse events
    $('.suggestion').on('click', function(e) {
      var index = $(this).index();
      selectedIndex = index;
      useSuggestion();
      $lastInputBox.focus();
      toggleSuggestionBox();
      return false;
    });
  }

  function toggleSuggestionBox($current_input) {
    var $suggestionBox = $('.suggestionBox');
    if ($suggestionBox.length) {
      $suggestionBox.remove();
    } else {
      createSuggestionBox($lastInputBox,$current_input);
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
    $lastInputBox.val($lastInputBox.val() + suggestionList[selectedIndex]);
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
        $lastInputBox = $('input:focus');
        useSuggestion();
        return false;
      break;
      // Ctrl + Space
      case 32:
        if (e.ctrlKey) {
          toggleSuggestionBox(this);
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
    $lastInputBox = $(this);
    createSuggestionBox($focusedInput);
  });
});
