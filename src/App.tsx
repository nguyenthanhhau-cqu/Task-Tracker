// import styled from "styled-components";
import { AppContainer } from "./styles";
import { AddNewItem } from "./AddNewItem";
import { Column } from "./Column";
import { useAppState } from "./state/AppStateContext";
import { addList } from "../src/state/action";

// import { FC } from "react";

const App = () => {
  const { lists, dispatch } = useAppState();

  return (
    <AppContainer>
      {lists.map((list) => (
        <Column text={list.text} key={list.id} id={list.id}></Column>
      ))}
      <AddNewItem
        toggleButtonText="+ Add another list"
        onAdd={(text) => dispatch(addList(text))}
      />
    </AppContainer>
  );
};

export default App;
