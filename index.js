var css = require('css')
var getOptions = require('loader-utils').getOptions
var validateOptions = require('schema-utils')

const defaultOptions = {
  rootPx: 12,
  precision: 4,
  roundingMethod: 'round', //round:四舍五入 enter:进一
  min: 2
}

const _replaceCb = (value, { rootPx, precision, roundingMethod, min } = {}) => {
  if (value < min) return value + 'px'

  const roundFn = roundingMethod === 'enter' ? Math.ceil : Math.floor
  const coeffient = Math.pow(10, precision)
  const ret = roundFn((value / rootPx) * coeffient) / coeffient + 'rem'

  return ret
}

const schema = {
  type: 'object',
  properties: {
    rootPx: { type: 'number' },
    precision: { type: 'number' },
    roundingMethod: { type: 'string' },
    min: { type: 'number' }
  }
}

module.exports = function(source) {
  const inputOptions = getOptions(this) || {}

  validateOptions(schema, inputOptions)

  const options = { ...defaultOptions, ...inputOptions }

  let ast = css.parse(source)
  ast.stylesheet.rules.forEach(rule => {
    if (rule.type !== 'rule') return
    rule.declarations.forEach(declaration => {
      declaration.value = declaration.value.replace(/([\d\.]+)px/, (...item) =>
        _replaceCb(Number(item[1]), options)
      )
    })
  })
  return css.stringify(ast)
}
