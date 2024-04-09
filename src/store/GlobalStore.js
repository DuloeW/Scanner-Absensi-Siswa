import { create } from 'zustand';

const useGlobalStore = create((set) => ({
    isSupportedDevice: false,
    setSupportedDevice: (isSupportedDevice) => set({ isSupportedDevice }),
}))

export default useGlobalStore;