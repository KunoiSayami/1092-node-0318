process.env.LOGGER_DISABLED = 'true';
import stop from './server';
import {describe, expect, test} from '@jest/globals'
import app from './app';
import supertest from 'supertest';

let requester = supertest(app);

describe('Test server', () => {

    test('Test get home page', async () => {
        let response = await requester.get('/');
        
        expect(response.status).toStrictEqual(200);
    });

    test('Test sqrt function', async () => {
        let response = await requester.post('/sqrt/9').send();
        expect(response.status).toStrictEqual(200);
        expect(response.body).toBeInstanceOf(Object);
        expect(response.body).toHaveProperty('status');
        expect(response.body.status).toStrictEqual(200);
        expect(response.body).toHaveProperty('result');
        expect(response.body.result).toStrictEqual('3');
    });


    test('Test sqrt NaN function', async () => {
        let response = await requester.post('/sqrt/Number').send();
        expect(response.status).toStrictEqual(400);
        expect(response.body).toBeInstanceOf(Object);
        expect(response.body).toHaveProperty('status');
        expect(response.body.status).toStrictEqual(400);
    });

    test('Test clients list request', async () => {
        let response = await requester.post('/clients').send();
        expect(response.status).toStrictEqual(200);
        expect(response.body).toBeInstanceOf(Object);
        expect(response.body).toHaveProperty('status');
        expect(response.body.status).toStrictEqual(200);
        expect(response.body).toHaveProperty('result');
        expect(Array.isArray(response.body.result)).toStrictEqual(true);
    });

    afterAll(() => {
        stop();
    })

});