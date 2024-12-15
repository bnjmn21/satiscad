import { createContext } from "react";
import type { Language } from "./lang";

export const LanguageCtx = createContext<Language>("en-us");
