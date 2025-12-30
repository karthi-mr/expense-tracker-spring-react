# AuthenticationApi

All URIs are relative to *http://localhost:8088/api/v1*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**activateAccount**](#activateaccount) | **GET** /auth/activate-account | |
|[**authenticate**](#authenticate) | **POST** /auth/authenticate | |
|[**register**](#register) | **POST** /auth/register | |

# **activateAccount**
> activateAccount()


### Example

```typescript
import {
    AuthenticationApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new AuthenticationApi(configuration);

let token: string; // (default to undefined)

const { status, data } = await apiInstance.activateAccount(
    token
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **token** | [**string**] |  | defaults to undefined|


### Return type

void (empty response body)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: Not defined


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | OK |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **authenticate**
> AuthenticationResponse authenticate(authenticationRequest)


### Example

```typescript
import {
    AuthenticationApi,
    Configuration,
    AuthenticationRequest
} from './api';

const configuration = new Configuration();
const apiInstance = new AuthenticationApi(configuration);

let authenticationRequest: AuthenticationRequest; //

const { status, data } = await apiInstance.authenticate(
    authenticationRequest
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **authenticationRequest** | **AuthenticationRequest**|  | |


### Return type

**AuthenticationResponse**

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | OK |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **register**
> object register(registrationRequest)


### Example

```typescript
import {
    AuthenticationApi,
    Configuration,
    RegistrationRequest
} from './api';

const configuration = new Configuration();
const apiInstance = new AuthenticationApi(configuration);

let registrationRequest: RegistrationRequest; //

const { status, data } = await apiInstance.register(
    registrationRequest
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **registrationRequest** | **RegistrationRequest**|  | |


### Return type

**object**

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**202** | Accepted |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

