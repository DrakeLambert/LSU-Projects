import sys

previousKey = ""
wordCount = 0
totalLength = 0

for line in sys.stdin:
    key,length = line.split("\t")
    length = int(length[0:-1])
    if (key != previousKey):
        if previousKey != "":
            sys.stdout.write(previousKey + "\t" + str(float(totalLength) / float(wordCount)) + "\n")
            wordCount = 0
            totalLength = 0
        previousKey = key
    wordCount += 1
    totalLength += length
sys.stdout.write(previousKey + "\t" + str(float(totalLength) / float(wordCount)) + "\n")
