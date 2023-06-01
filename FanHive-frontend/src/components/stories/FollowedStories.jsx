import "./followedStories.scss";
import { formatDate } from "../../utilsDate";
import { useQuery } from "@tanstack/react-query";
import { makeRequest } from "../../axios";
import { useParams } from "react-router-dom";

const FollowedStories = () => {
  const {id} = useParams();
  const { isLoading, error, data } = useQuery(["followedStories"], () =>
    makeRequest.get(`/fic/followed/${id}`).then((res) => {
      return res.data;
    })
  );

  if (isLoading) return <div>Loading...</div>;

  // show error message if there is an error
  if (error) return <div>Error: {error.message} </div>;

  return (
    <div className="follow-stories">
      {data.map((story) => (
        <div className="follow-story" key={story.id}>
          <img
            className="follow-story-cover"
            src={story.coverImage}
            alt={story.title}
          />
          <div className="follow-story-info">
            <h2 className="follow-story-title">{story.title}</h2>
            <p className="follow-story-fandom">{story.fandom}</p>
            <p className="follow-story-author">by {story.author}</p>
            <p className="follow-story-status">{story.status}</p>
            {story.tags.length > 0 && (
              <div className="follow-story-tags">
                {story.tags.map((tag) => (
                  <span className="follow-tag" key={tag}>
                    {tag}
                  </span>
                ))}
              </div>
            )}
            <p className="follow-story-synopsis">{story.synopsis}</p>
            <div className="follow-story-stats">
              <span>{story.chapterCount} Chapters</span>
              <span>Published on {formatDate(story.datePublished)}</span>
              <span>
                Last Updated on{" "}
                {story.dateUpdated
                  ? formatDate(story.dateUpdated)
                  : formatDate(story.datePublished)}
              </span>
              <span>
                {story.wordCount
                  ? story.wordCount.toLocaleString("en-US")
                  : "0 "}
                Words
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FollowedStories;
