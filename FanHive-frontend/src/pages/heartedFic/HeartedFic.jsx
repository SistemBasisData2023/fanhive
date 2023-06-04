import "./heartedFic.scss"
import Stories from '../../components/stories/Stories'
import { useLocation } from "react-router-dom"

const HeartedFic = () => {
  const userID = useLocation().pathname.split("/")[2];
  return (
    <div className='hearted-fic'>
      <Stories endpoint={`/fic/heart/${userID}`}/>
    </div>
  )
}

export default HeartedFic
