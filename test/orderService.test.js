const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../server'); // Assuming you have your web service in a file named app.js
const expect = chai.expect;

chai.use(chaiHttp);

describe('Order Management System', () => {
  // Test the GET all orders endpoint
  describe('GET /orders', () => {
    it('should return all orders', (done) => {
      chai
        .request(app)
        .get('/api/order/list')
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.property('data');
          // Add more assertions based on your requirements
          done();
        });
    });
  });

  // Test the POST create order endpoint
  describe('POST /orders', () => {
    it('should create a new order', (done) => {
      const newOrder = {
        datetime: '2023-07-27T22:34:56.789Z',
        totalfee: 150,
        services: [
          789,
        ],
      };

      chai.request(app)
        .post('/api/order')
        .send(newOrder)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.property('data');
          done();
        });
    });

    it('should return an error on creation within 3 hours of a pre-existing order', (done) => {
      const existingOrder = {
        datetime: '2023-07-27T23:34:56.789Z', // This is within 3 hours of the first order (id: 223)
        totalfee: 200,
        services: [
          456
        ],
      };

      chai.request(app)
        .post('/api/order')
        .send(existingOrder)
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.property('message').to.equal('Cannot create or update order within 3 hours of a pre-existing order.');
          done();
        });
    });
  });

  // Test the PUT update order endpoint
  describe('PUT /orders/:id', () => {
    it('should update an existing order', (done) => {
      const updatedOrder = {
        datetime: '2022-12-02T00:00:00.000Z',
      };

      chai.request(app)
        .put('/api/order/6')
        .send(updatedOrder)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.be.an('object');
          expect(res.body.data).to.have.property('datetime').to.equal('2022-12-02T00:00:00.000Z');
          done();
        });
    });

    it('should return an error on updating within 3 hours of a pre-existing order', (done) => {
      const existingOrder = {
        datetime: '2022-12-02T00:00:00.000Z', // This is within 3 hours of the first order (id: 223)
      };

      chai.request(app)
        .put('/api/order/7')
        .send(existingOrder)
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.property('message').to.equal('Cannot create or update order within 3 hours of a pre-existing order.');
          done();
        });
    });
  });

  // Test the DELETE order endpoint
  describe('DELETE /orders/:id', () => {
    it('should delete an existing order', (done) => {
      chai.request(app)
        .delete('/api/order/5')
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.property('data').to.equal('Order deleted successfully');
          done();
        });
    });

    it('should return an error if trying to delete a non-existing order', (done) => {
      chai.request(app)
        .delete('/api/order/5')
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.property('message').to.equal('Invalid order reference!');
          done();
        });
    });
  });
});