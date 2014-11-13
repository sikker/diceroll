// Generated by CoffeeScript 1.6.3
(function() {
  var DiceRoll, exports, extend, typeIsArray;

  DiceRoll = (function() {
    DiceRoll.prototype.defaults = {
      dice: null,
      sides: null,
      sum: true,
      onesSubtract: false,
      target: null,
      explodeOn: null,
      modifier: null
    };

    DiceRoll.prototype.opts = {};

    DiceRoll.prototype.rolls = [];

    DiceRoll.prototype.conclusion = 0;

    function DiceRoll(opts) {
      var diceLeft, result;
      this.rolls = [];
      this.conclusion = 0;
      if (typeIsArray(opts)) {
        this.recurse(opts);
      } else {
        this.opts = extend(extend({}, this.defaults), opts);
        if (this.opts.explodeOn !== null && this.opts.explodeOn <= 1) {
          throw new Error("If you set explodeOn to that number, the roll will keep exploding forever.");
        }
        if (this.opts.dice === null || this.opts.sides === null) {
          throw new Error("You have to provide dice and sides parameters");
        }
        if (!this.opts.sum && this.opts.target === null) {
          throw new Error("If you set sum: false you must set target: <number> as well.");
        }
        diceLeft = this.opts.dice;
        while (diceLeft) {
          diceLeft--;
          result = Math.ceil(Math.random() * this.opts.sides);
          this.rolls.push(result);
          if (!this.opts.sum && this.opts.explodeOn !== null && result >= this.opts.explodeOn) {
            diceLeft++;
          }
          if (this.opts.sum) {
            this.conclusion += result;
          } else if (!this.opts.sum && result >= this.opts.target) {
            this.conclusion++;
          } else if (!this.opts.sum && this.opts.onesSubtract && result === 1) {
            this.conclusion--;
          }
        }
        if (this.opts.sum && this.opts.target !== null) {
          this.conclusion = this.conclusion >= this.opts.target;
        }
        if (this.opts.sum && this.opts.modifier !== null) {
          this.conclusion += this.opts.modifier;
        }
      }
    }

    DiceRoll.prototype.recurse = function(opts) {
      var opt, result, roll, _i, _len, _results;
      _results = [];
      for (_i = 0, _len = opts.length; _i < _len; _i++) {
        opt = opts[_i];
        roll = new DiceRoll(opt);
        result = roll.result();
        this.rolls.push(result.rolls);
        if (typeof result.conclusion === "number") {
          _results.push(this.conclusion += result.conclusion);
        } else {
          _results.push(void 0);
        }
      }
      return _results;
    };

    DiceRoll.prototype.result = function() {
      return {
        'rolls': this.rolls,
        'conclusion': this.conclusion
      };
    };

    return DiceRoll;

  })();

  extend = function(object, properties) {
    var key, val;
    for (key in properties) {
      val = properties[key];
      object[key] = val;
    }
    return object;
  };

  typeIsArray = Array.isArray || function(value) {
    return {}.toString.call(value) === '[object Array]';
  };

  exports = module.exports = DiceRoll;

}).call(this);
