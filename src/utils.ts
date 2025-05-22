// Format the date to a string
function formatDate(date: Date) {
	return new Intl.DateTimeFormat('en-IN', { dateStyle: "long" }).format(date);
}

// Capitalize the first letter
function capitalize(str: string): string {
	if (typeof str !== 'string' || str.length === 0) {
		return str;
	}
	return str.charAt(0).toUpperCase() + str.slice(1);
}

/**
 * 
 * @param {string} time accepts time in utc format 
 * @returns time in human relatable format (string)
 * example: 10 seconds ago ,2 minutes ago and 22 hours ago !
 */

function convertTimeToHumanRelatable(time: Date): string {
	let diff = Math.floor(Date.now() / 1000) - Math.floor(new Date(time).getTime() / 1000)
	if (diff < 60) {
		return `${diff} seconds ago`
	} else if (diff < 3600) {
		let timeMinutes = Math.floor(diff / 60);
		return `${timeMinutes} minutes ago`;
	} else if (diff < (60 * 60 * 24)) {
		let timeHours = Math.floor(diff / (60 * 60));
		return `${timeHours} hours ago`;
	} else {
		return formatDate(new Date(time));
	}
}


// function CalculateReadTime(body) {
// 	let wordsCount = 0;
// 	body.map((node) => {
// 		node.children.map((child) => {
// 			let words = child.text.split(' ');
// 			wordsCount += words.length;
// 		})
// 	});
// 	return Math.ceil(wordsCount / 150);
// }

export { formatDate, capitalize, convertTimeToHumanRelatable };
