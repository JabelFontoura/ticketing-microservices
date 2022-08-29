import 'bootstrap/dist/css/bootstrap.css';

export default ({ Component, pagePros }) => {
  return (
    <div className="container">
      <Component {...pagePros} />
    </div>
  );
};
