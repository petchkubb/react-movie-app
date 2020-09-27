import React, { useState, useEffect } from "react"
import Movie from "./components/Movie"

const FEATURED_API =
  "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=b9da9307ba2bdb6d6fb89d0be4027ee7&page=1"

const SEARCH_API =
  "https://api.themoviedb.org/3/search/movie?api_key=b9da9307ba2bdb6d6fb89d0be4027ee7&query="

function App() {
  const [movies, setMovies] = useState([])
  const [searchTerm, setSearchTerm] = useState("")

  useEffect(() => {
    getMovies(FEATURED_API)
  }, [])

  const getMovies = (API) => {
    fetch(API)
      .then((res) => res.json())
      .then((data) => setMovies(data.results))
  }

  const handleOnChange = (e) => {
    setSearchTerm(e.target.value)
  }

  const handleOnSubmit = (e) => {
    e.preventDefault()
    if (searchTerm) {
      getMovies(SEARCH_API + searchTerm)
      setSearchTerm("")
    }
  }
  return (
    <>
      <header>
        <form onSubmit={handleOnSubmit}>
          <input
            className="search"
            type="search"
            placeholder="Search..."
            value={searchTerm}
            onChange={handleOnChange}
          />
        </form>
      </header>
      <div className="movie-container">
        {movies.length > 0 &&
          movies.map((movie) => <Movie key={movie.id} {...movie} />)}
      </div>
    </>
  )
}

export default App
