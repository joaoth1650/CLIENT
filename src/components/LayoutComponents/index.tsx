import "./style.css"
 const LayoutComponents = (props: any) => {
  return (
    <div className="container1">
      <div className="container-login">
        <div className="wrap-login">{props.children}</div>
      </div>
    </div>
  );
};

export default LayoutComponents