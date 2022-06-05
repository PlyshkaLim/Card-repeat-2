import React, {useContext, useState} from "react";
import {colorsList, CurrentListIdContext} from "../../App";
import {Link} from "react-router-dom";
import '../../ColorsList.css';
import './QuestionsList.css';
import cn from "classnames";
import JoytekaLogoPng from "../../images/JoytekaLogoPng.png";
import DeleteIcon from "../../images/DeleteIcon";
import EditIcon from "../../images/EditIcon";
import SaveIcon from "../../images/SaveIcon";
import CopyIcon from "../../images/CopyIcon";

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

  function copyCard(cardId: number) {
    const questionId = getQuestionPositionById(cardId);
    const currentCardId = getGroupPositionById(CurrentListId);
    cardList[currentCardId].questions.push(cardList[currentCardId].questions[questionId]);
    cardList[currentCardId].statistic.questionsCount += 1;
    props.setCardBase(cardList);
    setCurrentCount(currentCard.statistic.questionsCount);
    localStorage.setItem('CardBase', JSON.stringify(cardList));
  }

  function deleteCard(cardId: number) {
    for (let i = 0; i < cardList.length; i++) {
      if (cardList[i].id === CurrentListId) {
        cardList[i].questions = currentCard.questions.filter((i: any) => i.id !== cardId);
        if (cardList[i].statistic.questionsCount > 0) {
          cardList[i].statistic.questionsCount -= 1;
        }
      }
    }
    props.setCardBase(cardList);
    setCurrentCount(currentCard.statistic.questionsCount);
    localStorage.setItem('CardBase', JSON.stringify(cardList));
  }

  function changeCardColor(color: any) {
    for (let i = 0; i < cardList.length; i++) {
      if (cardList[i].id === CurrentListId) {
        cardList[i].groupColor = color;
      }
    }
    props.setCardBase(cardList);
    localStorage.setItem('CardBase', JSON.stringify(cardList));
    setCurrentCount(currentCount + 1);
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
        <div className={'change_card'}>
          <div>
            <div className={'change_card-question'}>
              <div className={'change_card-question-label'}>
                ВОПРОС
              </div>
              <div className={'change_card-question-input'}>
                <textarea value={currentQuestion} onChange={handleChange}/>
              </div>
            </div>
            <div className={'change_card-answer'}>
              <div className={'change_card-answer-label'}>
                ОТВЕТ
              </div>
              <div className={'change_card-answer-input'}>
                <textarea value={currentAnswer} onChange={handleChange2}/>
              </div>
            </div>
          </div>
          <div className={'change_card-button'}>
            <button onClick={() => saveCard()}>
              <SaveIcon/>
            </button>
          </div>
        </div>
        :
        <div className={cn('questions_list_wrapper')}>
          <div className={cn('questions_list')}>
            <div className={'questions_list-change_block'}>
              <div className={'questions_list-change_block-label'}>
                ВЫБЕРИТЕ ЦВЕТ ВСЕХ КАРТОЧЕК
              </div>
              <div className={'questions_list-change_block-colors'}>
                {colorsList.map((item: any, id: any) =>
                  <button key={id}
                          className={cn('questions_list-change_color', item, item === currentCard.groupColor ? 'active' : '')}
                          onClick={() => changeCardColor(item)}/>
                )}
              </div>
            </div>
            <div className={'questions_list-block_name'}>
              <div className={'questions_list-label_name'}>
                НАЗВАНИЕ ТЕМЫ
              </div>
              <div className={'questions_list-name'}>
                {cardName}
              </div>
            </div>
            <div>
              {currentCard.questions.map((item: any, id: number) =>
                <div key={id} className={cn('card_item-wrapper')}>
                  <div className={'card_item'}>
                    <div className={cn(currentCard.groupColor, 'card_item-question')}>
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
                  </div>
                  <div className={'card_item-buttons'}>
                    <div className={'card_item-buttons-button'}>
                      <button onClick={() => copyCard(item.id)}>
                        <CopyIcon/>
                      </button>
                    </div>
                    <div className={'card_item-buttons-button'}>
                      <button onClick={() => changeCard(item.id)}>
                        <EditIcon/>
                      </button>
                    </div>
                    <div className={'card_item-buttons-button'}>
                      <button onClick={() => deleteCard(item.id)}>
                        <DeleteIcon/>
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      }
    </div>
  )
}

export default QuestionsList;