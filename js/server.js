/**
 * Created by adyhasch on 1/16/15.
 */
var users = {
    // Alice is the only manager in the system
    alice: { username: 'alice', manager: true },
    bob:   { username: 'bob',   manager: false},
    carol: { username: 'carol', manager: false}
};

var url = require('url');
var http = require('http');

http.createServer(function(req, res) {
    try {
        // Grab the query parameters.
        var query = url.parse(req.url, true).query;

        // By default, return the guest user.
        var returnedUser = guest;
        if (query != null && query.user != null && users[query.user] != null) {
            // ... otherwise, use the super secret enterprise LDAP from above.
            returnedUser = users[query.user];
        }

        // Create the Firebase auth token for the payload that we would like
        // Firebase to treat as trusted.
        var token = tokenGenerator.createToken(returnedUser);

        // Send the signed token back to the client.
        res.writeHead(200, {
            'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'
        });
        res.end(JSON.stringify({firebaseAuthToken: token}));
    } catch(err) {
        console.log(err);
    };
}).listen(22222, "127.0.0.1");