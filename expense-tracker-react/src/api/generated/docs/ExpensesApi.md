# ExpensesApi

All URIs are relative to *http://localhost:8088/api/v1*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**createExpense**](#createexpense) | **POST** /expenses | |
|[**deleteExpense**](#deleteexpense) | **DELETE** /expenses/{expense-id} | |
|[**findAllExpense**](#findallexpense) | **GET** /expenses | |
|[**findExpenseById**](#findexpensebyid) | **GET** /expenses/{expense-id} | |
|[**getSumExpenses**](#getsumexpenses) | **GET** /expenses/getSumExpenses | |
|[**updateExpense**](#updateexpense) | **PUT** /expenses/{expense-id} | |

# **createExpense**
> ExpenseResponseDto createExpense(expenseRequestDto)


### Example

```typescript
import {
    ExpensesApi,
    Configuration,
    ExpenseRequestDto
} from './api';

const configuration = new Configuration();
const apiInstance = new ExpensesApi(configuration);

let expenseRequestDto: ExpenseRequestDto; //

const { status, data } = await apiInstance.createExpense(
    expenseRequestDto
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **expenseRequestDto** | **ExpenseRequestDto**|  | |


### Return type

**ExpenseResponseDto**

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

# **deleteExpense**
> object deleteExpense()


### Example

```typescript
import {
    ExpensesApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new ExpensesApi(configuration);

let expenseId: number; // (default to undefined)

const { status, data } = await apiInstance.deleteExpense(
    expenseId
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **expenseId** | [**number**] |  | defaults to undefined|


### Return type

**object**

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | OK |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **findAllExpense**
> PageResponseExpenseResponseDto findAllExpense()


### Example

```typescript
import {
    ExpensesApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new ExpensesApi(configuration);

let page: number; // (optional) (default to 0)
let size: number; // (optional) (default to 10)

const { status, data } = await apiInstance.findAllExpense(
    page,
    size
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **page** | [**number**] |  | (optional) defaults to 0|
| **size** | [**number**] |  | (optional) defaults to 10|


### Return type

**PageResponseExpenseResponseDto**

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | OK |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **findExpenseById**
> object findExpenseById()


### Example

```typescript
import {
    ExpensesApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new ExpensesApi(configuration);

let expenseId: number; // (default to undefined)

const { status, data } = await apiInstance.findExpenseById(
    expenseId
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **expenseId** | [**number**] |  | defaults to undefined|


### Return type

**object**

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | OK |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **getSumExpenses**
> SumExpenseDto getSumExpenses()


### Example

```typescript
import {
    ExpensesApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new ExpensesApi(configuration);

const { status, data } = await apiInstance.getSumExpenses();
```

### Parameters
This endpoint does not have any parameters.


### Return type

**SumExpenseDto**

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | OK |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **updateExpense**
> ExpenseResponseDto updateExpense(expenseRequestDto)


### Example

```typescript
import {
    ExpensesApi,
    Configuration,
    ExpenseRequestDto
} from './api';

const configuration = new Configuration();
const apiInstance = new ExpensesApi(configuration);

let expenseId: number; // (default to undefined)
let expenseRequestDto: ExpenseRequestDto; //

const { status, data } = await apiInstance.updateExpense(
    expenseId,
    expenseRequestDto
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **expenseRequestDto** | **ExpenseRequestDto**|  | |
| **expenseId** | [**number**] |  | defaults to undefined|


### Return type

**ExpenseResponseDto**

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

