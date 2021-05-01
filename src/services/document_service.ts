import { getRootDrive } from "../api/gdrive-api";
import { getAllDocuments } from "../api/gdrive-api";
import type { Drive, File, RootDrive } from "../types/types";

export const getRootDriveId = async (token: string): Promise<string> => {
  const drive: RootDrive = await getRootDrive(token);
  return drive.id;
};

export const createParentsAndChildren = async (
  token: string
): Promise<File[]> => {
  const allDocuments: Drive = await getAllDocuments(token);
  return await getAllChildren(allDocuments.files, token);
};

export const getAllChildren = async (
  files: File[],
  token: string
): Promise<File[]> => {
  const rootId = await getRootDriveId(token);
  const foldersAndDocs = files.filter(
    (file) =>
      file.mimeType.endsWith("document") || file.mimeType.endsWith("folder")
  );
  var rootFiles = foldersAndDocs.filter((file) =>
    file.parents.includes(rootId)
  );

  var rootFolders = rootFiles.filter((file) =>
    file.mimeType.endsWith("folder")
  );

  delegateChildren(rootFolders, foldersAndDocs);

  return rootFiles;
};

const delegateChildren = (rootFolders: File[], foldersAndDocs: File[]) => {
  rootFolders.forEach((file) => {
    file.children = [];
    foldersAndDocs.forEach((_file) => {
      if (_file.parents.includes(file.id)) {
        file.children.push(_file);
      }
    });
    delegateChildren(file.children, foldersAndDocs);
  });
};
