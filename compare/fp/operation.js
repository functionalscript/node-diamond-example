const io = require('../io')

/**
 * @template I
 * @template O
 * @typedef {{
 *  in: (_: I) => string
 *  out: (_: string) => O
 * }} Operation
 */

/** @type {(_: io.Fetch) => <I, O>(_: Operation<I, O>) => (_: I) => Promise<O>} */
const asyncOp = fetch => op => async input => op.out(await (await fetch(op.in(input))).text())

module.exports = {
    asyncOp
}