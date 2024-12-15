export type Icons =
	| "close"
	| "zoom_in"
	| "zoom_out"
	| "crop_free"
	| "dock_to_right"
	| "factory"
	| "settings"
	| "info"
	| "edit";
export type IconProps = {
	icon: Icons;
};
export default function Icon({ icon }: IconProps) {
	return <span className="material-symbols-outlined">{icon}</span>;
}
