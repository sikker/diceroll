defaults = {
	dice: null,
	sides: null,
	sum: true,
	onesSubtract: false,
	target: null,
	explodeOn: null,
	modifier: null
}

diceroll = (opts) ->
		rolls = []
		conclusion = 0
		results = []
		conclusion = 0
		if (typeIsArray opts)
			recurse opts
		else
			opts = extend (extend {}, defaults), opts
			if opts.explodeOn isnt null and opts.explodeOn <= 1
				throw new Error "If you set explodeOn to that number, the roll will keep exploding forever."
			if opts.dice is null or opts.sides is null
				throw new Error "You have to provide dice and sides parameters"
			if not opts.sum and opts.target is null
				throw new Error "If you set sum: false you must set target: <number> as well."
	
			diceLeft = opts.dice
			while diceLeft
				diceLeft--
				result = Math.ceil Math.random() * opts.sides
				rolls.push result
				if not opts.sum and opts.explodeOn isnt null and result >= opts.explodeOn
					diceLeft++
	
				if opts.sum
					conclusion += result
				else if not opts.sum and result >= opts.target
					conclusion++
				else if not opts.sum and opts.onesSubtract and result is 1
					conclusion--
	
			if opts.sum and opts.target isnt null
				conclusion = (conclusion >= opts.target)
			if opts.sum and opts.modifier isnt null
				conclusion += opts.modifier

			return { 'rolls': rolls, 'conclusion': conclusion }

recurse = (opts) ->
	rolls = []
	conclusion = 0
	for opt in opts
		roll = diceroll opt
		result = roll
		rolls.push result.rolls
		if typeof result.conclusion is "number"
			conclusion += result.conclusion
	return { 'rolls': rolls, 'conclusion': conclusion }

# Helper method grabbed from http://coffeescript.org/documentation/docs/helpers.html
extend = (object, properties) ->
	for key, val of properties
		object[key] = val
	object

# The "Miller Device" grabbed from http://coffeescriptcookbook.com/chapters/arrays/check-type-is-array
typeIsArray = Array.isArray || ( value ) -> return {}.toString.call( value ) is '[object Array]'

# Export the module
exports = module.exports = diceroll unless typeof module is "undefined"
window.diceroll = diceroll unless typeof window is "undefined"
return diceroll