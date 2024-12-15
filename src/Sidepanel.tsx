import { useState, type Dispatch, type SetStateAction } from "react";
import Window from "./ficsitui/Window";
import WindowTopbar from "./ficsitui/WindowTopbar";
import WindowTopbarTab from "./ficsitui/WindowTopbarTab";
import Icon from "./Icon";
import { i18n, useLang } from "./lang";
import Settings from "./sidepanel/Settings";
import Guide from "./sidepanel/Guide";

export type SidepanelProps = {
	extended: boolean;
	setExtended: Dispatch<SetStateAction<boolean>>;
	setLanguage: Dispatch<SetStateAction<"en-us" | "de-de">>;
};

export default function Sidepanel({
	extended,
	setExtended,
	setLanguage,
}: SidepanelProps) {
	const onClose = () => {
		setExtended(false);
	};

	// const [sidepanelWidth, setSidepanelWidth] = useState(0);
	// const ref = useRef<HTMLDivElement | null>(null);
	// useEffect(() => {
	//     if (ref.current) {
	//         setSidepanelWidth(ref.current.offsetWidth);
	//     }
	// }, []);

	const [tab, setTab] = useState<"factory" | "settings" | "guide">("guide");
	const { localised } = useLang();

	return (
		<div id="sidepanel" className={extended ? "extended" : ""}>
			<Window>
				<WindowTopbar onClose={onClose}>
					<WindowTopbarTab
						tabId="factory"
						activeTab={tab}
						setActiveTab={setTab}
					>
						<Icon icon="factory" />
						{localised(i18n.sidepanel.tabs.factory)}
					</WindowTopbarTab>
					<WindowTopbarTab
						tabId="settings"
						activeTab={tab}
						setActiveTab={setTab}
					>
						<Icon icon="settings" />
						{localised(i18n.sidepanel.tabs.settings)}
					</WindowTopbarTab>
					<WindowTopbarTab tabId="guide" activeTab={tab} setActiveTab={setTab}>
						<Icon icon="info" />
						{localised(i18n.sidepanel.tabs.guide)}
					</WindowTopbarTab>
				</WindowTopbar>
				{tab === "settings" && (
					<Settings setLanguage={setLanguage} key="settings" />
				)}
				{tab === "guide" && <Guide />}
			</Window>
		</div>
	);
}
