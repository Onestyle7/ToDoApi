import { ApiProvider } from "@reduxjs/toolkit/query/react";
import axios from "axios";

const API_URL = "http://localhost:5287"

export const login = async(email: string, password: string) =>{
    const response = await axios.post(`${API_URL}/api/Auth/login`, {email, password});
    return response.data;
};

export const register = async(email: string, password: string) =>{
    const response = await axios.post(`${API_URL}/api/Auth/register`, {email, password});
    return response.data;
}