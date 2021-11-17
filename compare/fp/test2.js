const { gitHubApi } = require('./github-api')
const { fetch } = require('../io')
const { asyncOp } = require('./operation')

const main = async () => {
    const f = asyncOp(fetch)
    const user = 'functionalscript'
    const repoData = (await f(gitHubApi.repos)(user))[0]
    console.log(`repo name: ${repoData.full_name}`)
    const repo = repoData.name
    const branch = await f(gitHubApi.branch)({ user, repo, branch: repoData.default_branch})
    console.log(`default branch: ${branch.name}`)
    const sha = branch.commit.sha
    console.log(`commit: ${sha}`)
    const tree = await f(gitHubApi.tree)({ user, repo, sha })
    for (let i of tree.tree) {
        if (i.type === 'blob') {
            const path = i.path
            console.log(`file: ${path}:`)
            const file = await f(gitHubApi.file)({ user, repo, sha, path })
            console.log(file)
        }
    }
}

main()