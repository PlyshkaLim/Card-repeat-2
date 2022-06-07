import React, {useContext, useState} from 'react';
import './Card.css';
import '../../ColorsList.css';
import {Link} from "react-router-dom";
import {CurrentListIdContext} from "../../App";
import JoytekaLogoPng from "../../images/JoytekaLogoPng.png";
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
  const currentList = cardList[findCardGroupById(CurrentListId)];

  //список всех вопросов в карточке доступных для повторения, берем первый вопрос
  let currentQuestions = currentList.questions.filter((q: any) => q.date === 0);
  //определяем рандомный номер вопроса
  let questionNumber = 0;
  //Math.floor(Math.random() * currentQuestions.length);
  let idQuestion = 0;
  if (currentQuestions.length !== 0) {
    idQuestion = currentQuestions[questionNumber].id;
  }


  const [currentQuestion, setCurrentQuestion] = useState<any>(initCurrentQuestion);
  const [currentAnswer, setCurrentAnswer] = useState<string>('');
  const [isQuestion, setIQuestion] = useState<boolean>(true);

  //инициируем первый вопрос если таковой имеется
  function initCurrentQuestion() {
    if (currentQuestions.length !== 0) {
      idQuestion = currentQuestions[0].id;
      //console.log('init idQ    ', idQuestion);
      return currentQuestions[0];
    }
    return emptyQuestion;
  }

  const checkAnswer = () => {
    setIQuestion(false);
  }

  const handleChange = (event: any) => {
    setCurrentAnswer(event.target.value);
  }

  const answerCorrect = () => {
    currentList.statistic.correctAnswers += 1;
    //questions.map((q: any) => q.id === idQuestion ? q.date += 2 : q.date)
    cardList[findCardGroupById(CurrentListId)].questions[findCardById(idQuestion)].date += 2;
    changeQuestion();
  }

  const answerIncorrect = () => {
    console.log(cardList[findCardGroupById(CurrentListId)].questions);
    console.log(idQuestion);
    currentList.statistic.incorrectAnswers += 1;
    //questions.map((q: any) => q.id === idQuestion ? q.date += 1 : q.date)
    cardList[findCardGroupById(CurrentListId)].questions[findCardById(idQuestion)].date += 1;
    console.log(cardList[findCardGroupById(CurrentListId)].questions[findCardById(idQuestion)]);
    console.log(idQuestion);
    changeQuestion();
  }

  function changeQuestion() {
    props.setCardBase(cardList);
    localStorage.setItem('CardBase', JSON.stringify(cardList));
    setIQuestion(true);
    currentQuestions = currentList.questions.filter((q: any) => q.date === 0);
    console.log('currentQuestions   ', currentQuestions)
    questionNumber = 0;
    if (currentQuestions.length === 0) {
      setCurrentQuestion(emptyQuestion);
    } else {
      idQuestion = currentQuestions[0].id;
      setCurrentQuestion(currentList.questions.filter((q: any) => q.id === idQuestion)[0]);
    }
  }

  function findCardGroupById(id: number) {
    for (let i = 0; i < cardList.length; i++) {
      if (cardList[i].id === id) {
        return i;
      }
    }
    return 0;
  }

  function findCardById(id: number) {
    for (let i = 0; i < currentList.questions.length; i++) {
      if (currentList.questions[i].id === id) {
        return i;
      }
    }
    return 0;
  }

  return (
    <div>
      <div className={'header-card'}>
        <div className={'header-card-logo'}>
          <img src={JoytekaLogoPng} alt={'JoytekaLogoPng'}/>
        </div>
        <div className={'header-card-label'}>
          {currentList.name.toUpperCase()}
        </div>
        <div className={'header-card-buttons'}>
          <Link to={'/'}>
            <button>
              {currentQuestion.id !== -1
                ?
                <>ЗАВЕРШИТЬ ДОСРОЧНО</>
                :
                <>КО ВСЕМ ТЕМАМ</>
              }
            </button>
          </Link>
        </div>
      </div>
      <div className={'card'}>
        <div className={'card_content'}>
          <div className={cn('card_content-question', currentList.groupColor)}>
            <div className={'card_content-question-label'}>
              ВОПРОС
            </div>
            <div className={'card_content-question-text'}>
              {currentQuestion.id !== -1 ?
                <>{currentQuestion.question}</>
                :
                <>Вы повторили все карточки!</>
              }
            </div>
          </div>
          <div className={'card_content-answer'}>
            {isQuestion
              ?
              <>
                <div className={'card_content-answer-label'}>
                  ВАШ ОТВЕТ
                </div>
                {currentQuestion.id !== -1 ?
                  <>
                    <div className={'card_content-answer-check'}>
                      <div className={'card_content-answer-check-input'}>
                        <textarea onChange={handleChange}
                                  placeholder={'Введите верный ответ прямо тут'}/>
                      </div>
                      <div className={'card_content-answer-check-button'}>
                        <button onClick={checkAnswer}
                                disabled={currentAnswer === '' || currentQuestion.id === -1}>
                          ОТВЕТИТЬ
                        </button>
                      </div>
                    </div>
                  </>
                  :
                  <>
                    <div className={'card_content-answer-check'}>
                      <div className={'card_content-answer-check-input'}>
                        <textarea onChange={handleChange}
                                  placeholder={'Вы повторили все карточки!'}/>
                      </div>
                      <div className={'card_content-answer-check-button'}>
                        <Link to={'/'}>
                          <button>
                            КО ВСЕМ ТЕМАМ
                          </button>
                        </Link>
                      </div>
                    </div>
                  </>
                }
              </>
              :
              <div>
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
      </div>
    </div>)
}

export default Card;