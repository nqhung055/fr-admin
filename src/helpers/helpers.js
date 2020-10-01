/**
 * Helpers Functions
 */
import moment from 'moment';
// import lodash from 'lodash'

// Get Date
export function getTheDate(timestamp, format) {
	let time = timestamp * 1000;
	let formatDate = format ? format : 'MM-DD-YYYY';
	return moment(time).format(formatDate);
}

// Convert Date To Timestamp
export function convertDateToTimeStamp(date, format) {
	let formatDate = format ? format : 'YYYY-MM-DD';
	return moment(date, formatDate).unix();
}

/**
 * Text Truncate
 */
export function textTruncate(str, length, ending) {
	if (length == null) {
		length = 100;
	}
	if (ending == null) {
		ending = '...';
	}
	if (str.length > length) {
		return str.substring(0, length - ending.length) + ending;
	} else {
		return str;
	}
}

/**
 * Function to convert hex to rgba
 */
export function hexToRgbA(hex, alpha) {
	var c;
	if (/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)) {
		c = hex.substring(1).split('');
		if (c.length === 3) {
			c = [c[0], c[0], c[1], c[1], c[2], c[2]];
		}
		c = '0x' + c.join('');
		return 'rgba(' + [(c >> 16) & 255, (c >> 8) & 255, c & 255].join(',') + ',' + alpha + ')';
	}
	throw new Error('Bad Hex');
}

/**
 * Function to return current app layout
 */
export function getCurrentAppLayout(router) {
	let location = router.history.current.fullPath;
	let path = location.split("/")
	return path[1];
}

/**
 * Functions to data progressing
 */
export function groupByKey(arr, key) {
	const result = {};
	Object.values(arr).forEach(element => {
		// console.log('Elm: ' + element);
		if (element.length >= 1)
			element.forEach((item) => {
			// console.log('Item: ' + item);
				if (!result[item[key]]) result[item[key]] = [];
				result[item[key]].push(item);
			});
		else {
			// console.log('Elm[key]: ' + element[key]);
			if (!result[element[key]]) result[element[key]] = [];
			result[element[key]].push(element);
		}
	});
	return result;
}

export function countGroupedByKey(arr, key) {
	var i = 0;
	arr.forEach((elm) => {
		if (String(elm.type).toLowerCase() === key) i++;
	});
	return i;
}

export function groupByTime(array, fn) {
	let result = {};
	array.forEach((item) => {
		let key = fn(item);
		if (!result[key]) result[key] = [];
		result[key].push(item);
	});
	return sortTimeASC(result);
}

export function groupByDateTime(array, fn) {
	let result = {};
	array.forEach((item) => {
		let key = fn(item);
		if (!result[key]) result[key] = [];
		result[key].push(item);
	});	
	return sortTimeASC(result);
}

export function groupByDate(array, fn) {
	let result = {};
	array.forEach((item) => {
		let key = fn(item);
		if (!result[key]) result[key] = [];
		result[key].push(item);
	});
	return sortTimeASC(result);
}

export function groupByYears(array, fn) {
	let result = {};
	// console.log('Array: ' + array+ ' - Year: ' + fn + ' - : ' + fn1);
	array.forEach((item) => {
		let key = fn(item);
		if (!result[key]) result[key] = [];
		result[key].push(item);
	});

	// let group = array.reduce((r, a) => {
	// 	console.log("a", a);
	// 	console.log('r', r);
	// 	r[new Date(a.date).getMonth()] = [...r[new Date(a.date).getMonth()] || [], a];
	// 	return r;
	// }, {});
	// console.log("group", group);
	// console.log(lodash.groupBy(array, 'date'));
	return sortTimeASC(result)
}

function sortTimeASC(rst) {
	Object.values(rst).forEach((el) => {		
		el.sort(function (a, b) {
			return a.date.getTime() - b.date.getTime();
		});
	});
	return rst;
}

export function sortDateArrayASC(rst) {
	rst.sort((a, b) => {
		return new Date(a) - new Date(b);
	});
	return rst;
}

export function sortHourASC(rst) {
	// var arrHour = [];
	// Object.values(rst).forEach(elm => {
	// 	console.log('hour: ' + String(elm.hour).split(', ')[1] + ' - data: ' + elm.data);
	// });
	rst.sort((a, b) => {
		// console.log(new Date(String(a.hour).split(', ')[1] + " " + String(a.hour).split(', ')[0]) + ' - ' + new Date(String(b.hour).split(', ')[1] + " " + String(b.hour).split(', ')[0]));
		// return new Date(String(a.hour).split(', ')[1] + " " + String(a.hour).split(', ')[0]) - new Date(String(b.hour).split(', ')[1] + " " + String(b.hour).split(', ')[0]);
		return new Date(String(a.hour).split(', ')[1]).getTime() - new Date(String(b.hour).split(', ')[1]).getTime()
	});
	return rst;
}

export function sortDateASC(rst) {
	rst.sort((a, b) => {
		return new Date(a.date) - new Date(b.date);
	});
	return rst;
}

export function sortMonthASC(rst) {
	rst.sort((a, b) => {
		return new Date(a.month).getMonth() - new Date(b.month).getMonth();
	});
	return rst;
}

export function sortYearASC(rst) {
	rst.sort((a, b) => {
		return a.y - b.y;
	});
	return rst;
}

export function reStructuredObject(obj) {
	let result = [];
	for (let [key, item] of Object.entries(obj)) {
		// console.log('length: ' + item.length);
		if (item.length >= 0) {
			Object.values(item).forEach(element => {
				result.push({
					id: key,
					date: new Date(element.detectionTime),
					bodyTemp: Number(element.bodyTemperature),
					roomTemp: Number(element.roomTemperature),
					type: String(element.type),
				});
			});
		} else
			result.push({
				id: key,
				date: new Date(item.detectionTime),
				bodyTemp: Number(item.bodyTemperature),
				roomTemp: Number(item.roomTemperature),
				type: String(item.type),
			});
	}
	return result;
}

export function reStructuredObj(obj) {
	let result = [];
	Object.values(obj).forEach(element => {
		result.push({
			id: element.id,
			deviceId: String(element.fromDevice),
			date: new Date(element.detectionTime),
			bodyTemp: Number(element.bodyTemperature),
			roomTemp: Number(element.roomTemperature),
			type: String(element.type),
		});
	});
	// console.log(result.length);
	return result;
}

export function sumValues(arr, key) {
	var total = 0;
	arr.forEach((e) => {
		total += e[key];
	});
	return total;
}
/**
 * End Functions
 */