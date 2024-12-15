import type React from "react";
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

export type Translatable = {
	enUs: Translation;
	deDe: Translation;
};
export type TranslatableString = {
	enUs: string;
	deDe: string;
}
export type Translation =
	| string
	| (string | React.JSX.Element)[];
export type Translated = (string | React.JSX.Element)[];

export type Language = "en-us" | "de-de";

export function localised(
	lang: Language,
	translatable: Translatable,
): Translated {
	switch (lang) {
		case "en-us":
			return interpolateTranslation(translatable.enUs);
		case "de-de":
			return interpolateTranslation(translatable.deDe);
	}
}

export function localisedString(
	lang: Language,
	translatable: TranslatableString,
): string {
	switch (lang) {
		case "en-us":
			return translatable.enUs;
		case "de-de":
			return translatable.deDe;
	}
}

function interpolateTranslation(
	translation: Translation,
): Translated {
	if (typeof translation === "string") {
		return [translation];
	}

	return translation;
}

export function useLang() {
	const lang = useContext(LanguageCtx);
	return {
		localised: useCallback(
			(translatable: Translatable) => {
				return localised(lang, translatable);
			},
			[lang],
		),
		localisedString: useCallback(
			(translatable: TranslatableString) => {
				return localisedString(lang, translatable)
			},
			[lang],
		),
		lang,
	};
}
