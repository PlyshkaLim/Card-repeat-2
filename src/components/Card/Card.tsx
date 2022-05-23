import React, {useContext, useState} from 'react';
import './Card.css';
import {Link} from "react-router-dom";
import {CurrentListIdContext} from "../../App";
import cn from "classnames";

const Card: React.FC<any> = (props: any) => {
  const emptyQuestion = {
    id: -1,
    question: '',
    answer: '',
    date: -1
  };
  const {CurrentListId} = useContext(CurrentListIdContext);

  const cardList = props.cardBase;
  const currentList = cardList.filter((i: any) => i.id === CurrentListId)[0];
  let questions = currentList.questions;
  //список всех вопросов в карточке доступных для повторения
  let currentQuestions = questions.filter((q: any) => q.date === 0);
  //определяем рандомный номер вопроса
  let questionNumber = Math.floor(Math.random() * currentQuestions.length);
  let idQuestion = 0;

  const [currentQuestion, setCurrentQuestion] = useState<any>(initCurrentQuestion);
  const [currentAnswer, setCurrentAnswer] = useState<string>('');
  const [isQuestion, setIQuestion] = useState<boolean>(true);


  //инициируем первый вопрос если таковой имеется
  function initCurrentQuestion() {
    if (currentQuestions.length !== 0) {
      idQuestion = currentQuestions[questionNumber].id;
      return questions.filter((q: any) => q.id === idQuestion)[0];
    }
    return emptyQuestion;
  }

  // if (currentQuestions.length !== 0) {
  //   idQuestion = currentQuestions[questionNumber].id;
  //   let cQ = questions.filter((q: any) => q.id === idQuestion)[0];
  //   console.log()
  //   setCurrentQuestion(cQ);
  // }

  const checkAnswer = () => {
    setIQuestion(false);
  }

  const handleChange = (event: any) => {
    setCurrentAnswer(event.target.value);
  }

  const answerCorrect = () => {
    currentList.statistic.correctAnswers += 1;
    questions.map((q: any) => q.id === idQuestion ? q.date += 2 : q.date)
    setIQuestion(true);
    changeQuestion();
  }

  const answerIncorrect = () => {
    currentList.statistic.incorrectAnswers += 1;
    questions.map((q: any) => q.id === idQuestion ? q.date += 1 : q.date)
    setIQuestion(true);
    changeQuestion();
  }

  function changeQuestion() {
    currentQuestions = questions.filter((q: any) => q.date === 0);
    questionNumber = Math.floor(Math.random() * currentQuestions.length);
    if (currentQuestions.length === 0) {
      setCurrentQuestion(emptyQuestion);
    } else {
      idQuestion = currentQuestions[questionNumber].id;
      setCurrentQuestion(questions.filter((q: any) => q.id === idQuestion)[0]);
    }
  }

  return (
    <div className={'card'}>
      <div className={'card_content'}>

        <div className={'card_content-question'}>
          <div className={'card_content-question-label'}>
            ВОПРОС
          </div>
          {currentQuestion !== -1 ?
            <>{currentQuestion.question}</>
            :
            <>Вы повторили все карточки!</>
          }

        </div>
        <div className={'card_content-answer'}>

          {isQuestion
            ?
            <>
              <div className={'card_content-answer-label'}>
                ВАШ ОТВЕТ
              </div>
              <div className={'card_content-answer-check'}>
                <div className={'card_content-answer-check-input'}>
                <textarea onChange={handleChange}
                          placeholder={'Введите верный ответ прямо тут'}/>
                </div>
                <div className={'card_content-answer-check-button'}>
                  <button onClick={checkAnswer}
                          disabled={currentAnswer === ''}>
                    ОТВЕТИТЬ
                  </button>
                </div>
              </div>
            </>
            :
            <div className={'card_content-answer-show'}>
              <div className={'card_content-answer-show-label'}>
                ВЕРНЫЙ ОТВЕТ
              </div>
              <div className={'card_content-answer-show-input'}>
                {currentQuestion.answer}
              </div>
              <div className={'card_content-answer-show-label'}>
                ВАШ ОТВЕТ
              </div>
              <div className={'card_content-answer-show-input'}>
                {currentAnswer}
              </div>
              <div className={'card_content-answer-show-buttons'}>
                <button onClick={answerIncorrect} className={'incorrect'}>
                  МОЙ ОТВЕТ НЕВЕРНЫЙ
                </button>
                <button onClick={answerCorrect} className={'correct'}>
                  МОЙ ОТВЕТ ВЕРНЫЙ
                </button>
              </div>
            </div>
          }
        </div>


      </div>
      <div>
        <Link to={'/'}>
          <button>К папкам</button>
        </Link>
      </div>
    </div>)
}

export default Card;