import Pagination from "react-bootstrap/Pagination";

const PaginationModule = (props) => {
  const select = (page) => {
    props.selectPage(page);
  };

  return (
    <Pagination size="sm">
      <Pagination.First
        disabled={props.selected == 1}
        onClick={() => select(1)}
      />
      {props.selected > 3 ? <Pagination.Ellipsis /> : <></>}
      {props.selected - 2 > 0 ? (
        <Pagination.Item onClick={() => select(props.selected - 2)}>
          {props.selected - 2}
        </Pagination.Item>
      ) : (
        <></>
      )}
      {props.selected - 1 > 0 ? (
        <Pagination.Item onClick={() => select(props.selected - 1)}>
          {props.selected - 1}
        </Pagination.Item>
      ) : (
        <></>
      )}
      <Pagination.Item active>{props.selected}</Pagination.Item>
      {props.selected + 1 <= props.pageCount ? (
        <Pagination.Item onClick={() => select(props.selected + 1)}>
          {props.selected + 1}
        </Pagination.Item>
      ) : (
        <></>
      )}
      {props.selected + 2 <= props.pageCount ? (
        <Pagination.Item onClick={() => select(props.selected + 2)}>
          {props.selected + 2}
        </Pagination.Item>
      ) : (
        <></>
      )}
      {props.selected <= props.pageCount - 3 ? <Pagination.Ellipsis /> : <></>}
      <Pagination.Last
        disabled={props.selected == props.pageCount}
        onClick={() => select(props.pageCount)}
      />
    </Pagination>
  );
};

export default PaginationModule;
