import React, {useContext} from 'react';
import {Link} from "react-router-dom";
import {CurrentListIdContext} from "../../App";
import cn from "classnames";
import './CardList.css';
import JoytekaLogoPng from "../../images/JoytekaLogoPng.png";

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
    <div className={'card_list_content'}>
      <div className={'header'}>
        <div className={'header-logo'}>
          <img src={JoytekaLogoPng} alt={'JoytekaLogoPng'}/>
        </div>
        <div className={'header-label'}>
          ТЕМЫ КАРТОЧЕК
        </div>
        <div className={'header-buttons'}>
          <Link to={'/add_card'}>
            <button>Добавить карточку</button>
          </Link>
        </div>
      </div>
      <div className={cn('card_list')}>
        <div className={cn('card_block new_card_block')}>
          <div className={'card_block-content'}>
            Создайте свою первую тему карточек с вопросами
          </div>
          <div className={'card_block-button'}>
            <Link to={'/add_new_group'}>
              <button>Создать</button>
            </Link>
          </div>
        </div>
        {cardList.map((list: any, id: number) =>
          <div className={cn('card_block')} key={id}>
            <div className={'card_block-label_name'}>
              {list.name}
            </div>
            <div className={'card_block-main_content'}>
              <div className={'card_block-statistic'}>
                <div className={'card_block-statistic-labels'}>
                  <div>
                    Количество карточек: {list.statistic.questionsCount}
                  </div>
                  <div>
                    Отвеченных карточек: {list.statistic.correctAnswers}
                  </div>
                </div>
                <div className={'card_block-button_play'}>
                  <Link to={`/card/${list.id}`}>
                    <button onClick={() => changeCurListId(list.id)}>
                      play
                    </button>
                  </Link>
                </div>
              </div>
              <div className={'card_block-button_edit'}>
                <Link to={`/card/${list.id}/questions_list`}>
                  <button onClick={() => changeCurListId(list.id)}>
                    РЕДАКТИРОВАТЬ ТЕМУ
                  </button>
                </Link>
              </div>
              <div className={'card_block-stat_del'}>
                <div className={'card_block-stat_del-stat'}>
                  <Link to={`/card/${list.id}/statistics`}>
                    <button onClick={() => changeCurListId(list.id)}>
                      СТАТИСТИКА
                    </button>
                  </Link>
                </div>
                <div className={'card_block-stat_del-del'}>
                  <button onClick={() => deleteCurrentGroup(list.id)}>
                    del
                  </button>
                </div>
              </div>
            </div>


          </div>)}
      </div>
    </div>
  )
}

export default CardList;