import { getRootDrive } from "../api/gdrive-api";
import { getAllFiles } from "../api/gdrive-api";
import { documents } from "../shared/store";
import type { Drive, File, RootDrive } from "../types/types";

export const createParentsAndChildren = async (
  token: string
): Promise<File[]> => {
  const drive: Drive = await getAllFiles(token);
  return await getStructuredFiles(drive.files, token);
};

const getStructuredFiles = async (
  files: File[],
  token: string
): Promise<File[]> => {
  const rootId = await getRootDriveId(token);
  const foldersAndDocs = files.filter(
    (file) =>
      file.mimeType.endsWith("document") || file.mimeType.endsWith("folder")
  );
  setFileType(foldersAndDocs);

  var rootFiles = foldersAndDocs.filter((file) =>
    file.parents.includes(rootId)
  );

  var rootFolders = rootFiles.filter((file) =>
    file.mimeType.endsWith("folder")
  );

  assignChildrenAndParents(rootFolders, foldersAndDocs);

  documents.set(
    foldersAndDocs.filter((file) => file.mimeType.endsWith("document"))
  );

  return rootFiles;
};

const getRootDriveId = async (token: string): Promise<string> => {
  const drive: RootDrive = await getRootDrive(token);
  return drive.id;
};

const setFileType = (files: File[]): void => {
  files.forEach((file) => {
    var mimeType = file.mimeType;
    file.type = mimeType.slice(mimeType.lastIndexOf(".") + 1);
  });
};

const assignChildrenAndParents = (
  rootFolders: File[],
  foldersAndDocs: File[],
  distantParents: string[] = []
) => {
  rootFolders.forEach((file) => {
    file.children = [];
    foldersAndDocs.forEach((_file) => {
      if (_file.parents.includes(file.id)) {
        file.children.push(_file);
        _file.parents.push(...distantParents);
      }
    });
    assignChildrenAndParents(file.children, foldersAndDocs, [
      ...distantParents,
      file.id,
    ]);
  });
};
