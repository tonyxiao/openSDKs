
# Salesforce OpenSDK

See 

- https://help.salesforce.com/s/articleView?id=sf.integrate_what_is_api.htm&type=5
- https://developer.salesforce.com/docs/atlas.en-us.api_rest.meta/api_rest/intro_rest.htm
- https://developer.salesforce.com/docs/atlas.en-us.api_rest.meta/api_rest/openapi_beta.htm

One notable challenge with Salesforce is that their OpenAPI spec can be instance-specific, requires admin to enable a 
beta feature flag and also requires authentication to be able to access in the first place. 

We will need to make it easy for people to use the SDK together with their own sfdc OpenAPI spec, instead of the bundled
standard one that doesn't take into account things like custom objects which would likely alter the OpenAPI spec

```bash
❯ curl -X POST $SALESFORCE_INSTANCE_URL/services/data/v59.0/async/specifications/oas3
# Then wait for the spec to generate
# Then download it...

```