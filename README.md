# myhabeetat-api

Web API for [MyHabeetat's cloud platform](https://myhabeetat.solidmation.com/) (including BGH Smart Control devices).
Live URL: https://myhabeetat.tmigone.com

Features:
- Endpoints that adapt MyHabeetat's cloud authentication to an OAuth 2.0 compliant login. This was created to do [Account Linking](https://developer.amazon.com/en-US/docs/alexa/account-linking/configure-authorization-code-grant.html) with [this](https://github.com/tmigone/alexa-skill-my-habeetat) Alexa custom Skill, but could also work with any service that requires OAuth authentication.
- Web API version of [myhabeetat](https://github.com/tmigone/myhabeetat/) library. This allows you to control your devices using HTTP requests.

Note: You don't need to deploy or configure this project if you want to control BGH Smart Control devices with the Alexa skill linked above. 

## Endpoints

Project's base URL: https://myhabeetat.tmigone.com

### Healthcheck
| Endpoint | URL | Parameters | Description |
| --------- | --------- | --------- | --------- |
| GET `/health` | https://myhabeetat.tmigone.com/health | none | Check if the API is up. |

### OAuth 2.0

For an overview of Alexa authorization code grant flow, visit this site: [Account Linking](https://developer.amazon.com/en-US/docs/alexa/account-linking/configure-authorization-code-grant.html)

| Endpoint | URL | Parameters | Description |
| --------- | --------- | --------- | --------- |
| GET `/v1/oauth/autorize` | https://myhabeetat.tmigone.com/v1/oauth/authorize | Querystring: `state`, `redirect_uri` | Present authorization UI |
| GET `/v1/oauth/autorize/callback` | https://myhabeetat.tmigone.com/v1/oauth/authorize/callback | Querystring: `state`, `redirect_uri`, `uname`, `psw` | Verifies credentials and presents authorization code |
| POST `/v1/oauth/access_token` | https://myhabeetat.tmigone.com/v1/oauth/access_token | Body: `code` | Verify codeand grant access token |

![](https://m.media-amazon.com/images/G/01/mobile-apps/dex/ask-accountlinking/auth-code-grant-flow-sequence._TTH_.png)

### API

HTTP API that interacts with MyHabeetat's cloud platform. For a detailed explanation of parameters, return values from exposed methods see here: https://github.com/tmigone/myhabeetat/#myhabeetat-methods

| Endpoint | URL | Parameters | Description |
| --------- | --------- | --------- | --------- |
| POST `/v1/api/login` | https://myhabeetat.tmigone.com/v1/api/login | Body: `email`, `password` | Get an auth token |
| GET `/v1/api/homes` | https://myhabeetat.tmigone.com/v1/api/homes | Body: `token` | Get available homes |
| GET `/v1/api/devices` | https://myhabeetat.tmigone.com/v1/api/devices | Body: `token`, `home` | Get available devices |
| GET `/v1/api/status` | https://myhabeetat.tmigone.com/v1/api/status | Body: `token`, `home`, `device` | Get device status |
| POST `/v1/api/status` | https://myhabeetat.tmigone.com/v1/api/status | Body: `token`, `model`, `endpoint`. Optional: `mode`, `fanMode`, `targetTemperature` | Set device status |
