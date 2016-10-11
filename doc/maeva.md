maeva
===

Models that can connect to any database.

# Abstract

`maeva`'s design patterns are layer-based:

1. Type *The corner stone of models: type checking*
1. Schema modeling *A list of fields assigned to types, plus optional attributes, such as required, default value, custom validation and indexing*
1. Statement *Design statements based on model*
1. Connectors *Send statements to any database vendor and convert results to models*

# Types

Types are the corner store of models. Models are made up of a schema, which is a list of fields, which are mainly defined by type. Field can have other optional attributes, such as required, default values or their own validators.

[Read more about types](Type.md)

# Schema

Schema are a list of fields. Field have a type attribute and other attributes such as:

- required (whether or not this field is required to be present upon insertion)
- default value
- custom validator
- indexing information

[Read more about schemas](Schema.md)
