import { useState } from "react";
import "./App.css";
import TREE, { TreeNode } from "./tree";
import SourceFooter from "./SourceFooter";

type TreeNodeProps = {
	node: TreeNode;
};
function TreeNodeEntry({ node }: TreeNodeProps) {
	const [expended, setExpended] = useState(false);
	const hasChildren = node.children ? node.children.length > 0 : false;

	const handleToggle = () => {
		if (!hasChildren) return;
		setExpended(!expended);
	};

	return (
		<li className="tree-node">
			<div
				className={`tree-node-name ${hasChildren ? "has-children" : ""} ${expended ? "expended" : ""}`}
				onClick={handleToggle}>
				{node.name}
			</div>
			{hasChildren && expended ? (
				<ul className="tree-node-children">
					{node.children?.map((entry, index) => (
						<TreeNodeEntry key={entry.name + index} node={entry} />
					))}
				</ul>
			) : null}
		</li>
	);
}

function App() {
	return (
		<div className="App">
			<h1>Files tree viewer</h1>
			<div className="tree-root">
				<div className="root-name">{TREE.name}</div>
				<ul className="tree">
					{TREE.children
						.sort((a, b) => (a.name > b.name ? 1 : a.name < b.name ? -1 : 0))
						.sort((a, b) => +b.dir - +a.dir)
						.map((entry, index) => {
							return <TreeNodeEntry key={entry.name + index} node={entry} />;
						})}
				</ul>
			</div>
			<SourceFooter github={"https://github.com/archimede67/react-tree-files"} />
		</div>
	);
}

export default App;
