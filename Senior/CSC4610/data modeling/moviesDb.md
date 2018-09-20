# Movies Database

## Movie Table

| id  | name                  | studioId
| --- | ---                   | ---
| 1   | Les Misérables        | 1
| 2   | The Soloist           | 2
| 3   | Sherlock Holmes       | 3
| 4   | Rise of the Guardians | 4

```sql
CREATE TABLE Movie {
    movieId INT,
    title VARCHAR(255),
    studioId INT,
    PRIMARY KEY (movieId)
    FOREIGN KEY (studioId) REFERENCES Studio (StudioId)
};
```

## Movie-Actor Pivot Table

| movieId | actorId
| ---     | ---
| 1       | 1
| 1       | 2
| 1       | 3
| 1       | 4
| 1       | 5
| 2       | 6
| 2       | 7
| 2       | 8
| 2       | 14
| 3       | 7
| 3       | 9
| 3       | 10
| 3       | 11
| 4       | 1
| 4       | 12
| 4       | 13
| 4       | 15

```sql
CREATE TABLE Movie_Actor {
    movieId INT,
    actorId INT,
    FOREIGN KEY (movieId) REFERENCES Movie (movieId),
    FOREIGN KEY (actorId) REFERENCES Actor (actorId)
};
```

## Actors Table

| id   | name
| ---  | ---
| 1    | Hugh Jackman
| 2    | Russell Crowe
| 3    | Anne Hathaway
| 4    | Amanda Seyfried
| 5    | Sacha Baron Cohen
| 6    | Jamie Foxx
| 7    | Robert Downey Jr.
| 8    | Catherine Keener
| 9    | Jude Law
| 10   | Rachel McAdams
| 11   | Mark Strong
| 12   | Alec Baldwin
| 13   | Isla Fisher
| 14   | Tom Hollander
| 15   | Chris Pine

```sql
CREATE TABLE Actor {
    actorId INT,
    actorName VARCHAR(255),
    PRIMARY KEY (actorId)
};
```

## Studios Table

| id  | name
| --- | ---
| 1   | Universal Pictures
| 2   | DreamWorks
| 3   | Warner Bros

```sql
CREATE TABLE Studio {
    studioId INT,
    studioName VARCHAR(255),
    PRIMARY KEY (studioId)
};
```