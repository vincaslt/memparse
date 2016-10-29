const x = require('x-ray')({
  filters: {
    trim: (value) => typeof value === 'string' ? value.trim() : value
  }
})

module.exports = courseId => ({
  BASE_URL: 'http://www.memrise.com/course',
  parse: function () {
    return new Promise((resolve, reject) => {
      this.xrayParse()((err, obj) => err ? reject(err) : resolve(obj))
    })
  },

  xrayParse: function () {
    return x(`${this.BASE_URL}/${courseId}`, {
      course: '.course-name',
      levels: x('.level', [{
        name: '.level-title | trim',
        words: x('.level@href', x('.thing', [{
          word: '.col_a | trim',
          meaning: '.col_b | trim'
        }]))
      }])
    })
  }
})
