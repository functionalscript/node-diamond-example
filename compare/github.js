// GitHub responses:

/** 
 * @typedef {{
 *  full_name: string
 *  name: string
 *  default_branch: string
 * }} Repo 
 */

/** @typedef {Repo[]} Repos */

/**
 * @typedef {{
 *  sha: string
 * }} Commit
 */

/**
 * @typedef {{
 *  name: string
 *  commit: Commit
 * }} Branch
 */

/**
 * @typedef {{
 *  path: string
 *  type: 'tree'|'blob'
 * }} TreeNode
 */

/**
 * @typedef {{
 *  tree: TreeNode[]
 * }} Tree
 */

module.exports = {}