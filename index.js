const app = require('./app');

const start = async () => {

    app.listen(4000, () => {
        console.log("listening at 4000 !!!!");
    });

}

start();