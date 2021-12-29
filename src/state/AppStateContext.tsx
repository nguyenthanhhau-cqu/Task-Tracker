import { appStateReducer, AppState, List, Task } from "./appStateReducer";
import { createContext, useContext, Dispatch, FC } from "react";
import { Action } from "./action";
import { useImmerReducer } from "use-immer";
type AppStateContextProp = {
  lists: List[];
  getTasksByListId(id: string): Task[];
  dispatch: Dispatch<Action>;
};

const AppData: AppState = {
  lists: [
    {
      id: "0",
      text: "To Do",
      tasks: [{ id: "c0", text: "Generate app scaffold" }],
    },
    {
      id: "1",
      text: "In Progress",
      tasks: [{ id: "c2", text: "Learn Typescript" }],
    },
    {
      id: "2",
      text: "Done",
      tasks: [{ id: "c3", text: "Begin to use static typing" }],
    },
  ],
};
const AppStateContext = createContext<AppStateContextProp>(
  {} as AppStateContextProp
);

export const AppStateProvider: FC = ({ children }) => {
  const [state, dispatch] = useImmerReducer(appStateReducer, AppData);

  const { lists } = state;
  const getTasksByListId = (id: string) => {
    return state.lists.find((list) => list.id === id)?.tasks || [];
  };
  return (
    <AppStateContext.Provider value={{ lists, getTasksByListId, dispatch }}>
      {children}
    </AppStateContext.Provider>
  );
};
export const useAppState = () => {
  return useContext(AppStateContext);
};
