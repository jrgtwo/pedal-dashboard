type PedalProps = {
  w: number,
  h: number,
  x: number,
  y: number,
  pedalId: string,
  img?: string,
  name?: string,
  handleRemove: (key: keyof PedalShape, value: string) => void
}

type PedalShape = {
  id: number,
  name: string,
  brand: string,
  img?: string,
  dragId: number,
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
