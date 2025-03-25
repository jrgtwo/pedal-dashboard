import type { PedalProps } from "./Pedal.types";
const Pedal = ({ w, h, x, y, pedalId }: PedalProps) => {

  return (
    <div
      data-pedal-id={pedalId}
      role="pedal"
      className={`draggable bg-green-400`}
      style={{ position: 'absolute', top: y, left: x, width: w, height: h }}>
      {`${x}-${y}`}
    </div>
  );
}

export { Pedal }