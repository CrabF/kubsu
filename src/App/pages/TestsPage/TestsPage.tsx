import { useEffect, useState } from "react";
import { getQuestions, getTestResults } from "api/api";
import styles from "./TestsPage.module.css";
import { Question, UserInfo } from "src/api/types";
import { useNavigate } from "react-router-dom";

export const TestsPage = () => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<
    Record<string, string>
  >({});
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const currentQuestion = questions[currentQuestionIndex];
  const totalQuestions = questions.length;
  const navigate = useNavigate();

  const handleAnswerSelect = (answerId: string) => {
    const newSelectedAnswers = {
      ...selectedAnswers,
      [currentQuestion.id]: answerId,
    };
    setSelectedAnswers(newSelectedAnswers);

    // Проверяем, все ли вопросы отвечены после обновления ответов
    const allQuestionsAnswered = questions.every(
      (question) => newSelectedAnswers[question.id] !== undefined
    );

    if (allQuestionsAnswered) {
      submitResults();
    } else if (currentQuestionIndex < totalQuestions - 1) {
      setTimeout(() => {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
      }, 300);
    }
  };

  const handleQuestionSelect = (index: number) => {
    setCurrentQuestionIndex(index);
  };

  const isQuestionAnswered = (questionId: string) => {
    return selectedAnswers[questionId] !== undefined;
  };

  const areAllQuestionsAnswered = () => {
    return questions.every((question) => isQuestionAnswered(question.id));
  };

  const submitResults = async () => {
    if (!areAllQuestionsAnswered()) return;

    setIsSubmitting(true);
    try {
      const uuid = localStorage.getItem("uuid");
      
      if (!uuid) {
        console.error("UUID не найден");
        navigate('/');
        return;
      }
      
      const answers = questions.map((question) => ({
        question_id: question.id,
        answer_ids: [selectedAnswers[question.id]],
      }));

      const results: UserInfo = {
        uuid,
        answers,
      };

      const response = await getTestResults(results);
     
      if (response) {
        localStorage.setItem("testResults", JSON.stringify(response));
        navigate("/results");
      }
      
    } catch (error) {
      console.error("Ошибка при отправке результатов:", error);
      setError("Произошла ошибка при отправке результатов");
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    const makeRequest = async () => {
      setIsLoading(true);
      try {
        const uuid = localStorage.getItem("uuid");
        
        if (!uuid) {
          console.error("UUID не найден");
          navigate('/');
          return;
        }
        
        const data = await getQuestions();
        setQuestions(data);
      } catch (error) {
        console.error("Ошибка при загрузке вопросов:", error);
        setError("Произошла ошибка при загрузке вопросов");
      } finally {
        setIsLoading(false);
      }
    };
    makeRequest();
  }, [navigate]);

  if (isLoading) {
    return <div className={styles.loader}>Загрузка вопросов...</div>;
  }

  if (error) {
    return (
      <div className={styles.container}>
        <h1 className={styles.title}>Ошибка</h1>
        <p className={styles.error}>{error}</p>
        <button className={styles.restartButton} onClick={() => navigate('/')}>
          Вернуться на главную
        </button>
      </div>
    );
  }

  if (!questions.length) {
    return <div>Нет доступных вопросов</div>;
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
            {isSubmitting && (
              <p className={styles.submittingMessage}>
                Отправка результатов...
              </p>
            )}
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
                  key={answer.uuid}
                  className={`
                    ${styles.answerItem} 
                    ${
                      selectedAnswers[currentQuestion.id] === answer.uuid
                        ? styles.selectedAnswer
                        : ""
                    }
                  `}
                  onClick={() => handleAnswerSelect(answer.uuid)}
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
              Следующий
            </button>
          </div>
        </main>
      </div>
    </div>
  );
};
