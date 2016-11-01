#! /usr/bin/env node
const prettyjson = require('prettyjson')
const argv = require('minimist')(process.argv.slice(2), {
  string: ['f', 'file']
})

const argsAreCorrect = argv._.length === 1 && argv._[0] !== ''
if (argsAreCorrect) {
  const Parser = require('../index.js')(argv._[0])
  const filename = argv.f || argv.file

  if (!filename) {
    // Print to console
    Parser.parse().then(list => {
      console.log(prettyjson.render(list, { noColor: true }))
    })
  } else {
    // Write to file
    const writer = Parser.xrayParse().write(filename)

    writer.on('finish', () => console.log(`Done parsing! Output file: ${filename}`))
    writer.on('error', console.error)
  }
} else {
  console.log('\nUsage: memparse <courseId> [--file <output-file>]\n')
  console.log('       courseId - required course id, i.e. http://www.memrise.com/course/<courseId>')
  console.log('       --f, -f - optional file name to write the output to,' +
              ' if none is provided it will be printed to the console')
}
