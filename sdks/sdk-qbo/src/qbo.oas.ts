import {OpenAPISpec} from '@opensdks/runtime'
import {createDocument, jsonOperation, z} from '@opensdks/util-zod'

/**
 * TODO: Finish populating me
 * https://developer.intuit.com/app/developer/qbo/docs/develop/webhooks/entities-and-operations-supported
 */
export const entityNameSchema = z
  .enum([
    'Account',
    'Purchase',
    'JournalEntry',
    'Invoice',
    'Payment',
    'Bill',
    'BillPayment',
    'CreditMemo',
    'Deposit',
    'Transfer',
    'Vendor',
    'Customer',
    'Item',
    'CompanyInfo',
    'BalanceSheet',
    'ProfitAndLoss',
  ])
  .openapi({ref: 'EntityName'})
export type EntityName = z.infer<typeof entityNameSchema>

export const webhookPayloadSchema = z.object({
  eventNotifications: z.array(
    z.object({
      realmId: z.string(),
      dataChangeEvent: z.object({
        entities: z.array(
          z.object({
            name: entityNameSchema,
            id: z.string(),
            operation: z.enum(['Create', 'Update', 'Delete', 'Merge', 'Void']),
            lastUpdated: z.string(),
            /** deletedId (only for Merge events): The ID of the entity that was deleted and merged. */
            deletedId: z.string().optional(),
          }),
        ),
      }),
    }),
  ),
})

export const metaDataSchema = z.object({
  CreateTime: z.string(),
  LastUpdatedTime: z.string(),
})

export const currencyRefSchema = z.object({
  name: z.string(),
  value: z.string(),
})

export const entityRefSchema = z.object({
  value: z.string(),
  name: z.string(),
  type: z.string().optional(),
})

export const accountRefSchema = z.object({
  value: z.string(),
  name: z.string(),
})

export const taxCodeRefSchema = z.object({
  value: z.string(),
})

export const customerRefSchema = z.object({
  value: z.string(),
  name: z.string(),
})

export const paymentMethodRefSchema = z.object({
  value: z.string(),
})

// Report Types
export const reportPayloadSchema = z
  .object({
    Header: z.object({
      Time: z.string(),
      ReportName: z.string(),
      DateMacro: z.string(),
      StartPeriod: z.string(),
      EndPeriod: z.string(),
      Currency: z.string(),
      Option: z.array(
        z.object({
          Name: z.string(),
          Value: z.string(),
        }),
      ),
    }),
    Columns: z.object({
      Column: z.array(
        z.object({
          ColTitle: z.string(),
          ColType: z.string(),
        }),
      ),
    }),
    Rows: z.object({
      Row: z.array(
        z.object({
          Header: z
            .object({
              ColData: z.array(
                z.object({
                  value: z.string(),
                }),
              ),
            })
            .optional(),
          ColData: z
            .array(
              z.object({
                value: z.string(),
                id: z.string().optional(),
              }),
            )
            .optional(),
          type: z.string(),
          group: z.string().optional(),
          Summary: z
            .object({
              ColData: z.array(
                z.object({
                  value: z.string(),
                }),
              ),
            })
            .optional(),
          Rows: z
            .object({
              Row: z.array(
                z.object({
                  Header: z
                    .object({
                      ColData: z.array(
                        z.object({
                          value: z.string(),
                        }),
                      ),
                    })
                    .optional(),
                  ColData: z
                    .array(
                      z.object({
                        value: z.string(),
                        id: z.string().optional(),
                      }),
                    )
                    .optional(),
                  type: z.string(),
                  group: z.string().optional(),
                  Summary: z
                    .object({
                      ColData: z.array(
                        z.object({
                          value: z.string(),
                        }),
                      ),
                    })
                    .optional(),
                  Rows: z
                    .object({
                      Row: z.array(
                        z.object({
                          // Further nesting can be added here if needed
                        }),
                      ),
                    })
                    .optional(),
                }),
              ),
            })
            .optional(),
        }),
      ),
    }),
  })
  .openapi({ref: 'Report'})

