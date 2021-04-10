import express from 'express';
import path from 'path';
import superagent from 'superagent';

const router = express.Router();

const config = require(path.resolve(process.cwd(), 'config.json'));


router.get('/', (req, res) => {
    res.render('index.html', {title: 'index'});
});

router.get('/clients', (req, res) => {
    res.render('clients.html', { title: 'clients' });
    //res.render('index.html');
});

router.get('/sqrt', (req, res) => {
    res.render('sqrt.html', { title: 'sqrt' });
});

router.post('/clients', async (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    const response = await superagent
        .post(config.remote.address)
        // https://stackoverflow.com/a/610415
        .set('Authorization', `Bearer ${config.remote.token}`)
        .send({action: 'query_online'});
    console.log(response.body);
    res.status(response.status).send(response.body);
});

router.post('/sqrt/:num', (req, res) => {

    let num = Number(req.params.num);

    let status = 200;
    let result = "";

    if (Number.isNaN(num)) {
        status = 400;
        result = "Please input a vaild number";
    }
    else {
        try {
            result = String(Math.sqrt(num));
        } catch (e) {
            status = 400;
            result = e.toString();
        }
    }

    let response = {status: status, result: result};

    console.debug(response);

    res.status(status).send(response);
});

export = router;
