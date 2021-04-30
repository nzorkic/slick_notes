export interface File {
  id: string;
  name: string;
  mimeType: string;
  parents: string[];
}

export interface RootDrive {
  id: string;
}

export interface Drive {
  files: File[];
}
