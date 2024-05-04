import FolderStructure from "../Structure/folderStructure";
import { IInputDir } from "../../interface/interfaceForFolders";

function Folders(props: { foldersData: IInputDir[] | undefined }) {
  const { foldersData } = props;
  return (
    <>
      {foldersData?.map((folder: IInputDir, index: number) => {
        return (
          <ul key={index}>
            <li style={{ listStyle: "none" }}>
              <FolderStructure
                folderName={folder?.fname}
                folderId={folder?.id}
                isFile={folder?.isFile}
              />
              {(folder?.child?.length || 0) > 0 && (
                <Folders foldersData={folder?.child} />
              )}
            </li>
          </ul>
        );
      })}
    </>
  );
}

export default Folders;
