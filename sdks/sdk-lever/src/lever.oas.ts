import {OpenAPISpec} from '@opensdks/runtime'
import {createDocument, jsonOperation, z} from '@opensdks/util-zod'

const leverPosting = z
  .object({
    id: z.string(),
    text: z.string(),
    createdAt: z.number(),
    updatedAt: z.number(),
    user: z.string(),
    owner: z.string(),
    hiringManager: z.string(),
    confidentiality: z.enum(['non-confidential']),
    categories: z.object({
      team: z.string(),
      department: z.string(),
      location: z.string(),
      allLocations: z.array(z.string()),
      commitment: z.string(),
      level: z.string(),
    }),
    content: z.object({
      description: z.string(),
      descriptionHtml: z.string(),
      lists: z.array(
        z.object({
          text: z.string(),
          content: z.string(),
        }),
      ),
      closing: z.string(),
      closingHtml: z.string(),
    }),
    country: z.string(),
    tags: z.array(z.string()),
    state: z.enum(['published']),
    distributionChannels: z.array(z.enum(['internal', 'public'])),
    reqCode: z.string(),
    requisitionCodes: z.array(z.string()),
    salaryDescription: z.string(),
    salaryDescriptionHtml: z.string(),
    salaryRange: z.object({
      max: z.number(),
      min: z.number(),
      currency: z.string(),
      interval: z.enum(['per-year-salary']),
    }),
    urls: z.object({
      list: z.string().url(),
      show: z.string().url(),
      apply: z.string().url(),
    }),
    workplaceType: z.enum(['remote']),
  })
  .catchall(z.unknown())
  .openapi({ref: 'posting'})

const phoneSchema = z.object({
  value: z.string(),
})

const stageChangeSchema = z.object({
  toStageId: z.string(),
  toStageIndex: z.number(),
  userId: z.string(),
  updatedAt: z.number(),
})

const dataProtectionSchema = z.object({
  store: z.object({
    allowed: z.boolean(),
    expiresAt: z.number().nullable(),
  }),
  contact: z.object({
    allowed: z.boolean(),
    expiresAt: z.number().nullable(),
  }),
})

const urlsSchema = z.object({
  list: z.string().url(),
  show: z.string().url(),
})

const leverOpportunitySchema = z
  .object({
    id: z.string(),
    name: z.string(),
    headline: z.string(),
    contact: z.string(),
    emails: z.array(z.string().email()),
    phones: z.array(phoneSchema),
    confidentiality: z.string(),
    location: z.string(),
    links: z.array(z.string().url()),
    createdAt: z.number(),
    updatedAt: z.number(),
    lastInteractionAt: z.number(),
    lastAdvancedAt: z.number(),
    snoozedUntil: z.number().nullable(),
    archivedAt: z.number().nullable(),
    archiveReason: z.string().nullable(),
    stage: z.string(),
    stageChanges: z.array(stageChangeSchema),
    owner: z.string(),
    tags: z.array(z.string()),
    sources: z.array(z.string()),
    origin: z.string(),
    sourcedBy: z.string(),
    applications: z.array(z.string()),
    resume: z.unknown().nullable(),
    followers: z.array(z.string()),
    urls: urlsSchema,
    dataProtection: dataProtectionSchema,
    isAnonymized: z.boolean(),
  })
  .openapi({ref: 'opportunity'})

const locationSchema = z.object({
  name: z.string(),
})

const leverContactSchema = z
  .object({
    id: z.string(),
    name: z.string(),
    headline: z.string(),
    isAnonymized: z.boolean(),
    location: locationSchema,
    emails: z.array(z.string().email()),
    phones: z.array(phoneSchema),
  })
  .openapi({ref: 'contact'})

const tagSchema = z
  .object({
    text: z.string(),
    count: z.number(),
  })
  .openapi({ref: 'tag'})

const leverTagSchema = z.object({
  data: z.array(tagSchema),
})

const fieldSchema = z.object({
  text: z.string(),
  identifier: z.string(),
  value: z.union([z.string(), z.number()]),
})

