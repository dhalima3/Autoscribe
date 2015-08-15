import requests
from xml.etree import ElementTree

wordFile = open("words.txt")
wordList = wordFile.readlines()
baseUrl = "http://clients1.google.com/complete/search?hl=en&output=toolbar&q="

for word in wordList:
    word = word.strip()
    response = requests.get(baseUrl + word)
    root = ElementTree.fromstring(response.content)
    fileName = word + ".txt"
    resultsFile = open(fileName, "w")
    for suggestion in root.iter('suggestion'):
        resultsFile.write(suggestion.attrib['data'] + "\n")
    resultsFile.close()
    print word
