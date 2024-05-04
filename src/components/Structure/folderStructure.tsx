import "../Structure/folderStructure.scss";
import { useState } from "react";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import RemoveOutlinedIcon from "@mui/icons-material/RemoveOutlined";
import NestedFolderStructure from "./NestedFolderStructure/nestedFolderStructure";
import { useDispatch, useSelector } from "react-redux";
import { IInitialState } from "../../interface/interfaceForInitialState";

function FolderStructure(props: {
  folderName: string;
  folderId: string | null;
  isFile: boolean;
}) {
  const [isFocused, setisFocused] = useState(false);
  const dispatch = useDispatch();
  const { folderName, folderId, isFile } = props;

  const isClickedRight = useSelector(
    (state: IInitialState) => state.isNestedSubmitted
  );

  const isClickedRightWithId = useSelector(
    (state: IInitialState) => state.idOfNestedSubmitted
  );

  const matchedFolder = folderId === isClickedRightWithId;

  const checkClickHandler = (folderName: string) => {
    let tempCheckClickedHandler = {
      name: folderName,
      isClicked: true,
      id: folderId,
    };

    dispatch({
      type: "setIsClickedRightInNested",
      value: tempCheckClickedHandler,
    });
    dispatch({ type: "clickedFolderName", value: tempCheckClickedHandler });
  };

  const cancelClickHandler = () => {
    let tempRemoveFolder = {
      name: folderName,
      id: folderId,
    };

    dispatch({ type: "setRemoveFolder", value: tempRemoveFolder });
  };

  return (
    <>
      <div className="verticleLine">
        <div className="horizontalEle">
          <hr />
          <img
            src={
              isFile
                ? "https://folder-structure-9dbd4.web.app/assets/file-regular.svg"
                : "https://folder-structure-9dbd4.web.app/assets/folder-open-regular.svg"
            }
            alt=""
            className="folderImage"
          />
          <span
            className="folderName"
            onMouseEnter={() => setisFocused(true)}
            onMouseLeave={() => setisFocused(false)}
          >
            <span> {folderName}</span>

            {isFocused && isFile && (
              <RemoveOutlinedIcon
                fontSize="small"
                className="cancelButton"
                onClick={cancelClickHandler}
              />
            )}
            {isFocused && !isFile && (
              <>
                <AddOutlinedIcon
                  fontSize="small"
                  className="rightButton"
                  onClick={() => {
                    checkClickHandler(folderName);
                  }}
                />
                <RemoveOutlinedIcon
                  fontSize="small"
                  className="cancelButton"
                  onClick={cancelClickHandler}
                />
              </>
            )}
          </span>
        </div>
      </div>
      {isClickedRight && matchedFolder && <NestedFolderStructure />}
    </>
  );
}

export default FolderStructure;
