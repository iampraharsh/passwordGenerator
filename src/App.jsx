import { useState } from 'react';
import './App.css';
import { useCallback } from 'react';
import { useEffect } from 'react';
import { useRef } from 'react';

const App = () => {
	const [length, setLength] = useState(8);
	const [numberAllowed, setNumberAllowed] = useState(false);
	const [charAllowed, setCharAllowed] = useState(false);
	const [password, setPassword] = useState('');

	const refPassword = useRef(null);

	const passwordGenerator = useCallback(() => {
		let pass = '';
		let str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';

		if (numberAllowed) {
			str += '0123456789';
		}
		if (charAllowed) {
			str += ".,!?;:'-()[]{}...+−×÷=<>≠%π√∞$€£¥¢@#&*_-±©®§°→←";
		}

		for (let i = 1; i <= length; i++) {
			let char = Math.floor(Math.random() * str.length + 1); // array ki index value aai hai
			pass += str.charAt(char);
		}

		setPassword(pass);
	}, [length, numberAllowed, charAllowed, setPassword]);

	const copyPasswordToClipboard = useCallback(() => {
		refPassword.current?.select();
		window.navigator.clipboard.writeText(password);
		// document.execCommand('copy');
	}, [password]);

	useEffect(() => {
		passwordGenerator();
	}, [length, numberAllowed, charAllowed, passwordGenerator]);
	return (
		<div>
			<h1 className='text-4xl text-center text-white'>
				Password Generator
			</h1>

			<div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-8 my-8 text-rose-500 bg-gray-800'>
				<div className='flex shadow rounded-lg overflow-hidden mb-4'>
					{/* test */}
					<input
						type='text'
						value={password}
						className='outline-none w-full py-1 px-3'
						placeholder='password'
						readOnly
						ref={refPassword}
					/>
					<button
						onClick={copyPasswordToClipboard}
						className='outline-none bg-fuchsia-500 text-white px-4 py-3 shrink-0'
					>
						Copy
					</button>
				</div>

				<div className='flex text-sm gap-x-2'>
					<div className='flex items-center gap-x-1'>
						<input
							type='range'
							min={6}
							max={100}
							value={length}
							onChange={(e) => setLength(e.target.value)}
							className='cursor-pointer'
						/>
						<label>Length: {length}</label>
					</div>

					<div className='flex items-center gap-x-1'>
						<input
							type='checkbox'
							defaultChecked={numberAllowed}
							id='numberInput'
							onChange={() => {
								setNumberAllowed((prev) => !prev);
							}}
						/>

						<label htmlFor='numberInput'>Number</label>
					</div>

					<div className='flex items-center gap-x-1'>
						<input
							type='checkbox'
							defaultChecked={charAllowed}
							id='characterInput'
							onChange={() => {
								setCharAllowed((prev) => !prev);
							}}
						/>

						<label htmlFor='characterInput'>Character</label>
					</div>
				</div>
			</div>
		</div>
	);
};

export default App;
