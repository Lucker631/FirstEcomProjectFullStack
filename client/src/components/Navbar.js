import { Link } from "react-router-dom";
function Navbar() {
  return (
    <ul className="nav">
      <li>
        <Link to="/">Home</Link>
      </li>
      {/* <li>
        <Link to="/add">Add category</Link>
      </li>
      <li>
        <Link to="/display_categories">Display categories</Link>
      </li>
      <li>
        <Link to="/add_product">Add product</Link>
      </li> */}
    </ul>
  );
}
export default Navbar;
