# SumExpenseDto


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**totalExpenses** | **number** |  | [optional] [default to undefined]
**last7DaysExpense** | **number** |  | [optional] [default to undefined]
**last30DaysExpense** | **number** |  | [optional] [default to undefined]
**last365DaysExpense** | **number** |  | [optional] [default to undefined]
**dailyExpenseSummaryDtos** | [**Array&lt;DailyExpenseSummaryDto&gt;**](DailyExpenseSummaryDto.md) |  | [optional] [default to undefined]
**categoryExpenseSummaryDtos** | [**Array&lt;CategoryExpenseSummaryDto&gt;**](CategoryExpenseSummaryDto.md) |  | [optional] [default to undefined]

## Example

```typescript
import { SumExpenseDto } from './api';

const instance: SumExpenseDto = {
    totalExpenses,
    last7DaysExpense,
    last30DaysExpense,
    last365DaysExpense,
    dailyExpenseSummaryDtos,
    categoryExpenseSummaryDtos,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
