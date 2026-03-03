
# Commands to Build and Run the Dockerized Express.js App--

1. **Build the Docker image**
```bash
docker build -t express-docker-app .
```ns
kk
2. **Run the Docker container**
```bashkkzk
docker run -p 3000:3000 express-docker-apprkrk
```hh
cc^^fkkfk
3. **Test the CRUD API**4ff
   - GET: `curl http://localhost:3000/books`
   - POST: `curl -X POST -H "Content-Type: application/json" -d '{"title":"New Book","author":"New Author"}' http://localhost:3000/books`
   - PUT: `curl -X PUT -H "Content-Type: application/json" -d '{"title":"Updated Title"}' http://localhost:3000/books/1`
   - DELETE: `curl -X DELETE http://localhost:3000/books/1`
hhppoozzffffddyyy