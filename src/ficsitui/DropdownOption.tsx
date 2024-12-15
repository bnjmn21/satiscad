import type { ReactNode } from "react";

export type DropdownOptionProps<T extends string> = {
	children?: ReactNode;
	value: T;
};
export default function DropdownOption<T extends string>(
	props: DropdownOptionProps<T>,
) {
	return <option value={props.value}>{props.children}</option>;
}
