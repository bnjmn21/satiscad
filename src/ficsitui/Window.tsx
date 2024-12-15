import type { ReactNode } from "react";

export type WindowProps = {
    children?: ReactNode,
}

export default function Window({ children }: WindowProps) {
    return (
        <div className="ficsit-blur ficsit-window">
            {children}
        </div>
    );
}
