
it('should fail to register a new user when required fields are missing', async () => {
    const incompleteData = {
      email: `john${Date.now()}@example.com`,
      password: 'password123'
    };

    const response = await request(app)
      .post('/register')
      .send(incompleteData);

    expect(response.statusCode).toBe(400);
    expect(response.body).toHaveProperty('message', 'Name, email, password, and address information are required');
  });

  it('should handle database errors gracefully', async () => {
    db.query.mockImplementation((sql, params, callback) => callback(new Error('Database error'), null));
    const userData = {
      name: 'Jane Doe',
      email: `jane${Date.now()}@example.com`,
      password: 'password123',
      address_street: '456 Oak St',
      address_city: 'Anytown',
      address_postal_code: '67890'
    };

    const response = await request(app)
      .post('/register')
      .send(userData);

    expect(response.statusCode).toBe(500);
    expect(response.body).toHaveProperty('message', 'Error registering new user');
  });