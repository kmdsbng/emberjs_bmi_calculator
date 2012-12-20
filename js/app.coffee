App = Ember.Application.create()

# Controllers
App.bmi = Ember.Controller.create
  height: null,
  weight: null,
  bmi: null,
  calcHeight: (->
    weight = @get('weight')
    bmi = @get('bmi')
    @set('height', Math.sqrt(weight / bmi) * 100)
  ),
  calcWeight: (->
    meter = @get('height') / 100.0
    bmi = @get('bmi')
    @set('weight', bmi * (meter * meter))
  ),
  calcBmi: (->
    meter = @get('height') / 100.0
    @set('bmi', @get('weight') / (meter * meter))
  ),
  tryToCalcRemain: (->
    height = @get('height')
    weight = @get('weight')
    bmi = @get('bmi')

    if (@isPresent(height) && @isPresent(weight) && !@isPresent(bmi))
      @calcBmi()
    else if (@isPresent(height) && !@isPresent(weight) && @isPresent(bmi))
      @calcWeight()
    else if (!@isPresent(height) && @isPresent(weight) && @isPresent(bmi))
      @calcHeight()
  ),
  isPresent: ((v) ->
    v && v.length > 0
  )


# Views
App.ApplicationView = Ember.View.extend
  heightBinding: 'App.bmi.height',
  weightBinding: 'App.bmi.weight',
  bmiBinding: 'App.bmi.bmi'


App.CalcTextField = Ember.TextField.extend
  init: (->
    @_super()
    @on("focusOut", this, this.recalc)
  ),
  recalc: (->
    App.bmi.tryToCalcRemain()
  )

