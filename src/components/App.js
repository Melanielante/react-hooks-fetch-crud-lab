import React, { useState, useEffect } from "react";
import AdminNavBar from "./AdminNavBar";
import QuestionForm from "./QuestionForm";
import QuestionList from "./QuestionList";

function App() {
  const [page, setPage] = useState("List");
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4000/questions")
      .then((r) => r.json())
      .then(setQuestions);
  }, []);

  function addQuestion(newQuestion) {
    setQuestions([...questions, newQuestion]);
  }

  function deleteQuestion(id) {
    const updated = questions.filter((q) => q.id !== id);
    setQuestions(updated);
  }

  function updateCorrectAnswer(id, newIndex) {
    const updated = questions.map((q) =>
      q.id === id ? { ...q, correctIndex: newIndex } : q
    );
    setQuestions(updated);
  }

  return (
    <main>
      <AdminNavBar onChangePage={setPage} />
      {page === "Form" ? (
        <QuestionForm onAddQuestion={addQuestion} />
      ) : (
        <QuestionList
          questions={questions}
          onDelete={deleteQuestion}
          onUpdate={updateCorrectAnswer}
        />
      )}
    </main>
  );
}

export default App;

