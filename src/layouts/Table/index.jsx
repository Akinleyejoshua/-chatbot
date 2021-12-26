const Table = ({ header, body}) => {

  const arrHeader = header.map((items, i) => (
    <div className="row" key={i}>
      <p>{items}</p>
      <i className="fa fa-angle-down"></i>
    </div>
  ));

  return (
    <div className="table">
      <div className="table-header">{arrHeader}</div>
      <div className="table-body col">{body}</div>
    </div>
  );
};

export default Table;
