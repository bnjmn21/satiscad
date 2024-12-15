import { useEffect, useState, type Dispatch, type SetStateAction } from "react";
import TooltipButton from "./TooltipButton";
import Icon from "./Icon";
import FactoryName from "./FactoryName";
import { getHeaderText } from "./satiscadTexts";
import {
	autoUpdate,
	offset,
	useFloating,
	useHover,
	useInteractions,
	useTransitionStyles,
} from "@floating-ui/react";

export type TopbarProps = {
	sidepanelExt: boolean;
	setSidepanelExt: Dispatch<SetStateAction<boolean>>;
	factoryName: string;
	setFactoryName: Dispatch<SetStateAction<string>>;
};

export default function Topbar({
	sidepanelExt,
	setSidepanelExt,
	factoryName,
	setFactoryName,
}: TopbarProps) {
	const [headerTooltipOpen, setHeaderTooltipOpen] = useState(false);
	const { refs, floatingStyles, context } = useFloating({
		open: headerTooltipOpen,
		onOpenChange: setHeaderTooltipOpen,
		middleware: [offset(10)],
		whileElementsMounted: autoUpdate,
		placement: "bottom-start",
	});
	const hover = useHover(context, {
		move: false,
		delay: { open: 200, close: 0 },
	});
	const { getReferenceProps, getFloatingProps } = useInteractions([hover]);
	const { isMounted, styles: animStyles } = useTransitionStyles(context, {
		duration: 250,
	});
	const [headerTooltipText, setHeaderTooltipText] = useState<
		(string | React.JSX.Element)[]
	>([""]);

	useEffect(() => {
		if (isMounted) {
			setHeaderTooltipText(getHeaderText());
		}
	}, [isMounted]);

	return (
		<div id="topbar" className={sidepanelExt ? "extended" : ""}>
			<div className="topbar-inner">
				<TooltipButton
					tooltip="open sidebar"
					placement="bottom-start"
					className="topbar-button"
					id="sidepanel-ext-button"
					onClick={() => setSidepanelExt(true)}
				>
					<Icon icon="dock_to_right" />
				</TooltipButton>
				<div className="topbar-left">
					<h1
						style={{
							pointerEvents: "all",
						}}
						ref={refs.setReference}
						{...getReferenceProps()}
					>
						SatisCAD
					</h1>
					{isMounted && (
						<div
							ref={refs.setFloating}
							style={floatingStyles}
							{...getFloatingProps()}
						>
							<span className="tooltip" style={animStyles}>
								{headerTooltipText}
							</span>
						</div>
					)}
					<div className="topbar-seperator">/</div>
					<FactoryName name={factoryName} setName={setFactoryName} />
				</div>
			</div>
		</div>
	);
}
