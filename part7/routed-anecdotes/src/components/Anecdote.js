import React from "react";
import {BrowserRouter as Router, Switch, Link, Route} from 'react-router-dom';

const Anecdote = ({anecdote}) => (
    <div>
        <p>{anecdote.content}</p>
        <p>{anecdote.author}</p>
        <p>{anecdote.info}</p>
    </div>
)

export default Anecdote