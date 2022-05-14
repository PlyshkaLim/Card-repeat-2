import React, {useState} from 'react';
import cn from "classnames";
import './AddCard.css';
import {Link} from "react-router-dom";

const AddCard: React.FC<any> = (props: any) => {
  const cardList = props.cardBase;
  const [selectedOption, setSelectedOption] = useState<number>(0);
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
    cardList[selectedOption].questions.push(
      {
        id: getRandomId(),
        question: currentQuestion,
        answer: currentAnswer,
        date: 0
      }
    )
    cardList[selectedOption].statistic.questionsCount += 1;
    setCurrentQuestion('');
    setCurrentAnswer('');
    props.setCardBase(cardList);
    localStorage.setItem('CardBase', JSON.stringify(cardList));
  }

  return (
    <div className={cn('new_card')}>
      <div className={cn('new_card_content')}>
        <div className={cn('add_card_group')}>
          <span>Добавить карточку к группе: </span>
          <select value={cardList[selectedOption].name} onChange={handleChange}>
            {cardList.map((item: any, id: any) => <option key={id}>{item.name}</option>)}
          </select>
        </div>
        <div className={cn('card_question')}>
          <span>Введите вопрос: </span>
          <input value={currentQuestion} onChange={handleChange2}/>
        </div>
        <div className={cn('card_answer')}>
          <span>Введите ответ: </span>
          <input value={currentAnswer} onChange={handleChange3}/>
        </div>
        <button onClick={addNewCard}>Добавить вопрос</button>
        <Link to={'/'}>
          <button>К папкам</button>
        </Link>
      </div>
    </div>
  )
}

export default AddCard;