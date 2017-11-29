'use strict';

var testArray = function testArray(t, actual, expected, msg) {
	t.deepEqual(actual, expected, msg);
	t.equal(actual.length, expected.length, 'expected ' + expected.length + ', got ' + actual.length);
};

module.exports = function (flatten, t) {
	t.test('flattens', function (st) {
		testArray(t, flatten([1, [2], [[3]], [[['four']]]]), [1, 2, [3], [['four']]], 'missing depth only flattens 1 deep');

		testArray(t, flatten([1, [2], [[3]], [[['four']]]], 1), [1, 2, [3], [['four']]], 'depth of 1 only flattens 1 deep');
		t.notDeepEqual(flatten([1, [2], [[3]], [[['four']]]], 1), [1, 2, 3, ['four']], 'depth of 1 only flattens 1 deep: sanity check');

		testArray(t, flatten([1, [2], [[3]], [[['four']]]], 2), [1, 2, 3, ['four']], 'depth of 2 only flattens 2 deep');
		t.notDeepEqual(flatten([1, [2], [[3]], [[['four']]]], 2), [1, 2, 3, 'four'], 'depth of 2 only flattens 2 deep: sanity check');

		testArray(t, flatten([1, [2], [[3]], [[['four']]]], 3), [1, 2, 3, 'four'], 'depth of 3 only flattens 3 deep');
		testArray(t, flatten([1, [2], [[3]], [[['four']]]], Infinity), [1, 2, 3, 'four'], 'depth of Infinity flattens all the way');

		st.end();
	});

	t.test('sparse arrays', function (st) {
		// eslint-disable-next-line no-sparse-arrays
		st.deepEqual(flatten([, [1]]), flatten([[], [1]]), 'an array hole is treated the same as an empty array');

		st.end();
	});
};
