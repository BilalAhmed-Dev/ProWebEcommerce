import { useRef } from "react";
import { useHistory } from "react-router-dom";

const Search = () => {
  const keyWord = useRef();
  const history = useHistory();

  const searchHandler = (e) => {
    e.preventDefault();
    let searchKeyWord = keyWord.current.value;
    if (searchKeyWord.trim()) {
      history.push(
        `/search/${searchKeyWord}`
        // search: `?search=${searchKeyWord}`,
        // state: searchKeyWord,
      );
    }
  };
  return (
    <form onSubmit={searchHandler}>
      <div className="input-group">
        <input
          ref={keyWord}
          type="text"
          id="search_field"
          className="form-control"
          placeholder="Enter Product Name ..."
        />
        <div className="input-group-append">
          <button id="search_btn" className="btn">
            <i className="fa fa-search" aria-hidden="true"></i>
          </button>
        </div>
      </div>
    </form>
  );
};

export default Search;
