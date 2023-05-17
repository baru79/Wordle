import { FC } from 'react'
import { TLetter } from '../types'
import { GUESS_LENGHT } from '../utils/constants'

interface Props {
	guess: TLetter[5]
	isGuessFinished: boolean
	isCurrentGuess: boolean
	solution: TLetter[5]
	isGameOver: boolean
	isWinner: boolean
}

export const Line: FC<Props> = ({
	guess,
	isGuessFinished,
	isCurrentGuess,
	solution,
	isGameOver,
	isWinner,
}) => {
	const arrGuess = guess === '' ? Array(5).fill('') : Array(5).fill(guess)
	const tiles = arrGuess.map((g, index) => {
		let className = 'tile'
		if (g[index] !== '' && isGuessFinished) {
			if (solution[index] === g[index]) {
				className += ' correct'
			} else if (solution.includes(g[index])) {
				className += ' close'
			} else {
				className += ' wrong'
			}
		} else {
			className += ' blank'
		}
		return (
			<div className={className} key={index}>
				{guess[index]}
			</div>
		)
	})
	const displayLabel =
		guess.length >= GUESS_LENGHT ? 'Press Enter' : 'Type a word'
	return (
		<div className='line'>
			{isCurrentGuess && !isGameOver && !isWinner ? (
				<>
					{tiles} <div className='currentGuess'>{`<-- ${displayLabel}`}</div>
				</>
			) : (
				tiles
			)}
		</div>
	)
}
