using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;

namespace Recommend
{
    class Program
    {
        static void Main(string[] args)
        {
            var userRatings = new Dictionary<string, Dictionary<string, int>>();
            using (StreamReader sr = new StreamReader("rating.txt"))
            {
                var line = sr.ReadLine();
                while (line != null)
                {
                    var ratingInfo = line.Split(' ');
                    var user = ratingInfo[0];
                    var item = ratingInfo[1];
                    var rating = int.Parse(ratingInfo[2].Substring(0, 1));

                    userRatings.TryAdd(user, new Dictionary<string, int>());
                    userRatings[user].TryAdd(item, rating);

                    line = sr.ReadLine();
                }
            }

            var baseUser = "U845167387";
            Console.WriteLine($"Base user average rating: {userRatings[baseUser].Average(kvp => kvp.Value)}");

            Func<KeyValuePair<string, int>, bool> Liked = (rating) => rating.Value > 3;

            var baseUserLikedItems = userRatings[baseUser].Where(Liked);

            var ratingEqualityComparer = new RatingEqualityComparer();

            var similarities = userRatings
                .Where(user => user.Key != baseUser)
                .Select(user => (user.Key, user.Value.Where(Liked)))
                .Select(user => (user.Item1, (double)user.Item2.Intersect(baseUserLikedItems, ratingEqualityComparer).Count() / (double)user.Item2.Union(baseUserLikedItems, ratingEqualityComparer).Count(), user.Item2));
            var verySimilarUsers = similarities.Where(user => user.Item2 > 0.2);
            Console.WriteLine("Users with Jaccard similarity > 0.2:");
            foreach (var user in verySimilarUsers)
            {
                Console.WriteLine(user.Item1 + " : " + user.Item2);
            }

            var itemsToRecommend = verySimilarUsers
                .Select(user => user.Item3)
                .SelectMany(ratings => ratings)
                .Select(rating => rating.Key)
                .Distinct()
                .Except(baseUserLikedItems.Select(rating => rating.Key));

            Console.WriteLine("Items to recommend to base user:");
            foreach (var item in itemsToRecommend)
            {
                Console.WriteLine(item);
            }
        }

        private sealed class RatingEqualityComparer : IEqualityComparer<KeyValuePair<string, int>>
        {
            public bool Equals(KeyValuePair<string, int> x, KeyValuePair<string, int> y)
            {
                return x.Key == y.Key;
            }

            public int GetHashCode(KeyValuePair<string, int> obj)
            {
                return obj.Key.GetHashCode();
            }
        }
    }
}
