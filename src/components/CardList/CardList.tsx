import React, {useContext} from 'react';
import {Link} from "react-router-dom";
import {CurrentListIdContext} from "../../App";
import cn from "classnames";
import './CardList.css';

const CardList: React.FC<any> = (props: any) => {
  const {dispatchChangeCurrentListId} = useContext(CurrentListIdContext);
  const cardList = props.cardBase;

  function changeCurListId(listId: number) {
    dispatchChangeCurrentListId(listId);
  }

  function deleteCurrentGroup(listId: number) {
    props.setCardBase(cardList.filter((i: any) => i.id !== listId));
    localStorage.setItem('CardBase', JSON.stringify(cardList.filter((i: any) => i.id === listId)));
  }

  return (
    <div className={cn('card_list')}>
      <div>
        <Link to={'/add_new_group'}>
          <button>Добавить новую группу</button>
        </Link>
      </div>
      Список групп с карточками
      <Link to={'/add_card'}>
        <button>Добавить карточку</button>
      </Link>
      {cardList.map((list: any, id: number) =>
        <div className={cn('card_block')} key={id}>
          <div>
            {list.name}
          </div>
          <div>
            Количество карточек: {list.statistic.questionsCount}
          </div>
          <Link to={`/card/${list.id}`}>
            <button onClick={() => changeCurListId(list.id)}>
              К вопросам
            </button>
          </Link>
          <Link to={`/card/${list.id}/questions_list`}>
            <button onClick={() => changeCurListId(list.id)}>
              Список вопросов
            </button>
          </Link>
          <Link to={`/card/${list.id}/statistics`}>
            <button onClick={() => changeCurListId(list.id)}>
              Статистика
            </button>
          </Link>
          <div>
            <button onClick={() => deleteCurrentGroup(list.id)}>
              Удалить группу
            </button>
          </div>
        </div>)}
    </div>
  )
}

export default CardList;