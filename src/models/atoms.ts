import { atom } from "recoil";
import { DefaultTheme } from "styled-components";
import {
  defaultTheme,
  oceanTheme,
  pastelTheme,
  valentineTheme,
  vintageTheme,
} from "../theme";

export interface IToDo {
  text: string;
  id: number;
}

export interface IToDoState {
  [key: string]: IToDo[];
}

export const TODOS_LS = "toDos";
export const TITLE_LS = "listTitle";
export const THEME_LS = "theme";

export const loadFromLocalStorage = (dataName: string) => {
  const loadedData = localStorage.getItem(dataName);
  if (!loadedData) return null;

  return JSON.parse(loadedData);
};

export const saveToLocalStorage = <T>(dataName: string, result: T) => {
  localStorage.setItem(dataName, JSON.stringify(result));
};

export const defaultToDos: IToDoState = {
  "To Do": [
    { text: "Go to Supermarket", id: 1 },
    { text: "Clean Living Room", id: 2 },
    { text: "Finish Homework", id: 3 },
  ],
  Doing: [{ text: "Learn English", id: 4 }],
  Done: [
    { text: "Call Mom", id: 5 },
    { text: "Exercise", id: 6 },
  ],
};

export const toDoState = atom<IToDoState>({
  key: "toDos",
  default: loadFromLocalStorage(TODOS_LS) ?? defaultToDos,
});

export const listTitleState = atom<string>({
  key: "listTitle",
  default:
    loadFromLocalStorage(TITLE_LS) !== null
      ? loadFromLocalStorage(TITLE_LS).title
      : "My To Do List",
});

export enum TrashTypes {
  BOARD = "BOARD",
  CARD = "CARD",
}

interface ITrashState {
  [key: string]: boolean;
}

export const trashState = atom<ITrashState>({
  key: "trashStatus",
  default: {
    [TrashTypes.BOARD]: false,
    [TrashTypes.CARD]: false,
  },
});

export const themeState = atom<DefaultTheme[]>({
  key: "theme",
  default: loadFromLocalStorage(THEME_LS) ?? [
    defaultTheme,
    pastelTheme,
    vintageTheme,
    oceanTheme,
    valentineTheme,
  ],
});
