Type conversions
===

# Boolean

|                  | valid | converted |
|------------------|-------|-----------|
| undefined        | no    | false     |
| null             | no    | false     |
| true             | yes   | false     |
| false            | yes   | false     |
| number           | no    | true      |
| number 0         | no    | false     |
| decimal          | no    | true      |
| negative number  | no    | true      |
| Infinity         | no    | true      |
| NaN              | no    | false     |
| empty string     | no    | false     |
| string           | no    | true      |
| numeric string   | no    | true      |
| numeric string 0 | no    | true      |
| Date             | no    | true      |
| empty object     | no    | true      |
| empty array      | no    | true      |
| numbers array    | no    | true      |
| Model            | no    | true      |
