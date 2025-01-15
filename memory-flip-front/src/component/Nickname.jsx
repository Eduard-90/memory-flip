import { useState } from "react";

const NicknameInput = ({ onNicknameSubmit }) => {
  const [nickname, setNickname] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = () => {
    if (nickname.trim().length === 0) {
      setError("Please, enter nickname!");
      return;
    }

    setError("");
    onNicknameSubmit(nickname);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Enter ur nickname"
        value={nickname}
        onChange={(e) => setNickname(e.target.value)}
        className={
          "mx-auto mt-10 flex items-center justify-center rounded-2xl bg-[#09814A] px-10 py-2 text-2xl font-bold text-white"
        }
      />
      {error && (
        <p className="mx-auto mt-10 flex justify-center font-bold text-red-700">
          {error}
        </p>
      )}
      <button
        onClick={handleSubmit}
        className={
          "mx-auto mt-10 flex items-center justify-center rounded-2xl bg-[#09814A] px-10 py-2 text-2xl font-bold text-white"
        }
      >
        Enter
      </button>
    </div>
  );
};

export default NicknameInput;
