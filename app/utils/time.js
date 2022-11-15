class TimeUtils {
	static formatMS = (remaining) => {
		let seconds = Math.ceil(remaining / 1000) % 60;
		let minutes = Number.parseInt(remaining / 1000 / 60);

		seconds = (seconds <= 9) ? `0${seconds}` : `${seconds}`;
		minutes = (minutes <= 9) ? `0${minutes}` : `${minutes}`;

		return `${minutes}m ${seconds}s`;
	}
}

module.exports = { TimeUtils }