/**
 * Created by adyhasch on 1/21/15.
 */
var mytodo = Object.create(ToDo, {
    // foo is a regular 'value property'
    todo: { writable: true, configurable: true, enumerable:true, value: 'hello' },
    // bar is a getter-and-setter (accessor) property
    done: {
        configurable: false, enumerable:true,
        get: function() { return 10; },
        set: function(value) { console.log('Setting `o.bar` to', value); }
        /* with ES5 Accessors our code can look like this
         get function() { return 10 },
         set function(value) { console.log('setting `o.bar` to', value) } */
    },
    priority: {writable: true, configurable: true, enumerable:true,  value: 10 }
});
console.log("Mytodo: ");
console.log(mytodo);

var o = Object.create({inherited: 1}, {
    foo: {
        get: (function () { // a closure
            var closured = 'foo';
            return function () {
                return closured+'bar';
            };
        })()
    }
});

o.foo; // "foobar"