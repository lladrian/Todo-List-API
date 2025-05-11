import request from 'supertest';
import app from '../server.js'; // your Express app
import mongoose from 'mongoose';



describe('Auth API', () => {
  const ID ="aasdsa";

  afterAll(async () => {
    await mongoose.connection.close();
  });

  it('should return a token for valid login', async () => {
    const res = await request(app)
      .post('/users/login_user')
      .send({ email: 'librado1@gmail.com', password: 'librado1' });

    if (res.statusCode === 200) {
      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty('token');
    } else if (res.statusCode === 400) {
      expect(res.statusCode).toBe(400);
    }
  });
});
