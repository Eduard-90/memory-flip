import { data } from "./data";
import { useApp } from "./useApp";
import Card from "./component/Card";
import { useEffect, useState } from "react";
import NicknameInput from "./component/Nickname";

function App() {
  const [nickname, setNickname] = useState(null);

  const {
    cards,
    shuffleCards,
    handleSelect,
    score,
    firstCard,
    secondCard,
    waiting,
  } = useApp({
    initialCards: data,
    nickname,
  });

  const handleNicknameSubmit = (enteredNickname) => {
    setNickname(enteredNickname);
  };

  const [leaders, setLeaders] = useState([]);

  const API_URL = "http://localhost:5002/api/scores/";

  const getLeaders = async () => {
    try {
      const res = await fetch(API_URL, {
        method: "GET",
      });

      setLeaders(await res.json());
    } catch (error) {
      console.error("Error getting scores from API: ", error.message);
      throw error;
    }
  };

  useEffect(() => {
    getLeaders();
  }, []);

  const createWinner = async () => {
    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: nickname, score: score }),
      });

      const data = await res.json();
      console.log(data);
      getLeaders();
    } catch (err) {
      console.error("Error creating winner: ", err.message);
    }
  };

  return (
    <main className="grid w-full grid-cols-[200px_1fr]">
      {" "}
      <aside className="h-[100vh] border-r-2 border-amber-950 bg-amber-100 p-8">
        <h2 className="text-bold mb-4 text-2xl uppercase">Leaders:</h2>
        {leaders.length > 0 && (
          <ul>
            {leaders?.map((item, index) => (
              <li key={item.date}>
                {index + 1}. {item.name}: {item.score}
              </li>
            ))}
          </ul>
        )}
        {!leaders.length && <p>There are no leaders yet!</p>}

        <button
          onClick={createWinner}
          className={
            "mx-auto mt-10 flex items-center justify-center rounded-2xl bg-[#09814A] px-10 py-2 text-2xl font-bold text-white"
          }
        >
          Save result
        </button>
      </aside>
      <section className={"container self-center"}>
        {!nickname ? (
          <NicknameInput onNicknameSubmit={handleNicknameSubmit} />
        ) : (
          <>
            <button
              onClick={shuffleCards}
              className={
                "mx-auto mt-10 flex items-center justify-center rounded-2xl bg-[#09814A] px-10 py-2 text-2xl font-bold text-white"
              }
            >
              Start
            </button>
            <div className="mx-auto my-8 grid max-w-xl grid-cols-5 gap-4">
              {cards.map((card) => (
                <Card
                  key={card.id}
                  card={card}
                  disabled={waiting}
                  opened={
                    card.matched || firstCard === card || secondCard === card
                  }
                  selectionHandler={handleSelect}
                />
              ))}
            </div>
            <h1 className={"text-center text-4xl font-bold"}>Score: {score}</h1>
          </>
        )}
      </section>
    </main>
  );
}

export default App;
