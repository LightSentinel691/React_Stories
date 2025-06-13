import React, { createContext, useContext, useState, useEffect, useReducer, useCallback } from "react";

const storiesContext = createContext();

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
      objectID: 2,
    },
    {
      title: "Angular",
      url: "https://angular.io/",
      author: "Google",
      num_comments: 6,
      points: 9,
      objectID: 3,
    },
    {
      title: "Svelte",
      url: "https://svelte.dev/",
      author: "Rich Harris",
      num_comments: 4,
      points: 7,
      objectID: 4,
    },
    {
      title: "Next.js",
      url: "https://nextjs.org/",
      author: "Vercel",
      num_comments: 5,
      points: 10,
      objectID: 5,
    },
  ];

  //We create our reducer function
  const storiesReducer = (state, action) => {
    switch (action.type) {
      case 'SET_STORIES':
        return action.payload;
      case 'REMOVE_ITEM':
        return (
          state.filter((listing) => action.payload !== listing.objectID)
        )
    }
  }


  const [stories, dispatchStories] = useReducer(storiesReducer, list);
  const [search, setSearch] = useState("");
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("")
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    getAsyncData()
    .then((result) => {
      dispatchStories({
        type: 'SET_STORIES',
        payload: result.data.Stories,
      })
      setIsLoading(false);
    })
    .catch((error) => {
      setIsError(true);
      setErrorMessage(error.message ?? 'Sorry, encountered an error, reload to try again');
      setIsLoading(false);
    })
  }, [])
  


  

  const filterResults = () => {
     return stories.filter((story) => (
      story.title.toLowerCase().includes(search.toLowerCase())
    ))
  };

  const handleSearch = useCallback((event) => {
    setSearch(event.target.value);
  }, [])


  const handleRemoveListing = useCallback((item) => {
    dispatchStories({
      type:'REMOVE_ITEM',
      payload: item.objectID
    })
  },[dispatchStories])


  //Simulate an Asynchronous request
  const getAsyncData = () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({data: {Stories: stories}});
      }, 2000);
    });
  }

  return (
    <div>
      <Search  search={handleSearch} searchTerm={search} />
      {isError && <p>{errorMessage}</p>}
      {isError ? <p>Error Occured: Reload to Try again</p> : isLoading? <p>Loading ...</p>: <storiesContext.Provider value={{filterResults, handleRemoveListing}}>
         <List />
      </storiesContext.Provider>}
    </div>
  );
}

export default App;

const List = () => {
  const {filterResults, handleRemoveListing} = useContext(storiesContext);
  const result = filterResults();
  return (
    <ul>
      {result.map((item) => {
        return <Item key={item.objectID} story={item} handleDelete={handleRemoveListing}/>;
      })}
    </ul>
  );
};

const Item = ({ story, handleDelete }) => {
  return (
    <li>
      <span>
        <a href={story.url}>{story.title}</a>
      </span>{" "}
      &nbsp;&nbsp;
      <span>{story.author}</span> &nbsp;&nbsp;
      <span>{story.num_comments}</span> &nbsp;&nbsp;
      <span>{story.points}</span>&nbsp;&nbsp;
      <span><button onClick={() => handleDelete(story)}>Delete</button></span>
    </li>
  );
};

const Search = ({ search, searchTerm }) => {
  return (
    <div>
      <label htmlFor="search">Search: </label>
      <input
        type="text"
        id="search"
        value={searchTerm}
        onChange={(e) => {
          search(e);
        }}
        placeholder="Search based on Title"
      />
    </div>
  );
};
