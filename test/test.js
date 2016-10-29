const path = require('path')
const nock = require('nock')
const chai = require('chai')
var chaiAsPromised = require('chai-as-promised')

chai.use(chaiAsPromised)
chai.should()

const TEST_ID = 123456
const Parser = require(path.join(__dirname, '../index.js'))(TEST_ID)

const testCourseFile = path.join(__dirname, './course.html')
const testLevelFile = path.join(__dirname, './level.html')

beforeEach(() => {
  nock(Parser.BASE_URL)
    .get(`/${TEST_ID}`)
    .replyWithFile(200, testCourseFile)

  nock(Parser.BASE_URL)
    .get(`/${TEST_ID}/1`)
    .replyWithFile(200, testLevelFile)
})

it('should parse a course', (done) => {
  Parser.parse().should.eventually.have.property('course', 'test course').and.notify(done)
})

it('should parse a level', (done) => {
  Parser.parse().should.eventually.have.deep.property('levels[0].name', 'test level').and.notify(done)
})

it('should parse word-meaning pairs', (done) => {
  const promise = Parser.parse()
  promise.should.eventually.have.deep.property('levels[0].words[0].word', 'test word')
  promise.should.eventually.have.deep.property('levels[0].words[0].meaning', 'test meaning').and.notify(done)
})
