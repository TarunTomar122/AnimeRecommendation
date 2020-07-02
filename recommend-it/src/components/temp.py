import requests
import json

# r = requests.get('https://myanimelist.net/anime/11757/Sword Art Online')
# print(r.text)

r = requests.get('https://api.jikan.moe/v3/user/rohansingh900/animelist/all')



user = json.loads(r.text)
print(user)

animes = []
for anime in user['anime']:
    animes.append([anime['score'], anime['title']])

animes.sort(reverse=True)

watched = []

for anime in animes:
    watched.append(anime[1])


# # print(json.dumps(watched))
# r = requests.post('https://recommend-it-anime.herokuapp.com/suggest', json={"animes": json.dumps(watched)})

# recommendations = json.loads(r.text)
# print(recommendations)