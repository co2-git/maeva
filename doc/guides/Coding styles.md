Coding styles
===

# Functional programming versus object oriented

Style is oriented towards function programming, instead of object programming.

So instead of `model.findOne({foo: 1})`, we do `findOne(mode, {foo: 1})`.

We use classes to _sign_ objects, (ie, `DataConnection` or `DataModel`) - but these objects have no methods, only properties.
