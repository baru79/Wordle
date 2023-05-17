import { useBoard } from '../hooks/useBoard'
import { TGuess } from '../types.d'
import { GameOver } from './GameOver'
import { Line } from './Line'

export function Board() {
	const { guesses, currentGuess, solution, restart } = useBoard()
	return (
		<div className='board'>
			<div className='title'>Wordle</div>
			<div className='grid'>
				{guesses.map((guessItem: TGuess, index: number) => {
					const firstNullIndexGuess = guesses.findIndex(val => val == null)
					const isCurrentGuess = index === firstNullIndexGuess
					const isGuessFinished = guessItem?.finish ?? false
					const isGameOver = guesses.every(
						guessItem => guessItem?.guess != null
					)
					const isWinner = guesses.some(
						guessItem => guessItem?.guess === solution
					)
					return (
						<Line
							key={index}
							guess={isCurrentGuess ? currentGuess : guessItem?.guess ?? ''}
							isGuessFinished={isGuessFinished}
							isCurrentGuess={isCurrentGuess}
							solution={solution}
							isGameOver={isGameOver}
							isWinner={isWinner}
						/>
					)
				})}
				<GameOver guesses={guesses} solution={solution} restart={restart} />
			</div>
		</div>
	)
}
