export interface Resolution {
  w: number;
  h: number;
  ratio: string;
}

export const Resolutions: Resolution[] = [
  { w: 5120, h: 2880, ratio: "16:9" }, // 5k
  { w: 5120, h: 3200, ratio: "16:10" },
  { w: 5120, h: 2160, ratio: "21:9" },
  { w: 3840, h: 2560, ratio: "3:2" },
  { w: 4096, h: 3072, ratio: "4:3" },
  { w: 2880, h: 5120, ratio: "16:9 vertical" },
  { w: 2160, h: 5120, ratio: "21:9 vertical" },
];
