import React, {useState} from "react";
import {Link} from "react-router-dom";
import './AddGroup.css';
import JoytekaLogoPng from "../../images/JoytekaLogoPng.png";

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
  const [listSize, setListSize] = useState<number>(0);

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
    setNewQuestionsList(newList);
    setListSize(newList.length);
  }

  return (
    <div className={'add_group'}>
      <div className={'add_group-header'}>
        <div className={'add_group-header-logo'}>
          <img src={JoytekaLogoPng} alt={'JoytekaLogoPng'}/>
        </div>
        <div className={'add_group-header-label'}>
          ДОБАВИТЬ ТЕМУ
        </div>
        <div className={'add_group-header-buttons'}>
          <Link to={'/'}>
            <button>
              КО ВСЕМ ТЕМАМ
            </button>
          </Link>
        </div>
      </div>
      <div className={'add_group_content'}>
        <div className={'add_group_content-label'}>
          НАЗВАНИЕ ТЕМЫ
        </div>
        <div className={'add_group_content-input'}>
          <input value={currentGroupName}
                 onChange={handleChange}
                 placeholder={'Введите название темы'}/>
        </div>
        <div className={'add_group_content-button'}>
          <button onClick={addNewGroupName}
                  disabled={currentGroupName === ''}>
            ДОБАВИТЬ
          </button>
        </div>
      </div>
    </div>
  )
}

export default AddGroup;