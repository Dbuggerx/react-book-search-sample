import React, { useCallback, useState } from 'react';
import arrowIcon from 'material-design-icons/navigation/svg/production/ic_expand_more_18px.svg';
import './Dropdown.scss';

export type Props<T> = {
  items: T[];
  renderItem: (item: T) => { id: number; el: React.ReactNode };
};

const Dropdown: <T>(p: Props<T>) => React.ReactElement<Props<T>> = props => {
  const [isOpened, setIsOpened] = useState(false);
  const [selectedItem, setSelectedItem] = useState();

  const handleToggle = useCallback(() => {
    setIsOpened(!isOpened);
  }, []);

  return (
    <div className="dropdown">
      <div className="dropdown__container">
        <div className="dropdown__button" onClick={handleToggle}>
          Test
          <svg className="dropdown__arrow-icon" viewBox={arrowIcon.viewBox}>
            <use xlinkHref={`#${arrowIcon.id}`} />
          </svg>
        </div>
        <ul className="dropdown__menu">
          {props.items.map(item => {
            const renderedItem = props.renderItem(item);
            return (
              <li key={renderedItem.id} className="dropdown__menu-item">
                {renderedItem.el}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default Dropdown;
