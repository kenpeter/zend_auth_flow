var config = {};

config.port = 8015;
config.my_zend_root_url = 'https://kenpeter4444.zendesk.com';
config.client_id = 'zend_auth_flow';
config.redirect_uri = `http://localhost:${config.port}/handle_user_decision`;

config.client_secret = '568769006d674d85b213d1c78e4c0c4484a51bbbff007e0f1e18fb3e6c1af77c';

module.exports = config;
