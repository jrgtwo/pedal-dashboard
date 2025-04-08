import type { PedalProps } from "./Pedal.types";
const Pedal = ({
  w,
  h,
  x,
  y,
  pedalId,
  img,
  name,
  handleRemove
}: PedalProps) => {

  return (
    <div
      data-draggable-id={pedalId}
      role="pedal"
      className="group draggable hover:z-20 hover:cursor-grab active:cursor-grabbing"
      style={{ position: 'absolute', top: y, left: x, height: (h * 30), width: (w * 30) }}>
      <button
        onClick={(event) => {
          event.preventDefault()
          handleRemove('dragId', pedalId)
        }}
        className="group-hover:opacity-100 opacity-0 remove text-red-700 absolute top-2 right-2 z-10 bg-amber-50">X</button>
      {
        img &&
        <img
          src={`/src/assets/${img}`}
          alt={name}
          className={`w-${w * 30} h-${h * 30} absolute top-0 left-0 z-0`}
        />
      }
    </div >
  );
}

export { Pedal }
