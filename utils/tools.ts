import { tool } from "ai";
import { loadPyodide, type PyodideAPI } from "pyodide";
import * as z from "zod";

/** Closure to load Pyodide just once */
const getPyodide = (() => {
  let instance: PyodideAPI | undefined;

  const getInstance = async () => {
    if (instance) {
      return await instance;
    }

    instance = await loadPyodide();
    return instance;
  };

  return getInstance;
})();

export const executePythonCode = tool({
  description: "execute Python code",
  inputSchema: z.object({
    code: z.string().describe("the Python code to execute"),
  }),

  execute: async ({ code }) => {
    const pyodide = await getPyodide();
    const pyProxy = pyodide.runPython(code);
    const result = pyProxy.toString();

    // `pyProxy` don't always contain a `destroy` method
    pyProxy.destroy?.();

    return result;
  },
});
