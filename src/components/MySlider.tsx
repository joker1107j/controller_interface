import { type ChangeEvent } from "react";

const MySlider = (props: any) => {
  const { name, setSoundLevel, soundLevel, min, max } = props;
  const HandleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSoundLevel(+e.target.value);
  };

  return (
    <>
      <div className="slider-wrapper">
        <h3>{soundLevel}</h3>
        <input
          className="slider one"
          type="range"
          onChange={HandleOnChange}
          min={min}
          max={max}
          value={soundLevel}
        />
        <h2>{name}</h2>
      </div>
    </>
  );
};
export default MySlider;
