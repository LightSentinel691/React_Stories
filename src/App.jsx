import React, { useState } from "react";

function App() {
  const list = [
    {
      title: "React",
      url: "https://reactjs.org/",
      author: "Jordan Walke",
      num_comments: 3,
      points: 4,
      objectID: 0,
    },
    {
      title: "Redux",
      url: "https://redux.js.org/",
      author: "Dan Abramov, Andrew Clark",
      num_comments: 2,
      points: 5,
      objectID: 1,
    },
    {
      title: "Vue.js",
      url: "https://vuejs.org/",
      author: "Evan You",
      num_comments: 3,
      points: 8,
      objectID: 3,
    },
    {
      title: "Angular",
      url: "https://angular.io/",
      author: "Google",
      num_comments: 6,
      points: 9,
      objectID: 4,
    },
    {
      title: "Svelte",
      url: "https://svelte.dev/",
      author: "Rich Harris",
      num_comments: 4,
      points: 7,
      objectID: 5,
    },
    {
      title: "Next.js",
      url: "https://nextjs.org/",
      author: "Vercel",
      num_comments: 5,
      points: 10,
      objectID: 6,
    },
  ];

  const [stories, setStories] = useState(list);
  const [search, setSearch] = useState("")

  const filterResults = (event) => {
    setSearch(event.target.value);
    setStories(
      list.filter(
        (story) => story.title.toLowerCase().includes(event.target.value.toLowerCase())
      )
    );
  };

  return (
    <div>
      <Search result={filterResults} search={search} />
      <List list={stories} />
    </div>
  );
}

export default App;

const List = ({ list }) => {
  return (
    <ul>
      {list.map((item) => {
        const { objectID, ...story } = item;
        return <Item key={objectID} story={story} />;
      })}
    </ul>
  );
};

const Item = ({ story }) => {
  return (
    <li>
      <span>
        <a href={story.url}>{story.title}</a>
      </span>{" "}
      &nbsp;&nbsp;
      <span>{story.author}</span> &nbsp;&nbsp;
      <span>{story.num_comments}</span> &nbsp;&nbsp;
      <span>{story.points}</span>
    </li>
  );
};

const Search = ({ result, search }) => {
  return (
    <div>
      <label htmlFor="search">Search: </label>
      <input
        type="text"
        id="search"
        value={search}
        onChange={(e) => {
          result(e);
        }}
        placeholder="Search based on Title"
      />
    </div>
  );
};
