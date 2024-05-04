import { IInputDir } from "./interfaceForFolders";

export interface IInitialState {
  folders: IInputDir[];
  isFolderClicked: boolean;
  isFileClicked: boolean;
  clickedFolder: string;
  clickedFolderId: number | null;
  isRootClicked: boolean;
  isFormOpen: boolean;
  isNestedSubmitted: boolean;
  idOfNestedSubmitted: string | null;
}
