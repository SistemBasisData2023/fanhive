import "./stories.scss";
import { formatDate } from "../../utilsDate";
import { useQuery } from "react-query";
import { makeRequest } from "../../axios";

const Stories = () => {
  const { isLoading, error, data } = useQuery(["stories"], () =>
    makeRequest.get("/fic/").then((res) => {
      return res.data;
    })
  );

  if (isLoading) return <div>Loading...</div>;

  if (error) return <div>Error: {error.message}</div>;

  console.log(data);
  return (
    <div className="stories">
      {data.map((story) => (
        <div className="story" key={story.id}>
          <img
            className="story-cover"
            src={story.coverImage}
            alt={story.title}
          />
          <div className="story-info">
            <h2 className="story-title">{story.title}</h2>
            <p className="story-fandom">{story.fandom}</p>
            <p className="story-author">by {story.author}</p>
            <p className="story-status">{story.status}</p>
            {story.tags.length > 0 && (
              <div className="story-tags">
                {story.tags.map((tag) => (
                  <span className="tag" key={tag}>
                    {tag}
                  </span>
                ))}
              </div>
            )}
            <p className="story-synopsis">{story.synopsis}</p>
            <div className="story-stats">
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

export default Stories;
