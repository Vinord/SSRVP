import React, { useState, useCallback } from "react";
export const LoginForm=()=>{
    const[login,setLogin]=useState("");
    const[password ,setPassword]=useState("");

    const onSubmit = useCallback((event) =>{
        event.preventDefault();
        alert(`Login: ${login}  password: ${password}`);
    });
    return(
        <form onSubmit={onSubmit}>
            <laber htmlFor="login">Login</laber>
            <input
            onChange={(event)=>setLogin(event.target.value)}
            value={login}
            id="login"
            name="login"
            type="text"
            />
            <label htmlFor="password">Password</label>
            <input
            onChange={(event)=>setPassword(event.target.value)}
            value={password}
            id="password"
            name="password"
            type="password"
            />
            <button type="submit">login in</button>
            </form>
    );
};