var assert, DiceRoll, result, noDiceTest, defaultsTest, noTargetTest, batchTest;

assert = require("assert");
require("coffee-script/register");
DiceRoll = require('../diceroll.coffee');

result = false;
try { 
	noDiceTest = new DiceRoll();
} catch(e) {
	result = true;
}
assert.ok(result);

defaultsTest = new DiceRoll({dice:1,sides:20});
result = defaultsTest.result();
assert.ok(result.rolls.length);
assert.ok(result.conclusion);
assert.ok(result.rolls[0] === result.conclusion);

summarizeTest = new DiceRoll({dice:2,sides:12});
result = summarizeTest.result();
assert.ok(result.rolls.length === 2);
assert.ok(result.conclusion);
assert.ok(result.rolls[0] + result.rolls[1] === result.conclusion);

result = false;
try {
	noTargetTest = new DiceRoll({dice:2,sides:10,sum:false});
} catch(e) {
	result = true;
}
assert.ok(result);

batchTest = new DiceRoll({dice:6,sides:10,sum:false,target:8});
result = batchTest.result();
assert.ok(result.rolls.length === 6);

onesSubtractTest = new DiceRoll({dice:1,sides:1,sum:false,target:2,onesSubtract:true});
result = onesSubtractTest.result();
assert.ok(result.rolls[0] === 1);
assert.ok(result.conclusion === -1);

console.log("All tests clear");