const documentSchema = z
  .object({
    fileName: z.string(),
    uploadedAt: z.number(),
    downloadUrl: z.string().url(),
  })
  .nullable()

const offerSchema = z
  .object({
    id: z.string().uuid(),
    createdAt: z.number(),
    status: z.enum(['signed', 'draft']),
    creator: z.string().uuid(),
    fields: z.array(fieldSchema),
    sentDocument: documentSchema,
    signedDocument: documentSchema,
  })
  .catchall(z.unknown())
  .openapi({ref: 'offer'})

export const oas: OpenAPISpec = createDocument({
  openapi: '3.1.0',
  info: {title: 'Lever API', version: '1.0.0'},
  servers: [{url: 'https://api.lever.co/v1'}],
  paths: {
    '/postings/{id}': {
      get: jsonOperation('getPosting', {
        path: z.object({
          id: z.string().describe('The ID of the posting to retrieve'),
        }),
        response: z.object({
          data: leverPosting,
        }),
      }),
    },
    '/postings': {
      get: jsonOperation('getPostings', {
        query: z.object({
          include: z
            .enum(['content', 'followers'])
            .optional()
            .describe('Include posting content or followers in list results'),
          expand: z
            .enum(['user', 'owner', 'hiringManager', 'followers'])
            .optional()
            .describe('Expand user IDs into full objects in response'),
          state: z
            .string()
            .optional()
            .describe(
              'Filter postings by state. Valid states are published, internal, closed, draft, pending and rejected.',
            ),
          distributionChannel: z
            .string()
            .optional()
            .describe(
              'Filter published postings by whether they appear on the public job site, internal job site, or both. To retrieve all published postings, you must specify both public and internal',
            ),
          confidentiality: z
            .string()
            .optional()
            .describe(
              'Filter postings by confidentiality. If unspecified, defaults to non-confidential. To get both confidential and non-confidential postings you must specify all. Learn more about confidential data in the API.',
            ),
          group: z
            .string()
            .optional()
            .describe(
              'Posting results can be grouped by one of four categories: location, team, department, and commitment.',
            ),
          team: z
            .string()
            .optional()
            .describe(
              'Filter postings by team name (e.g. Engineering, Sales, Marketing). Since tags are case-sensitive, Sales will not match sales. Multiple teams can be specified and results will include a union of result sets (i.e. postings for either team). If your company uses departments, the same team name may occur across multiple departments.',
            ),
          department: z
            .string()
            .optional()
            .describe(
              'Filter postings by department name. Since tags are case-sensitive, Legal will not match legal. Multiple departments can be specified and results will include a union of result sets (i.e. postings for either department).',
            ),
          location: z
            .string()
            .optional()
            .describe(
              'Filter postings by location. Tags are case-sensitive, San Francisco will not match san francisco. Multiple locations can be specified and results will include a union of result sets (i.e. postings for either location).',
            ),
          committment: z
            .string()
            .optional()
            .describe(
              'Filter postings by work type (e.g. full-time, internship). Since tags are case-sensitive, Full-time will not match full-time. Multiple work types can be specified and results will include a union of result sets (i.e. postings of either work type).',
            ),
          level: z
            .string()
            .optional()
            .describe(
              'Deprecated but currently maintained for backward compatibility. Filter postings by level (e.g. junior, senior, manager). Since tags are case-sensitive, Manager will not match manager. Multiple levels can be specified and results will include a union of result sets (i.e. postings of either level).',
            ),
          tag: z
            .string()
            .optional()
            .describe(
              'Filter postings by tag. Tags are case-sensitive, so Engineering will not match engineering. Multiple tags can be specified and results will include a union of result sets (i.e. postings that have either tag). To specify multiple tags, include the tag parameter multiple times (e.g ?tag=engineering&tag=product)',
            ),
          updated_at_start: z
            .number()
            .optional()
            .describe(
              'Filter postings by the timestamp they were last updated. If only updated_at_start is specified, all postings updated from that timestamp (inclusive) to the present will be included. If only updated_at_end is specified, all postings updated before that timestamp (inclusive) are included. Both the updated_at_start and updated_at_end can be specified simultaneously, and results will be all postings updated within the provided timestamps (inclusive) will be returned.',
            ),
          updated_at_end: z
            .number()
            .optional()
            .describe(
              'Filter postings by the timestamp they were last updated. If only updated_at_start is specified, all postings updated from that timestamp (inclusive) to the present will be included. If only updated_at_end is specified, all postings updated before that timestamp (inclusive) are included. Both the updated_at_start and updated_at_end can be specified simultaneously, and results will be all postings updated within the provided timestamps (inclusive) will be returned.',
            ),
        }),
        response: z.object({
          data: z.array(leverPosting),
        }),
      }),
    },
    '/opportunities/{id}': {
      get: jsonOperation('getOpportunity', {
        path: z.object({
          id: z.string().describe('The ID of the opportunity to retrieve'),
        }),
        response: z.object({
          data: leverOpportunitySchema,
        }),
      }),
    },
    '/opportunities/{id}/offers': {
      get: jsonOperation('getOffers', {
        path: z.object({
          id: z
            .string()
            .describe('The ID of the opportunity to retrieve offers for'),
        }),
        response: z.object({
          data: offerSchema,
        }),
      }),
    },
    '/opportunities': {
      get: jsonOperation('getOpportunities', {
        query: z.object({
          include: z
            .enum(['followers'])
            .optional()
            .describe('Include Opportunity followers in list results'),
          expand: z
            .enum([
              'applications',
              'stage',
              'owner',
              'followers',
              'sourcedBy',
              'contact',
            ])
            .optional()
            .describe(
              'Expand application, stage, contact, or user IDs into full objects in response',
            ),
          tag: z
            .string()
            .optional()
            .describe(
              'Filter Opportunities by tag (case sensitive). Results will include Opportunities that contain the specified tag. Multiple tags can be specified and results will include a union of result sets (i.e. Opportunities that have either tag).',
            ),
          email: z
            .string()
            .optional()
            .describe(
              'Filter Opportunities by an email address. Results will include Opportunities for Contacts that contain the canonicalized email address.',
            ),
          origin: z
            .string()
            .optional()
            .describe(
              'Filter Opportunities by origin. Results will include Opportunities that contain the specified origin. Multiple origins can be specified and results will include a union of result sets (i.e. Opportunities from either origin).',
            ),
          source: z
            .string()
            .optional()
            .describe(
              'Filter Opportunities by source. Results will include Opportunities that contain the specified source tag. Multiple sources can be specified and results will include a union of result sets (i.e. Opportunities from either source).',
            ),
          confidentiality: z
            .string()
            .optional()
            .describe(
              'Filter opportunities by confidentiality. If unspecified, defaults to non-confidential. To get both confidential and non-confidential opportunities you must specify all. Learn more about confidential data in the API.',
            ),
          stage_id: z
            .string()
            .optional()
            .describe(
              'Filter Opportunities by current stage. Results will include Opportunities that are currently in the specified stage. Multiple stages can be specified and results will include a union of result sets (i.e. Opportunities that are in either stage).',
            ),
          posting_id: z
            .string()
            .optional()
            .describe(
              'Filter Opportunities by posting. Results will include Opportunities that are applied to the specified posting. Multiple postings can be specified and results will include a union of result sets (i.e. Opportunities that are applied to either posting).',
            ),
          archived_posting_id: z
            .string()
            .optional()
            .describe(
              'Filter Opportunities by postings for which they have been archived. Results will include opportunities for candidates that applied to the specified posting and then the application was archived. Multiple postings can be specified and results will include a union of result sets (i.e. Opportunities that were applied to either posting).',
            ),
          created_at_start: z
            .number()
            .optional()
            .describe(
              'Filter Opportunities by the timestamp they were created. If only created_at_start is specified, all Opportunities created from that timestamp (inclusive) to the present will be included. If only created_at_end is specified, all Opportunities created before that timestamp (inclusive) are included.',
            ),
          created_at_end: z
            .number()
            .optional()
            .describe(
              'Filter Opportunities by the timestamp they were created. If only created_at_start is specified, all Opportunities created from that timestamp (inclusive) to the present will be included. If only created_at_end is specified, all Opportunities created before that timestamp (inclusive) are included.',
            ),

          updated_at_start: z
            .number()
            .optional()
            .describe(
              'Filter Opportunities by the timestamp they were last updated. If only updated_at_start is specified, all Opportunities updated from that timestamp (inclusive) to the present will be included. If only updated_at_end is specified, all Opportunities updated before that timestamp (inclusive) are included.',
            ),
          updated_at_end: z
            .number()
            .optional()
            .describe(
              'Filter Opportunities by the timestamp they were last updated. If only updated_at_start is specified, all Opportunities updated from that timestamp (inclusive) to the present will be included. If only updated_at_end is specified, all Opportunities updated before that timestamp (inclusive) are included.',
            ),
          advanced_at_start: z
            .number()
            .optional()
            .describe(
              'Filter Opportunities by the timestamp they were advanced to their current stage. If only advanced_at_start is specified, all Opportunities advanced from that timestamp (inclusive) to the present will be included. If only advanced_at_end is specified, all Opportunities advanced before that timestamp (inclusive) are included.',
            ),
          advanced_at_end: z
            .number()
            .optional()
            .describe(
              'Filter Opportunities by the timestamp they were advanced to their current stage. If only advanced_at_start is specified, all Opportunities advanced from that timestamp (inclusive) to the present will be included. If only advanced_at_end is specified, all Opportunities advanced before that timestamp (inclusive) are included.',
            ),
          archived_at_start: z
            .number()
            .optional()
            .describe(
              'Filter Opportunities by the timestamp they were archived. If only archived_at_start is specified, all Opportunities archived from that timestamp (inclusive) to the present will be included. If only archived_at_end is specified, all Opportunities archived before that timestamp (inclusive) are included.',
            ),
          archived_at_end: z
            .number()
            .optional()
            .describe(
              'Filter Opportunities by the timestamp they were archived. If only archived_at_start is specified, all Opportunities archived from that timestamp (inclusive) to the present will be included. If only archived_at_end is specified, all Opportunities archived before that timestamp (inclusive) are included.',
            ),

          archived: z
            .boolean()
            .optional()
            .describe(
              'Filter Opportunities by archive status. If unspecified, results include both archived and unarchived Opportunities. If true, results only include archived Opportunities. If false, results only include active Opportunities.',
            ),
          archive_reason_id: z
            .string()
            .optional()
            .describe(
              'Filter Opportunities by archive reason. Results will include Opportunities that have been archived with the specified reason. Multiple archive reasons can be specified and results will include a union of result sets (i.e. Opportunities that have been archived for either reason).',
            ),
          snoozed: z
            .boolean()
            .optional()
            .describe(
              'Filter Opportunities by snoozed status. If unspecified, results include both snoozed and unsnoozed Opportunities. If true, results only include snoozed Opportunities. If false, results only include unsnoozed Opportunities.',
            ),
          contact_id: z
            .string()
            .optional()
            .describe(
              'Filter Opportunities by contact. Results will include the Opportunities that match the specified contact. Multiple contacts can be specified and results will include a union of result sets (i.e. Opportunities that match each of the contacts).',
            ),
        }),
        response: z.object({
          data: z.array(leverOpportunitySchema),
        }),
      }),
    },
    '/contacts/{id}': {
      get: jsonOperation('getContacts', {
        path: z.object({
          id: z.string().describe('The ID of the contact to retrieve'),
        }),
        response: z.object({
          data: leverContactSchema,
        }),
      }),
    },
    '/tags': {
      get: jsonOperation('getTags', {
        response: z.object({
          data: z.array(leverTagSchema),
        }),
      }),
    },
  },
})

export default oas

if (import.meta.url.endsWith(process.argv[1]!)) {
  console.log(JSON.stringify(oas, null, 2))
}
