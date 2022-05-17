import React, { useState } from "react";
import "./Search.css";
import { Typography, Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import User from "../User/User";
import { getAllUsers } from "../../Actions/User";
const Search = () => {
  const [name, setName] = useState("");
  const { users, loading } = useSelector((state) => state.allUsers);
  const dispatch = useDispatch();
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(getAllUsers(name));
  };

  return (
    <div className="search">
      <form className="searchForm" onSubmit={submitHandler}>
        <Typography variant="h3" style={{ padding: "2vmax" }}>
          SocioBook
        </Typography>

        <input
          type="text"
          value={name}
          placeholder="Name"
          required
          onChange={(e) => setName(e.target.value)}
        />

        <Button disabled={loading} type="submit">
          Search
        </Button>
        <div className="searchResults">
          {users &&
            users.map((user) => {
              return (
                <User
                  key={user._id}
                  userId={user._id}
                  name={user.name}
                  avatar={user.avatar.url}
                />
              );
            })}
        </div>
      </form>
    </div>
  );
};

export default Search;
