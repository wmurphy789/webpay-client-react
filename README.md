```
yarn install
yarn start
```

# SSO JWT Token
- api_key is the client_id for the Webpay created from the Auth server
```
pay_load = {loan_number: 111111111, ssn: 1111, zip: 12345, api_key:"8d65ad0cdf8e3bc9d51039653123b851147c052c32d91b5dae17d8b171dd57b4"}
JWT.encode pay_load, nil, 'none'
```

# SSO Logic
1. Client sends Redirect with JWT token like: http://localhost:3001/login?token=<API Token>
2. Login page checks to see if token param exists
3. Auto login user via SSO to Auth server
4. The auth server checks to see if that user exists, if so, login user, else create account_holder in HQ and create user on the auth server
4. Use webpay

# Onboard New Client
See https://github.com/Ventanex/devDocs/wiki/Webpay-Setup
