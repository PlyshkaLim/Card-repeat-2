import React, {useContext} from "react";
import {CurrentListIdContext} from "../../App";
import {Link} from "react-router-dom";
import './QuestionsList.css';
import cn from "classnames";

const QuestionsList: React.FC<any> = (props: any) => {
  const {CurrentListId} = useContext(CurrentListIdContext);
  const cardList = props.cardBase;
  const currentCard = cardList.filter((i: any) => i.id === CurrentListId)[0];
  const cardName = currentCard.name;

  function deleteCard(cardId: number) {
    for (let i = 0; i < cardList.length; i++) {
      if (cardList[i].id === CurrentListId) {
        cardList[i].questions = currentCard.questions.filter((i: any) => i.id !== cardId);
        cardList[i].statistic.questionsCount -= 1;
      }
    }
    props.setCardBase(cardList);
    localStorage.setItem('CardBase', JSON.stringify(cardList));
  }

  return (
    <div className={cn('questions_list_wrapper')}>
      <div className={cn('questions_list')}>
        <div>
          Список вопросов в группе - {cardName}
        </div>
        <div>
          {currentCard.questions.map((item: any, id: any) =>
            <div key={id} className={cn('card_item')}>
              <div>
                {item.question}
              </div>
              <div>
                <button>Изменить</button>
              </div>
              <div>
                {item.answer}
              </div>
              <div>
                <button onClick={() => deleteCard(item.id)}>Удалить</button>
              </div>
            </div>
          )}
        </div>
        <Link to={'/'}>
          <button>К папкам</button>
        </Link>
      </div>
    </div>
  )
}

export default QuestionsList;