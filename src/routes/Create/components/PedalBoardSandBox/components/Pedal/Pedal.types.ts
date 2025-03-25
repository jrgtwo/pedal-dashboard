type PedalProps = {
  w: number,
  h: number,
  x: number,
  y: number,
  pedalId: string,
}

type PedalShape = {
  id: number,
  name: string,
  brand: string,
  location: {
    w: number,
    h: number,
    x: number,
    y: number,
  }
}

export type {
  PedalProps,
  PedalShape
}