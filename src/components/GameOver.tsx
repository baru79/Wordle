import confetti from 'canvas-confetti'
import { TGuess, TLetter } from '../types'
import { FC } from 'react'

interface Props {
	guesses: TGuess[]
	solution: TLetter[5]
	restart: () => Promise<void>
}

export const GameOver: FC<Props> = ({ guesses, solution, restart }) => {
	const isGameStarted = guesses.some(guessItem => guessItem?.guess != null)
	const isGameOver = guesses.every(guessItem => guessItem?.guess != null)
	const isWinner = guesses.some(guessItem => guessItem?.guess === solution)
	let res = ''
	if (isGameOver && !isWinner) {
		res = `😢 You Lost, the solution was ${solution}`
	}
	if (isWinner) {
		res = '😉 You Win!'
		confetti()?.catch(err => console.log(err))
	}
	return (
		<div className='gameOver'>
			{res}
			{isGameStarted && (
				<button className='buttonRestart' onClick={restart}>
					Restart game
				</button>
			)}
		</div>
	)
}
