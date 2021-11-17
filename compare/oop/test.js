const { gitHubAsyncApi } = require('./github-api')
const { fetch } = require('../io')

const main = async () => {
    const userApi = gitHubAsyncApi(fetch).user('functionalscript')
    const repo = (await userApi.repos())[0]
    console.log(`repo name: ${repo.full_name}`)
    const repoApi = userApi.repo(repo.name)
    const branch = await repoApi.branch(repo.default_branch)
    console.log(`default branch: ${branch.name}`)
    const sha = branch.commit.sha
    console.log(`commit: ${sha}`)
    const tree = await repoApi.tree(sha)
    for (let i of tree.tree) {
        if (i.type === 'blob') {
            console.log(`file: ${i.path}:`)
            const file = await repoApi.file(sha, i.path)
            console.log(file)
        }
    }
}

main()