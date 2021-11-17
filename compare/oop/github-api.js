const io = require('../io')
const gh = require('../github')

// GitHub API:

/**
 * @typedef {{
 *  info: () => Promise<gh.Repo>
 *  branch: (branchName: string) => Promise<gh.Branch>
 *  tree: (sha: string) => Promise<gh.Tree>
 *  file: (sha: string, file: string) => Promise<string>
 * }} RepoApi
 */

/**
 * @typedef {{
 *  repos: () => Promise<gh.Repos>
 *  repo: (repoName: string) => RepoApi
 * }} UserApi
 */

/** 
 * @typedef {{
 *  user: (userName: string) => UserApi
 * }} GitHubApi
 */

/** @type {(fetch: io.Fetch) => GitHubApi} */
const gitHubAsyncApi = fetch => ({
    user: userName => ({
        repos: async () => 
            (await fetch(`https://api.github.com/users/${userName}/repos`)).json(),
        repo: repoName => ({
            info: async () => 
                (await fetch(`https://api.github.com/repos/${userName}/${repoName}`)).json(),
            branch: async branchName => 
                (await fetch(`https://api.github.com/repos/${userName}/${repoName}/branches/${branchName}`)).json(),
            tree: async sha =>
                (await fetch(`https://api.github.com/repos/${userName}/${repoName}/git/trees/${sha}?recursive=1`)).json(),
            file: async (sha, path) =>
                (await fetch(`https://raw.githubusercontent.com/${userName}/${repoName}/${sha}/${path}`)).text()
        }),
    })
})

module.exports = {
    gitHubAsyncApi
}