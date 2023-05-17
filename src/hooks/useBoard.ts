import { useEffect, useState } from 'react'
import { TGuess, TLetter } from '../types'
import { getRandomWord } from '../utils/service'

export function useBoard() {
	const [solution, setSolution] = useState<TLetter[5]>('')
	const [guesses, setGuesses] = useState<TGuess[]>(Array(6).fill(null))
	const [currentGuess, setCurrentGuess] = useState<TLetter[5]>('')

	const getWord = async () => await getRandomWord()

	useEffect(() => {
		getWord()
			.then(res => setSolution(res))
			.catch(err => console.log(err))
	}, [])

	useEffect(() => {
		const onKeydown = (event: KeyboardEvent) => {
			const key = event.key
			const isLetter = key.match(/[a-zA-Z]/) != null

			if (isLetter && key !== 'Enter') {
				const newStr = currentGuess.concat(key).toUpperCase()
				setCurrentGuess(newStr)
			}
			if (key === 'Backspace') {
				setCurrentGuess(currentGuess.slice(0, -1))
				return
			}
			if (key === 'Enter' && currentGuess.length >= 5) {
				const newGuesses = [...guesses]
				const firstNullIndexGuess = guesses.findIndex(val => val == null)
				newGuesses[firstNullIndexGuess] = {
					guess: currentGuess.slice(0, 5),
					finish: true,
				}
				setGuesses(newGuesses)
				setCurrentGuess('')
			}
		}
		window.addEventListener('keydown', onKeydown)

		return () => {
			window.removeEventListener('keydown', onKeydown)
		}
	}, [solution, guesses, currentGuess])

	const restart = async () => {
		setGuesses(Array(6).fill(null))
		setCurrentGuess('')
		const randomWord = await getRandomWord()
		setSolution(randomWord)
	}

	return { guesses, currentGuess, solution, restart }
}
