"use client";

import type { ReactNode } from "react";
import { Reorder } from "framer-motion";

interface DragDropContainerProps<T> {
  items: T[];
  onReorder: (nextItems: T[]) => void;
  renderItem: (item: T) => ReactNode;
}

export default function DragDropContainer<T extends { id: string }>({
  items,
  onReorder,
  renderItem,
}: DragDropContainerProps<T>) {
  return (
    <div className="space-y-6">
      <Reorder.Group axis="y" values={items} onReorder={onReorder}>
        {items.map((item) => (
          <Reorder.Item
            as="div"
            value={item}
            key={item.id}
            className="rounded-3xl"
            whileDrag={{ scale: 1.01 }}
            dragListener={true}
          >
            {renderItem(item)}
          </Reorder.Item>
        ))}
      </Reorder.Group>
    </div>
  );
}
