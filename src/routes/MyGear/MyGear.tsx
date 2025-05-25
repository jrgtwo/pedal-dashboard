import { useGetMyGear } from "@/queryHooks/myGear/useGetMyGear"

const MyGear = () => {
  const { isLoading, isSuccess, isError, data } = useGetMyGear()

  if (isLoading)
    return <h2>...Loading</h2>

  if (isError)
    return <h2>...Error!, {data?.error}</h2>

  return (
    <>
      <h2>My Gear</h2>
      {JSON.stringify(data)}
    </>
  )
}

export { MyGear }
