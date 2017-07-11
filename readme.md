## Intro

Tested on node 8.1.3. Node 8+ should be working.

## Pre-install

### Install nvm
I personally use nvm to run / switch multiple versions of nodejs. You can find the instruction here:  https://github.com/creationix/nvm

Install nvm
~~~~
git clone https://github.com/creationix/nvm.git .nvm
~~~~

Add the following to ~~~~ ~/.bashrc, ~/.profile, or ~/.zshrc ~~~~
~~~~
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh" # This loads nvm
~~~~

Install the latest node
~~~~
nvm install node
~~~~

Check your node version, it should be someting like version 8+
~~~~
node -v
~~~~

After this npm should be installed as well.

If you want to use yarn, like I do. Head over to https://yarnpkg.com/lang/en/docs/install/

## Install

~~~~
yarn install
~~~~

or

~~~~
npm install
~~~~

## Run
node zend_auth_flow.js, then load http://localhost:8015
You can also run nodemon zend_auth_flow.js, any change on source code will be reflected straight, no need to restart server.


## Authentication

The token will be expired after some time. When launching the site: http://localhost:8015, you may
be redirected to a page where you input your username and password for zendesk account. e.g.

https://kenpeter4444.zendesk.com/access/unauthenticated?client_id=zend_auth_flow&return_to=https%3A%2F%2Fkenpeter4444.zendesk.com%2Foauth%2Fauthorizations%2Fnew%3Fresponse_type%3Dcode%26client_id%3Dzend_auth_flow%26scope%3Dread%2520write

Use this detail to login:
username: figo2478@gmail.com
password: Kenpeter4444!



## Test
This little app must be running in order to be tested.

In this project directory, ~~~ yarn start ~~~ or ~~~~ npm start ~~~~ or ~~~~ node zend_auth_flow.js ~~~~to launch the app. The server is listening to port 8015. So you can access this little app via http://localhost:8015


Now run the test: ~~~ yarn test ~~~~ or ~~~~ npm test ~~~~

## Ref
https://help.zendesk.com/hc/en-us/articles/229488968
https://www.codementor.io/noddy/cookie-management-in-express-js-du107rmna
https://stackoverflow.com/questions/19035373/how-do-i-redirect-in-expressjs-while-passing-some-context
https://stackoverflow.com/questions/17007997/how-to-access-the-get-parameters-after-in-express

https://stackoverflow.com/questions/6432693/post-data-with-request-module-on-node-js
https://support.zendesk.com/hc/en-us/articles/203663836-Using-OAuth-authentication-with-your-application
https://scotch.io/tutorials/use-ejs-to-template-your-node-application
https://glebbahmutov.com/blog/how-to-correctly-unit-test-express-server/


## Questions to ask

*
Do we use oauth client. e.g. register my app to the api then use and always use that single username password to connect to api.

*
If a user declines oauth client authentication, click the cancel button never do anything.

https://kenpeter4444.zendesk.com/access/unauthenticated?client_id=zend_auth_flow&return_to=https%3A%2F%2Fkenpeter4444.zendesk.com%2Foauth%2Fauthorizations%2Fnew%3Fresponse_type%3Dcode%26client_id%3Dzend_auth_flow%26scope%3Dread%2520write
