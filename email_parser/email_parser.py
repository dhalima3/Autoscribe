import json
import numpy as np
word_info = {}
with open("email.txt") as q:
    sentences = q.read().split("\n")
for sentence in sentences:
    sentence = sentence.split()
    for i in range(len(sentence)-1):
        current_word=sentence[i]
        next_word=sentence[i+1]
        if not current_word in word_info.keys():
            word_info[current_word]={}
        if not next_word in word_info[current_word].keys():
            word_info[current_word][next_word]=0
        word_info[current_word][next_word]+=1
        
with open("words_array.json","w") as f:
    json.dump(word_info,f)
