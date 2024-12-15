import type { Dispatch, SetStateAction } from "react";
import Dropdown from "../ficsitui/Dropdown";
import Section from "../ficsitui/Section";
import DropdownOption from "../ficsitui/DropdownOption";
import { i18n, type Language, useLang } from "../lang";
import Setting from "../ficsitui/Setting";

export type SettingsProps = {
	setLanguage: Dispatch<SetStateAction<Language>>;
};
export default function Settings(props: SettingsProps) {
	const { localised, lang } = useLang();
	return (
		<>
			<Section title={localised(i18n.sidepanel.settings.general)}>
				<Setting name={localised(i18n.sidepanel.settings.language)}>
					<Dropdown value={lang} setValue={props.setLanguage}>
						<DropdownOption value="en-us">
							{i18n.sidepanel.settings.languages.enUs}
						</DropdownOption>
						<DropdownOption value="de-de">
							{i18n.sidepanel.settings.languages.deDe}
						</DropdownOption>
					</Dropdown>
				</Setting>
			</Section>
		</>
	);
}
