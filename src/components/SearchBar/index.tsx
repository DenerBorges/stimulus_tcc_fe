import React, { FormEvent, useState } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import { useNavigate } from "react-router-dom";

import "./styles.css";

const SearchBar: React.FC = () => {
  const [query, setQuery] = useState("");

  const navigate = useNavigate();

  const handleSearch = (e: FormEvent) => {
    e.preventDefault();
    navigate(`/search?query=${query}`);
  };

  return (
    <form className="d-flex mx-auto" role="search" onSubmit={handleSearch}>
      <div className="searchIcon input-group">
        <input
          className="pesquisa form-control rounded-end text-light me-2"
          type="search"
          placeholder="Encontre projetos"
          aria-label="Search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button
          className="btn btn-outline-info rounded fw-medium"
          type="submit"
        >
          Pesquisar
        </button>
        <MagnifyingGlassIcon />
      </div>
    </form>
  );
};

export default SearchBar;
