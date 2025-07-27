import React, { useState } from "react";

function QuestionForm({ onAddQuestion }) {
  const [formData, setFormData] = useState({
    prompt: "",
    answers: ["", ""],
    correctIndex: 0,
  });

  function handleChange(e) {
    const { name, value } = e.target;

    if (name.startsWith("answer")) {
      const index = parseInt(name.slice(-1));
      const updatedAnswers = [...formData.answers];
      updatedAnswers[index] = value;
      setFormData({ ...formData, answers: updatedAnswers });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  }

  function handleSubmit(e) {
    e.preventDefault();

    const newQuestion = {
      prompt: formData.prompt,
      answers: formData.answers,
      correctIndex: parseInt(formData.correctIndex),
    };

    fetch("http://localhost:4000/questions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newQuestion),
    })
      .then((r) => r.json())
      .then((data) => {
        onAddQuestion(data);
        setFormData({ prompt: "", answers: ["", ""], correctIndex: 0 });
      });
  }

  return (
    <section>
      <h1>New Question</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Prompt:
          <input
            type="text"
            name="prompt"
            value={formData.prompt}
            onChange={handleChange}
          />
        </label>
        <label>
          Answer 1:
          <input
            type="text"
            name="answer0"
            value={formData.answers[0]}
            onChange={handleChange}
          />
        </label>
        <label>
          Answer 2:
          <input
            type="text"
            name="answer1"
            value={formData.answers[1]}
            onChange={handleChange}
          />
        </label>
        <label>
          Correct Answer:
          <select
            name="correctIndex"
            value={formData.correctIndex}
            onChange={handleChange}
          >
            <option value="0">Answer 1</option>
            <option value="1">Answer 2</option>
          </select>
        </label>
        <button type="submit">Add Question</button>
      </form>
    </section>
  );
}

export default QuestionForm;


