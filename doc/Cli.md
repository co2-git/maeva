maeva comamnd line
===

maeva ships with a small command line utility

# Install

```bash
[sudo] npm install -g maeva
```

# Usage

```bash
maeva <...options> <model>:<action> <...arguments>
```

# Example

```bash
maeva \
  # options
  connector=mongodb \
  url=mongodb://localhost:45267 \
  path=./dist/models \
  # method
  MyModel:find \
  # arguments separated by space
  foo=1,bar=false \
  limit=10,order=created_at,reverse=true
```

# Options

- connector
- url
- path

## connector

Connector is the name of a maeva connector module.

```bash
maeva connector=mongodb
```

## url

The url of the database server. See connector documentation.

```bash
maeva url=mongodb://localhost:45267
```

## path

The path to your models' directory. If not specified, will use current directory.

# Options file

You can store your options in a file called `maeva.json` that must be in the current directory.

```javascript
{
  "connector": "mongodb",
  "url": "mongodb://localhost:45267",
  "path": "./dist/models"
}
```
