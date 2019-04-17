export const API = `https://prison-skills.herokuapp.com`

export const TOKEN = localStorage.getItem(`token`)

export const USER = localStorage.getItem(`username`)

export const AUTH = { headers: { authorization: TOKEN } }

export const OWNER = !USER

export const GUEST = !TOKEN
