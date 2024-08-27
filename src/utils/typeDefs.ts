/* eslint-disable @typescript-eslint/ban-types */
import { Field } from 'jsforce';

// import {Field } from '@'
type User = {
    Username?: string;
} & Record

type ContentVersion = {
    Title: string;
    FileExtension: string;
    VersionData: string;
    ContentDocumentId?: string;
} & Record

type ContentDocument = {
    LatestPublishedVersionId: string;
} & Record

type ContentVersionCreateRequest = {
    PathOnClient: string;
    Title?: string;
}

type FieldMeta = {
    label: string;
    // tslint:disable-next-line:no-reserved-keywords
    type: string;
    fullName: string;
    defaultValue?: string;
    description?: string;
    inlineHelpText?: string;
    required?: boolean;
    unique?: boolean;
    externalId?: boolean;
    length?: number;
    scale?: number;
    precision?: number;
    relationshipLabel?: string;
    relationshipName?: string;
    referenceTo?: string;
    trackHistory?: boolean;
    visibleLines?: number;
    valueSet?: { valueSetDefinition?: ValueSetDefinition };
    displayLocationInDecimal?: boolean;
    deleteConstraint?: boolean;
    writeRequiresMasterRead?: boolean;
    reparentableMasterDetail?: boolean;
    relationshipOrder?: number;
}

type ValueSetDefinition = {
    sorted: boolean;
    value: Value[];
}

type Value = {
    fullName: string;
    default?: boolean;
    label: string;
}

type ObjectConfig = {
    '@': {};
    deploymentStatus: string;
    label: string;
    pluralLabel: string;
    indexes?: {};
    eventType?: string;
    description?: string;
    nameField?: {
        label: string;
        type: string;
        displayFormat?: string;
    };
    sharingModel?: string;
    enableActivities?: boolean;
    enableBulkApi?: boolean;
    enableFeeds?: boolean;
    enableHistory?: boolean;
    enableReports?: boolean;
    enableSearch?: boolean;
    enableSharing?: boolean;
    enableStreamingApi?: boolean;
    visibility?: string;
}

type Record = {
    attributes: object;
    Id: string;

    Name?: string;

    ContentDocumentId?: string;

    LiveAgentChatUrl?: string;
    LiveAgentContentUrl?: string;
}

type QueryResult = {
    totalSize: number;
    done: boolean;
    records: Record[];
}

type CreateResult = {
    id: string;
    success: boolean;
    errors: string[];
    name: string;
    message: string;
}

type CustomLabel = {
    fullName: string;
    value: string;
    protected: boolean;
    categories?: string;
    shortDescription?: string;
    language?: string;
}

type WaveDataset = {
    name: string;
    currentVersionId: string;
    createdBy: {
        name: string;
    };
    datasetType: string;
    id: string;
}

type WaveDatasetVersion = {
    xmdMain: {
        dates: [
            {
                alias: string;
                fields: {
                    fullField: string;
                };
            }
        ];
        dimensions: [
            {
                field: string;
            }
        ];
        measures: [
            {
                field: string;
            }
        ];
    };
}

type WaveDataFlow = {
    name: string;
    createdBy: {
        name: string;
    };
    type: string;
    id: string;
    label: string;
    url: string;
}

type WaveDataFlowListResponse = {
    dataflows: WaveDataFlow[];
}

type WaveDataSetListResponse = {
    datasets: WaveDataset[];
}

type CDCEvent = {
    payload: {
        ChangeEventHeader: {
            entityName: string;
            changeType: string;
            recordIds: string[];
        };
    };
} & PlatformEvent

type PlatformEvent = {
    schema: string;
    payload: {};
    event: {
        replayId: number;
    };
    channel: string;
}

type CommunitiesRestResult = {
    communities: [
        {
            name: string;
            id: string;
            siteAsContainerEnabled: boolean;
        }
    ];
}

type ToolingAPIDescribeQueryResult = {
    totalSize: number;
    done: boolean;
    records: Field[];
}

type AiAuthResponse = {
    access_token: string;
    token_type: string;
    expires_in: number;
    refresh_token?: string;
}

type FavoriteRequestBody = {
    targetType: string;
    target: string;
    sortOrder?: number;
    name?: string;
}

type PushTopic = {
    Id: string;
    Name: string;
    Description: string;
    Query: string;
    NotifyForOperationUpdate: boolean;
    NotifyForOperationUndelete: boolean;
    NotifyForOperationDelete: boolean;
    NotifyForOperationCreate: boolean;
    NotifyForFields: string;
    IsActive: boolean;
    ApiVersion: number;
}

export {
    PushTopic,
    Record,
    ContentVersion,
    ContentDocument,
    QueryResult,
    CreateResult,
    CustomLabel,
    WaveDataSetListResponse,
    WaveDatasetVersion,
    CDCEvent,
    WaveDataFlowListResponse,
    CommunitiesRestResult,
    ToolingAPIDescribeQueryResult,
    PlatformEvent,
    ObjectConfig,
    FieldMeta,
    ContentVersionCreateRequest,
    User,
    AiAuthResponse,
    FavoriteRequestBody
};