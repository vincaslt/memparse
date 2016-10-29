# Memparse

Memparse is a [Memrise](http://www.memrise.com) course parser.
It can be used from the command line or from a function in a Node.js project.

### CLI usage

First, globally install memparse: `npm i --save -g memparse`

```
memparse <courseId> [--file <output-file>]

  courseId - required course id, i.e. http://www.memrise.com/course/<courseId>
  --f, -f  - optional file name to write the output to,
             if none is provided it will be printed to the console
```

Output format to file is JSON, to console - prettified JSON.

Example command: `memparse 1098046 -f output.json` - will write [this course](http://www.memrise.com/course/1098046/spanish-spain-4/) to output.json:
```
{
  "course": "Spanish (Spain) 4",
  "levels": [
    {
      "name": "Relax with the Crew",
      "words": [
        {
          "word": "emocionante",
          "meaning": "exciting"
        },
      ...
    },
    ...
  ]
}
```
### Node.js usage

Install memparse to node_modules: `npm i --save memparse`

### Example

```
const memparse = require('memparse')(1098046)
memparse.parse()
  .then(json => console.log(json.levels[0].words[0]))
```

Output: `{ "word": "emocionante", "meaning": "exciting" }`

### API

* `require('memparse')` - returns memparse initializer, which requires `courseId` parameter.

* `memparse.parse()` - returns ES6 `Promise`, which eventually returns JSON array

* `memparse.xrayParse()` returns [Xray](https://github.com/lapwinglabs/x-ray) object

* `memparse.BASE_URL` - url constant which is being used to access memrise course, currently: `http://www.memrise.com/course`
