import { useReactFlow } from "@xyflow/react";
import Icon from "./Icon";
import TooltipButton from "./TooltipButton";
import { i18n, useLang } from "./lang";

export type ControlsProps = {
	sidepanelExtended: boolean;
};

export default function Controls({ sidepanelExtended }: ControlsProps) {
	const rflow = useReactFlow();
	const zoomIn = () => {
		rflow.zoomIn({
			duration: 250,
		});
	};
	const zoomOut = () => {
		rflow.zoomOut({
			duration: 250,
		});
	};
	const { localised } = useLang();

	return (
		<div className={sidepanelExtended ? "controls extended" : "controls"}>
			<TooltipButton
				tooltip={localised(i18n.controls.zoomIn)}
				className="controls-button"
				onClick={zoomIn}
			>
				<Icon icon="zoom_in" />
			</TooltipButton>
			<TooltipButton
				tooltip={localised(i18n.controls.zoomOut)}
				className="controls-button"
				onClick={zoomOut}
			>
				<Icon icon="zoom_out" />
			</TooltipButton>
		</div>
	);
}
