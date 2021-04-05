import React, {useState} from 'react';
import {connect} from 'react-redux';
import {func, string} from 'prop-types';

import {changeSorting} from '../../store/actions';
import {SortingType} from '../../util/const';
import {makeSlug} from '../../util/util';
import {getSorting} from '../../store/offers/selectors';

const ACTIVE_SORTING_CLASS = `places__option--active`;
const ACTIVE_MENU_CLASS = `places__options--opened`;

const Sorting = ({sorting, updateSortingType}) => {
  const [isMenuActive, setMenuStatus] = useState(false);
  const sortingTypes = Object.values(SortingType);

  const handleSortingChange = ({target: {dataset: {type}}}) => {
    updateSortingType(type);
  };

  const handleSortingMenuClick = () => {
    setMenuStatus(!isMenuActive);
  };

  return (
    <div className="places__sorting">
      <span className="places__sorting-caption">Sort by</span>
      <span
        className="places__sorting-type"
        tabIndex="0"
        onClick={handleSortingMenuClick}
      >
        &nbsp;&nbsp;{sorting}
        <svg className="places__sorting-arrow" width="7" height="4">
          <use xlinkHref="#icon-arrow-select" />
        </svg>
      </span>
      <ul className={`places__options places__options--custom ${isMenuActive ? ACTIVE_MENU_CLASS : ``}`}>
        {
          sortingTypes.map((type) => {
            return (
              <li
                key={makeSlug(type)}
                className={`places__option ${type === sorting ? ACTIVE_SORTING_CLASS : ``}`}
                tabIndex="0"
                data-type={type}
                onClick={handleSortingChange}
              >
                {type}
              </li>
            );
          })
        }
      </ul>
    </div>
  );
};

Sorting.propTypes = {
  sorting: string.isRequired,
  updateSortingType: func.isRequired,
};

const mapStateToProps = (state) => ({
  sorting: getSorting(state),
});

const mapDispatchToProps = (dispatch) => ({
  updateSortingType(sortingType) {
    dispatch(changeSorting(sortingType));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Sorting);
