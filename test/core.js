var	assert		= require("assert"),
	should		= require("should"),
    	RequestContext 	= require("fds-request-context"),
	Killswitch	= require(".."),
	killswitches	= require(__dirname + "/test-killswitches.json"),
	ks;

suite("Killswitch Test Suite", function(){
	beforeEach(function(){
		ks = new Killswitch(killswitches);
	});
	afterEach(function(){
		ks = null;
	});
	describe('getBoolean(key, info)', function(){
		it('should exist', function(){
			assert.ok(typeof ks.getBoolean, 'function');
		});
		it('should throw an error if killswitch definiton is not found', function(){
			assert.throws(function(){ ks.getBoolean("someModule", {name:"foo"}); }, Error); ///killswitch.getBoolean(key) failed. no matching killswitch key found in killswitches.json\./);
		});
		it('should throw an error if killswitch definiton is not found', function(){
			assert.throws(function(){ ks.getBoolean("someModule", {name:"foo"}); }, /killswitch\.getBoolean\(key\) failed\. no matching killswitch key found in killswitches.json\./);
		});
		it('should return correct boolean value when enabled', function(){
			assert.equal(ks.getBoolean('f2', {name:'foo'}), true);
			assert.equal(ks.getBoolean('f5', {name:'moduleX'}), true);

		});
		it('should not restrict any modules when wildcard "*" is used in targets', function(){
			assert.equal(ks.getBoolean('f4', {name:'someModule'}), true);
			assert.equal(ks.getBoolean('f4', {name:'fooModule'}), true);
			assert.equal(ks.getBoolean('f4', {name:'foo'}), true);

		});

		it('should return correct boolean value when disabled', function(){
			assert.equal(ks.getBoolean('f1', {name:'foo'}), false);
			assert.equal(ks.getBoolean('f1', {name:'bar'}), false);
		});
	});
	describe('getValue(key, info)', function(){
		it('should exist', function(){
			assert.ok(typeof ks.getValue, 'function');
		});
		it('should return correct value when enabled', function(){
			assert.equal(ks.getValue('f5', {name:'moduleX'}), 'f5-enabled');

		});
		
	});

	describe('get(key, info)', function(){
		it('should exist', function(){
			assert.ok(typeof ks.get, 'function');
		});
		it('should return correct killswitch definition object when enabled', function(){
			assert.ok(ks.get("f5",{name:"moduleX"}).description === "test killswitch five");
		});
		it('should return Start Date and End Date when enabled', function(){
			assert.ok(ks.get("f5",{name:"moduleX"}).startDate === "Jan 1, 2015");
			assert.ok(ks.get("f5",{name:"moduleX"}).endDate === "Feb 1, 2015");
		});
	});
});
