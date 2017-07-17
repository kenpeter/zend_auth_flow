## Intro
A ticket viewer which uses some of the Zendesk API. Tested on node 8.1.3. It should be working on node 8+

## Pre-install

### Install nvm
I personally use nvm to switch versions of nodejs. You can find detail instruction here:  https://github.com/creationix/nvm

Clone the nvm to your home directory.
~~~~
cd ~
~~~~
~~~~
git clone https://github.com/creationix/nvm.git .nvm
~~~~

Add the following
~~~~
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh" # This loads nvm
~~~~

to your ```~/.bashrc``` or ```~/.profile``` or ```~/.zshrc```


Install a particular version of node
~~~~
nvm install 8.1.3
~~~~

Check your node version, it should be something like version 8.1.3
~~~~
node -v
~~~~

After the actions above. ```npm``` (what is [npm](https://docs.npmjs.com/getting-started/what-is-npm)?) should be installed as well.

### Install yarn (optional, but recommend)
If you want to use yarn, like I do. Head over to https://yarnpkg.com/lang/en/docs/install/

Install yarn on mac
~~~~
https://yarnpkg.com/lang/en/docs/install/#mac-tab
~~~~

Install yarn on linux
~~~~
https://yarnpkg.com/lang/en/docs/install/#linux-tab
~~~~

## Install necessary packages for this app
~~~~
yarn install
~~~~
or
~~~~
npm install
~~~~

## Run
~~~~
node zend_auth_flow.js
~~~~

then
load ```http://localhost:8015``` in browser. Why port 8015? Because I have other apps running from port 8000.


## How does this little app work?

### Short version:
getAccessCode -> GetAccessToken -> doHttpRequest with the token

Based on this [tutorial](https://help.zendesk.com/hc/en-us/articles/229488968)

### Long version:
![alt img](https://github.com/kenpeter/zend_auth_flow/raw/master/misc/zend_auth_flow_homeRoute.png)

When someone load http://localhost:8015 in browser, this app will check whether you have a access token.

#### When you don't have a token
If you do not have access token, it will redirect to a Zendesk login page. The URL may look like this:

~~~~
https://kenpeter4444.zendesk.com/access/unauthenticated?client_id=zend_auth_flow&return_to=https%3A%2F%2Fkenpeter4444.zendesk.com%2Foauth%2Fauthorizations%2Fnew%3Fresponse_type%3Dcode%26client_id%3Dzend_auth_flow%26scope%3Dread%2520write
~~~~

where you have a chance to input username and password

Please use the following dummy detail to login, to gain access to the api.

```username: figo2478@gmail.com```

```password: Kenpeter4444!```

![alt img](https://github.com/kenpeter/zend_auth_flow/raw/master/misc/login.png)

After you press the submit button, you will be redirected back to the app's home page. You should be able to see list of tickets.

You can also decline it, by pressing the 'Cancel' button on the login form. I found that, at the time, when I pressed the 'Cancel' button, Zendesk does not redirect myself back to my app. So......... I think you better not to decline it. :)

#### When you have a token
If you have the access token, it will try to get the first 25 tickets from Zendesk api and display it. During fetching this 25 tickets, if there is an error, it will redirect back to the home page. The app will try to get access code, then get access token, then list tickets.


![alt img](https://github.com/kenpeter/zend_auth_flow/raw/master/misc/zend_auth_flow_singleTicketRoute.png)

For single ticket route, the diagram should be straight forward. I will skip the explanation here.


## Routes

* http://localhost:8015/. This is the home route. It lists 25 tickets and allow you to navigate back and forth.

* http://localhost:8015/tickets/:id. This is the individual ticket route.

* http://localhost:8015/handleUserDecision. When user authorise or decline api access to zendesk, a token will be appended to this URL or error message is appended if declined.

* http://localhost:8015/getNewToken. Allow you to get a new token for easy testing.


## Test
This little app must be running first, then we run all the tests.

In this project directory, ```node zend_auth_flow.js``` to launch the app. The server is listening to port 8015. So you can access this little app via http://localhost:8015

Now run the test: ```yarn test``` or ```npm test```


## Comments
Extensive comments are provided, so even you don't know much about Nodejs. It should help to understand part of it. It is also a good chance to learn some Nodejs. :)


## Limitation


### Limit 1
This projects use eslint to lint the source code. Eslint is not able to support async/await well. At the time, if you use atom or other similar editors, and you use eslint with your editor. You will constantly get an error notification. Please ignore those errors, as the code still run.

### Limit 2
Originally, I stored access token in cookie. Later when I start to write test cases. I found that it is difficult to test route that requires access token.

e.g. If we test individual route like ````http://localhost:8015/tickets/1````, we need to somehow modify the internal variable which store the access token. I tested ````proxyquire```` and ````rewire```` npm package. It is just not possible. (At least I don't know how to)

So I decide to append the access token in URL and I can access it easily in testing.

### Limit 3
One of the test case, getTotalTicketNum.js. I hard coded total number = 103. This allows me to easily to test the functionality of retrieving total ticket number.

### Limit 4
There is a [node-zendesk](https://github.com/blakmatrix/node-zendesk) library on Github. If I use that I am able to reduce lots of code and it will make my code base looks simpler. I picked the access token and API URL implementation. Since then, I have a better understanding how the Zendesk API works under the hook. The logic is in fact simple. Most importantly I learnt a ton.

## Ref
* https://help.zendesk.com/hc/en-us/articles/229488968
* https://www.codementor.io/noddy/cookie-management-in-express-js-du107rmna
* https://stackoverflow.com/questions/19035373/how-do-i-redirect-in-expressjs-while-passing-some-context
* https://stackoverflow.com/questions/17007997/how-to-access-the-get-parameters-after-in-express

* https://stackoverflow.com/questions/6432693/post-data-with-request-module-on-node-js
* https://support.zendesk.com/hc/en-us/articles/203663836-Using-OAuth-authentication-with-your-application
* https://scotch.io/tutorials/use-ejs-to-template-your-node-application
* https://glebbahmutov.com/blog/how-to-correctly-unit-test-express-server/

* https://developer.zendesk.com/rest_api/docs/core/oauth_tokens
* https://mochajs.org/#timeouts
* https://www.youtube.com/watch?v=dEaUikT1-R0
* https://medium.com/@bill_broughton/testing-with-authenticated-routes-in-express-6fa9c4c335ca

* https://stackoverflow.com/questions/10834796/validate-that-a-string-is-a-positive-integer
