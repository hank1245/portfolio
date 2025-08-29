import useProjectStore from "./projectStore";

describe("useProjectStore", () => {
  test("has default currentProject and updates via setter", () => {
    const initial = useProjectStore.getState().currentProject;
    expect(typeof initial).toBe("number");

    useProjectStore.getState().setCurrentProject(3);
    expect(useProjectStore.getState().currentProject).toBe(3);
  });
});
