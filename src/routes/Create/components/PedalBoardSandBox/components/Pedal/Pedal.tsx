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
      className="group draggable hover:z-20 hover:cursor-grab active:cursor-grabbing active:outline-4 active:outline-red-500 drop-shadow-[0_3px_3px_rgba(0,0,0,0.5)] hover:drop-shadow-[0_10px_10px_rgba(0,0,0,0.5)]"
      style={{ position: 'absolute', top: y, left: x, height: (h * 30), width: (w * 30) }}>
      <button
        onClick={(event) => {
          event.preventDefault()
          handleRemove?.('dragId', pedalId)
        }}
        className="group-hover:opacity-70 hover:opacity-100 hover:scale-100 scale-80 transition-all group-active:opacity-0 w-8 h-8 rounded-full border-2 border-red-600 opacity-0 remove text-red-600 absolute top-0 right-0 z-10 bg-white">X</button>
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
