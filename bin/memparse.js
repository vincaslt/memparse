#! /usr/bin/env node
var prettyjson = require('prettyjson')
var argv = require('minimist')(process.argv.slice(2), {
  string: ['f', 'file']
})

if (argv._.length === 1 && argv._[0] !== '') {
  const Parser = require('../index.js')(argv._[0])

  var filename = argv.f || argv.file

  if (!filename) {
    Parser.parse().then((list) => { console.log(prettyjson.render(list, { noColor: true })) })
  } else {
    var writer = Parser.xrayParse().write(filename)

    writer.on('finish', () => console.log(`Done parsing! Output file: ${filename}`))
    writer.on('error', console.error)
  }
} else {
  console.log('\nUsage: memparse <courseId> [--file <output-file>]\n')
  console.log('       courseId - required course id, i.e. http://www.memrise.com/course/<courseId>')
  console.log('       --f, -f - optional file name to write the output to,' +
              ' if none is provided it will be printed to the console')
}
