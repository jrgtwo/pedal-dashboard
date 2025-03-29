type PedalProps = {
  w: number,
  h: number,
  x: number,
  y: number,
  pedalId: string,
  img?: string,
  name?: string
}

type PedalShape = {
  id: number,
  name: string,
  brand: string,
  img?: string,
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
