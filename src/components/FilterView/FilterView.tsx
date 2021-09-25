import { useEffect, useCallback, useReducer } from "react";
import throttle from "lodash.throttle";
import classnames from "classnames";
import { Searchlist } from "../SearchList";
import { SearchInput } from "../SearchInput";
import { SortConfig } from "./sorting";

import styles from "./FilterView.module.css";

type FilterViewProps<TOption> = {
  isOpen: boolean;
  renderOption: (option: TOption) => React.ReactNode;
  keyGetter: (option: TOption) => string;
  fetchOptions: (searchTerm: string) => Promise<TOption[]>;
  sortConfig?: SortConfig<TOption>[];
};

type SearchState<TOption> = {
  userInput: string;
  options: TOption[];
  isBusy: boolean;
  showDetails: boolean;
  activeSort?: SortConfig<TOption>;
};

type Action<TOption> =
  | { type: "updateUserInput"; userInput: string }
  | { type: "updateIsBusy"; isBusy: boolean }
  | { type: "updateShowDetails"; show: boolean }
  | { type: "searchResponse"; results: TOption[] }
  | { type: "updateSort"; config: SortConfig<TOption> }
  | { type: "handleOpen"; isOpen: boolean };

function reducer<TOption>(
  state: SearchState<TOption>,
  action: Action<TOption>
): SearchState<TOption> {
  let newState: SearchState<TOption> ;
  switch (action.type) {
    case "updateUserInput":
      const userInputEmpty = !action.userInput?.length;
      newState = {
        ...state,
        userInput: action.userInput,
        options: userInputEmpty ? [] : state.options,
        showDetails: !userInputEmpty && state.options.length > 0
      };
      break;
    case "updateIsBusy":
      newState = { ...state, isBusy: action.isBusy };
      break;
    case "updateShowDetails":
      newState = { ...state, showDetails: action.show };
      break;
    case "searchResponse":
      const userInputStateEmpty = !state.userInput?.length;
      newState = {
        ...state,
        isBusy: false,
        options: userInputStateEmpty
          ? []
          : action.results.sort(state.activeSort?.comparer),
          showDetails: !userInputStateEmpty && action.results.length > 0
      };
      break;
    case "updateSort":
      newState = {
        ...state,
        activeSort: action.config,
        options: state.options.sort(action.config.comparer),
      };
      break;
    case "handleOpen":
      newState = {
        ...state,
        userInput: "",
        options: [],
      };
      break;
  }
  return newState;

}

export function FilterView<TOption>({
  fetchOptions,
  isOpen,
  renderOption,
  keyGetter

}: FilterViewProps<TOption>) {
  const [state, dispatch] = useReducer(reducer, {
    isBusy: false,
    showDetails: false,
    options: [],
    // activeSort: null ,
    userInput: "",
  });

  const search = useCallback(
    throttle(
      (input: string) => {
        if (!input) {
          return;
        }
        dispatch({ type: "updateIsBusy", isBusy: true });
        fetchOptions(input).then((results) => {
          console.log("filter", results);
          dispatch({ type: "searchResponse", results });
        });
      },
      300,
      { leading: false, trailing: true }
    ),
    []
  );

  /**
   * search effect
   */
  useEffect(() => {
    const cleanInput = state.userInput.toLocaleUpperCase().trim();
    search(cleanInput);
  }, [state.userInput, search]);

  useEffect(() => {
    dispatch({ type: "handleOpen", isOpen });
  }, [isOpen]);

  const handleInputChange = (userInput: string) => {
    dispatch({ type: "updateUserInput", userInput });
  };

  const handleClickOutside = () => {
    dispatch({ type: "updateShowDetails", show: false });
  };

 // const showDetails = state.options.length > 0;
  const detailsClass = state.showDetails ? styles.showDetails : styles.hideDetails;
  const containerClass = isOpen ? styles.fadeIn : styles.fadeOut;

  return (
    <div className={classnames(styles.container, containerClass)}>
      <div className={styles.search}>
        <SearchInput
          onChange={handleInputChange}
          onClickOutside={handleClickOutside}
          value={state.userInput}
          placeholder="Search for boats"
          isBusy={state.isBusy}
        />
        <div className={detailsClass}>
          {/* <SortSelector
            active={state.activeSort.title}
            config={sortConfig}
            onClick={handleSortClick}
          /> */}
          <Searchlist
            options={state.options as TOption[]}
            renderOption={renderOption}
            keyGetter={keyGetter}
          />
        </div>
      </div>
    </div>
  );
}
