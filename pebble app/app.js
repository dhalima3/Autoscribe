/**
 * Welcome to Pebble.js!
 *
 * This is where you write your app.
 */

var UI = require('ui');

var word_data = require("word_data");

//var suggestions_list = [];

var decay_rate = 2;

function get_suggestions(current_text){
  var text_array = current_text.trim()
                          .toLowerCase()
                          .replace(".","")
                          .replace(",","")
                          .replace("'","")
                          .replace("!","")
                          .split(" ");
  
  var decay_scores = [];
  for (var i = text_array.length;i>=0;i--){
    decay_scores.push(Math.pow(decay_rate,-i));
  }
  
  var word_scores=[];
  var word_array=[];
  
  for (i =0;i<text_array.length;i++){
    if(word_data.hasOwnProperty(text_array[i])){
      var keyword = text_array[i];
      var current_words = word_data[keyword];
      var keyword_count = current_words.count;
      delete current_words.count;
      var words = Object.keys(current_words);
      for (var j =0;j<words.length;j++){
        //console.log(words[j]);
        word_array.push(words[j]);
        word_scores.push(decay_scores[i]*word_data[keyword][words[j]]*words.length/keyword_count);
      } 
    }
  }
  console.log(word_scores);
  console.log(word_array);
  var BSorted = word_scores.map(function(e,i){return i;})
               .sort(function(a,b){return word_scores[a] - word_scores[b];})
               .map(function(e){return word_array[e];});
  return BSorted;
}

//var display = get_suggestions('san')[0];
console.log(get_suggestions('can you see '));
//console.log(display);

var card = new UI.Card({
  title: get_last_selection()
});
card.body(suggestion);
card.show();

