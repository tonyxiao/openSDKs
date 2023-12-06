import {createDocument, jsonOperation, z} from '@opensdks/util-zod'

/**
 * TODO: Finish populating me
 * https://developer.intuit.com/app/developer/qbo/docs/develop/webhooks/entities-and-operations-supported
 */
export const entityNameSchema = z.union([
  z.literal('Account'),
  z.literal('Purchase'),
  z.literal('JournalEntry'),
  z.literal('Invoice'),
  z.literal('Payment'),
  z.literal('Bill'),
  z.literal('BillPayment'),
  z.literal('CreditMemo'),
  z.literal('Deposit'),
  z.literal('Transfer'),
  z.literal('Vendor'),
  z.literal('Customer'),
  z.literal('Item'),
])

export const webhookPayloadSchema = z.object({
  eventNotifications: z.array(
    z.object({
      realmId: z.string(),
      dataChangeEvent: z.object({
        entities: z.array(
          z.object({
            name: entityNameSchema,
            id: z.string(),
            operation: z.union([
              z.literal('Create'),
              z.literal('Update'),
              z.literal('Delete'),
              z.literal('Merge'),
              z.literal('Void'),
            ]),
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
export const reportPayloadSchema = z.object({
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
  Rows: z.array(
    z.object({
      Row: z.array(
        z.object({
          ColData: z.array(
            z.object({
              value: z.string(),
              id: z.string().optional(),
            }),
          ),
          type: z.string(),
        }),
      ),
    }),
  ),
})

export const companyInfoSchema = z.object({
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
export const accountSchema = baseEntitySchema.extend({
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

export const vendorSchema = baseEntitySchema.extend({
  DisplayName: z.string(),
  PrintOnCheckName: z.string().optional(),
})

export const journalEntryLineSchema = z.object({
  Id: z.string(),
  Description: z.string(),
  Amount: z.number(),
  DetailType: z.string(),
  JournalEntryLineDetail: z.object({
    PostingType: z.union([z.literal('Debit'), z.literal('Credit')]),
    Entity: entitySchema.optional(),
    AccountRef: accountRefSchema,
  }),
})

// Purchase (aka expense?)
export const purchaseSchema = baseEntitySchema.extend({
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

export const depositLineSchema = z.object({
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
})

// Invoice
export const invoiceSchema = baseEntitySchema.extend({
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

// Payment
export const paymentSchema = baseEntitySchema.extend({
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

// Journal Entry
export const journalEntrySchema = baseEntitySchema.extend({
  Adjustment: z.boolean(),
  sparse: z.boolean(),
  SyncToken: z.string(),
  DocNumber: z.string(),
  TxnDate: z.string(),
  CurrencyRef: currencyRefSchema,
  PrivateNote: z.string().optional(),
  Line: z.array(journalEntryLineSchema),
})

// Deposit
export const depositSchema = baseEntitySchema.extend({
  CurrencyRef: currencyRefSchema,
  DepositToAccountRef: z.object({
    name: z.string(),
    value: z.string(),
  }),
  Line: z.array(depositLineSchema),
  PrivateNote: z.string(),
  SyncToken: z.string(),
  TotalAmt: z.number(),
  /** 2015-1-31 */
  TxnDate: z.string(),
  sparse: z.boolean(),
})

export const transactionTypesSchema = z.object({
  Deposit: depositSchema,
  Purchase: purchaseSchema,
  JournalEntry: journalEntrySchema,
  Payment: paymentSchema,
  Invoice: invoiceSchema,
})

export const queryResponseSchema = z.object({
  maxResults: z.number(),
  startPosition: z.number(),
  totalCount: z.number().optional(),
  CompanyInfo: z.array(companyInfoSchema).optional(),
  Account: z.array(accountSchema).optional(),
  // Different types of transactions
  JournalEntry: z.array(journalEntrySchema).optional(),
  Purchase: z.array(purchaseSchema).optional(),
  Deposit: z.array(depositSchema).optional(),
  Payment: z.array(paymentSchema).optional(),
  Invoice: z.array(invoiceSchema).optional(),
  Vendor: z.array(vendorSchema).optional(),
  Bill: z.array(z.unknown()).optional(),
  BillPayment: z.array(z.unknown()).optional(),
  CreditMemo: z.array(z.unknown()).optional(),
  Transfer: z.array(z.unknown()).optional(),
  Customer: z.array(z.unknown()).optional(),
  Item: z.array(z.unknown()).optional(),
})

// Webhook / changes
export const cDCPayloadSchema = z.object({
  CDCResponse: z.array(
    z.object({
      QueryResponse: z.array(queryResponseSchema),
    }),
  ),
  /** format: datetime */
  time: z.string(),
})

export const queryPayloadSchema = z.object({
  QueryResponse: queryResponseSchema,
  time: z.string(),
})

if (require.main === module) {
  console.log(JSON.stringify(outputOpenApi(), null, 2))
}
