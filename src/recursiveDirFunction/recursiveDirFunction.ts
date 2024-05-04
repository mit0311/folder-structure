import { IInitialState } from "../interface/interfaceForInitialState";
import { IInputDir } from "../interface/interfaceForFolders";

export function addSubRouteByFolder(
  foldersArray: IInputDir[],
  state: IInitialState,
  action: any
) {
  for (let i = 0; i < foldersArray?.length; i++) {
    if (foldersArray[i].id === state?.clickedFolderId) {
      foldersArray[i]?.child?.push(action.value);
      return foldersArray[i];
    } else {
      addSubRouteByFolder(foldersArray[i]?.child || [], state, action);
    }
  }
}

export function removeSubRouteByFolder(foldersArray: IInputDir[], action: any) {
  for (let i = 0; i < foldersArray?.length; i++) {
    if (foldersArray[i].id === action.value.id) {
      foldersArray.splice(i, 1);
      return foldersArray;
    } else {
      removeSubRouteByFolder(foldersArray[i]?.child || [], action);
    }
  }
}
