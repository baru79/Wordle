import { API_URL } from './constants'

export const getRandomWord = async () => {
	const res = await fetch(API_URL)
	const words = await res.json()
	const randomWord = words[Math.floor(Math.random() * words.length)]
	return randomWord
}
