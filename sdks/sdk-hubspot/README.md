# Hubspot OpenSDK

For list of public OpenAPIs provided by hubspot, see

https://api.hubspot.com/api-catalog-public/v1/apis

Hubspot's APISpec / official is actually quite terrible, for example there are no strong types for the properties of objects like Contact. Instead we get a `SimpleObjectWithAssociation` generic type with a untyped bag of `properties`
