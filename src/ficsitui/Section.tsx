import type { ReactNode } from "react"

export type SectionProps = {
    children?: ReactNode,
    title: string,
}
export default function Section({ children, title }: SectionProps) {
    return <section>
        <h2 className="ficsit-section-title">{title}</h2>
        <div className="ficsit-section-inner">
            {children}
        </div>
    </section>
}