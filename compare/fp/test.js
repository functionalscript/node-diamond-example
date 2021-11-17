const { gitHubAsyncApi } = require('./github-api')
const { fetch } = require('../io')

const main = async () => {
    const userApi = gitHubAsyncApi(fetch)
    const user = 'functionalscript'
    const repoData = (await userApi.repos(user))[0]
    console.log(`repo name: ${repoData.full_name}`)
    const repo = repoData.name
    const branch = await userApi.branch({ user, repo, branch: repoData.default_branch})
    console.log(`default branch: ${branch.name}`)
    const sha = branch.commit.sha
    console.log(`commit: ${sha}`)
    const tree = await userApi.tree({ user, repo, sha })
    for (let i of tree.tree) {
        if (i.type === 'blob') {
            const path = i.path
            console.log(`file: ${path}:`)
            const file = await userApi.file({ user, repo, sha, path })
            console.log(file)
        }
    }
}

main()