export const companyInfoSchema = z
  .object({
    CompanyName: z.string(),
    LegalName: z.string(),
    CompanyAddr: z.object({
      Id: z.string(),
      Line1: z.string(),
      City: z.string(),
      Country: z.string(),
      CountrySubDivisionCode: z.string(),
      PostalCode: z.string(),
    }),
    CustomerCommunicationAddr: z.object({
      Id: z.string(),
      Line1: z.string(),
      City: z.string(),
      Country: z.string(),
      CountrySubDivisionCode: z.string(),
      PostalCode: z.string(),
    }),
    LegalAddr: z.object({
      Id: z.string(),
      Line1: z.string(),
      City: z.string(),
      Country: z.string(),
      CountrySubDivisionCode: z.string(),
      PostalCode: z.string(),
    }),
    PrimaryPhone: z.object({
      FreeFormNumber: z.string(),
    }),
    CompanyStartDate: z.string(),
    FiscalYearStartMonth: z.string(),
    Country: z.string(),
    Email: z.object({
      Address: z.string(),
    }),
    WebAddr: z.object({}),
    SupportedLanguages: z.string(),
    NameValue: z.array(
      z.object({
        Name: z.string(),
        Value: z.string(),
      }),
    ),
    domain: z.string(),
    sparse: z.boolean(),
    Id: z.string(),
    SyncToken: z.string(),
    MetaData: metaDataSchema,
  })
  .openapi({ref: 'CompanyInfo'})

// Common types
export const baseEntitySchema = z
  .object({
    Id: z.string(),
    /** QBO */
    domain: z.string(),
    // https://developer.intuit.com/app/developer/qbo/docs/develop/explore-the-quickbooks-online-api/change-data-capture#using-change-data-capture
    status: z.literal('deleted').optional(),
    Metadata: metaDataSchema,
  })
  .passthrough()

export const entitySchema = z.object({
  Type: z.string(),
  EntityRef: entityRefSchema,
})

// Company Info
export const getCompanyInfoPayloadSchema = z.object({
  CompanyInfo: companyInfoSchema,
  time: z.string(),
})

// Account
export const accountSchema = baseEntitySchema
  .extend({
    AccountSubType: z.string(),
    AccountType: z.string(),
    Active: z.boolean(),
    Classification: z.union([
      z.literal('Asset'),
      z.literal('Equity'),
      z.literal('Expense'),
      z.literal('Liability'),
      z.literal('Revenue'),
    ]),
    CurrencyRef: currencyRefSchema,
    CurrentBalance: z.number(),
    CurrentBalanceWithSubAccounts: z.number(),
    FullyQualifiedName: z.string(),
    Name: z.string(),
    SubAccount: z.boolean(),
    SyncToken: z.string(),
    sparse: z.boolean(),
  })
  .openapi({ref: 'Account'})

export const vendorSchema = baseEntitySchema
  .extend({
    DisplayName: z.string(),
    PrintOnCheckName: z.string().optional(),
  })
  .openapi({ref: 'Vendor'})

// Purchase (aka expense?)
export const purchaseSchema = baseEntitySchema
  .extend({
    AccountRef: accountRefSchema,
    PaymentMethodRef: paymentMethodRefSchema.optional(),
    PaymentType: z.string(),
    EntityRef: entityRefSchema.optional(),
    Credit: z.boolean().optional(),
    TotalAmt: z.number(),
    PurchaseEx: z.object({
      any: z.array(
        z.object({
          name: z.string(),
          declaredType: z.string(),
          scope: z.string(),
          value: z.object({
            Name: z.string(),
            Value: z.string(),
          }),
          nil: z.boolean(),
          globalScope: z.boolean(),
          typeSubstituted: z.boolean(),
        }),
      ),
    }),
    sparse: z.boolean(),
    SyncToken: z.string(),
    TxnDate: z.string(),
    CurrencyRef: currencyRefSchema,
    PrivateNote: z.string(),
    Line: z.array(
      z.object({
        Id: z.string(),
        Description: z.string(),
        Amount: z.number(),
        DetailType: z.string(),
        AccountBasedExpenseLineDetail: z
          .object({
            AccountRef: accountRefSchema,
            BillableStatus: z.string(),
            TaxCodeRef: taxCodeRefSchema,
            CustomerRef: customerRefSchema.optional(),
          })
          .optional(),
      }),
    ),
    DocNumber: z.string().optional(),
  })
  .openapi({ref: 'Purchase'})

