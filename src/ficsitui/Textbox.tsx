import mergeRefs from "merge-refs";
import {
	useState,
	type InputHTMLAttributes,
	useRef,
	useEffect,
	type Dispatch,
	type SetStateAction,
	type FormEventHandler,
	forwardRef,
	type ForwardedRef,
} from "react";

export type TextboxProps = {
	value: string;
	setValue: Dispatch<SetStateAction<string>>;
	onInput?: FormEventHandler<HTMLInputElement>;
} & InputHTMLAttributes<HTMLInputElement>;
const Textbox = forwardRef<HTMLInputElement | null, TextboxProps>(_Textbox);
export default Textbox;
function _Textbox(props: TextboxProps, ref: ForwardedRef<HTMLInputElement>) {
	const { value, setValue, onInput, ...inputProps } = props;

	const [width, setWidth] = useState(0);

	const inputRef = useRef<HTMLInputElement | null>(null);
	const mergedRef = mergeRefs(ref, inputRef);
	const sizerRef = useRef<HTMLDivElement | null>(null);

	useEffect(() => {
		if (inputRef.current && sizerRef.current) {
			inputRef.current.value = value;
			setWidth(sizerRef.current.clientWidth);
		}
	}, [value]);

	return (
		<>
			<div
				style={{
					position: "absolute",
					userSelect: "none",
					pointerEvents: "none",
					opacity: 0,
					whiteSpace: "pre",
				}}
				ref={sizerRef}
			>
				{value}
			</div>
			<input
				style={{ width: width + 10 }}
				ref={mergedRef}
				onInput={(e) => {
					if (inputRef.current) {
						setValue(inputRef.current.value);
					}
					onInput?.(e);
				}}
				{...inputProps}
			/>
		</>
	);
}
