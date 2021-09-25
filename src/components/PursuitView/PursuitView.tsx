import { useMemo, useEffect, useReducer } from "react";
import { BoatClass, PursuitResult } from "../../model";
import { Grid } from "../Grid";

import styles from "./PursuitView.module.css";
import { FilterView } from "../FilterView";
import { BoatDetails } from "../BoatDetails";
import { createColumns } from "./columnDefinitions";

type PursuitViewProps = {
  isOpen: boolean;
  searchBoatClasses: (searchTerm: string) => Promise<BoatClass[]>;
  calculateResults: (
    boats: BoatClass[],
    raceLengthSecs: number,
    raceStart: Date
  ) => Promise<PursuitResult[]>;
};

type PursuitViewState = {
  boats: BoatClass[];
  results: PursuitResult[];
};

type Action =
  | { type: "addBoat"; boat: BoatClass }
  | { type: "removeBoat"; result: PursuitResult }
  | { type: "updateResults"; results: PursuitResult[] };

function reducer(state: PursuitViewState, action: Action): PursuitViewState {
  switch (action.type) {
   
    case "addBoat":
      console.log('adding boat', action.boat);
      return {
        ...state,
        boats: [...state.boats, action.boat],
      };
    case "removeBoat":
      return {
        ...state,
        boats: state.boats.filter(
          (r) => r.className !== action.result.boatClass.className
        ),
      };
    case "updateResults":
      return {
        ...state,
        results: action.results,
      };
  }
}

export const PursuitView = ({
  isOpen,
  searchBoatClasses,
  calculateResults,
}: PursuitViewProps) => {
  const [state, dispatch] = useReducer(reducer, {
    boats: [],
    results: [],
  });
  const columns = useMemo(() => {
    const handleDelete = (toDelete: PursuitResult) => {
      dispatch({ type: "removeBoat", result: toDelete });
    };
    return createColumns(handleDelete);
  }, []);

  useEffect(() => {
    if (!state.boats.length) {
      return;
    }
    calculateResults(state.boats, 90 * 60, new Date(2020, 6, 12, 14)).then(
      (results) => {
        dispatch({ type: "updateResults", results });
      }
    );
  }, [state.boats, calculateResults]);

  const renderOption = (boat: BoatClass) => (
    <BoatDetails
      name={boat.className}
      pyNumber={boat.number}
      onAddClick={() => dispatch({ type: "addBoat", boat })}
    />
  );

  return (
    <div className={styles.container}>
      <FilterView
        fetchOptions={searchBoatClasses}
        isOpen={isOpen}
        renderOption={renderOption}
        keyGetter={keyGetter}
      />

      {isOpen && state.results.length > 0 && (
        <div className={styles.gridContainer}>
          <div style={{ flexGrow: 1 }}>
            <Grid columns={columns} rows={state.results} />
          </div>
        </div>
      )}
    </div>
  );
};

const keyGetter = ({className}: BoatClass): string => className;