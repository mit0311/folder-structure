import "./App.scss";
import Form from "./components/Form/Form";
import Folders from "./components/ShowFolders/Folders";
import { useDispatch, useSelector } from "react-redux";
import { IInputDir } from "./interface/interfaceForFolders";
import { IInitialState } from "./interface/interfaceForInitialState";

function App() {
  const dispatch = useDispatch();
  const foldersData: IInputDir[] = useSelector(
    (state: IInitialState) => state.folders
  );

  const isFormOpen = useSelector((state: IInitialState) => state.isFormOpen);
  const handleClickForAddFolder = () => {
    dispatch({ type: "setisFormOpen", value: true });
    dispatch({ type: "isRootClicked", value: true });
  };

  return (
    <>
      <h1 className="header">FOLDER STRUCTURE</h1>
      <button
        className="rootButton"
        type="submit"
        onClick={handleClickForAddFolder}
      >
        Add folder to root
      </button>
      <Folders foldersData={foldersData} />
      {isFormOpen && <Form />}
    </>
  );
}

export default App;
