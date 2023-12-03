import create from "zustand";

const useAppState = create((set, get) => ({
  visualSourceData: {
    x: new Float32Array(121).fill(0),
    y: new Float32Array(121).fill(0),
    // z: new Float32Array(121).fill(0),
  },
  energyInfo: { current: 0 },
  actions: {
    resizeVisualSourceData: (newSize) =>
      set((state) => {
        return {
          visualSourceData: {
            x: new Float32Array(newSize).fill(0),
            y: new Float32Array(newSize).fill(0),
            z: new Float32Array(newSize).fill(0),
          },
        };
      }),
  },
}));

export const useVisualSourceDataX = () =>
  useAppState((state) => state.visualSourceData.x);
export const useVisualSourceDataY = () =>
  useAppState((state) => state.visualSourceData.y);
// export const useVisualSourceDataZ = () =>
//   useAppState((state) => state.visualSourceData.z);
export const useEnergyInfo = () => useAppState((state) => state.energyInfo);
export const useAppStateActions = () => useAppState((state) => state.actions);