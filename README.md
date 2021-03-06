# Autoscribe
### Hack the Planet

The Pebble smartwatch currently has no native capabilities for other that voice to text. This can be problematic, especially when considering that modern voice recognition has a very hard time identifying voices that have accents. This hack creates a way of typing emails or text, keeping in mind that the Pebble watch only has 3 hardware buttons and no touch screen.

![Pebble Autoscribe](pebble.jpg)

This hack scrapes the body of the emails that you sent and uses that corpus for a Markov chain. Using that Markov chain, we generate the top ranked suggestions after you type words-- like the suggestions given above smartphone keyboards. Since the chain is based on your emails, the suggested words are based on your literary style and voice. On the Pebble watch you can utilize this to type quickly. In the future, we plan to use a trie structure so that we can suggest even more fine tuned options. 
