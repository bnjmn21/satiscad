import { useCallback, useEffect, useState } from "react";
import {
	ReactFlow,
	Background,
	MiniMap,
	addEdge,
	useNodesState,
	useEdgesState,
	type OnConnect,
} from "@xyflow/react";

import "@xyflow/react/dist/style.css";

import { initialNodes, nodeTypes } from "./nodes";
import { initialEdges, edgeTypes } from "./edges";
import Sidepanel from "./Sidepanel";
import Controls from "./Controls";
import Topbar from "./Topbar";
import { LanguageCtx } from "./Config";
import { i18n, localised, type Language } from "./lang";

export default function App() {
	const [nodes, , onNodesChange] = useNodesState(initialNodes);
	const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
	const onConnect: OnConnect = useCallback(
		(connection) => setEdges((edges) => addEdge(connection, edges)),
		[setEdges],
	);

	const [sidepanelExt, setSidepanelExt] = useState(true);
	const [language, setLanguage] = useState<Language>(
		(localStorage.getItem("lang") || "en-us") as Language,
	);
	const [factoryName, setFactoryName] = useState(
		localised(language, i18n.unnamedFactory, []),
	);
	// biome-ignore lint/correctness/useExhaustiveDependencies(factoryName): only to update factory name when language changes.
	useEffect(() => {
		if (
			factoryName === i18n.unnamedFactory.deDe ||
			factoryName === i18n.unnamedFactory.enUs
		) {
			setFactoryName(localised(language, i18n.unnamedFactory, []));
		}
		localStorage.setItem("lang", language);
	}, [language]);

	return (
		<LanguageCtx.Provider value={language}>
			<ReactFlow
				nodes={nodes}
				nodeTypes={nodeTypes}
				onNodesChange={onNodesChange}
				edges={edges}
				edgeTypes={edgeTypes}
				onEdgesChange={onEdgesChange}
				onConnect={onConnect}
				fitView
				proOptions={{
					hideAttribution: true,
				}}
				colorMode="dark"
				snapToGrid={true}
				snapGrid={[20, 20]}
				maxZoom={4}
				minZoom={0.2}
				onContextMenu={preventDefault}
				id="react-flow"
			>
				<Background gap={20} />
				<MiniMap />
				<Controls sidepanelExtended={sidepanelExt} />
			</ReactFlow>
			<Topbar
				sidepanelExt={sidepanelExt}
				setSidepanelExt={setSidepanelExt}
				factoryName={factoryName}
				setFactoryName={setFactoryName}
			/>
			<Sidepanel
				extended={sidepanelExt}
				setExtended={setSidepanelExt}
				setLanguage={setLanguage}
			/>
		</LanguageCtx.Provider>
	);
}

function preventDefault(e: { preventDefault(): void }) {
	e.preventDefault();
}

// function fitViewWithSidebarInMind(
// 	sidebarWidthPx: number,
// 	rf: ReactFlowInstance,
// 	rfs: ReactFlowState,
// ) {
// 	const { getNodesBounds, getNodes, setViewport } = rf;
// 	const { width, height, minZoom, maxZoom } = rfs;
// 	const nodes = getNodes();
// 	const bounds = getNodesBounds(nodes);
// 	const vp = getViewportForBounds(bounds, width, height, minZoom, maxZoom, 0.1);
// 	setViewport(vp, {
// 		duration: 250,
// 	});
// }