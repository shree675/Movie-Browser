const configs = {
  development: {
    SERVER_URI: 'http://localhost:5000',
  },
  production: {
    SERVER_URI: 'http://localhost:5000',
  },
};

// https://movieb-server.herokuapp.com
  
module.exports.config = configs[process.env.NODE_ENV];