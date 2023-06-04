import { useLocation } from "react-router-dom"
import Stories from "../../components/stories/Stories"
import "./fandomFic.scss"

const FandomFic = () => {
  const fandom = useLocation().pathname.split("/")[2]
  return (
    <div className="fandom-fic">
      <Stories endpoint={`/fic/fandom/${fandom}`} />
    </div>
  )
}

export default FandomFic
