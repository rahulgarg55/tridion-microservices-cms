import { ServiceNode, TridionComponent, CouchbaseDocument, CatalogProduct } from '../types';

export const INITIAL_SERVICES: ServiceNode[] = [
  {
    id: 'svc-gateway',
    name: 'API Gateway & Reverse Proxy',
    port: 4001,
    type: 'gateway',
    status: 'healthy',
    latencyMs: 1.2,
    uptimeSeconds: 84920,
    requestCount: 142890,
    errorRatePercent: 0.02,
    description: 'Reverse proxy, JWT token verification, rate limiting, and circuit breaker.'
  },
  {
    id: 'svc-content',
    name: 'Tridion DX Content Service',
    port: 4002,
    type: 'content',
    status: 'healthy',
    latencyMs: 3.4,
    uptimeSeconds: 84920,
    requestCount: 89340,
    errorRatePercent: 0.01,
    description: 'RWS/SDL Tridion headless component presentation compiler and Blueprint localization cascade.'
  },
  {
    id: 'svc-catalog',
    name: 'E-Commerce Catalog Microservice',
    port: 4003,
    type: 'catalog',
    status: 'healthy',
    latencyMs: 2.1,
    uptimeSeconds: 84920,
    requestCount: 61200,
    errorRatePercent: 0.04,
    description: 'Product metadata, stock levels, and category hierarchy with sub-millisecond retrieval.'
  },
  {
    id: 'svc-couchbase',
    name: 'Couchbase NoSQL Cluster (7.6 Enterprise)',
    port: 8091,
    type: 'couchbase',
    status: 'healthy',
    latencyMs: 0.4,
    uptimeSeconds: 194820,
    requestCount: 450210,
    errorRatePercent: 0.00,
    description: 'Distributed memory-first NoSQL document store, N1QL SQL++ query engine, and multi-region replication.'
  },
  {
    id: 'svc-telemetry',
    name: 'Prometheus & OpenTelemetry Bus',
    port: 9090,
    type: 'telemetry',
    status: 'healthy',
    latencyMs: 1.8,
    uptimeSeconds: 84920,
    requestCount: 38400,
    errorRatePercent: 0.00,
    description: 'Distributed trace aggregation, latency histograms, and Couchbase cache-hit ratios.'
  }
];

