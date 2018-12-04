var assert, DiceRoll, result, noDiceTest, defaultsTest, noTargetTest, batchTest, onesSubtractTest, explodingDiceTest, everExplodingDiceTest, targetSumTest, modifierSumTest, multipleDiceTypesTest;

assert = require("assert");
require("coffeescript/register");
diceroll = require('../diceroll.coffee');

result = false;
try { 
	noDiceTest = diceroll();
} catch(e) {
	result = true;
}
assert.ok(result);

defaultsTest = diceroll({dice:1,sides:20});
result = defaultsTest;
assert.ok(result.rolls.length);
assert.ok(result.conclusion);
assert.ok(result.rolls[0] === result.conclusion);

summarizeTest = diceroll({dice:2,sides:12});
result = summarizeTest;
assert.ok(result.rolls.length === 2);
assert.ok(result.conclusion);
assert.ok(result.rolls[0] + result.rolls[1] === result.conclusion);

result = false;
try {
	noTargetTest = diceroll({dice:2,sides:10,sum:false});
} catch(e) {
	result = true;
}
assert.ok(result);

batchTest = diceroll({dice:6,sides:10,sum:false,target:8});
result = batchTest;
assert.ok(result.rolls.length === 6);

onesSubtractTest = diceroll({dice:1,sides:1,sum:false,target:2,onesSubtract:true});
result = onesSubtractTest;
assert.ok(result.rolls[0] === 1);
assert.ok(result.conclusion === -1);

result = null;
for(var i = 0; i < 200; i++) {
	explodingDiceTest = diceroll({dice: 1, sides: 10, sum:false, target: 8, explodeOn: 10});
	result = explodingDiceTest;
	if (result.rolls.length > 1)
		break;
}
assert.ok(result.rolls.length > 1);

result = false;
try {
	everExplodingDiceTest = diceroll({dice: 5, sides: 10, sum: false, target: 6, explodeOn: 1});
} catch(e) {
	result = true;
}
assert.ok(result);

targetSumTest = diceroll({dice:2,sides:20,target:2});
result = targetSumTest;
assert.ok(result.conclusion === true);

modifierSumTest = diceroll({dice: 1, sides: 1, modifier: 3});
result = modifierSumTest;
assert.ok(result.conclusion === 4);


multipleDiceTypesTest = diceroll([{
	dice: 1,
	target: 1,
	sum: false,
	sides: 8,
},{
	dice: 2,
	sides: 4
},{
	dice: 3,
	sides: 6,
	modifier: 1
}]);
result = multipleDiceTypesTest;
assert.ok(result.rolls.length === 3);
assert.ok(result.rolls[0].length === 1);
assert.ok(result.rolls[1].length === 2);
assert.ok(result.rolls[2].length === 3);

console.log("All tests clear");
