import { RequiredDataValues } from "../useDraggable"

export const dataToMap = <T extends RequiredDataValues,>(_data: T[]) => _data?.reduce((acc, item) => {
  acc.set(item.dragId, { ...item })
  return acc
}, new Map())

export const keepInBounds = (value: number, max: number) => {
  return Math.min(Math.max(value, 0), max)
}
