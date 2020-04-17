import { h } from 'preact';
import { useEffect, useState } from 'preact/hooks';
import './style';

const Bucks = (props) => (
	<div class="widget">
		<h1>Dol&aacute;r</h1>
		<hr />
		<h2>Precio Actual: <i class="current-value">{props.usd.promedio} Bs</i></h2>
		<hr />
		<div class="other">
			<h3>Precio en efectivo: <i>{props.usd.efectivo} Bs</i></h3>
			<hr />
			<h3>Precio en transfer: <i>{props.usd.transferencia} Bs</i></h3>
		</div>
	</div>
);

const Pavos = (props) => (
	<div class="widget" style="--currency-bg: midnightblue">
		<h1>Euro</h1>
		<hr />
		<h2>Precio Actual: <i class="current-value">{props.eur.promedio} Bs</i></h2>
		<hr />
		<div class="other">
			<h3>Precio en efectivo: <i>{props.eur.efectivo} Bs</i></h3>
			<hr />
			<h3>Precio en transfer: <i>{props.eur.transferencia} Bs</i></h3>
		</div>
	</div>
);

const Peso = (props) => (
	<div class="widget" style="--currency-bg: goldenrod">
		<h1>Dol&aacute;r Colombia</h1>
		<hr />
		<h2>Dolar en Colombia: <i class="current-value">{props.cop.rate} COP</i></h2>
		<div class="other">
			<h3>Precio en efectivo: <i>{props.cop.ratecash} COP</i></h3>
			<hr />
			<h3>Precio en transfer: <i>{props.cop.ratetrm} COP</i></h3>
		</div>
	</div>
);

const App = () => {
	const [dollar, setDollar] = useState({});
	const [euro, setEuro] = useState({});
	const [peso, setPeso] = useState({});
	const [date, setDate] = useState({});
	useEffect(() => {
		fetch('https://s3.amazonaws.com/dolartoday/data.json')
			.then(response => response.json())
			.then(data => {
				setDollar(data.USD);
				setEuro(data.EUR);
				setPeso(data.USDCOL);
				setDate(data._timestamp);
			});
	}, []);
	return (
		<div class="home">
			<h1 class="title">DolarsApp</h1>
			<div class="presentation">
				<h1>¡Bienvenido!</h1>
				<h1>los estimados de hoy son ... </h1>
			</div>
			<div class="currencies">
				<Bucks usd={dollar} />
				<Pavos eur={euro} />
				<Peso cop={peso} />
			</div>
			<p> Actualizado hasta el <b><i>{date.fecha}</i></b></p>
			<p>Agradecimientos a <b>DolarToday</b> por la informaci&oacute;n </p>
		</div>
	);
};

export default App;
