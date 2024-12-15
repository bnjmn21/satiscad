const texts = [
	["Satisfying Completely Accurate Design"],
	["Satisfyingly Complex Automation Design"],
	["Satisfactory: Creation And Destruction"],
	// biome-ignore lint/correctness/useJsxKeyInIterable: false alarm
	["Satisfactory: Construct, Automate, ", <s>Explore & Exploit</s>, " Design"],
	["Satisfactory Cannot Automate Dollars"],
];

for (const text of texts) {
	text.push("™");
}

let first = true;

export function getHeaderText() {
	if (first) {
		first = false;
		return ["Satisfactory - Computer Aided Design"];
	}

	if (texts.length === 0) {
		return ["Satisfactory - Computer Aided Design"];
	}

	return texts.splice(Math.random() * texts.length, 1)[0];
}
