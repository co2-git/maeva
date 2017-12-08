Run tests
===

To run tests, you need a connector installed. For example, you can use `maeva-json`:

```bash
npm i maeva-json;
yarn test connector=maeva-json
```

You can pass an url if need be:

```bash
npm i maeva-mysql;
yarn test connector=maeva-mysql url=mysql://myserver.com
```

And any option you want using the `key=value` syntax:

```bash
npm i maeva-mysql;
yarn test connector=maeva-mysql url=mysql://myserver.com foo=1 bar=barz
```
