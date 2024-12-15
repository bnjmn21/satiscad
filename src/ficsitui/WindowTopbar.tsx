import type { ReactNode } from "react";
import TooltipButton from "../TooltipButton";
import Icon from "../Icon";
import { i18n, useLang } from "../lang";

export type WindowTopbarProps = {
	children?: ReactNode;
	onClose?: () => void;
};
export default function WindowTopbar({ children, onClose }: WindowTopbarProps) {
	const { localised } = useLang();
	return (
		<div className="ficsit-topbar">
			<div className="ficsit-topbar-inner">{children}</div>
			{onClose && (
				<TooltipButton
					tooltip={localised(i18n.ficsitUi.closeWindow)}
					placement="right"
					type="button"
					className="ficsit-topbar-close"
					onClick={onClose}
				>
					<Icon icon="close" />
				</TooltipButton>
			)}
		</div>
	);
}