// Invoice
export const invoiceSchema = baseEntitySchema
  .extend({
    AllowIPNPayment: z.boolean(),
    AllowOnlineACHPayment: z.boolean(),
    AllowOnlineCreditCardPayment: z.boolean(),
    AllowOnlinePayment: z.boolean(),
    ApplyTaxAfterDiscount: z.boolean(),
    Balance: z.number(),
    CurrencyRef: currencyRefSchema,
    CustomField: z.array(z.unknown()),
    CustomerRef: customerRefSchema,
    Deposit: z.number(),
    DocNumber: z.string(),
    DueDate: z.string(),
    EmailStatus: z.string(),
    Line: z.array(
      z.object({
        Amount: z.number(),
        Description: z.string().optional(),
        DetailType: z.string(),
        Id: z.string().optional(),
        LineNum: z.number().optional(),
        SalesItemLineDetail: z
          .object({
            ItemRef: z.object({
              name: z.string(),
              value: z.string(),
            }),
            Qty: z.number(),
            TaxCodeRef: taxCodeRefSchema,
          })
          .optional(),
        SubTotalLineDetail: z.object({}).optional(),
        DiscountLineDetail: z
          .object({
            DiscountAccountRef: z.object({
              name: z.string(),
              value: z.string(),
            }),
          })
          .optional(),
      }),
    ),
    LinkedTxn: z.array(
      z.object({
        TxnId: z.string(),
        TxnType: z.string(),
      }),
    ),
    PrintStatus: z.string(),
    PrivateNote: z.string(),
    SyncToken: z.string(),
    TotalAmt: z.number(),
    TxnDate: z.string(),
    sparse: z.boolean(),
  })
  .openapi({ref: 'Invoice'})

// Payment
export const paymentSchema = baseEntitySchema
  .extend({
    CurrencyRef: currencyRefSchema,
    CustomerRef: customerRefSchema,
    DepositToAccountRef: z
      .object({
        value: z.string(),
      })
      .optional(),
    Line: z.array(
      z.object({
        Amount: z.number(),
        LineEx: z.object({
          any: z.array(
            z.object({
              declaredType: z.string(),
              globalScope: z.boolean(),
              name: z.string(),
              nil: z.boolean(),
              scope: z.string(),
              typeSubstituted: z.boolean(),
              value: z.object({
                Name: z.string(),
                Value: z.string(),
              }),
            }),
          ),
        }),
        LinkedTxn: z.array(
          z.object({
            TxnId: z.string(),
            TxnType: z.string(),
          }),
        ),
      }),
    ),
    PrivateNote: z.string(),
    ProcessPayment: z.boolean(),
    SyncToken: z.string(),
    TotalAmt: z.number(),
    TxnDate: z.string(),
    UnappliedAmt: z.number(),
    sparse: z.boolean(),
  })
  .openapi({ref: 'Payment'})

// Journal Entry
export const journalEntrySchema = baseEntitySchema
  .extend({
    Adjustment: z.boolean(),
    sparse: z.boolean(),
    SyncToken: z.string(),
    DocNumber: z.string(),
    TxnDate: z.string(),
    CurrencyRef: currencyRefSchema,
    PrivateNote: z.string().optional(),
    Line: z.array(
      z.object({
        Id: z.string(),
        Description: z.string(),
        Amount: z.number(),
        DetailType: z.string(),
        JournalEntryLineDetail: z.object({
          PostingType: z.union([z.literal('Debit'), z.literal('Credit')]),
          Entity: entitySchema.optional(),
          AccountRef: accountRefSchema,
        }),
      }),
    ),
  })
  .openapi({ref: 'JournalEntry'})

