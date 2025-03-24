import { useEffect, useState } from "react";
import { getQuestions, Question } from "../../api/api";
import styles from "./tests-page.module.css";

export const TestsPage = () => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<
    Record<string, string>
  >({});
  const currentQuestion = questions[currentQuestionIndex];
  const totalQuestions = questions.length;

  const handleAnswerSelect = (answerId: string) => {
    setSelectedAnswers({
      ...selectedAnswers,
      [currentQuestion.id]: answerId,
    });

    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handleQuestionSelect = (index: number) => {
    setCurrentQuestionIndex(index);
  };

  const isQuestionAnswered = (questionId: string) => {
    return selectedAnswers[questionId] !== undefined;
  };

  useEffect(() => {
    const makeRequest = async () => {
      const data = await getQuestions();
      setQuestions(data);
    };
    makeRequest();
  }, []);

  if (!questions.length) {
    return <div>Загрузка</div>;
  }

  return (
    <div className={styles.quizContainer}>
      <div className={styles.content}>
        <aside className={styles.sidebar}>
          <div className={styles.questionsList}>
            <h2>Вопросы</h2>
            <ul>
              {questions.map((question, index) => (
                <li
                  key={question.id}
                  className={`
                    ${styles.questionItem} 
                    ${index === currentQuestionIndex ? styles.active : ""} 
                    ${isQuestionAnswered(question.id) ? styles.answered : ""}
                  `}
                  onClick={() => handleQuestionSelect(index)}
                >
                  <span className={styles.questionNumber}>{index + 1}</span>
                  <span className={styles.questionText}>
                    {question.question}
                  </span>
                </li>
              ))}
            </ul>
          </div>
          <div className={styles.progress}>
            <p>
              Завершено: {Object.keys(selectedAnswers).length} /{" "}
              {totalQuestions}
            </p>
          </div>
        </aside>

        <main className={styles.mainContent}>
          <div className={styles.questionContainer}>
            <h2 className={styles.questionTitle}>
              Вопрос {currentQuestionIndex + 1}: {currentQuestion.question}
            </h2>
            <div className={styles.answersContainer}>
              {currentQuestion.answers.map((answer) => (
                <div
                  key={answer.uid}
                  className={`
                    ${styles.answerItem} 
                    ${
                      selectedAnswers[currentQuestion.id] === answer.uid
                        ? styles.selectedAnswer
                        : ""
                    }
                  `}
                  onClick={() => handleAnswerSelect(answer.uid)}
                >
                  <div className={styles.answerBadge}></div>
                  <span className={styles.answerText}>{answer.text}</span>
                </div>
              ))}
            </div>
          </div>

          <div className={styles.navigation}>
            <button
              className={styles.navButton}
              onClick={() =>
                currentQuestionIndex > 0 &&
                setCurrentQuestionIndex(currentQuestionIndex - 1)
              }
              disabled={currentQuestionIndex === 0}
            >
              Предыдущий
            </button>

            <button
              className={styles.navButton}
              onClick={() =>
                currentQuestionIndex < totalQuestions - 1 &&
                setCurrentQuestionIndex(currentQuestionIndex + 1)
              }
              disabled={currentQuestionIndex === totalQuestions - 1}
            >
              Сдедующий
            </button>
          </div>
        </main>
      </div>
    </div>
  );
};
