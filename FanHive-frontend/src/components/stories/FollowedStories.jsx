import "./followedStories.scss";
import { useParams } from "react-router-dom";
import Stories from "./Stories";


const FollowedStories = () => {
  const {id} = useParams();
  return <Stories endpoint={`/fic/followed/${id}`} />
};

export default FollowedStories;
