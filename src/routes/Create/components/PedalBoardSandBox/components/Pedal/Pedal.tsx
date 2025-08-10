import type { PedalProps } from "./Pedal.types";
import { RotateCwIcon } from "lucide-react";

const Pedal = ({
  w,
  h,
  x,
  y,
  rotation,
  pedalId,
  img,
  name,
  handleRemove,
  gearType
}: PedalProps) => {

  return (
    <div
      data-draggable-id={pedalId}
      role="pedal"
      className={` group draggable ${gearType === 'pedal' ? 'z-10 hover:z-20' : 'z-1hover:z-9'} hover:cursor-grab active:cursor-grabbing active:outline-4 active:outline-red-500 drop-shadow-[0_3px_3px_rgba(0,0,0,0.5)] hover:drop-shadow-[0_10px_10px_rgba(0,0,0,0.5)]' : ''}`}
      style={{ transform: `rotate(${rotation}deg)`, position: 'absolute', top: y, left: x, height: ((h || 1) * 30), width: ((w || 1) * 30) }}>
      <button
        onClick={(event) => {
          event.preventDefault()
          handleRemove?.('dragId', pedalId)
        }}
        className="group-hover:opacity-70 hover:opacity-100 hover:scale-100 scale-80 transition-all group-active:opacity-0 w-8 h-8 rounded-full border-2 border-red-600 opacity-0 remove text-red-600 absolute top-0 right-0 z-10 bg-white">X</button>
      <button

        className="rotate group-hover:opacity-70 hover:opacity-100 hover:scale-100 scale-80 transition-all group-active:opacity-0 w-8 h-8 rounded-full border-2 border-red-600 opacity-0 remove text-red-600 absolute top-[-20px] right-[-20px] z-10 bg-white"><RotateCwIcon className="rotate" /></button>
      {
        img &&
        <img
          src={`/src/assets/${img}`}
          alt={name}
          className={`w-${(w || 1) * 30} h-${(h || 1) * 30} absolute top-0 left-0 z-0`}
        />
      }
    </div >
  );
}

export { Pedal }
