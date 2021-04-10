import chai from 'chai';
import chai_http from 'chai-http';
import { response } from 'express';
import {app, stop} from "./app";

chai.use(chai_http);

let except = chai.expect;

let requester = chai.request(app);

requester.get('/').send().end(function (err, res) {
    //console.log(res);
    except(err).to.be.null;
    except(res).to.have.status(200);
});

requester.post('/sqrt/9').send().end((err, res) => {
    except(err).to.be.null;
    except(res).to.have.status(200);
    except(res.body).instanceOf(Object);
    except(res.body).to.have.property('status');
    except(res.body).to.have.status(200);
    except(res.body).to.have.property('result');
    except(res.body.result).to.eq('3');
});

requester.post('/sqrt/jf01').send().end((err, res) => {
    except(err).to.be.null;
    except(res).to.have.status(400);
});

requester.post('/clients').send().end((err, res) => {
    except(err).to.be.null;
    except(res).to.have.status(200);
    except(res.body).instanceOf(Object);
    except(res.body).to.have.property('status');
    except(res.body).to.have.status(200);
    except(res.body).to.have.property('result');
    // https://github.com/chaijs/chai/issues/1226
    except(res.body.result).to.be.an('array');
});

stop();
