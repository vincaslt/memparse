const x = require('x-ray')({
  filters: {
    trim: (value) => typeof value === 'string' ? value.trim() : value
  }
})

module.exports = courseId => {
  const URL = `http://www.memrise.com/course/${courseId}`

  return {
    parse: function () {
      return new Promise((resolve, reject) => {
        this.xrayParse()((err, obj) => {
          if (!err) {
            resolve(obj)
          } else {
            reject(err)
          }
        })
      })
    },

    xrayParse: () => (
      x(URL, {
        course: '.course-name',
        levels: x('.level', [{
          name: '.level-title | trim',
          words: x('.level@href', x('.thing', [{
            word: '.col_a | trim',
            meaning: '.col_b | trim'
          }]))
        }])
      })
    )
  }
}
