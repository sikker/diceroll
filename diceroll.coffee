# Class definition
class DiceRoll

	defaults: { 
		dice: null,
		sides: null,
		sum: true,
		onesSubtract: false,
		target: null,
	}
	opts: {}
	rolls: []
	conclusion: 0

	constructor: (opts) ->
		@rolls = []
		conclusion: 0
		@opts = extend (extend {}, @defaults), opts
		if @opts.dice is null or @opts.sides is null
			throw new Error "You have to provide dice and sides parameters"
		if not @opts.sum and @opts.target is null
			throw new Error "If you set sum: false you must set target: <number> as well."

		for i in [1..@opts.dice] by 1
			result = Math.ceil Math.random() * @opts.sides
			@rolls.push result
			if @opts.sum
				@conclusion += result
			else if not @opts.sum and result >= @opts.target
				@conclusion++
			else if not @opts.sum and @opts.onesSubtract and result is 1
				@conclusion--

	result: ->
		{ 'rolls': @rolls, 'conclusion': @conclusion }

# Helper method grabbed from http://coffeescript.org/documentation/docs/helpers.html
extend = (object, properties) ->
	for key, val of properties
		object[key] = val
	object

# Export the module
exports = module.exports = DiceRoll
