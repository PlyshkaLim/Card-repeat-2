import React, {useState} from "react";
import {Link} from "react-router-dom";
import cn from "classnames";
import './AddGroup.css';

const AddGroup: React.FC<any> = (props: any) => {
  const emptyCard = {
    id: getRandomId(),
    question: '',
    answer: '',
    date: 0
  };
  const cardList = props.cardBase;
  const [currentGroupName, setCurrentGroupName] = useState<string>('');
  const [newQuestionsList, setNewQuestionsList] = useState<any>([]);

  function handleChange(event: any) {
    setCurrentGroupName(event.target.value);
  }

  function getRandomId() {
    const min = 0;
    const max = 10000;
    return Math.trunc(min + Math.random() * (max - min));
  }

  function addNewGroupName() {
    cardList.push(
      {
        id: getRandomId(),
        name: currentGroupName,
        questions: [],
        statistic: {
          questionsCount: 0,
          correctAnswers: 0,
          incorrectAnswers: 0
        }
      }
    );
    localStorage.setItem('CardBase', JSON.stringify(cardList));
    setCurrentGroupName('');
  }

  function addNewCard() {
    const newList = newQuestionsList;
    newList.push(emptyCard);
    console.log('newList    ', newList);
    setNewQuestionsList(newList);
    console.log('newQuestionsList   ', newQuestionsList);
  }

  console.log('newQuestionsList   ', newQuestionsList);
  return (
    <div className={cn('add_group')}>
      <div className={cn('add_group_content')}>
      <span>
        Добавить новую группу
      </span>
        <input value={currentGroupName} onChange={handleChange}/>
        <button onClick={addNewCard}>Новая карточка</button>

        {
          newQuestionsList.length !== 0
            ?
            <div>
              {newQuestionsList.map((item: any) =>
                <div>1</div>
              )}
            </div>
            :
            <div>Добавьте новые карточки!</div>
        }
        <button onClick={addNewGroupName}>Добавить</button>
        <Link to={'/'}>
          <button>К папкам</button>
        </Link>
      </div>
    </div>
  )
}

export default AddGroup;