const fs = require("fs");
const path = require("path");
const args = process.argv.slice(2);
if (args.length !== 1) return;

const dirpath = path.resolve(args[0]);
if (!fs.existsSync(dirpath)) {
	console.error("Invalid path", dirpath);
	return;
}

const constructTree = (p) => {
	const stat = fs.statSync(p);
	if (stat.isFile()) return { name: path.basename(p), dir: false };

	if (stat.isDirectory()) {
		const children = fs.readdirSync(p);
		if (!children.length) return { name: path.basename(p), dir: true };

		const subtree = [];
		children.forEach((child) => {
			subtree.push(constructTree(path.join(p, child)));
		});

		return { name: path.basename(p), children: subtree, dir: true };
	}
};

const tree = constructTree(dirpath);
fs.writeFileSync("tree.json", JSON.stringify(tree, null, "  "), "utf-8");
