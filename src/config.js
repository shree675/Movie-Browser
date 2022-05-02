const configs = {
    development: {
        SERVER_URI: "http://localhost:3000",
    },
    production: {
        SERVER_URI: "",
    },
};

// https://movieb-server.herokuapp.com

module.exports.config = configs[process.env.NODE_ENV];
