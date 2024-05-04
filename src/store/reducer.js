import { createStore } from "redux";
import {
  addSubRouteByFolder,
  removeSubRouteByFolder,
} from "../recursiveDirFunction/recursiveDirFunction.ts";

const initialState = {
  folders: [],
  isFolderClicked: false,
  isFileClicked: false,
  clickedFolder: "",
  clickedFolderId: null,
  isRootClicked: false,
  isFormOpen: false,
  isNestedSubmitted: false,
  idOfNestedSubmitted: null,
};

const folderReducer = (state = initialState, action) => {
  if (action.type === "addfolders") {
    let temp = [...state.folders];
    if (state.isRootClicked) {
      temp = [...state.folders, action.value];
    } else {
      addSubRouteByFolder(temp, state, action);
    }
    return {
      ...state,
      folders: [...temp],
      isFormOpen: false,
      isFileClicked: false,
      isFolderClicked: false,
      isRootClicked: false,
    };
  }
  if (action.type === "setRemoveFolder") {
    let temp = [...state.folders];
    removeSubRouteByFolder(temp, action);
    return {
      ...state,
      folders: temp,
      isFormOpen: false,
      isFileClicked: false,
      isFolderClicked: false,
    };
  }
  if (action.type === "fileClicked") {
    return {
      ...state,
      isFileClicked: action.value,
    };
  }
  if (action.type === "folderClicked") {
    return {
      ...state,
      isFolderClicked: action.value,
    };
  }

  if (action.type === "clickedFolderName") {
    return {
      ...state,
      clickedFolder: action.value.name,
      clickedFolderId: action.value.id,
    };
  }

  if (action.type === "isRootClicked") {
    return {
      ...state,
      isRootClicked: action.value,
    };
  }
  if (action.type === "setisFormOpen") {
    let temp = {
      ...state,
      isFormOpen: action.value,
    };
    return temp;
  }

  if (action.type === "setIsClickedRightInNested") {
    return {
      ...state,
      isNestedSubmitted: action.value.isClicked,
      idOfNestedSubmitted: action.value.id,
    };
  }

  return state;
};

const store = createStore(folderReducer);

export default store;
