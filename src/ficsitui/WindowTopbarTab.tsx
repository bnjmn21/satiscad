import type { Dispatch, ReactNode, SetStateAction } from "react"

export type WindowTopbarTabProps<T extends string> = {
    tabId: T,
    activeTab: T,
    setActiveTab: Dispatch<SetStateAction<T>>,
    children?: ReactNode,
}
export default function WindowTopbarTab<T extends string>(props: WindowTopbarTabProps<T>) {
    return <button
        type="button"
        className={props.tabId === props.activeTab ? "ficsit-topbar-tab active" : "ficsit-topbar-tab"}
        onClick={() => props.setActiveTab(props.tabId)}>
        {props.children}
    </button>;
}