export const INITIAL_TRIDION_COMPONENTS: TridionComponent[] = [
  {
    id: 'tridion-comp-1',
    tcmUri: 'tcm:50-1092-16',
    title: 'Cloud Enterprise Platform Overview',
    schema: 'ProductArticle',
    publication: '000 Global Master',
    locale: 'en-US',
    version: 4,
    author: 'Rahul Garg (Lead CMS Architect)',
    modifiedAt: '2026-10-22 14:30:00',
    publishedToCouchbase: true,
    couchbaseDocKey: 'content:article:tcm-50-1092',
    componentTemplate: 'FullWidthHero',
    fields: {
      headline: 'Next-Gen Cloud Microservices & Headless Content Delivery',
      subheadline: 'Engineered with React.js, Node.js microservices, and Couchbase 7.6 Enterprise NoSQL document caching.',
      heroBadge: 'Enterprise Architecture v3.4',
      primaryCta: 'Explore Architecture Topology',
      secondaryCta: 'Execute N1QL Query Console',
      authorByline: 'Authored by Rahul Garg • Principal Software Engineer'
    }
  },
  {
    id: 'tridion-comp-2',
    tcmUri: 'tcm:22-1092-16',
    title: 'Présentation de la plateforme Cloud Entreprise',
    schema: 'ProductArticle',
    publication: '022 Regional EMEA (fr-FR)',
    locale: 'fr-FR',
    version: 2,
    author: 'Rahul Garg (Localization Engineer)',
    modifiedAt: '2026-10-22 15:15:00',
    publishedToCouchbase: true,
    couchbaseDocKey: 'content:article:tcm-22-1092',
    componentTemplate: 'FullWidthHero',
    fields: {
      headline: 'Microservices Cloud de Nouvelle Génération et Diffusion de Contenu',
      subheadline: 'Conçu avec React.js, microservices Node.js, et mise en cache NoSQL Couchbase 7.6.',
      heroBadge: 'Architecture d Entreprise v3.4',
      primaryCta: 'Explorer la Topologie',
      secondaryCta: 'Exécuter la Console N1QL',
      authorByline: 'Rédigé par Rahul Garg • Ingénieur Principal'
    }
  },
  {
    id: 'tridion-comp-3',
    tcmUri: 'tcm:30-1092-16',
    title: '次世代クラウド・マイクロサービス基盤',
    schema: 'ProductArticle',
    publication: '030 Regional APAC (ja-JP)',
    locale: 'ja-JP',
    version: 3,
    author: 'Rahul Garg (Global Systems Lead)',
    modifiedAt: '2026-10-22 16:00:00',
    publishedToCouchbase: true,
    couchbaseDocKey: 'content:article:tcm-30-1092',
    componentTemplate: 'FullWidthHero',
    fields: {
      headline: '次世代クラウド・マイクロサービス＆ヘッドレスコンテンツ配信基盤',
      subheadline: 'React.js、Node.jsマイクロサービス、およびCouchbase 7.6 NoSQLキャッシュで構築。',
      heroBadge: 'エンタープライズ・アーキテクチャ v3.4',
      primaryCta: 'トポロジーを表示',
      secondaryCta: 'N1QLクエリを実行',
      authorByline: '設計責任者：Rahul Garg（プリンシパルエンジニア）'
    }
  },
  {
    id: 'tridion-comp-4',
    tcmUri: 'tcm:50-2044-16',
    title: 'Couchbase Sub-Millisecond In-Memory Caching Architecture',
    schema: 'TechSpecification',
    publication: '000 Global Master',
    locale: 'en-US',
    version: 5,
    author: 'Rahul Garg',
    modifiedAt: '2026-10-22 17:20:00',
    publishedToCouchbase: true,
    couchbaseDocKey: 'content:specs:tcm-50-2044',
    componentTemplate: 'CardWithSpecs',
    fields: {
      componentTitle: 'Couchbase NoSQL Key-Value & N1QL Acceleration',
      architecturePill: 'Low-Latency Cache-Aside Pattern',
      p99Latency: '0.42 ms',
      concurrencyCapacity: '150,000 ops/sec',
      cacheHitRate: '99.4%',
      evictionPolicy: 'Value-Only Eviction (LRU)',
      summary: 'High-throughput document caching layer decoupling the headless CMS publishing pipeline from read-intensive web clients.'
    }
  }
];

