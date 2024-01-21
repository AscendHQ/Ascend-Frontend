export type classInfoProp =
  | {
      _id: string;
      level: "junior";
      name: string;
      section: string;
      other_section: string;
    }
  | {
      _id: string;
      level: "senior";
      name: string;
      section: string;
      other_section?: string | undefined;
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
