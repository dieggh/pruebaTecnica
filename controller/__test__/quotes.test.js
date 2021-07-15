
const request = require('supertest')
const app = require('../../app');

it('if can fetch bestOptionsPerYear', async () => {

    const response = await request(app).get('/api/bestOptionsPerYear/2008').send().expect(200);
    
    expect(typeof response.body.bestRC).toEqual('object')
    expect(typeof response.body.bestLow).toEqual('object')
    expect(typeof response.body.bestMid).toEqual('object')
    expect(typeof response.body.bestHigh).toEqual('object')

});


it('if a error occurs if year is not in the request', async () => {
    await request(app).get('/api/bestOptionsPerYear/').send().expect(404);
});

it('if a error occurs if year is not an number', async () => {
    const response = await request(app).get('/api/bestOptionsPerYear/asas').send().expect(400);    
    expect(response.body.errors.length).toBeGreaterThan(0)
});


it('if there is nothing relative to the year the reduce function is not executed', async () => {
    await request(app).get('/api/bestOptionsPerYear/1999').send().expect(200);        
});


it('if can fetch quoteCar and get and array with length of 4', async () => {

    const response = await request(app).get('/api/quoteCar/Dodge/2008/true').send().expect(200);
    
    expect(response.body.length).toEqual(4);

});


it('if a error occurs if some param is missing', async () => {
    await request(app).get('/api/quoteCar/Dodge/true').send().expect(404);
});

it('400 if some param is invalid', async () => {
    const response = await request(app).get('/api/quoteCar/Dodge/asas/hola').send().expect(400);    
    expect(response.body.errors.length).toBeGreaterThan(0);
});

it('if a error occurs if year is not an number', async () => {
    const response = await request(app).get('/api/quoteCar/Dodge/asas/true').send().expect(400);    
    expect(response.body.errors.length).toBeGreaterThan(0);
});


it('if there is nothing relative to the year or brand the reduce function is not executed', async () => {
    await request(app).get('/api/quoteCar/Dodge/1880/true').send().expect(200);        
});