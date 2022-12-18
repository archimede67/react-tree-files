import treeJSON from "./tree.json";

export type TreeNode = {
	name: string;
	children?: TreeNode[];
};

export default treeJSON;
