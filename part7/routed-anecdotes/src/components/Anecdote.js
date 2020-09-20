import React from "react";

const Anecdote = ({anecdote}) => (
    <div>
        <p>{anecdote.content}</p>
        <p>{anecdote.author}</p>
        <p>{anecdote.info}</p>
    </div>
)

export default Anecdote