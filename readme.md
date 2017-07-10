## Intro

Tested on node 8.1.3. Node 8+ should be working.


## Pre-install

## Install

yarn install

## Run
node zend_auth_flow.js, then load http://localhost:8015


## Authentication

The token will be expired after some time. When launching the site: http://localhost:8015, you may
be redirected to a page where you input your username and password for zendesk account. e.g.

https://kenpeter4444.zendesk.com/access/unauthenticated?client_id=zend_auth_flow&return_to=https%3A%2F%2Fkenpeter4444.zendesk.com%2Foauth%2Fauthorizations%2Fnew%3Fresponse_type%3Dcode%26client_id%3Dzend_auth_flow%26scope%3Dread%2520write

Use this detail to login:
username: figo2478@gmail.com
password: Kenpeter4444!


https://help.zendesk.com/hc/en-us/articles/229488968
https://www.codementor.io/noddy/cookie-management-in-express-js-du107rmna
https://stackoverflow.com/questions/19035373/how-do-i-redirect-in-expressjs-while-passing-some-context
https://stackoverflow.com/questions/17007997/how-to-access-the-get-parameters-after-in-express

https://stackoverflow.com/questions/6432693/post-data-with-request-module-on-node-js
https://support.zendesk.com/hc/en-us/articles/203663836-Using-OAuth-authentication-with-your-application
https://scotch.io/tutorials/use-ejs-to-template-your-node-application
