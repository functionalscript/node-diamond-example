const http = require('http')
const https = require('https')

/** 
 * @typedef {{
 *  text: () => Promise<string>
 *  json: () => Promise<any>
 * }} FetchResponse
 */

/** @typedef {(url: string) => Promise<FetchResponse>} Fetch */

/** @type {(_: string) => (_: string) => [string, string]} */
const splitOne = source => search => {
    const index = source.indexOf(search)
    return [source.substring(0, index), source.substring(index + search.length)]
}

/** @type {Fetch} */
const fetch = url => {
    /** @type {(resolve: (_: FetchResponse) => void, regect: (_: unknown) => void) => void} */
    const executor = (resolve, reject) => {
        /** @type {(_: http.IncomingMessage) => void} */
        const response = res => {
            let data = ''
            const statusCode = res.statusCode
            const end = () =>
                resolve({ 
                    text: async () => data, 
                    json: async () => JSON.parse(data)
                })
            res.on('data', chunk => { data += chunk })
            res.on('end', end)
        }
        const [protocol, hostPath] = splitOne(url)('://')
        const [host, path] = splitOne(hostPath)('/')
        const options = {
            protocol: protocol + ':',
            host,
            path: '/' + path,
            headers: {  
                'User-Agent': 'functionalscript/node-diamon-example'
            }
        }
        https.get(options, response).on('error', reject)
    }
    return new Promise(executor)    
}

module.exports = {
    fetch,
}
