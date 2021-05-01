export interface File {
  id: string;
  name: string;
  mimeType: string;
  type: string;
  parents: string[];
  children?: File[];
}

export interface RootDrive {
  id: string;
}

export interface Drive {
  files: File[];
}
