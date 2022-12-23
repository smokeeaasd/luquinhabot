class TimeUtils {
	static formatMS = (remaining, useHours = false) => {
		let seconds = Math.ceil(remaining / 1000) % 60;
		let minutes = Number.parseInt(remaining / 1000 / 60) % 60;
		let hours = Number.parseInt(remaining / 1000 / 60 / 60);

		seconds = (seconds <= 9) ? `0${seconds}` : `${seconds}`;
		minutes = (minutes <= 9) ? `0${minutes}` : `${minutes}`;
		hours = (hours <= 9) ? `0${hours}` : `${hours}`;

		return (useHours) ? `${hours}h ${minutes}m ${seconds}s` : `${minutes}m ${seconds}s`;
	}
}

/*let i = 1;
setInterval(() => {
	console.log(TimeUtils.formatMS(86400000 - i*100000, true))

	i++;
}, 50);
*/

module.exports = { TimeUtils }