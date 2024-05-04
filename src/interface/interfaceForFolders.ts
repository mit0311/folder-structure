export interface IInputDir {
  fname: string;
  id: string | null;
  isFile: boolean;
  parentId: number | null;
  child?: IInputDir[];
}
