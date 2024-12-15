import { useCallback, useContext } from "react";
import { LanguageCtx } from "./Config";

export const i18n = {
	ficsitUi: {
		closeWindow: { enUs: "close", deDe: "schließen" },
	},
	controls: {
		zoomIn: { enUs: "zoom in", deDe: "reinzoomen" },
		zoomOut: { enUs: "zoom out", deDe: "rauszoomen" },
	},
	sidepanel: {
		tabs: {
			factory: { enUs: "Factory", deDe: "Fabrik" },
			settings: { enUs: "Settings", deDe: "Einstellungen" },
			guide: { enUs: "Guide", deDe: "Anleitung" },
		},
		settings: {
			general: { enUs: "General", deDe: "Allgemein" },
			language: { enUs: "Language", deDe: "Sprache" },
			languages: { enUs: "English", deDe: "Deutsch" },
		},
		guide: {
			quickstartTitle: {
				enUs: "How do I start? (the TLDR)",
				deDe: "Wie fang ich an? (kurzgefasst)",
			},
			quickstart: {
				enUs:
					"Right-click to place machines, drag to connect, " +
					"right-click on machines for options. " +
					"You'll figure the rest out.",
				deDe:
					"Rechtsklick um Maschinen zu plazieren, " +
					"Ziehen um sie zu verbinden, " +
					"Maschinen rechtsklicken für Einstellungen. " +
					"Den Rest findest du auch so raus.",
			},
			aboutTitle: { enUs: "About SatisCAD", deDe: "Über SatisCAD" },
			aboutGeneral: {
				enUs:
					"SatisCAD is a tool for designing your factories, " +
					"inspired by Satisfactory Modeler, for the browser. ",
				deDe:
					"SatisCAD ist ein Werkzeug zum Designen von deinen" +
					"Fabriken, inspiriert von Satisfactory Modeler, für den Browser.",
			},
			affiliationNote: {
				enUs: "Not affiliated with Coffee Stain Studios or Satisfactory.",
				deDe: "Nicht zugehörig zu Coffee Stain Studios oder Satisfactory.",
			},
		},
	},
	toppanel: {
		openSidepanel: { enUs: "open sidepanel", deDe: "Seitenleiste öffnen" },
		editName: { enUs: "edit name", deDe: "Name ändern" },
	},
	unnamedFactory: { enUs: "Unnamed Factory", deDe: "Unbenannte Fabrik" },
};

export type Translatable<T extends unknown[]> = {
	enUs: Translation<T>;
	deDe: Translation<T>;
	params?: number;
};
export type Translation<T extends unknown[]> =
	| string
	| ((...args: T) => string);

export type Language = "en-us" | "de-de";

export function localised<T extends unknown[]>(
	lang: Language,
	translatable: Translatable<T>,
	args: T,
): string {
	switch (lang) {
		case "en-us":
			return interpolateTranslation(translatable.enUs, args);
		case "de-de":
			return interpolateTranslation(translatable.deDe, args);
	}
}

function interpolateTranslation<T extends unknown[]>(
	translation: Translation<T>,
	args: T,
): string {
	if (typeof translation === "string") {
		return translation;
	}

	return translation(...args);
}

export function useLang() {
	const lang = useContext(LanguageCtx);
	return {
		localised: useCallback(
			<T extends unknown[]>(translatable: Translatable<T>, ...args: T) => {
				return localised(lang, translatable, args);
			},
			[lang],
		),
		lang,
	};
}
