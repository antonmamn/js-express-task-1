const request = require('supertest');
const app = require('../app');




describe('Post /users', () => {
        it('creates a new user', async () => {
            const response = await request(app).post('/users')
                .send({firstName: "nika", lastName: "latsabidze",email:"nl@gmail.com",password:"123456"});
            expect(response.status).toBe(200);
            expect(response.body.firstName).toBe("nika")
        })
    }
)
describe('GET /users', () => {
    it('returns a list of users', async () => {
        const response = await request(app).get('/users');
        expect(response.status).toBe(200);
        expect(response.body.length).toBeGreaterThan(0);
    });
});
describe('GET /users/:id', () => {
    it('returns a single user by id', async () => {
        const response = await request(app).get('/users/1');
        expect(response.status).toBe(200);
        expect(response.body.firstName).toBe('nika');
    });

    it('returns a 404 error for an invalid post id', async () => {
        const response = await request(app).get('/users/999');
        expect(response.status).toBe(404);
    });
});
describe('PUT /users/:id', () => {
    it('updates a post by id', async () => {
        const response = await request(app)
            .put('/users/1')
            .send({firstName: 'giorgi'});
        expect(response.status).toBe(200);
        expect(response.body[0]).toBe(1);
    });

    it('returns a 404 error for an invalid user id', async () => {
        const response = await request(app).put('/users/999');
        expect(response.status).toBe(404);
    });
});

describe('POST /posts', () => {
    it('creates a new post', async () => {
        const response = await request(app)
            .post('/posts')
            .send({title: 'New Post', text: 'Lorem ipsum', author: 1});
        expect(response.status).toBe(200);
        expect(response.body.title).toBe('New Post');

    });
});

describe('GET /posts', () => {
    it('returns a list of posts', async () => {
        const response = await request(app).get('/posts');
        expect(response.status).toBe(200);
        expect(response.body.length).toBeGreaterThan(0);
    });
});

describe('GET /posts/:id', () => {
    it('returns a single post by id', async () => {
        const response = await request(app).get('/posts/1');
        expect(response.status).toBe(200);
        expect(response.body.title).toBe('New Post');
    });

    it('returns a 404 error for an invalid post id', async () => {
        const response = await request(app).get('/posts/999');
        expect(response.status).toBe(404);
    });
});

describe('PUT /posts/:id', () => {
    it('updates a post by id', async () => {
        const response = await request(app)
            .put('/posts/1')
            .send({title: 'Updated Post'});
        expect(response.status).toBe(200);
        expect(response.body[0]).toBe(1);
    });

    it('returns a 404 error for an invalid post id', async () => {
        const response = await request(app).put('/posts/999');
        expect(response.status).toBe(404);
    });
});


describe('POST /books', () => {
    it('creates a new post', async () => {
        const response = await request(app)
            .post('/books')
            .send({book: {title: 'New Book', genre: 'Lorem ipsum'}, userids: [1]});
        expect(response.status).toBe(200);
        expect(response.body.title).toBe('New Book');
    });
});
describe('GET /books', () => {
    it('returns a list of books', async () => {
        const response = await request(app).get('/books');
        expect(response.status).toBe(200);
        expect(response.body.length).toBeGreaterThan(0);
    });
});

describe('GET /books/:id', () => {
    it('returns a single post by id', async () => {
        const response = await request(app).get('/books/1');
        expect(response.status).toBe(200);
        expect(response.body.title).toBe('New Book');
    });

    it('returns a 404 error for an invalid books id', async () => {
        const response = await request(app).get('/books/999');
        expect(response.status).toBe(404);
    });
});

describe('PUT /books/:id', () => {
    it('updates a book by id', async () => {
        const response = await request(app)
            .put('/books/1')
            .send({title: 'Updated book'});
        expect(response.status).toBe(200);
        expect(response.body[0]).toBe(1);
    });
    it('returns a 404 error for an invalid post id', async () => {
        const response = await request(app).put('/books/999');
        expect(response.status).toBe(404);
    });
});

describe('Get /stats/:id', () => {
        it('gets user and its every book', async () => {
            const response = await request(app).get('/stats/1')
            expect(response.body.books_count).toBe(1)
            expect(response.status).toBe(200);

        });
        it('returns a 404 error for an invalid user id ', async ()=> {
            const response = await request(app).get('/stats/999');
            expect(response.status).toBe(404);
        });
    }
)

describe('DELETE /posts/:id', () => {
    it('deletes a post by id', async () => {
        const response = await request(app).delete('/posts/1');
        expect(response.status).toBe(200);
        expect(response.body.rowsAffected).toEqual(1);
    });

    it('returns a 404 error for an invalid post id', async () => {
        const response = await request(app).delete('/posts/999');
        expect(response.status).toBe(404);
    });
});
describe('DELETE /books/:id', () => {
    it('deletes a book by id', async () => {
        const response = await request(app).delete('/books/1');
        expect(response.status).toBe(200);
        expect(response.body.rowsAffected).toEqual(1);
    });

    it('returns a 404 error for an invalid book id', async () => {
        const response = await request(app).delete('/books/999');
        expect(response.status).toBe(404);
    });
});

describe('DELETE /users/:id', () => {
    it('deletes a user by id', async () => {
        const response = await request(app).delete('/users/1');
        expect(response.status).toBe(200);
        expect(response.body.rowsAffected).toEqual(1);
    });

    it('returns a 404 error for an invalid user id', async () => {
        const response = await request(app).delete('/users/999');
        expect(response.status).toBe(404);
    });
});