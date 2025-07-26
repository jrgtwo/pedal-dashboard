import { Tables } from "database.types"
import { SORT_DIRECTION } from "./GearSelector"

export const createFilterList = (pedalList: Tables<'pedals'>[]) => {
  const filterSet = new Set<string>()

  pedalList?.forEach((item) => {
    [...(item?.type) || []].forEach((type) => {
      filterSet.add(type)
    })
  })
  return [...filterSet].sort()
}

export const pedalListFilter = (sortDirection: SORT_DIRECTION) => (
  { name }: { name: string },
  { name: nameB }: { name: string }
) => {
  const AName = name.toUpperCase();
  const BName = nameB.toUpperCase();
  if (AName < BName) return sortDirection === SORT_DIRECTION.ASC ? -1 : 1
  if (AName > BName) return sortDirection === SORT_DIRECTION.ASC ? 1 : -1
  return 0;
}
