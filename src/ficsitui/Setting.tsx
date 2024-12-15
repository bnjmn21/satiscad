import type { ReactNode } from "react";

export type SettingProps = {
	children?: ReactNode;
	name: string;
};
export default function Setting({ children, name }: SettingProps) {
	return (
		<div className="ficsit-setting">
			<span className="ficsit-setting-name">{name}</span>
			{children}
		</div>
	);
}
