import Section from "../ficsitui/Section";
import { i18n, useLang } from "../lang";

export default function Guide() {
	const { localised } = useLang();
	return (
		<>
			<Section title={localised(i18n.sidepanel.guide.quickstartTitle)}>
				{localised(i18n.sidepanel.guide.quickstart)}
			</Section>
			<Section title={localised(i18n.sidepanel.guide.aboutTitle)}>
				<strong className="affiliation-note">
					{localised(i18n.sidepanel.guide.affiliationNote)}
				</strong>
				<br />
				{localised(i18n.sidepanel.guide.aboutGeneral)}
			</Section>
		</>
	);
}
