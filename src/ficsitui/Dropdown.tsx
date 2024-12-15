import {
	useRef,
	type Dispatch,
	type SetStateAction,
	type ReactElement,
} from "react";
import type { DropdownOptionProps } from "./DropdownOption";

export type DropdownProps<T extends string> = {
	children:
		| ReactElement<DropdownOptionProps<T>>[]
		| ReactElement<DropdownOptionProps<T>>;
	value: T;
	setValue: Dispatch<SetStateAction<T>>;
};
export default function Dropdown<T extends string>(props: DropdownProps<T>) {
	const ref = useRef<HTMLSelectElement>(null);
	const onInput = () => {
		if (ref.current) {
			props.setValue(ref.current.value as T);
		}
	};

	return (
		<select value={props.value} onInput={onInput} ref={ref}>
			{props.children}
		</select>
	);
}
