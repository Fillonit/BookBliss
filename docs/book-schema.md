# BOOK NOSQL

## Schema

```json
{
  "title": "string",
  "author": "string",
  "year": "date",
  "genre": "array",
  "language": "array",
  "isbn": "string",
  "pages": "number",
  "description": "string",
  "cover": "string",
}
```

## Example

```json
{
  "title": "The Hobbit",
  "author": "J.R.R. Tolkien",
  "year": "21 September 1937",
  "genres": ["fantasy", "adventure", "epic"],
  "language": ["English"],
  "isbn": "978-0-395-08356-5",
  "pages": 310,
  "description": "The Hobbit, or There and Back Again, is a children's fantasy novel by English author J. R. R. Tolkien. It was published on 21 September 1937 to wide critical acclaim, being nominated for the Carnegie Medal and awarded a prize from the New York Herald Tribune for best juvenile fiction.",
  "cover": "https://upload.wikimedia.org/wikipedia/en/4/4a/TheHobbit_FirstEdition.jpg",
}
```


## Roles
- User
- Author
- Admin