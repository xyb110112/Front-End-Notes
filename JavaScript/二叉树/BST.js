/**
 * 二叉查找树
 * @param {Number}          val     值
 * @param {BinaryTreeNode}  left    左树
 * @param {BinaryTreeNode}  right   右树
 */
function BinaryTreeNode(val, left, right) {
  this.val = val
  this.left = left
  this.right = right
}
/**
 *                1
 *              /   \
 *            2      3
 *          /  \    /  \
 *         4   5   6   7
 *
 */
const binaryTreeRoot = new BinaryTreeNode(
  1,
  new BinaryTreeNode(2, new BinaryTreeNode(4), new BinaryTreeNode(5)),
  new BinaryTreeNode(3, new BinaryTreeNode(6), new BinaryTreeNode(7))
)
/**
 *  前序遍历
 */
const preorderTraverse = (root) => {
  const list = []
  const stack = []
  if (root) {
    stack.push(root)
  }
  while (stack.length) {
    const node = stack.pop()
    list.push(node.val)
    if (node.right) {
      stack.push(node.right)
    }
    if (node.left) {
      stack.push(node.left)
    }
  }
  return list
}
console.log('preorderTraverse = ', preorderTraverse(binaryTreeRoot))
/**
 *  中序遍历
 */
const inorderTraverse = (root) => {
  const list = []
  const stack = []
  let node = root
  while (node || stack.length) {
    while (node) {
      stack.push(node)
      node = node.left
    }
    node = stack.pop()
    list.push(node.val)
    node = node.right
  }
  return list
}
console.log('inorderTraverse = ', inorderTraverse(binaryTreeRoot))
/**
 *  后序遍历
 */
const postorderTraverse = (root) => {
  const list = []
  const stack = []
  if (root) {
    stack.push(root)
  }
  while (stack.length) {
    node = stack.pop()
    list.unshift(node.val)
    if (node.left) {
      stack.push(node.left)
    }
    if (node.right) {
      stack.push(node.right)
    }
  }
  return list
}
console.log('postorderTraverse = ', postorderTraverse(binaryTreeRoot))
