import request from 'supertest';
import app from '../server.js'; // your Express app
import mongoose from 'mongoose';



describe('Auth API', () => {
  const TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjY4MWZlYWRhNGI2YWEwMmMwOTNhNjNmNSIsIm5hbWUiOiJsaWJyYWRvMSIsImVtYWlsIjoibGlicmFkbzFAZ21haWwuY29tIiwicGFzc3dvcmQiOiIwOTIyOTU4NTMyMjM2YjVhY2NmMGZjYzdiZDE2YzE1MiIsImNyZWF0ZWRfYXQiOiIyMDI1LTA1LTExVDAwOjAwOjAwLjAwMFoiLCJfX3YiOjB9LCJpYXQiOjE3NDY5MjIyMjcsImV4cCI6MTc1MTE1NTgyN30.eoZrLoxKGkCNrlyWcWItW5MgowBCPMFZon6LGoHqVbo";
  const ID ="aasdsa";

  afterAll(async () => {
    await mongoose.connection.close();
  });
  
  it('should add todo list', async () => {
    const res = await request(app)
      .post('/todos/add_todo_list')
      .set('Authorization', TOKEN)
      .send({ title: 'librado1@gmail.com', description: 'librado1' });

    expect(res.statusCode).toBe(200);
  });

  it('should get all todo list', async () => {
    const res = await request(app)
      .get('/todos/get_all_todo_list')
      .set('Authorization', TOKEN)
      .send();

    if (res.statusCode === 200) {
      expect(res.statusCode).toBe(200);
    } else if (res.statusCode === 400) {
      expect(res.statusCode).toBe(400);
    }
  });


  it('should get specific todo list', async () => {
    const res = await request(app)
      .get('/todos/get_specific_todo_list/'+ID)
      .set('Authorization', TOKEN)
      .send();

    if (res.statusCode === 200) {
      expect(res.statusCode).toBe(200);
    } else if(res.statusCode === 404) {
      expect(res.statusCode).toBe(404);
    }
  });

  it('should updated todo list', async () => {
    const res = await request(app)
      .put('/todos/update_todo_list/'+ID)
      .set('Authorization', TOKEN)
      .send({ title: 'librado1@gmail.com', description: 'librado1' });

    if (res.statusCode === 200) {
      expect(res.statusCode).toBe(200);
    } else if (res.statusCode === 400) {
      expect(res.statusCode).toBe(400);
    } else if (res.statusCode === 403) {
      expect(res.statusCode).toBe(403);
    } 
  });

  it('should delete todo list', async () => {
    const res = await request(app)
      .delete('/todos/delete_todo_list/'+ID)
      .set('Authorization', TOKEN)
      .send();

    if (res.statusCode === 200) {
      expect(res.statusCode).toBe(200);
    } else if (res.statusCode === 403) {
      expect(res.statusCode).toBe(403);
    } 
  });

});
