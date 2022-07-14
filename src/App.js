import "./App.css";
import React from "react";
import Die from "./components/Die";
import { nanoid } from "nanoid";



console.log("hi")

function App() {
  function allNewDice() {
    const dices = [];
    for (let i = 0; i < 10; i++) {
      dices.push({
        value: Math.ceil(Math.random() * 6),
        isHeld: false,
        id: nanoid(),
      });
    }
    return dices;
  }
  function newGame(){
    setDice(() => allNewDice());
    setTenzies(()=> false)
  }

  const [dice, setDice] = React.useState(allNewDice());
  const [tenzies, setTenzies] = React.useState(false);

  React.useEffect(() => {
    const allHeld = dice.every((die) => die.isHeld);
    const firstValue = dice[0].value;
    const allSameValue = dice.every((die) => die.value === firstValue);
    if (allHeld && allSameValue) {
      setTenzies(true);
      console.log("You won!");
    }
  }, [dice]);

  function rollDice() {
    setDice((prevDice) =>
      prevDice.map((die) => {
        return die.isHeld === false ? generateDie() : die;
      })
    );
  }
  const styles = {
    diceUnclicked:
      "bg-white select-none font-bold text-lg px-3 py-1 cursor-pointer rounded-lg justify-self-center shadow-xl",
    diceClicked:
      "bg-[#59E391] select-none font-bold text-lg px-3 py-1 cursor-pointer rounded-lg justify-self-center shadow-xl",
  };
  function generateDie() {
    return {
      value: Math.ceil(Math.random() * 6),
      isHeld: false,
      id: nanoid(),
    };
  }

  function holdDice(id) {
    console.log(id);
    setDice((prevDice) =>
      prevDice.map((die) => {
        return die.id === id ? { ...die, isHeld: !die.isHeld } : die;
      })
    );
  }

  const diceDiv = dice.map((d) => {
    return (
      <Die
        key={d.id}
        value={d.value}
        styler={d.isHeld ? styles.diceClicked : styles.diceUnclicked}
        holdDice={() => holdDice(d.id)}
      />
    );
  });

  // console.log(diceDiv);

  return (
    <div className="">
      <main className="bg-[#F5F5F5] max-w-[800px] h-[400px] p-6 rounded-lg flex flex-col justify-center items-center">
        <h1 className="mb-2 font-bold text-3xl">Tenzies</h1>
        <p className="mb-8">
          Roll until all dice are the same. Click each die to freeze it at its
          current value between rolls.
        </p>
        <div className="grid grid-cols-5 gap-6">{diceDiv}</div>
        <button
          className="bg-[#5035FF] text-white px-10 py-2 mt-16 text-xl rounded-lg"
          onClick={tenzies ? newGame : rollDice}
        >
          {tenzies ? "Play New Game" : "Roll"}
        </button>
      </main>
    </div>
  );
}

export default App;
