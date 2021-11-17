const o = require('./operation')
const gh = require('../github')
const io = require('../io')

/**
 * @typedef {{
 *  user: string
 *  repo: string
 * }} RepoId
 */

/** 
 * @typedef {RepoId & {
 *  branch: string
 * }} BranchId
 */

/**
 * @typedef {RepoId & { 
 *  sha: string 
 * }} NodeId
 */

/** 
 * @typedef {NodeId & {
 *  recursive?: true
 * }} TreeId
 */

/**
 * @typedef {NodeId & {
 *  path: string
 * }} FileId
 */

 const api = {
    /** @type {o.Operation<string, gh.Repos>} */
    repos: {
        in: userName => `https://api.github.com/users/${userName}/repos`,
        out: JSON.parse
    },
    /** @type {o.Operation<RepoId, gh.Repo>} */
    repo: {
        in: ({ user, repo }) => `https://api.github.com/repos/${user}/${repo}`,
        out: JSON.parse
    },
    /** @type {o.Operation<BranchId, gh.Branch>} */
    branch: {
        in: ({ user, repo, branch }) => `https://api.github.com/repos/${user}/${repo}/branches/${branch}`,
        out: JSON.parse
    },
    /** @type {o.Operation<TreeId, gh.Tree>} */
    tree: {
        in: ({ user, repo, sha }) => `https://api.github.com/repos/${user}/${repo}/git/trees/${sha}?recursive=1`,
        out: JSON.parse
    },
    /** @type {o.Operation<FileId, string>} */
    file: {
        in: ({ user, repo, sha, path }) => `https://raw.githubusercontent.com/${user}/${repo}/${sha}/${path}`,
        out: x => x,
    },
}

// async API

/**
 * @typedef {{
 *  [k in keyof typeof api]: typeof api[k] extends o.Operation<infer I, infer O> ? (_: I) => Promise<O> : never
 * }} AsyncIo
 */

/** @type {(_: io.Fetch) => AsyncIo} */
const gitHubAsyncApi = fetch => {
    /** @type {(_: o.Operation<any, any>) => (_: any) => Promise<any>} */
    const f = o.asyncOp(fetch)
    /** @type {any} */
    const result = Object.fromEntries(Object.entries(api).map(([k, v]) => [k, f(v)]))
    return result
}

module.exports = {
    gitHubAsyncApi
}