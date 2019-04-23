# har-to-k6

Convert LI-HAR to k6 script.

## CLI Usage

Install globally:

```shell
npm install --global har-to-k6
```

Use `har-to-k6` to convert. If a compatibility layer is generated it will be
written to `compat.js` next to your k6 script.

```shell
har-to-k6 archive.har -o loadtest.js
```

## API Usage

Install to your package:

```shell
npm install --save har-to-k6
```

Use `liHARToK6Script()` to convert. If a compatibility layer is returned place
it in `compat.js` next to the output script:

```js
const fs = require("fs");
const { liHARToK6Script } = require("har-to-k6");

async function run () {
  const archive = readArchive();
  const { main, compat } = await liHARToK6Script(archive);
  fs.writeFileSync("./load-test.js", main);
  if (compat) {
    fs.writeFileSync("./compat.js", compat);
  }
}
```

Use `validate()` to run validation alone. Returns without error for a valid
archive. Throws `InvalidArchiveError` for validation failure.

```js
const { InvalidArchiveError, validate } = require("har-to-k6");

const archive = readArchive();
try {
  validate(archive);
} catch (error) {
  if (error instanceof InvalidArchiveError) {
    // Handle invalid archive
  } else {
    throw error;
  }
}
```
