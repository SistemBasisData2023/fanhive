import { useLocation } from "react-router-dom";
import "./searchedFic.scss";
import Stories from "../../components/stories/Stories";

const SearchedFic = () => {
  const searchedQuery = useLocation().pathname.split("/")[2];

  return (
    <div className="search-home">
      <Stories endpoint={`/fic/search/${searchedQuery}`} />
    </div>
  )
}

export default SearchedFic
