import React, {useContext, useState} from "react";
import {CurrentListIdContext} from "../../App";
import {Link} from "react-router-dom";
import './QuestionsList.css';
import cn from "classnames";
import JoytekaLogoPng from "../../images/JoytekaLogoPng.png";

const QuestionsList: React.FC<any> = (props: any) => {
  const {CurrentListId} = useContext(CurrentListIdContext);
  const [currentCount, setCurrentCount] = useState<number>(0);
  const [isChange, setIsChange] = useState<boolean>(false);
  const [currentChanging, setCurrentChanging] = useState<any>();
  const [currentQuestion, setCurrentQuestion] = useState<string>('');
  const [currentAnswer, setCurrentAnswer] = useState<string>('');

  const cardList = props.cardBase;
  let currentCard = cardList.filter((i: any) => i.id === CurrentListId)[0];
  const cardName = currentCard.name;

  function handleChange(event: any) {
    setCurrentQuestion(event.target.value)
  }

  function handleChange2(event: any) {
    setCurrentAnswer(event.target.value)
  }

  function changeCard(cardId: number) {
    setIsChange(true);
    const a = currentCard.questions.filter((item: any) => item.id === cardId)[0];
    setCurrentChanging(a);
    setCurrentQuestion(a.question);
    setCurrentAnswer(a.answer);
  }

  function saveCard() {
    setIsChange(false);
    cardList[getGroupPositionById(CurrentListId)].questions[getQuestionPositionById(currentChanging.id)].question = currentQuestion;
    cardList[getGroupPositionById(CurrentListId)].questions[getQuestionPositionById(currentChanging.id)].answer = currentAnswer;
    props.setCardBase(cardList);
    localStorage.setItem('CardBase', JSON.stringify(cardList));
  }

  function getGroupPositionById(id: number) {
    for (let i = 0; i < cardList.length; i++) {
      if (cardList[i].id == id) {
        return i;
      }
    }
    return 0;
  }

  function getQuestionPositionById(id: number) {
    for (let i = 0; i < currentCard.questions.length; i++) {
      if (currentCard.questions[i].id == id) {
        return i;
      }
    }
    return 0;
  }

  function deleteCard(cardId: number) {
    for (let i = 0; i < cardList.length; i++) {
      if (cardList[i].id === CurrentListId) {
        cardList[i].questions = currentCard.questions.filter((i: any) => i.id !== cardId);
        cardList[i].statistic.questionsCount -= 1;
      }
    }
    props.setCardBase(cardList);
    setCurrentCount(currentCard.statistic.questionsCoun);
    localStorage.setItem('CardBase', JSON.stringify(cardList));
  }

  return (
    <div className={'questions_list_content'}>
      <div className={'header-list'}>
        <div className={'header-list-logo'}>
          <img src={JoytekaLogoPng} alt={'JoytekaLogoPng'}/>
        </div>
        <div className={'header-list-label'}>
          ДОБАВЛЕНИЕ КАРТОЧЕК
        </div>
        <div className={'header-list-buttons'}>
          <Link to={'/'}>
            <button>КО ВСЕМ ТЕМАМ</button>
          </Link>
        </div>
      </div>
      {isChange
        ?
        <div>
          <input value={currentQuestion} onChange={handleChange}/>
          <br/>
          <input value={currentAnswer} onChange={handleChange2}/>
          <br/>
          <button onClick={() => saveCard()}>Сохранить</button>
          <br/>
          <Link to={'/'}>
            <button>К папкам</button>
          </Link>
        </div>
        :
        <div className={cn('questions_list_wrapper')}>
          <div className={cn('questions_list')}>
            <div>
              Список вопросов в группе - {cardName}
            </div>
            <div>
              количество вопросов - {currentCount}
            </div>
            <div>
              {currentCard.questions.map((item: any, id: number) =>
                <div key={id} className={cn('card_item-wrapper')}>
                  <div className={'card_item'}>
                    <div className={'card_item-question'}>
                      <div className={'card_item-label'}>
                        ВОПРОС
                      </div>
                      <div className={'card_item-input'}>
                        {item.question}
                      </div>
                    </div>
                    <div className={'card_item-answer'}>
                      <div className={'card_item-label'}>
                        ВЕРНЫЙ ОТВЕТ
                      </div>
                      <div className={'card_item-input'}>
                        {item.answer}
                      </div>
                    </div>
                    <div>
                      <button onClick={() => deleteCard(item.id)}>Удалить</button>
                    </div>
                    <div>
                      <button onClick={() => changeCard(item.id)}>Изменить</button>
                    </div>
                  </div>
                </div>
              )}
            </div>
            <Link to={'/'}>
              <button>К папкам</button>
            </Link>
          </div>
        </div>
      }
    </div>
  )
}

export default QuestionsList;