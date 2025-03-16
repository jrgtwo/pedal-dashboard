import type { HeaderProps } from "./Header.types";

const Header = (props: HeaderProps) => {
  console.log(props)

  return (
    <>
      <h2>Header Component</h2>
    </>
  )
}

export { Header }