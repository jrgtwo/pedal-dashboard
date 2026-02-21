
import { GearSelector } from "../Create/components/Menu/GearSelector"
import { buttonVariants } from "@/components/ui/button"

import { useAddGear } from "./hooks/useAddGear"

const AddGear = () => {
  const {
    myPedalList,
    handleSavepedalDataById,
    handleSaveBoardDataById,
    handleDeletePedal,
    handleDeleteBoard,
    isLoading,
    isSuccess,
    isError,
    data
  } = useAddGear();

  if (isError)
    return <h2>...Error!, {JSON.stringify(data || {})}</h2>

  if (!isSuccess || isLoading || !data || data.length === 0) {
    return <h2>No Pedals Found</h2>
  }

  return (
    <section>
      <GearSelector
        className={`w-fit ${buttonVariants({ variant: "outline" })}`}
        myPedalIdList={myPedalList}
        savePedalDataById={handleSavepedalDataById}
        saveBoardDataById={handleSaveBoardDataById}
        deletePedalDataById={handleDeletePedal}
        deleteBoardDataById={handleDeleteBoard}
      />
    </section>

  )
}

export { AddGear }
