import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "",
  esbuild: {
    jsxFactory: "React.createElement", // React 코드에서 사용하는 JSX 문법을 설정
  },
});
