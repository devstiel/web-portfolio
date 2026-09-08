/** Shared outline for the portfolio's flat mark and its 3D sculpture. */
export const starPoints = [
  [44, 0],
  [56, 0],
  [57, 32],
  [80, 9],
  [89, 18],
  [67, 42],
  [100, 44],
  [100, 56],
  [67, 58],
  [89, 82],
  [80, 91],
  [57, 68],
  [56, 100],
  [44, 100],
  [43, 68],
  [20, 91],
  [11, 82],
  [33, 58],
  [0, 56],
  [0, 44],
  [33, 42],
  [11, 18],
  [20, 9],
  [43, 32],
] as const;

export const starPath = `M${starPoints.map((point) => point.join(" ")).join("L")}Z`;
