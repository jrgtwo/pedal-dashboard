
const Pedal = ({ x, y }) => {
  return (
    <div
      className={`draggable w-[100px] h-[100px] bg-green-400`}
      style={{ position: 'absolute', top: y, left: x }}>
      {`${x}-${y}`}
    </div>
  );
}

export { Pedal }