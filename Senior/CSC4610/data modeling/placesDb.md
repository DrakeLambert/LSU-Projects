# Movies Database

## Places Table

| name                          | Rating | Street                 | City        | State     | ZipCode | Country
| ---                           | ---    | ---                    | ---         | ---       | ---     | ---
| Pete Maravich Assembly Center | 4.6    | North Stadium Drive    | Baton Rouge | Louisiana | 70802   | United States
| Wienerschnitzel               | 4.0    | 2948 Highland Road     | Baton Rouge | Louisiana | 70802   | United States
| Tiger Stadium                 | 5.0    | 1 North Stadium Drive  | Baton Rouge | Louisiana | 70803   | United States

```sql
CREATE TABLE Places {
    PlaceName VARCHAR(255),
    Rating  DECIMAL,
    Street VARCHAR(255),
    City VARCHAR(255),
    Zipcode INT,
    Country VARCHAR(255),
    CONSTRAINT PK_Place PRIMARY KEY (PlaceName, Street)
};
```