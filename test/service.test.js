const chai = require('chai');
const chaiHttp = require('chai-http');
const { app, sequelize } = require('../app');
const { service } = require('../models');

chai.use(chaiHttp);
const expect = chai.expect;

describe('Service API', () => {

  describe('GET /services', () => {
    it('should return all services', async () => {
      const res = await chai.request(app).get('/api/service/list');
      expect(res).to.have.status(200);
      expect(res.body).to.be.an('object');
    });
  });

  describe('POST /services', () => {
    it('should create a new service', async () => {
      const newService = { name: 'New Service' };
      const res = await chai.request(app).post('/api/service').send(newService);
      expect(res).to.have.status(200);
      expect(res.body).to.be.an('object');
    });
  });

  describe('GET /services/:id', () => {
    it('should return a single service by ID', async () => {
      const existingService = await service.findOne();
      const res = await chai.request(app).get(`/api/service/${existingService.id}`);
      expect(res).to.have.status(200);
      expect(res.body).to.be.an('object');
    });

    it('should return 404 if service ID is not found', async () => {
      const nonExistentId = 9999;
      const res = await chai.request(app).get(`/api/service/${nonExistentId}`);
      expect(res).to.have.status(404);
    });
  });

});
