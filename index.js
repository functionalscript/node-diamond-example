const example = require('node-example')
const refExample = require('node-ref-example')
module.exports = {
    "example": example,
    "refExample": refExample,
    "result": example["multiply"](10)(23),
}
