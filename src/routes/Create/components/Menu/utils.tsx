import { Tables } from "database.types"

export const createFilterList = (pedalList: Tables<'pedals'>[]) => {
  const filterSet = new Set<string>()

  pedalList?.forEach((item) => {
    [...(item?.type) || []].forEach((type) => {
      filterSet.add(type)
    })
  })
  return [...filterSet].sort()
}

