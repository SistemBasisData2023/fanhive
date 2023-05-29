import "./stories.scss";
import { formatDate } from "../../utilsDate";

const Stories = () => {
  const stories = [
    {
      id: "261316381",
      coverImage: "https://img.wattpad.com/cover/261316381-288-k546095.jpg",
      fandom: "Original Work",
      title: "Thread of Gold",
      author: "JKMacLaren",
      status: "Finished",
      tags: [],
      synopsis:
        "Annalise Cidarius wants to take back the throne. It belongs to her: she comes from a long line of magical Nightweavers who ruled Winterlynn up until the day that her family was brutally murdered. A rebellion led by another magical group, the Dayweavers, usurped the throne and forced Anna to go into hiding...until now. Anna wants the throne back and has a plan to take it. Everything she needs is hidden inside the castle walls. But once inside, Anna realizes she has not accounted for her newfound feelings for the charming and handsome Dayweaver king, Ryne Delafort. Will Anna's greatest enemy also become her greatest love?.",
      chapterCount: 38,
      datePublished: "2022-11-04",
      dateUpdated: "2022-11-04",
      wordCount: 626314,
    },
    {
      id: "14151604",
      coverImage: "https://www.fanfiction.net/image/6926544/75/",
      fandom: "A Song of Ice and Fire",
      title: "The Eye of The Storm",
      author: "babalala",
      status: "Ongoing",
      tags: [
        "Fantasy",
        "Angst",
        "Rhaenyra Targaryen/Daemon Targaryen",
        "Lucerys Velaryon/Rhaena of Pentos",
      ],
      synopsis:
        "Lucerys Velaryon barely makes it out alive from Storm's End, but his survival has unleashed a ripple of consequences that will change the face of this war forever. Rhaenyra Targaryen will no longer be cowed. She will be crowned.",
      chapterCount: 4,
      datePublished: "2022-06-10",
      dateUpdated: "2022-12-09",
      wordCount: 8671,
    },
  ];

  return (
    <div className="stories">
      {stories.map((story) => (
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
              <span>Last Updated on {formatDate(story.dateUpdated)}</span>
              <span>{story.wordCount.toLocaleString("en-US")} Words</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Stories;
