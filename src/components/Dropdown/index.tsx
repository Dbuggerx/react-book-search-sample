import React, { useCallback, useState } from 'react';
import arrowIcon from 'material-design-icons/navigation/svg/production/ic_expand_more_18px.svg';
import './Dropdown.scss';

export type Props<T> = {
  items: T[];
  renderItem: (item: T) => { id: number; el: React.ReactNode };
  onSelect: (item: T) => void;
};

const Dropdown = <T extends {}>(props: Props<T>) => {
  const [isOpened, setIsOpened] = useState(false);
  const [selectedItem, setSelectedItem] = useState<T>();

  const handleToggle = () => {
    setIsOpened(!isOpened);
  };

  const handleMouseLeave = () => {
    setIsOpened(false);
  };

  const handleSelect = (item: T) => {
    setSelectedItem(item);
    setIsOpened(false);
    props.onSelect(item);
  };

  return (
    <div
      className={`dropdown ${isOpened && 'dropdown--opened'}`}
      onMouseLeave={handleMouseLeave}
    >
      <div className="dropdown__button" onClick={handleToggle}>
        {selectedItem && props.renderItem(selectedItem).el}
        <svg className="dropdown__arrow-icon" viewBox={arrowIcon.viewBox}>
          <use xlinkHref={`#${arrowIcon.id}`} />
        </svg>
      </div>
      <ul className="dropdown__menu">
        {props.items.map(item => {
          const renderedItem = props.renderItem(item);
          return (
            <li
              key={renderedItem.id}
              onClick={() => handleSelect(item)}
              className="dropdown__menu-item"
            >
              {renderedItem.el}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Dropdown;
