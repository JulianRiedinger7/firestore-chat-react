import { useEffect, useRef, useState } from 'react';
import './bootstrap.min.css';
import {
	setDoc,
	collection,
	addDoc,
	onSnapshot,
	query,
	orderBy,
} from 'firebase/firestore';
import { db } from './firebase/firebase';

function App() {
	const inputRef = useRef();
	const [mensajes, setMensajes] = useState([]);

	const ref = collection(db, 'mensajes');

	const handleSubmit = (evt) => {
		evt.preventDefault();

		addDoc(ref, { mensaje: inputRef.current.value, fecha: Date.now() });
		inputRef.current.value = '';
	};

	useEffect(() => {
		/* const arrayMensajes = []; */

		const q = query(ref, orderBy('fecha'));

		onSnapshot(q, (snapshot) => {
			/* snapshot.docs.forEach((doc) => arrayMensajes.push(doc.data())); */
			const data = snapshot.docs.map((doc) => ({
				...doc.data(),
			}));
			setMensajes(data);
			//setMensajes(arrayMensajes);
		});
	}, []);

	return (
		<main
			className="bg-dark"
			style={{
				minHeight: '100vh',
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
				flexDirection: 'column',
			}}
		>
			<ul className="list-group mb-5">
				{mensajes.map((mensaje, i) => (
					<li key={i} className="list-group-item">
						{mensaje.mensaje}
					</li>
				))}
			</ul>
			<form onSubmit={handleSubmit}>
				<div className="mb-3">
					<label htmlFor="exampleInputEmail1" className="form-label">
						Mensaje
					</label>
					<input
						type="text"
						className="form-control"
						id="exampleInputEmail1"
						aria-describedby="emailHelp"
						placeholder="Mensaje..."
						ref={inputRef}
					/>
				</div>
				<button type="submit" className="btn btn-primary">
					Agregar
				</button>
			</form>
		</main>
	);
}

export default App;