// Deposit
export const depositSchema = baseEntitySchema
  .extend({
    CurrencyRef: currencyRefSchema,
    DepositToAccountRef: z.object({
      name: z.string(),
      value: z.string(),
    }),
    Line: z.array(
      z.object({
        Amount: z.number(),
        DepositLineDetail: z
          .object({
            AccountRef: accountRefSchema.optional(),
            Entity: entitySchema.optional(),
          })
          .optional(),
        Description: z.string(),
        DetailType: z.string(),
        Id: z.string(),
        LineNum: z.number(),
      }),
    ),
    PrivateNote: z.string(),
    SyncToken: z.string(),
    TotalAmt: z.number(),
    /** 2015-1-31 */
    TxnDate: z.string(),
    sparse: z.boolean(),
  })
  .openapi({ref: 'Deposit'})

export const transactionTypesSchema = z.object({
  Deposit: depositSchema,
  Purchase: purchaseSchema,
  JournalEntry: journalEntrySchema,
  Payment: paymentSchema,
  Invoice: invoiceSchema,
})
export type TransactionTypes = z.infer<typeof transactionTypesSchema>
export type TransactionTypeName = keyof TransactionTypes
export type Transaction = TransactionTypes[keyof TransactionTypes]

const entitySchemaByName = {
  CompanyInfo: companyInfoSchema,
  Account: accountSchema,
  // Different types of transactions
  JournalEntry: journalEntrySchema,
  Purchase: purchaseSchema,
  Deposit: depositSchema,
  Payment: paymentSchema,
  Invoice: invoiceSchema,
  Vendor: vendorSchema,
  Bill: z.unknown(),
  BillPayment: z.unknown(),
  CreditMemo: z.unknown(),
  Transfer: z.unknown(),
  Customer: z.unknown(),
  Item: z.unknown(),
  BalanceSheet: z.unknown(),
  ProfitAndLoss: z.unknown(),
} satisfies Record<EntityName, z.ZodTypeAny>

export const queryResponseSchema = z
  .object({
    ...Object.fromEntries(
      Object.entries(entitySchemaByName).map(([k, v]) => [
        k,
        z.array(v).optional(),
      ]),
    ),
    maxResults: z.number(),
    startPosition: z.number(),
    totalCount: z.number().optional(),
  })
  .openapi({ref: 'QueryResponse'})

// Webhook / changes
export const cdcPayloadSchema = z
  .object({
    CDCResponse: z.array(
      z.object({
        QueryResponse: z.array(queryResponseSchema),
      }),
    ),
    /** format: datetime */
    time: z.string(),
  })
  .openapi({ref: 'CDCPayload'})

export const queryPayloadSchema = z.object({
  QueryResponse: queryResponseSchema,
  time: z.string(),
})

// Define base query parameters common to most reports
const baseReportQueryParams = z.object({
  start_date: z.string().optional(),
  end_date: z.string().optional(),
  sort_order: z.string().optional(),
  customer: z.string().optional(),
  department: z.string().optional(),
  date_macro: z.string().optional(),
})

