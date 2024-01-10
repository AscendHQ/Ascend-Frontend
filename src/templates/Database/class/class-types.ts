export type classInfoProp = {
  _id: string;
  level: "junior" | "senior";
  name: string;
  section: string;
  other_section?: string;
};

export type ClassRowProps = {
  item: classInfoProp;
  index: number;
  action: (value: string) => void;
};
export type tagsType = {
  data: string[] | never[];
  message: string;
};
export type addClassType = {
  class_name: string;
  level: classInfoProp["level"];
  radioButtonValue?: string;
};
