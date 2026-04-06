import { useEffect, useState } from "react";
import "./App.css";
import MySlider from "./components/MySlider";
import axios from "axios";
const app = () => {
  const [soundLevel, setSoundLevel] = useState(0);
  const [temperatureLevel, setTemperatureLevel] = useState(25);
  const [vibrationLevel, setVibrationLevel] = useState(0);

  const [health, setHealth] = useState(100);

  const HandleLearnBtnClick = async () => {
    console.log("triggered");
    try {
      const res = await axios.post(`http://192.168.29.128:80/startButton`, {
        message: "hello",
      });
      console.log(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const HandleTypeBtnClick = (
    sound: number,
    hotness: number,
    shake: number,
  ) => {
    setSoundLevel(sound);
    setTemperatureLevel(hotness);
    setVibrationLevel(shake);
  };

  useEffect(() => {
    const soundFactor = 1.0 - 0.55 * (soundLevel / 100);

    const tempNormalized = (temperatureLevel - 25) / 55;
    const tempFactor = 1.0 - 0.45 * tempNormalized;

    const vibFactor = 1.0 - 0.45 * (vibrationLevel / 100);

    const overallHealth = 100 * (soundFactor * tempFactor * vibFactor);
    setHealth(+overallHealth.toFixed(2));
  }, [soundLevel, temperatureLevel, vibrationLevel]);

  useEffect(() => {
    const intervalID = setInterval(async () => {
      let currentStatus = "Working Perfectly!";

      const randomFloat = (Math.random() * (100 - 70) + 70).toFixed(2);

      if (health > 75) {
        currentStatus = "Working Perfectly!";
      } else if (health > 65) {
        currentStatus = "Breakdown within 15 Days";
      } else if (health > 55) {
        currentStatus = "Breakdown within 7 Days";
      } else if (health > 40) {
        currentStatus = "Breakdown started!";
      } else if (health > 30) {
        currentStatus = "Service required ASAP!";
      } else {
        currentStatus = "RUN NIGGA!";
      }
      console.log(currentStatus);
      try {
        console.log(health);
        const res = await axios.post(
          "https://lauditorily-propublicity-lajuana.ngrok-free.dev/api/machines/1/ai-result",
          {
            status: currentStatus,
            confidence: 1,
            healthPercentage: health,
          },
        );

        console.log(res.data);
      } catch (err) {
        console.log(err);
      }
    }, 3000);
    return () => clearInterval(intervalID);
  }, [health]);
  return (
    <>
      <div className="body">
        <button onClick={HandleLearnBtnClick} className="learn-btn">
          Learn
        </button>
        <h2 className="health-text">{health}</h2>
        <div className="btn-div">
          <button
            onClick={() => {
              HandleTypeBtnClick(0, 28, 2);
            }}
          >
            Fan
          </button>
          <button
            onClick={() => {
              HandleTypeBtnClick(2, 25, 4);
            }}
          >
            Motor
          </button>
          <button
            onClick={() => {
              HandleTypeBtnClick(80, 30, 40);
            }}
          >
            F Motor
          </button>
        </div>
        <div className="control-bar">
          <MySlider
            name="Sound"
            soundLevel={soundLevel}
            setSoundLevel={setSoundLevel}
            min={0}
            max={100}
          />
          <MySlider
            soundLevel={temperatureLevel}
            setSoundLevel={setTemperatureLevel}
            name="Hotness"
            min={25}
            max={80}
          />
          <MySlider
            name="Shake"
            soundLevel={vibrationLevel}
            setSoundLevel={setVibrationLevel}
            min={0}
            max={100}
          />
        </div>
      </div>
    </>
  );
};
export default app;
