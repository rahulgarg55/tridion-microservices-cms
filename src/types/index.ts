export type ServiceStatus = 'healthy' | 'degraded' | 'offline';

export interface ServiceNode {
  id: string;
  name: string;
  port: number;
  type: 'gateway' | 'content' | 'catalog' | 'couchbase' | 'telemetry';
  status: ServiceStatus;
  latencyMs: number;
  uptimeSeconds: number;
  requestCount: number;
  errorRatePercent: number;
  description: string;
}

export type BlueprintPublication = 
  | '000 Global Master'
  | '020 Regional EMEA (en-GB)'
  | '022 Regional EMEA (fr-FR)'
  | '030 Regional APAC (ja-JP)'
  | '050 US Consumer Web (en-US)';

export interface TridionComponentField {
  name: string;
  type: 'text' | 'richText' | 'number' | 'image' | 'embedded';
  value: string | number | Record<string, any>;
}

export interface TridionComponent {
  id: string;
  tcmUri: string; // e.g. tcm:50-4921-16 (Tridion Content Manager URI format)
  title: string;
  schema: 'ProductArticle' | 'PromoBanner' | 'TechSpecification' | 'ExecutiveBio';
  publication: BlueprintPublication;
  locale: string;
  version: number;
  author: string;
  modifiedAt: string;
  publishedToCouchbase: boolean;
  couchbaseDocKey: string;
  componentTemplate: 'FullWidthHero' | 'CardWithSpecs' | 'LocalizedSummary';
  fields: Record<string, any>;
}

export interface CouchbaseDocument {
  id: string;
  cas: string;
  bucket: string;
  scope: string;
  collection: string;
  ttlSeconds: number;
  memoryResident: boolean;
  sizeBytes: number;
  content: Record<string, any>;
}

export interface N1QLQueryResult {
  query: string;
  executionTimeMs: number;
  status: 'success' | 'syntax_error' | 'timeout';
  resultCount: number;
  rows: any[];
  metrics: {
    elapsedTime: string;
    executionTime: string;
    resultSize: number;
  };
}

export interface CatalogProduct {
  id: string;
  sku: string;
  name: string;
  category: string;
  price: number;
  currency: string;
  inventoryCount: number;
  tridionComponentUri: string;
  couchbaseDocumentKey: string;
  specs: Record<string, string>;
}
