import express from 'express';
const app = express();
const port = process.env.PORT || 3000;

// Middleware to parse JSON bodies
app.use(express.json());

let books = [
  { id: 1, title: 'The Great Gatsbylolooooooooboooooo', author: 'F. Scott Fkkkkkkitzgerald' },
  { id: 2, title: '1984', author: 'George Orwell' }
  ,{ id: 3, title: 'To Kill a Mockingbird', author: 'Harper Lee' }
];

// Define routes (same as before)
app.get('/books', (req, res) => {
  res.json(books);
});

app.get('/books/:id', (req, res) => {
  const book = books.find(b => b.id === parseInt(req.params.id));
  if (!book) return res.status(404).send('Book not found');
  res.json(book);
});

app.post('/books', (req, res) => {
  const newBook = {
    id: books.length + 1,
    title: req.body.title,
    author: req.body.author
  };
  books.push(newBook);
  res.status(201).json(newBook);
});

app.put('/books/:id', (req, res) => {
  const book = books.find(b => b.id === parseInt(req.params.id));
  if (!book) return res.status(404).send('Book not found');
  book.title = req.body.title || book.title;
  book.author = req.body.author || book.author;
  res.json(book);
});

app.delete('/books/:id', (req, res) => {
  const bookIndex = books.findIndex(b => b.id === parseInt(req.params.id));
  if (bookIndex === -1) return res.status(404).send('Book not found');
  books.splice(bookIndex, 1);
  res.status(204).send();
});

// Start the server
app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});

export default app;
