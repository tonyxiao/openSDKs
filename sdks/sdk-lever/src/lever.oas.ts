import {OpenAPISpec} from '@opensdks/runtime'
import {createDocument, jsonOperation, z} from '@opensdks/util-zod'

const posting = z
  .object({
    id: z.string(),
    text: z.string(),
    createdAt: z.number(),
    updatedAt: z.number(),
    user: z.string(),
    owner: z.string(),
    hiringManager: z.string(),
    confidentiality: z.enum(['non-confidential', 'confidential']),
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

const opportunity = z
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
  .openapi({
    ref: 'opportunity',

    description: `
"Candidates" are individuals who have been added to your Lever account as potential fits for your open job positions. "Opportunities" represent each of an individual’s unique candidacies or journeys through your pipeline for a given job position, meaning a single Candidate can be associated with multiple Opportunities. A “Contact” is a unique individual who may or may not have multiple candidacies or Opportunities.

Candidates enter your pipeline for a new Opportunity by:

Applying to a posting on your jobs site,
Being added by an external recruiting agency,
Being referred by an employee,
Being manually added by a Lever user, or
Being sourced from an online profile.
Each Opportunity can have their own notes, feedback, interview schedules, and additional forms. An opportunity may be “confidential” if it is moving through your pipeline for a job posting that has been created as confidential. Opportunities exit your pipeline by being archived for one of two reasons: (1) The candidate was rejected for the opportunity, or (2) The candidate was hired for the opportunity.

A "Contact" is an object that our application uses internally to identify an individual person and their personal or contact information, even though they may have multiple opportunities. From this API, the "Contact" is exposed via the contact field, which returns the unique ID for a Contact across your account. Contact information will be shared and consistent across an individual person's opportunities, and will continue to be aggregated onto individual opportunities in the responses to all GET and POST requests to /opportunities.

@see https://hire.sandbox.lever.co/developer/documentation#opportunities


WARNING: The Candidates (/candidates) endpoints were deprecated as of 2020. Though they are maintained for backwards compatibility, going forward please see Opportunities endpoints to find the contacts for each job opportunity.
    `,
  })

const locationSchema = z.object({
  name: z.string(),
})

const contact = z
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

const offer = z
  .object({
    id: z.string().uuid(),
    createdAt: z.number(),
    status: z.enum([
      'draft', // the offer is still under construction
      'approval-sent', // the offer needs approval
      'approved', // the offer has been approved
      'sent', // the offer has been sent through Lever
      'sent-manually', //  the offer has been sent to the candidate outside of Lever
      'opened', // the candidate has opened the offer
      'denied', // the candidate denied the offer
      'signed', // the candidate signed the offer
    ]),
    creator: z.string().uuid(),
    fields: z.array(fieldSchema),
    sentDocument: documentSchema,
    signedDocument: documentSchema,
  })
  .catchall(z.unknown())
  .openapi({ref: 'offer'})

/**
   * There are some stages that are common to all Lever accounts, and some that are customizable
   * Notably hired is not a stage. 
   * {
  "data": [
    {
      "id": "lead-new",
      "text": "New lead"
    },
    {
      "id": "lead-reached-out",
      "text": "Reached out"
    },
    {
      "id": "lead-responded",
      "text": "Responded"
    },
    {
      "id": "applicant-new",
      "text": "New applicant"
    },
    {
      "id": "7100254d-2655-4b2a-9677-27b1bd5980fb",
      "text": "Tes stage"
    },
    {
      "id": "b7c29827-5a7b-454e-9b2d-1a18dcbebfd3",
      "text": "Phone screen"
    },
    {
      "id": "d09b0083-b7d4-4f86-8d90-d1532e53a3bb",
      "text": "On-site interview"
    },
    {
      "id": "c7212f5a-8e5f-481b-9170-258f9447aa32",
      "text": "Reference check"
    },
    {
      "id": "offer",
      "text": "Offer"
    }
  ],
  "hasNext": false
}
   */

const stage = z.object({
  id: z.string().openapi({
    examples: [
      'lead-new',
      'lead-reached-out',
      'lead-responded',
      'applicant-new',
      'offer',
      '<string>',
    ],
  }),
  text: z.string(),
})

/**
 * {
  "data": [
    {
      "id": "ceb5f9e3-a160-4a29-b8ff-06acba7c549e",
      "text": "Underqualified",
      "status": "active",
      "type": "non-hired"
    },
    {
      "id": "0d56befe-481c-4bfd-8be9-f1280d41b8a6",
      "text": "Unresponsive",
      "status": "active",
      "type": "non-hired"
    },
    {
      "id": "2b956ecc-bb2a-4026-ae44-8fe1a225ad4f",
      "text": "Timing",
      "status": "active",
      "type": "non-hired"
    },
    {
      "id": "ff94b0db-34c8-458d-808b-3b5c99cd7cdf",
      "text": "Withdrew",
      "status": "active",
      "type": "non-hired"
    },
    {
      "id": "73ea2610-057a-4576-92ab-551de1835189",
      "text": "Offer declined",
      "status": "active",
      "type": "non-hired"
    },
    {
      "id": "05f95c6f-67a8-45c6-b4bc-b07cb4c2cd28",
      "text": "Position closed",
      "status": "active",
      "type": "non-hired"
    },
    {
      "id": "ddc474e6-67bd-480e-9513-4a9720fa9599",
      "text": "Hired",
      "status": "active",
      "type": "hired"
    }
  ],
  "hasNext": false

  @see https://hire.sandbox.lever.co/settings/archive-reasons

  There can only be a single hired archive reason, and it cannot be de-activated. https://share.cleanshot.com/M8MMSL0S
 */
const archiveReason = z.object({
  id: z.string(),
  text: z.string(),
  status: z.enum(['active', 'inactive']),
  type: z.enum(['non-hired', 'hired']),
})

export const oas: OpenAPISpec = createDocument({
  openapi: '3.1.0',
  info: {title: 'Lever API', version: '1.0.0'},
  servers: [
    {url: 'https://api.lever.co/v1', description: 'production'},
    {
      url: 'https://api.sandbox.lever.co/v1',
      description: 'sandbox',
    },
  ],
  paths: {
    '/postings/{id}': {
      get: jsonOperation('getPosting', {
        path: z.object({
          id: z.string().describe('The ID of the posting to retrieve'),
        }),
        response: z.object({
          data: posting,
        }),
      }),
    },
    '/postings': {
      get: jsonOperation('getPostings', {
        query: z.object({
          limit: z
            .number()
            .optional()
            .describe(
              'A limit on the number of objects to be returned. The limit can range between 1 and 100 items. If no limit is specified, the default for that endpoint is used.',
            ),
          offset: z
            .string()
            .optional()
            .describe(
              'An offset token specifying the next page of results to return. A paginated list response will include a next attribute that includes an offset token, which can be used as an input parameter to the next request. If an offset is not passed in, the API will fetch the first page of results. You can only pass in an offset that was returned to you via a previously paginated request.',
            ),
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
          data: z.array(posting),
          hasNext: z.boolean().optional(),
          next: z.string().optional(),
        }),
      }),
    },
    '/opportunities/{id}': {
      get: jsonOperation('getOpportunity', {
        path: z.object({
          id: z.string().describe('The ID of the opportunity to retrieve'),
        }),
        response: z.object({
          data: opportunity,
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
          data: z.array(offer),
          hasNext: z.boolean().optional(),
          next: z.string().optional(),
        }),
      }),
    },
    '/opportunities': {
      get: jsonOperation('getOpportunities', {
        query: z.object({
          limit: z
            .number()
            .optional()
            .describe(
              'A limit on the number of objects to be returned. The limit can range between 1 and 100 items. If no limit is specified, the default for that endpoint is used.',
            ),
          offset: z
            .string()
            .optional()
            .describe(
              'An offset token specifying the next page of results to return. A paginated list response will include a next attribute that includes an offset token, which can be used as an input parameter to the next request. If an offset is not passed in, the API will fetch the first page of results. You can only pass in an offset that was returned to you via a previously paginated request.',
            ),
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
          data: z.array(opportunity),
          hasNext: z.boolean().optional(),
          next: z.string().optional(),
        }),
      }),
    },
    '/contacts/{id}': {
      get: jsonOperation('getContacts', {
        path: z.object({
          id: z.string().describe('The ID of the contact to retrieve'),
        }),
        response: z.object({
          data: contact,
        }),
      }),
    },
    '/tags': {
      get: jsonOperation('getTags', {
        query: z.object({
          limit: z
            .number()
            .optional()
            .describe(
              'A limit on the number of objects to be returned. The limit can range between 1 and 100 items. If no limit is specified, the default for that endpoint is used.',
            ),
          offset: z
            .string()
            .optional()
            .describe(
              'An offset token specifying the next page of results to return. A paginated list response will include a next attribute that includes an offset token, which can be used as an input parameter to the next request. If an offset is not passed in, the API will fetch the first page of results. You can only pass in an offset that was returned to you via a previously paginated request.',
            ),
        }),
        response: z.object({
          data: z.array(tagSchema),
          hasNext: z.boolean().optional(),
          next: z.string().optional(),
        }),
      }),
    },
    '/stages': {
      get: jsonOperation('listStages', {
        response: z.object({
          data: z.array(stage),
          hasNext: z.boolean().optional(),
          next: z.string().optional(),
        }),
      }),
    },
    '/archive_reasons': {
      get: jsonOperation('listArchiveReasons', {
        response: z.object({
          data: z.array(archiveReason),
          hasNext: z.boolean().optional(),
          next: z.string().optional(),
        }),
      }),
    },
  },
})

export default oas

if (import.meta.url.endsWith(process.argv[1]!)) {
  console.log(JSON.stringify(oas, null, 2))
}
