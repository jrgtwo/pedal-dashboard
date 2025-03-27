import type { PedalProps } from "./Pedal.types";
const Pedal = ({ w, h, x, y, pedalId, img, name }: PedalProps) => {

  return (
    <div
      data-pedal-id={pedalId}
      role="pedal"
      className={`draggable bg-green-400`}
      style={{ position: 'absolute', top: y, left: x, width: w, height: h }}>
      {`${name}-${x}-${y}`}
      {
        img &&
        <img
          src={`/src/assets/${img}`}
          alt={name}
          className={`w-${w} h-${h} absolute top-0 left-0`}
        />
      }
    </div>
  );
}

export { Pedal }