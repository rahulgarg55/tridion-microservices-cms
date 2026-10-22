import { test, describe } from 'node:test';
import assert from 'node:assert';
import CouchbaseClusterManager from '../services/couchbase-service/couchbaseMock.js';
import TridionEngine from '../services/content-service/tridionEngine.js';

describe('Tridion DX & Couchbase Microservices Test Suite', () => {
  test('CouchbaseClusterManager: Key-Value Retrieval', async () => {
    const cb = new CouchbaseClusterManager();
    const doc = await cb.get('tridion_cms', 'content:article:tcm-50-1092');
    assert.ok(doc, 'Document should exist');
    assert.strictEqual(doc.content.schema, 'ProductArticle');
    assert.ok(doc.cas.startsWith('0x'), 'CAS key must follow 64-bit hex format');
  });

  test('CouchbaseClusterManager: Key-Value Upsert with Atomic CAS Mutation', async () => {
    const cb = new CouchbaseClusterManager();
    const testKey = 'benchmark:test:01';
    const upsertRes = await cb.upsert('tridion_cms', testKey, { status: 'OPTIMIZED', ops: 150000 });
    assert.ok(upsertRes.cas, 'Must return new CAS token');

    const retrieved = await cb.get('tridion_cms', testKey);
    assert.strictEqual(retrieved.content.status, 'OPTIMIZED');
  });

  test('CouchbaseClusterManager: N1QL SQL++ Query Execution', async () => {
    const cb = new CouchbaseClusterManager();
    const result = await cb.query('SELECT * FROM tridion_cms.delivery.components;');
    assert.strictEqual(result.meta.status, 'success');
    assert.ok(result.rows.length >= 1, 'Should return at least 1 row');
  });

  test('TridionEngine: Component Schema Validation', () => {
    const tridion = new TridionEngine();
    const validComp = {
      tcmUri: 'tcm:50-1092-16',
      schema: 'ProductArticle',
      publication: '000 Global Master',
      title: 'Cloud Architecture',
      fields: { headline: 'Test Headline' }
    };
    assert.strictEqual(tridion.validateComponent(validComp), true);
  });

  test('TridionEngine: Rejection of Invalid TCM URI', () => {
    const tridion = new TridionEngine();
    const invalidComp = {
      tcmUri: 'invalid-uri-without-tcm-prefix',
      schema: 'ProductArticle',
      publication: '000 Global Master'
    };
    assert.throws(() => {
      tridion.validateComponent(invalidComp);
    }, /Invalid Tridion TCM URI format/);
  });

  test('TridionEngine: Blueprinting Cascade Resolution', () => {
    const tridion = new TridionEngine();
    const masterComp = {
      tcmUri: 'tcm:50-1092-16',
      schema: 'ProductArticle',
      publication: '000 Global Master',
      title: 'Master Article'
    };
    const cascaded = tridion.resolveBlueprintingCascade(masterComp, '022 Regional EMEA (fr-FR)');
    assert.strictEqual(cascaded.publication, '022 Regional EMEA (fr-FR)');
    assert.strictEqual(cascaded.locale, 'fr-FR');
    assert.strictEqual(cascaded.inheritedFrom, '000 Global Master');
  });
});
