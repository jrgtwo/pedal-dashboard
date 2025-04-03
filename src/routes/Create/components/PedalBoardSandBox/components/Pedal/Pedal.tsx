import type { PedalProps } from "./Pedal.types";
const Pedal = ({ w, h, x, y, pedalId, img, name, handleRemove }: PedalProps) => {

  return (
    <div
      data-draggable-id={pedalId}
      role="pedal"
      className={`draggable bg-green-400`}
      style={{ position: 'absolute', top: y, left: x, width: w, height: h }}>
      {`${name}-${x}-${y}`}
      <button
        onClick={(event) => {
          event.preventDefault()
          handleRemove('dragId', pedalId)
        }}
        className="remove text-red-700 absolute top-2 right-2 z-10 bg-amber-50">X</button>
      {
        img &&
        <img
          src={`/src/assets/${img}`}
          alt={name}
          className={`w-${w} h-${h} absolute top-0 left-0 z-0`}
        />
      }
    </div >
  );
}

export { Pedal }
