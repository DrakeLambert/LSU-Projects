import sys

for line in sys.stdin:
    for word in line.split(" "):
        wordLength = len(word)
        if wordLength > 0:
            letter = word[0]
            sys.stdout.write(word[0] + "\t" + str(wordLength) + "\n")