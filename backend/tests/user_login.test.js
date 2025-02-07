const request = require('supertest')
const app = require('../app')
const db = require('../database')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

jest.mock('../database', () => ({
    query: jest.fn()
  }));
  jest.mock('bcrypt');
  jest.mock('jsonwebtoken');

  describe('POST /login', () => {
    beforeEach(() => {
      db.query.mockReset();
      bcrypt.compare.mockReset();
      jwt.sign.mockReset();
    });
  
    it('should  return 401 if the user is not found', async ()=>{
        db.query.mockImplementation((sql, params, callback) => callback(null, []));
        const login_data ={
                email: 'nonexistent@example.com',
                password: 'password123'
        }
        const response = await request(app).post('/login').send(login_data)
        expect(response.statusCode).toBe(401)
        expect(response.body).toHaveProperty('message', 'User not found');




    })
  });
  