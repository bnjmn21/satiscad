import {
	useEffect,
	useRef,
	useState,
	type Dispatch,
	type SetStateAction,
} from "react";
import TooltipButton from "./TooltipButton";
import { i18n, useLang } from "./lang";
import Icon from "./Icon";
import Textbox from "./ficsitui/Textbox";

export type FactoryNameProps = {
	name: string;
	setName: Dispatch<SetStateAction<string>>;
};
export default function FactoryName({ name, setName }: FactoryNameProps) {
	const [edit, setEdit] = useState(false);
	const { localised } = useLang();

	const input = useRef<HTMLInputElement>(null);
	useEffect(() => {
		if (input.current && edit) {
			input.current.focus();
		}
	});
	const button = useRef<HTMLButtonElement>(null);

	useEffect(() => {
		const eventListener = (e: KeyboardEvent) => {
			if (edit && e.key === "Enter") {
				e.stopPropagation();
				setEdit(false);
			}
		};

		document.addEventListener("keydown", eventListener);
		return () => {
			document.removeEventListener("keydown", eventListener);
		};
	}, [edit]);

	return (
		<>
			<Textbox
				value={name}
				setValue={setName}
				disabled={!edit}
				className="factory-name-input"
				ref={input}
				onBlur={(e) => {
					if (button.current && e.relatedTarget !== button.current)
						setEdit(false);
				}}
				onKeyDown={(e) => {
					if (e.key === "Enter") {
						setEdit(false);
					}
				}}
			/>

			<TooltipButton
				tooltip={localised(i18n.toppanel.editName)}
				className="topbar-button"
				onClick={() => {
					setEdit(!edit);
				}}
				ref={button}
				style={{
					fontSize: "0.8rem",
				}}
			>
				<Icon icon="edit" />
			</TooltipButton>
		</>
	);
}
