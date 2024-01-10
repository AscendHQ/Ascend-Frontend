export type classInfoProp = {
  _id: string;
  level: string;
  name: string;
  section: string;
};
export type ClassRowProps = {
  item: classInfoProp;
  index: number;
  action: (value: string) => void;
};
