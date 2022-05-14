import React, {useContext} from 'react';
import {Link} from "react-router-dom";
import {CurrentListIdContext} from "../../App";


const Statistics: React.FC<any> = (props: any) => {
  const {CurrentListId} = useContext(CurrentListIdContext);
  const cardList = props.cardBase;
  const currentList = cardList.filter((i: any) => i.id === CurrentListId)[0];
  const cardName = currentList.name;
  const statistic = currentList.statistic;

  return (
    <div>
      Статистика группы "{cardName}"
      <div>
        Всего вопросов {statistic.questionsCount}
        <br/>
        Отвечено правильно {statistic.correctAnswers}
        <br/>
        Отвечено неправильно {statistic.incorrectAnswers}
      </div>
      <Link to={'/'}>
        <button>К папкам</button>
      </Link>
    </div>
  )
}

export default Statistics;