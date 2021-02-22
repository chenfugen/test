/*
 * @params sNodes: <Array:<Object>> 具有父子关系的由对象组成的数组
 * setting: {
 *  childrenNO: <string>, //自身字段
 *  parentNO: <string>, // 父级字段
 *  childrenDesc: <string>, // 子元素的字段名称，默认children
 * }
 * 格式化树形结构
 */
export function formDataTree(sNodes, setting) {
	let key = setting.childrenNO
	let parentKey = setting.parentNO
	if (!key || key == "" || !sNodes) return []

	if (Array.isArray(sNodes)) {
		var r = []
		var tmpMap = {}
		for (let i = 0, l = sNodes.length; i < l; i++) {
			tmpMap[sNodes[i][key]] = sNodes[i]
		}
		for (let i = 0, l = sNodes.length; i < l; i++) {
			var p = tmpMap[sNodes[i][parentKey]]
			if (p && sNodes[i][key] != sNodes[i][parentKey]) {
				var children = nodeChildren(setting, p)
				if (!children) {
					children = nodeChildren(setting, p, [])
				}
				children.push(sNodes[i])
			} else {
				r.push(sNodes[i])
			}
		}
		return r
	} else {
		return [sNodes]
	}
}

let nodeChildren = (setting, node, newChildren) => {
	if (!node) {
		return null;
	}
	var key = setting.childrenDesc || 'children';
	if (typeof newChildren !== 'undefined') {
		node[key] = newChildren;
	}
	return node[key];
}
// 获取多叉树的深度，从0开始
export function getDeep(node) {
	let ans = 0;
	dfs(node, 0);
	return ans - 1;

	function dfs(node, deep) {
		if (!node.childList) {
			ans = Math.max(ans, deep);
			return;
		} else {
			for (let i = 0; i < node.childList.length; i++) {
				dfs(node.childList[i], deep + 1);
			}
		}
	}
}