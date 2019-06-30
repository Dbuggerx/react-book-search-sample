import React, { useCallback, useState } from 'react';
import arrowIcon from 'material-design-icons/navigation/svg/production/ic_expand_more_18px.svg';
import xIcon from 'material-design-icons/navigation/svg/production/ic_close_18px.svg';
import './Dropdown.scss';

export type Props<T> = {
  items: T[];
  renderItem: (item: T) => { id: number; el: React.ReactNode };
  onSelect: (item?: T) => void;
  placeholder: string;
};

const Dropdown = <T extends {}>(props: Props<T>) => {
  const [isOpened, setIsOpened] = useState(false);
  const [selectedItem, setSelectedItem] = useState<T>();

  const handleToggle = useCallback(() => {
    setIsOpened(opened => !opened);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsOpened(false);
  }, []);

  const { onSelect } = props;

  const handleClear = useCallback(
    event => {
      event.stopPropagation();
      setSelectedItem(undefined);
      onSelect(undefined);
    },
    [onSelect]
  );

  const handleSelect = useCallback(
    (item: T) => {
      setSelectedItem(item);
      setIsOpened(false);
      onSelect(item);
    },
    [onSelect]
  );

  return (
    <div
      className={`dropdown ${isOpened && 'dropdown--opened'}`}
      onMouseLeave={handleMouseLeave}
    >
      <div
        className={`dropdown__button ${
          !selectedItem ? 'dropdown__menu--placeholder-selected' : ''
        }`}
        onClick={handleToggle}
      >
        <div className="dropdown__selected-text">
          {selectedItem ? props.renderItem(selectedItem).el : props.placeholder}
        </div>
        {selectedItem && (
          <svg
            className="dropdown__icon dropdown__icon--clear"
            viewBox={xIcon.viewBox}
            onClick={handleClear}
          >
            <use xlinkHref={`#${xIcon.id}`} />
          </svg>
        )}
        <svg className="dropdown__icon dropdown__icon--arrow" viewBox={arrowIcon.viewBox}>
          <use xlinkHref={`#${arrowIcon.id}`} />
        </svg>
      </div>
      <ul className="dropdown__menu">
        <li className="dropdown__placeholder">{props.placeholder}</li>
        {props.items.map(item => {
          const renderedItem = props.renderItem(item);
          return (
            <li
              key={renderedItem.id}
              onClick={() => handleSelect(item)}
              className="dropdown__menu-item"
              data-testid="dropdown-item"
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
