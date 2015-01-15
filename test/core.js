var	assert		= require("assert"),
	should		= require("should"),
    	RequestContext 	= require("fds-request-context"),
	Killswitch	= require(".."),
	killswitches	= require(__dirname + "/test-killswitches.json"),
	ks;

suite("fds-footer Test Suite", function(){
	describe('get("key", info)', function(){
		beforeEach(function(){
			ks = new Killswitch(killswitches);
		});
		afterEach(function(){
			ks = null;
		});

		it('should exist', function(){
			assert.ok(typeof ks.get, 'function');
		});
		it('should return enabled value', function(){
			var rc = new RequestContext({params:{arg1:'api',arg2:'1',arg3:'product',arg4:'availability',arg5:'123,456,678'}, headers:{'user-agent':'tablet'}});
			assert.equal(ks.get('newFooterCopyright', {name:'foo'}), false);
			assert.ok(ks.get('newHeaderFOBInteraction',{name:'newHeader'}), "xyz");
		});

		it('should restrict usage if restrictByName array has module listed', function(){
			assert.ok(ks.get('newHeaderFOBInteraction',{name:'newHeader'}), "xyz");
		});
	});
});