export const oas: OpenAPISpec = createDocument({
  openapi: '3.1.0',
  info: {title: 'Quickbooks API', version: '0.0.0'},
  servers: [
    {
      url: 'https://quickbooks.api.intuit.com/v3/company/{realmId}',
      description: 'production',
      variables: {realmId: {default: ''}},
    },
    {
      description: 'sandbox',
      url: 'https://sandbox-quickbooks.api.intuit.com/v3/company/{realmId}',
      variables: {realmId: {default: ''}},
    },
  ],
  security: [{oauth2: []}],
  components: {
    securitySchemes: {
      oauth2: {type: 'oauth2', name: 'authorization', in: 'header'},
    },
    schemas: {
      entityNameSchema,
    },
  },
  paths: {
    ...Object.fromEntries(
      entityNameSchema.options.map((o) => [
        `/${o.toLowerCase()}/{id}`,
        {
          get: jsonOperation(`get${o}`, {
            path: z.object({id: z.string()}),
            response: z.object({
              [o]: entitySchemaByName[o],
              time: z.string().datetime(),
            }),
          }),
        },
      ]),
    ),
    '/query': {
      get: jsonOperation('query', {
        query: z.object({query: z.string()}),
        response: queryPayloadSchema,
      }),
    },
    '/preferences': {
      get: jsonOperation('getPreferences', {
        response: z.unknown(),
      }),
    },
    '/reports/TransactionList': {
      get: jsonOperation('getTransactionList', {
        response: reportPayloadSchema,
        query: baseReportQueryParams.extend({
          payment_method: z.string().optional(),
          duedate_macro: z.string().optional(),
          arpaid: z.string().optional(),
          bothamount: z.string().optional(),
          transaction_type: z.string().optional(),
          docnum: z.string().optional(),
          start_moddate: z.string().optional(),
          source_account_type: z.string().optional(),
          group_by: z.string().optional(),
          start_duedate: z.string().optional(),
          columns: z.string().optional(),
          end_duedate: z.string().optional(),
          memo: z.string().optional(),
          appaid: z.string().optional(),
          moddate_macro: z.string().optional(),
          printed: z.string().optional(),
          createdate_macro: z.string().optional(),
          cleared: z.string().optional(),
          qzurl: z.string().optional(),
          term: z.string().optional(),
          end_createdate: z.string().optional(),
          name: z.string().optional(),
          sort_by: z.string().optional(),
          start_createdate: z.string().optional(),
          end_moddate: z.string().optional(),
        }),
      }),
    },
    '/reports/BalanceSheet': {
      get: jsonOperation('getBalanceSheet', {
        response: reportPayloadSchema,
        query: baseReportQueryParams.extend({
          qzurl: z.string().optional(),
          item: z.string().optional(),
          summarize_column_by: z.string().optional(),
        }),
      }),
    },
    '/reports/ProfitAndLoss': {
      get: jsonOperation('getProfitAndLoss', {
        response: reportPayloadSchema,
        query: baseReportQueryParams.extend({
          account: z.string().optional(),
          sort_by: z.string().optional(),
          payment_method: z.string().optional(),
          employee: z.string().optional(),
          account_type: z.string().optional(),
          columns: z.string().optional(),
        }),
      }),
    },
    '/reports/Cashflow': {
      get: jsonOperation('getCashFlow', {
        response: reportPayloadSchema,
        query: baseReportQueryParams.extend({
          vendor: z.string().optional(),
          item: z.string().optional(),
          summarize_column_by: z.string().optional(),
        }),
      }),
    },
    '/cdc': {
      get: jsonOperation('cdc', {
        query: z.object({
          changedSince: z.string(),
          entities: z.string().describe('Comma separated list of entity names'),
        }),
        response: cdcPayloadSchema,
      }),
    },
    '/reports/AccountList': {
      get: jsonOperation('getAccountList', {
        response: reportPayloadSchema,
        query: baseReportQueryParams.extend({
          account_type: z.string().optional(),
          start_moddate: z.string().optional(),
          moddate_macro: z.string().optional(),
          end_moddate: z.string().optional(),
          account_status: z.string().optional(),
          createdate_macro: z.string().optional(),
          columns: z.string().optional(),
          sort_by: z.string().optional(),
        }),
      }),
    },
    '/reports/CustomerBalance': {
      get: jsonOperation('getCustomerBalance', {
        response: reportPayloadSchema,
        query: baseReportQueryParams.extend({
          accounting_method: z.string().optional(),
          arpaid: z.string().optional(),
          report_date: z.string().optional(),
          summarize_column_by: z.string().optional(),
        }),
      }),
    },
    '/reports/CustomerIncome': {
      get: jsonOperation('getCustomerIncome', {
        response: reportPayloadSchema,
        query: baseReportQueryParams.extend({
          term: z.string().optional(),
          accounting_method: z.string().optional(),
          class: z.string().optional(),
          summarize_column_by: z.string().optional(),
          vendor: z.string().optional(),
        }),
      }),
    },
  },
})

export default oas

if (import.meta.url.endsWith(process.argv[1]!)) {
  console.log(JSON.stringify(oas, null, 2))
}
