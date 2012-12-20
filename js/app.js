// Generated by CoffeeScript 1.3.3
var App;

App = Ember.Application.create();

App.bmi = Ember.Controller.create({
  height: null,
  weight: null,
  bmi: null,
  calcHeight: (function() {
    var bmi, weight;
    weight = this.get('weight');
    bmi = this.get('bmi');
    return this.set('height', Math.sqrt(weight / bmi) * 100);
  }),
  calcWeight: (function() {
    var bmi, meter;
    meter = this.get('height') / 100.0;
    bmi = this.get('bmi');
    return this.set('weight', bmi * (meter * meter));
  }),
  calcBmi: (function() {
    var meter;
    meter = this.get('height') / 100.0;
    return this.set('bmi', this.get('weight') / (meter * meter));
  }),
  tryToCalcRemain: (function() {
    var bmi, height, weight;
    height = this.get('height');
    weight = this.get('weight');
    bmi = this.get('bmi');
    if (this.isPresent(height) && this.isPresent(weight) && !this.isPresent(bmi)) {
      return this.calcBmi();
    } else if (this.isPresent(height) && !this.isPresent(weight) && this.isPresent(bmi)) {
      return this.calcWeight();
    } else if (!this.isPresent(height) && this.isPresent(weight) && this.isPresent(bmi)) {
      return this.calcHeight();
    }
  }),
  isPresent: (function(v) {
    return v && v.length > 0;
  })
});

App.ApplicationView = Ember.View.extend({
  heightBinding: 'App.bmi.height',
  weightBinding: 'App.bmi.weight',
  bmiBinding: 'App.bmi.bmi'
});

App.CalcTextField = Ember.TextField.extend({
  init: (function() {
    this._super();
    return this.on("focusOut", this, this.recalc);
  }),
  recalc: (function() {
    return App.bmi.tryToCalcRemain();
  })
});
