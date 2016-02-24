// Generated by CoffeeScript 1.9.3
(function() {
  var TestFactory, addTests, assert, hooks, mochaStub, proxyquire, ramlParser, sinon;

  assert = require('chai').assert;

  sinon = require('sinon');

  ramlParser = require('raml-parser');

  proxyquire = require('proxyquire').noCallThru();

  mochaStub = require('mocha');

  TestFactory = require('../../lib/test');

  hooks = require('../../lib/hooks');

  addTests = proxyquire('../../lib/add-tests', {
    'mocha': mochaStub
  });

  describe('#addTests', function() {
    return describe('#run', function() {
      describe('when raml contains single get', function() {
        var callback, testFactory, tests;
        tests = [];
        testFactory = new TestFactory();
        callback = '';
        before(function(done) {
          return ramlParser.loadFile(__dirname + "/../fixtures/single-get.raml").then(function(data) {
            callback = sinon.stub();
            callback.returns(done());
            return addTests(data, tests, hooks, callback, testFactory);
          }, done);
        });
        after(function() {
          return tests = [];
        });
        it('should run callback', function() {
          return assert.ok(callback.called);
        });
        it('should added 1 test', function() {
          return assert.lengthOf(tests, 1);
        });
        it('should set test.name', function() {
          return assert.equal(tests[0].name, 'GET /machines -> 200');
        });
        it('should setup test.request', function() {
          var req;
          req = tests[0].request;
          assert.equal(req.path, '/machines');
          assert.deepEqual(req.params, {});
          assert.deepEqual(req.query, {});
          assert.deepEqual(req.headers, {
            'Abao-API-Key': 'abcdef'
          });
          assert.deepEqual(req.body, {});
          return assert.equal(req.method, 'GET');
        });
        return it('should setup test.response', function() {
          var res, schema;
          res = tests[0].response;
          assert.equal(res.status, 200);
          schema = res.schema;
          assert.equal(schema.items.properties.type.type, 'string');
          assert.equal(schema.items.properties.name.type, 'string');
          assert.isNull(res.headers);
          return assert.isNull(res.body);
        });
      });
      describe('when raml contains one GET and one POST', function() {
        var callback, testFactory, tests;
        tests = [];
        testFactory = new TestFactory();
        callback = '';
        before(function(done) {
          return ramlParser.loadFile(__dirname + "/../fixtures/1-get-1-post.raml").then(function(data) {
            callback = sinon.stub();
            callback.returns(done());
            return addTests(data, tests, hooks, callback, testFactory);
          }, done);
        });
        after(function() {
          return tests = [];
        });
        it('should run callback', function() {
          return assert.ok(callback.called);
        });
        it('should added 2 test', function() {
          return assert.lengthOf(tests, 2);
        });
        it('should setup test.request of POST', function() {
          var req;
          req = tests[1].request;
          assert.equal(req.path, '/machines');
          assert.deepEqual(req.params, {});
          assert.deepEqual(req.query, {});
          assert.deepEqual(req.headers, {
            'Content-Type': 'application/json'
          });
          assert.deepEqual(req.body, {
            type: 'Kulu',
            name: 'Mike'
          });
          return assert.equal(req.method, 'POST');
        });
        return it('should setup test.response of POST', function() {
          var res, schema;
          res = tests[1].response;
          assert.equal(res.status, 201);
          schema = res.schema;
          assert.equal(schema.properties.type.type, 'string');
          assert.equal(schema.properties.name.type, 'string');
          assert.isNull(res.headers);
          return assert.isNull(res.body);
        });
      });
      describe('when raml includes multiple referencing schemas', function() {
        var callback, testFactory, tests;
        tests = [];
        testFactory = new TestFactory;
        callback = '';
        before(function(done) {
          return ramlParser.loadFile(__dirname + "/../fixtures/ref_other_schemas.raml").then(function(data) {
            callback = sinon.stub();
            callback.returns(done());
            return addTests(data, tests, hooks, callback, testFactory);
          }, done);
        });
        after(function() {
          return tests = [];
        });
        it('should run callback', function() {
          return assert.ok(callback.called);
        });
        it('should added 1 test', function() {
          return assert.lengthOf(tests, 1);
        });
        it('should set test.name', function() {
          return assert.equal(tests[0].name, 'GET /machines -> 200');
        });
        it('should setup test.request', function() {
          var req;
          req = tests[0].request;
          assert.equal(req.path, '/machines');
          assert.deepEqual(req.params, {});
          assert.deepEqual(req.query, {});
          assert.deepEqual(req.body, {});
          return assert.equal(req.method, 'GET');
        });
        return it('should setup test.response', function() {
          var ref, ref1, ref2, res;
          res = tests[0].response;
          assert.equal(res.status, 200);
          assert.equal((ref = res.schema) != null ? (ref1 = ref.properties) != null ? (ref2 = ref1.chick) != null ? ref2.type : void 0 : void 0 : void 0, "string");
          assert.isNull(res.headers);
          return assert.isNull(res.body);
        });
      });
      describe('when raml has inline and included schemas', function() {
        var callback, testFactory, tests;
        tests = [];
        testFactory = new TestFactory;
        callback = '';
        before(function(done) {
          return ramlParser.loadFile(__dirname + "/../fixtures/inline_and_included_schemas.raml").then(function(data) {
            callback = sinon.stub();
            callback.returns(done());
            return addTests(data, tests, hooks, callback, testFactory);
          }, done);
        });
        after(function() {
          return tests = [];
        });
        it('should run callback', function() {
          return assert.ok(callback.called);
        });
        it('should added 1 test', function() {
          return assert.lengthOf(tests, 1);
        });
        it('should set test.name', function() {
          return assert.equal(tests[0].name, 'GET /machines -> 200');
        });
        it('should setup test.request', function() {
          var req;
          req = tests[0].request;
          assert.equal(req.path, '/machines');
          assert.deepEqual(req.params, {});
          assert.deepEqual(req.query, {});
          assert.deepEqual(req.body, {});
          return assert.equal(req.method, 'GET');
        });
        return it('should setup test.response', function() {
          var ref, ref1, res;
          res = tests[0].response;
          assert.equal(res.status, 200);
          assert.equal((ref = res.schema) != null ? (ref1 = ref.properties) != null ? ref1.type["$ref"] : void 0 : void 0, "type2");
          assert.isNull(res.headers);
          return assert.isNull(res.body);
        });
      });
      describe('when raml contains three-levels endpoints', function() {
        var callback, testFactory, tests;
        tests = [];
        testFactory = new TestFactory();
        callback = '';
        before(function(done) {
          return ramlParser.loadFile(__dirname + "/../fixtures/three-levels.raml").then(function(data) {
            callback = sinon.stub();
            callback.returns(done());
            return addTests(data, tests, hooks, callback, testFactory);
          }, done);
        });
        after(function() {
          return tests = [];
        });
        it('should run callback', function() {
          return assert.ok(callback.called);
        });
        it('should added 3 test', function() {
          return assert.lengthOf(tests, 3);
        });
        it('should set test.name', function() {
          assert.equal(tests[0].name, 'GET /machines -> 200');
          assert.equal(tests[1].name, 'DELETE /machines/{machine_id} -> 204');
          return assert.equal(tests[2].name, 'GET /machines/{machine_id}/parts -> 200');
        });
        it('should set request.param of test 1', function() {
          var test;
          test = tests[1];
          return assert.deepEqual(test.request.params, {
            machine_id: '1'
          });
        });
        return it('should set request.param of test 2', function() {
          var test;
          test = tests[2];
          return assert.deepEqual(test.request.params, {
            machine_id: '1'
          });
        });
      });
      describe('when raml has resource not defined method', function() {
        var callback, testFactory, tests;
        tests = [];
        testFactory = new TestFactory();
        callback = '';
        before(function(done) {
          return ramlParser.loadFile(__dirname + "/../fixtures/no-method.raml").then(function(data) {
            callback = sinon.stub();
            callback.returns(done());
            return addTests(data, tests, hooks, callback, testFactory);
          }, done);
        });
        after(function() {
          return tests = [];
        });
        it('should run callback', function() {
          return assert.ok(callback.called);
        });
        it('should added 1 test', function() {
          return assert.lengthOf(tests, 1);
        });
        return it('should set test.name', function() {
          return assert.equal(tests[0].name, 'GET /root/machines -> 200');
        });
      });
      describe('when raml has invalid request body example', function() {
        var callback, testFactory, tests;
        tests = [];
        testFactory = new TestFactory();
        callback = '';
        before(function(done) {
          var raml;
          raml = "#%RAML 0.8\n\ntitle: World Music API\nbaseUri: http://example.api.com/{version}\nversion: v1\nmediaType: application/json\n\n/machines:\n  post:\n    body:\n      example: 'invalid-json'\n    responses:\n      204:";
          return ramlParser.load(raml).then(function(data) {
            callback = sinon.stub();
            callback.returns(done());
            sinon.stub(console, 'warn');
            return addTests(data, tests, hooks, callback, testFactory);
          }, done);
        });
        after(function() {
          tests = [];
          return console.warn.restore();
        });
        it('should run callback', function() {
          return assert.ok(callback.called);
        });
        it('should give a warning', function() {
          return assert.ok(console.warn.called);
        });
        return it('should added 1 test', function() {
          assert.lengthOf(tests, 1);
          return assert.equal(tests[0].name, 'POST /machines -> 204');
        });
      });
      return describe('when raml contains vendor specifc JSON content-types', function() {
        var callback, testFactory, tests;
        tests = [];
        testFactory = new TestFactory();
        callback = '';
        before(function(done) {
          return ramlParser.loadFile(__dirname + "/../fixtures/vendor-content-type.raml").then(function(data) {
            callback = sinon.stub();
            callback.returns(done());
            return addTests(data, tests, hooks, callback, testFactory);
          }, done);
        });
        after(function() {
          return tests = [];
        });
        it('should run callback', function() {
          return assert.ok(callback.called);
        });
        it('should added a test', function() {
          return assert.lengthOf(tests, 1);
        });
        it('should setup test.request of PATCH', function() {
          var req;
          req = tests[0].request;
          assert.equal(req.path, '/{songId}');
          assert.deepEqual(req.params, {
            songId: 'mike-a-beautiful-day'
          });
          assert.deepEqual(req.query, {});
          assert.deepEqual(req.headers, {
            'Content-Type': 'application/vnd.api+json'
          });
          assert.deepEqual(req.body, {
            title: 'A Beautiful Day',
            artist: 'Mike'
          });
          return assert.equal(req.method, 'PATCH');
        });
        return it('should setup test.response of PATCH', function() {
          var res, schema;
          res = tests[0].response;
          assert.equal(res.status, 200);
          schema = res.schema;
          assert.equal(schema.properties.title.type, 'string');
          assert.equal(schema.properties.artist.type, 'string');
          assert.isNull(res.headers);
          return assert.isNull(res.body);
        });
      });
    });
  });

}).call(this);

//# sourceMappingURL=add-tests-test.js.map