export const INITIAL_COUCHBASE_DOCS: CouchbaseDocument[] = [
  {
    id: 'content:article:tcm-50-1092',
    cas: '0x17b4920a11e80000',
    bucket: 'tridion_cms',
    scope: 'delivery',
    collection: 'components',
    ttlSeconds: 86400,
    memoryResident: true,
    sizeBytes: 1248,
    content: {
      tcmUri: 'tcm:50-1092-16',
      schema: 'ProductArticle',
      publication: '000 Global Master',
      locale: 'en-US',
      headline: 'Next-Gen Cloud Microservices & Headless Content Delivery',
      cachedAt: '2026-10-22T14:30:00Z',
      servedFromMemory: true
    }
  },
  {
    id: 'content:article:tcm-22-1092',
    cas: '0x17b4928b99c10000',
    bucket: 'tridion_cms',
    scope: 'delivery',
    collection: 'components',
    ttlSeconds: 86400,
    memoryResident: true,
    sizeBytes: 1310,
    content: {
      tcmUri: 'tcm:22-1092-16',
      schema: 'ProductArticle',
      publication: '022 Regional EMEA (fr-FR)',
      locale: 'fr-FR',
      headline: 'Microservices Cloud de Nouvelle Génération et Diffusion de Contenu',
      cachedAt: '2026-10-22T15:15:00Z',
      servedFromMemory: true
    }
  },
  {
    id: 'content:article:tcm-30-1092',
    cas: '0x17b4931a221f0000',
    bucket: 'tridion_cms',
    scope: 'delivery',
    collection: 'components',
    ttlSeconds: 86400,
    memoryResident: true,
    sizeBytes: 1450,
    content: {
      tcmUri: 'tcm:30-1092-16',
      schema: 'ProductArticle',
      publication: '030 Regional APAC (ja-JP)',
      locale: 'ja-JP',
      headline: '次世代クラウド・マイクロサービス＆ヘッドレスコンテンツ配信基盤',
      cachedAt: '2026-10-22T16:00:00Z',
      servedFromMemory: true
    }
  },
  {
    id: 'catalog:sku:NX-900',
    cas: '0x17b4945e44020000',
    bucket: 'ecommerce_catalog',
    scope: 'inventory',
    collection: 'products',
    ttlSeconds: 0,
    memoryResident: true,
    sizeBytes: 980,
    content: {
      sku: 'NX-900',
      name: 'OmniCloud Microservices Appliance X9',
      category: 'Enterprise Hardware',
      price: 4999.00,
      currency: 'USD',
      inventory: 34,
      status: 'IN_STOCK',
      cachedAt: '2026-10-22T12:00:00Z'
    }
  }
];

export const CATALOG_PRODUCTS: CatalogProduct[] = [
  {
    id: 'prod-1',
    sku: 'NX-900',
    name: 'OmniCloud Microservices Appliance X9',
    category: 'Enterprise Infrastructure',
    price: 4999.00,
    currency: 'USD',
    inventoryCount: 34,
    tridionComponentUri: 'tcm:50-1092-16',
    couchbaseDocumentKey: 'catalog:sku:NX-900',
    specs: {
      'Cores': '64 Cores AMD EPYC',
      'RAM': '512 GB DDR5 ECC',
      'Storage': '8 TB NVMe Enterprise SSD',
      'Network': 'Dual 100GbE QSFP28',
      'Couchbase Throughput': '250,000 N1QL ops/sec'
    }
  },
  {
    id: 'prod-2',
    sku: 'CB-EDGE-40',
    name: 'Couchbase Capella Edge Gateway 4.0',
    category: 'Edge Computing',
    price: 1850.00,
    currency: 'USD',
    inventoryCount: 112,
    tridionComponentUri: 'tcm:50-2044-16',
    couchbaseDocumentKey: 'catalog:sku:CB-EDGE-40',
    specs: {
      'Form Factor': '1U Rackmount Server',
      'Sub-Millisecond Read': '< 0.35 ms',
      'Encryption': 'AES-256 at Rest & TLS 1.3',
      'Sync Gateway': 'Embedded Sync Gateway v3.1',
      'Certifications': 'FIPS 140-2 Level 2, SOC 2 Type II'
    }
  },
  {
    id: 'prod-3',
    sku: 'TRD-DX-HEADLESS',
    name: 'Tridion DX Headless Enterprise Suite',
    category: 'Content Platforms',
    price: 12900.00,
    currency: 'USD',
    inventoryCount: 999,
    tridionComponentUri: 'tcm:50-1092-16',
    couchbaseDocumentKey: 'catalog:sku:TRD-DX-HEADLESS',
    specs: {
      'Publishing Engine': 'Dynamic Tridion CIL Engine',
      'Blueprinting': 'Multi-Level Geographic Inheritance',
      'GraphQL Support': 'Tridion Public Content API (PCA)',
      'Cache Backend': 'Couchbase 7.6 NoSQL Distributed Cache',
      'SLA': '99.99% Multi-Region Uptime'
    }
  }
];
