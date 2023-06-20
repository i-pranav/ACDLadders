import { useState, useEffect } from "react";
import { LadderData } from "../utils/types";
import { cfQuesColor } from "../utils/constants";

interface LadderSelectorProps {
  setLadderData: (data: LadderData) => void;
  ladderData: LadderData;
  startRating: number;
  endRating: number;
  step: number;
  selected: number;
  setSelected: (data: number) => void;
}

/**
 * Every Ladder range is [X, Y), end is exclusive
 * @param props
 * @returns
 */
function LadderSelector(props: LadderSelectorProps) {
  let options: number[][] = [];
  for (let i = props.startRating; i <= props.endRating; i += props.step) {
    let st = i - props.step,
      ed = i;
    options.push([st, ed]);
  }

  const [start, setStart] = useState(0);
  const [end, setEnd] = useState(Math.min(12, options.length));

  const [currOptions, setCurrOptions] = useState(options);

  const nextOption = () => {
    let newEnd = Math.min(end + 12, options.length);
    setEnd(newEnd);
    setStart(newEnd - 12);
    setCurrOptions(options.slice(newEnd - 12, newEnd));
  };

  const prevOption = () => {
    let newStart = Math.max(start - 12, 0);
    setStart(newStart);
    setEnd(newStart + 12);
    setCurrOptions(options.slice(newStart, newStart + 12));
  };

  useEffect(() => {
    setCurrOptions(options.slice(start, end));
  }, []);

  // const [selected, setSelected] = useState(1200)

  let a =
    "text-white hover:bg-gray-900 font-medium rounded-lg text-sm px-5 py-2.5 mr-2";

  let b =
    "bg-color-dark outline-none ring-1 ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2";

  const handleSubmit = (option: number[]) => {
    props.setLadderData({
      startRating: option[0],
      endRating: option[1],
    });
    props.setSelected(option[0]);
  };

  return (
    <div>
      <button
        className="text-white hover:bg-gray-900 font-medium rounded-lg text-sm px-5 py-2.5 mr-2"
        onClick={prevOption}
      >
        Prev
      </button>

      {currOptions.map((option) => {
        return (
          <button
            className={props.selected == option[0] ? b : a}
            style={{
              color: cfQuesColor[option[0]],
            }}
            key={option[0]}
            onClick={() => handleSubmit(option)}
          >
            {" "}
            {option[0]}
          </button>
        );
      })}

      <button
        className="text-white hover:bg-gray-900 font-medium rounded-lg text-sm px-5 py-2.5 mr-2"
        onClick={nextOption}
      >
        Next
      </button>
    </div>
  );
}

export default LadderSelector;
