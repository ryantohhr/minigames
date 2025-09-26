import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

export const Route = createFileRoute("/calculator")({
  component: RouteComponent,
});

type Operator = "+" | "-" | "*" | "/";
const operators: Operator[] = ["+", "-", "*", "/"];
type Number = "0" | "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" | ".";
const numbers: Number[] = ["7", "8", "9", "4", "5", "6", "1", "2", "3"];

function RouteComponent() {
  const [currentValue, setCurrentValue] = useState<string>("");
  const [existingValue, setExistingValue] = useState<number>(0);
  const [operator, setOperator] = useState<Operator | "">("");

  function calculate() {
    if (!operator) return;
    let newValue;
    switch (operator) {
      case "+":
        newValue = existingValue + Number(currentValue);
        break;
      case "-":
        newValue = existingValue - Number(currentValue);
        break;
      case "*":
        newValue = existingValue * Number(currentValue);
        break;
      case "/":
        newValue = existingValue / Number(currentValue);
        break;
    }
    setCurrentValue(newValue?.toString());
    setExistingValue(0);
  }

  function handleNewDigit(digit: Number) {
    if (!existingValue) {
      setExistingValue(Number(currentValue) || Number(digit));
      setCurrentValue(digit);
    } else setCurrentValue((prev) => prev + digit);
  }

  function handleNewOperator(operator: Operator) {
    setOperator(operator);
    setExistingValue(Number(currentValue));
    setCurrentValue("");
  }

  function clear() {
    setCurrentValue("");
    setExistingValue(0);
    setOperator("");
  }

  return (
    <div className="h-screen w-screen flex justify-center items-center">
      <div className="rounded-md h-4/5 w-96 bg-gray-700 gap-5 grid grid-cols-4 grid-rows-6 p-4">
        <div className="flex justify-end p-4 items-center text-black font-semibold text-3xl rounded-md col-span-4 bg-white">
          {currentValue}
        </div>
        {operators.map((operator) => (
          <button
            key={operator}
            onClick={() => handleNewOperator(operator)}
            className="text-black text-3xl font-semibold rounded-md bg-blue-400"
          >
            {operator}
          </button>
        ))}
        <div className="grid grid-cols-3 grid-rows-3 gap-5 col-span-3 row-span-3">
          {numbers.map((number) => (
            <button
              key={number}
              onClick={() => handleNewDigit(number)}
              className="bg-gray-200 rounded-md text-black font-semibold text-3xl"
            >
              {number}
            </button>
          ))}
        </div>
        <button
          onClick={calculate}
          className="rounded-md row-span-4 font-semibold bg-blue-400 text-black text-3xl"
        >
          =
        </button>
        <button
          onClick={() => handleNewDigit("0")}
          className="bg-gray-200 rounded-md text-black font-semibold text-3xl"
        >
          0
        </button>
        <button
          onClick={() => handleNewDigit(".")}
          className="bg-gray-200 rounded-md text-black font-semibold text-3xl"
        >
          .
        </button>
        <button
          onClick={clear}
          className="bg-gray-200 rounded-md text-black font-semibold text-3xl"
        >
          C
        </button>
      </div>
    </div>
  );
}
