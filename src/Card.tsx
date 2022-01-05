import { useRef } from "react";
import { useDrop } from "react-dnd";
import { moveTask } from "./state/action";
import { useAppState } from "./state/AppStateContext";
import { CardContainer } from "./styles";
import { isHidden } from "./utils/isHidden";
import { useItemDrag } from "./utils/useItemDrag";
type CardProps = {
  text: string;
  id: string;
  columnId: string;
  isPreview?: boolean;
};
export const Card = ({ text, id, columnId, isPreview }: CardProps) => {
  const { draggedItem, dispatch } = useAppState();
  const ref = useRef<HTMLDivElement>(null);
  const { drag } = useItemDrag({
    type: "CARD",
    id,
    text,
    columnId,
  });

  const [, drop] = useDrop({
    accept: "CARD",
    hover() {
      if (!draggedItem) {
        return;
      }
      if (draggedItem.type !== "CARD") {
        return;
      }
      if (draggedItem.id === id) {
        return;
      }
      dispatch(moveTask(draggedItem.id, id, draggedItem.columnId, columnId));
    },
  });

  drag(ref);
  drag(drop(ref));

  return (
    <CardContainer
      ref={ref}
      isHidden={isHidden(draggedItem, "CARD", id, isPreview)}
    >
      {text}
    </CardContainer>
  );
};
