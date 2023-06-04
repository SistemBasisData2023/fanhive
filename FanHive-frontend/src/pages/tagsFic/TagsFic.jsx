import { useLocation } from "react-router-dom";
import Stories from "../../components/stories/Stories";
import "./tagsFic.scss";

const TagsFic = () => {
  const tag = useLocation().pathname.split("/")[2];

  return (
    <div className="tagged-home">
      <Stories endpoint={`/fic/tags/${tag}`} />
    </div>
  );
};

export default TagsFic;
