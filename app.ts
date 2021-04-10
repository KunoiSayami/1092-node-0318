import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import body from 'body-parser';
import nunjucks from 'nunjucks';

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const config = require(path.resolve(process.cwd(), 'config.json'));

const app = express();

// Check server is running under development mode
let dev_mode = process.argv.includes('--dev');
if (dev_mode) {
    console.debug('Server running in dev mode');
}

nunjucks.configure('views', {
    autoescape: true,
    express: app,
    noCache: dev_mode,
});
if (process.argv.includes('--disable-logger')) {
    app.use(logger('dev'));
}
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
//app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// error handler
app.use((err, req, res, next) => {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

function stop() {
    server.close();
}

// Set listen port from configure file OR environment OR default 8000
let server = app.listen(config.server.port || process.env.SERVER_PORT || 8000);
module.exports
export default app;
//export let stop = server.close;
export {app, stop};