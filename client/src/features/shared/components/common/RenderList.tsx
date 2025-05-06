type RenderListProps<T> = {
  records: T[];
  renderItem: (record: T) => React.ReactNode;
};

const RenderList = <T,>({ records, renderItem }: RenderListProps<T>) => {
  const renderItemList = records.map((record) => (
    <div>{renderItem(record)}</div>
  ));
  return renderItemList;
};

export default RenderList;
