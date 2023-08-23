// theme/themeConfig.ts
import type { ThemeConfig } from "antd";

const theme: ThemeConfig = {
  token: {
    fontSize: 16,
  },
  components: {
    Button: {
      colorBgContainer: "#3c3c3c",
      //   colorPrimary: "#000000",
      colorPrimary: "#FFFFFF",
      colorPrimaryBg: "#7864FF",
    },
    Input: {
      colorPrimary: "#eb2f96",
    },
  },
};

export default theme;
