from collections import defaultdict
import math

### define a function
def mean(list_numbers):
    return float(sum(list_numbers)) / max(len(list_numbers), 1)

 
### code entry point: starting from reading files

fi_ratings = open('rating.txt',"r").read()
line_records = fi_ratings.split("\n")

allRatings = []
userRatings = defaultdict(list)
userLikedItems = defaultdict(list)

for line in line_records[0:-1]:
  spl = line.split(" ")
  userID = spl[0]
  itemID = spl[1]
  rating = float(spl[2])
  allRatings.append(rating)
  userRatings[userID].append(rating)
  if rating > 3.0:
    userLikedItems[userID].append(itemID)

base_user_id='U845167387'
print 'base user ratings, it is a list of ratings'
print userRatings[base_user_id]
print 'base user liked items, it is a list of game id'
print userLikedItems[base_user_id]

#Global average rating
print 'the average rating of all ratings: {:.4f}'.format(mean(allRatings)) 

#Compute average rating of base user id

#Compute base user id neighbors whose jaccard similarity to base is larger than 0.2

#Compute items liked by neighbors

 