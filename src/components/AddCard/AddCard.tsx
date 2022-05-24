import React, {useState} from 'react';
import './AddCard.css';
import {Link} from "react-router-dom";
import JoytekaLogoPng from "../../images/JoytekaLogoPng.png";
import SaveIcon from "../../images/SaveIcon";

const AddCard: React.FC<any> = (props: any) => {
  const cardList = props.cardBase;
  const [selectedOption, setSelectedOption] = useState<number>(cardList[0].id);
  const [currentQuestion, setCurrentQuestion] = useState<string>('');
  const [currentAnswer, setCurrentAnswer] = useState<string>('');

  function handleChange(event: any) {
    let a = cardList.filter((i: any) => i.name === event.target.value)[0].id;
    setSelectedOption(a);
  }

  function handleChange2(event: any) {
    setCurrentQuestion(event.target.value);
  }

  function handleChange3(event: any) {
    setCurrentAnswer(event.target.value);
  }

  function getRandomId() {
    const min = 0;
    const max = 10000;
    return Math.trunc(min + Math.random() * (max - min));
  }

  function addNewCard() {
    cardList[getPositionById(selectedOption)].questions.push(
      {
        id: getRandomId(),
        question: currentQuestion,
        answer: currentAnswer,
        date: 0
      }
    )
    cardList[getPositionById(selectedOption)].statistic.questionsCount += 1;
    setCurrentQuestion('');
    setCurrentAnswer('');
    props.setCardBase(cardList);
    localStorage.setItem('CardBase', JSON.stringify(cardList));
    console.log('Success add new card!')
  }

  function getPositionById(id: number) {
    for (let i = 0; i < cardList.length; i++) {
      if (cardList[i].id == id) {
        return i;
      }
    }
    return 0;
  }

  function getCurrentOptionName(optionId: number) {
    return cardList.filter((item: any) => item.id === optionId)[0].name;
  }

  return (
    <div className={'add_card'}>
      <div className={'add_card-header'}>
        <div className={'add_card-header-logo'}>
          <img src={JoytekaLogoPng} alt={'JoytekaLogoPng'}/>
        </div>
        <div className={'add_card-header-label'}>
          ДОБАВИТЬ НОВУЮ КАРТОЧКУ
        </div>
        <div className={'add_card-header-buttons'}>
          <Link to={'/'}>
            <button>
              КО ВСЕМ ТЕМАМ
            </button>
          </Link>
        </div>
      </div>
      <div className={'new_card'}>
        <div className={'add_card-group_name'}>
          <div className={'add_card-group_name-label'}>
            НАЗВАНИЕ ТЕМЫ
          </div>
          <div className={'add_card-group_name-select'}>
            <select value={getCurrentOptionName(selectedOption)}
                    onChange={handleChange}>
              {cardList.map((item: any, id: any) =>
                <option key={id}>{item.name}</option>)}
            </select>
          </div>
        </div>
        <div className={'new_card_content'}>
          <div>
            <div className={'card_question'}>
              <div className={'card_question-label'}>
                ВОПРОС
              </div>
              <div className={'card_question-input'}>
              <textarea value={currentQuestion}
                        onChange={handleChange2}
                        placeholder={'Введите вопрос прямо тут'}/>
              </div>
            </div>
            <div className={'card_answer'}>
              <div className={'card_answer-label'}>
                ВЕРНЫЙ ОТВЕТ
              </div>
              <div className={'card_answer-input'}>
              <textarea value={currentAnswer}
                        onChange={handleChange3}
                        placeholder={'Введите верный ответ прямо тут'}/>
              </div>
            </div>
          </div>
          <div className={'card-button_save'}>
            <button onClick={addNewCard}>
              <SaveIcon/>
            </button>
          </div>
        </div>
        </div>
    </div>
  )
}

export default AddCard;