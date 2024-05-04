import { useState } from "react";
import "../Form/Form.scss";
import ClearOutlinedIcon from "@mui/icons-material/ClearOutlined";
import CheckOutlinedIcon from "@mui/icons-material/CheckOutlined";
import { useDispatch, useSelector } from "react-redux/es/exports";
import { v4 as uuid } from "uuid";
import fileImage from "../../assests/fileImage.svg";
import folderImage from "../../assests/folderImage.svg";
import { IInputDir } from "../../interface/interfaceForFolders";
import { IInitialState } from "../../interface/interfaceForInitialState";

function Form() {
  const [inputName, setInputName] = useState<IInputDir>({
    fname: "",
    id: null,
    parentId: null,
    isFile: false,
    child: [],
  });
  const [errorMessage, setErrorMessage] = useState("");
  const isFileClicked = useSelector(
    (state: IInitialState) => state.isFileClicked
  );
  const clickedFolderId = useSelector(
    (state: IInitialState) => state.clickedFolderId
  );
  const foldersData: IInputDir[] = useSelector(
    (state: IInitialState) => state.folders
  );

  const uniqueId = uuid();
  const dispatch = useDispatch();
  const handleDirNameChange = (e: any) => {
    setInputName(
      (prevState: IInputDir): IInputDir => ({
        ...prevState,
        fname: e.target?.value,
        id: uniqueId,
        parentId: clickedFolderId,
        isFile: isFileClicked,
      })
    );
  };

  const handleFormSubmit = (e: any) => {
    e.preventDefault();
    if (inputName?.fname?.length === 0) {
      if (isFileClicked) {
        setErrorMessage("File name is required");
      } else {
        setErrorMessage("Folder name is required");
      }
    } else {
      dispatch({ type: "addfolders", value: inputName });
      dispatch({
        type: "setIsClickedRightInNested",
        value: { isClicked: false, id: null },
      });

      setInputName(
        (prevState: IInputDir): IInputDir => ({
          ...prevState,
          fname: "",
        })
      );
    }
  };

  const handleFormCancel = () => {
    dispatch({
      type: "setIsClickedRightInNested",
      value: { isClicked: false, id: null },
    });
  };

  return (
    <>
      <div
        className="folderContainer"
        style={{ margin: (foldersData?.length || 0) === 0 ? "10px" : "" }}
      >
        <form
          className="folderForm"
          onSubmit={(e) => {
            handleFormSubmit(e);
          }}
        >
          <img
            src={isFileClicked ? fileImage : folderImage}
            alt=""
            className="folderImage"
          />
          <input
            type="text"
            className="inputForFolder"
            value={inputName.fname}
            onChange={handleDirNameChange}
          />
          <CheckOutlinedIcon
            fontSize="small"
            className="rightMark"
            onClick={(e) => {
              handleFormSubmit(e);
            }}
          />
          <ClearOutlinedIcon
            fontSize="small"
            className="cancelMark"
            onClick={handleFormCancel}
          />
        </form>
        {errorMessage.length > 0 && (
          <span className="error">{errorMessage}</span>
        )}
      </div>
    </>
  );
}

export default Form;
