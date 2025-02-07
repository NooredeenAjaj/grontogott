const request = require('supertest');
const app = require('../app'); 
jest.mock('../database', () => ({
  query: jest.fn()
}));
const db = require('../database'); 

describe('POST /register', () => {
  beforeEach(() => {
    db.query.mockReset();
  });

  it('should register a new user successfully', async () => {
    db.query.mockImplementation((sql, params, callback) => callback(null, { insertId: 123 }));
    const user_data = {
      name: 'John Doe',
      email: `john${Date.now()}@example.com`, 
      password: 'password123',
      address_street: '123 Elm St',
      address_city: 'Anytown',
      address_postal_code: '12345'
    };

    const response = await request(app)
      .post('/register')
      .send(user_data);

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('message', 'User registered successfully');
  });
  it('should fail to register new usser when some required missing',async()=>{
    const incomplete_data = 
    {  name: 'John Doe',
        email: `john${Date.now()}@example.com`
    };
        const response = await request(app).post('/register').send(incomplete_data)
        expect(response.statusCode).toBe(400)
        expect(response.body).toHaveProperty('message', 'Name, email, password, and address information are required');

  });
  it('should handle database errors good',async ()=>
    {
        db.query.mockImplementation((sql, params, callback) => callback(new Error('Database error'), null)); // Mockar db.query för att simulera ett databasfel.
        const user_data = {
            name: 'John Doe',
            email: `john${Date.now()}@example.com`, 
            password: 'password123',
            address_street: '123 Elm St',
            address_city: 'Anytown',
            address_postal_code: '12345'
          };
          const response = await request(app).post('/register').send(user_data);

          expect(response.statusCode).toBe(500)
          expect(response.body).toHaveProperty('message', 'Error registering new user');
      
    })



});
