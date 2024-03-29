var selected_deck_position = null;
var selected_deck = null;
var current_flash_cards_array = [];
var random_index = null
var correctly_answered_questions = null;
var interval_set = null;
var TIME = 0;
var ONE, TWO, RES;
var length, range, range_start = null;
var current_flash_cards_array = [];
var main_array = [];

jQuery(document).ready(reset);


function startGame() { //Starting Game
	// fill current flash cards index bucket
	range = jQuery('#range').val()
	range_start = jQuery('#range_start').val()
	length = jQuery('#length').val()

	if (Number(range) < Number(range_start)) {
		window.alert('Please Enter Vaild Range')
	} else if (range < 0 || range > 999 || range_start < 1 || range_start > 999) {
		window.alert('Please Enter Vaild Range Between 0 and 999')		
	} else {

		jQuery('#game-settings').hide();
		jQuery('#flash-card').show();
	
		// show a greeting to the user
		var user_name = jQuery('#username').val()
		jQuery('#user-greeting').html('<span id="user-heading">Hello <span id="username-text">' + user_name).show();
	
		// set the selected deck.
		selected_deck_position = jQuery('[name="deck-option"]:checked').val(); //0,1, 2, 3
		console.log(`Deck which is selected is found at position  ${ selected_deck_position } `)
		selected_deck = decks[selected_deck_position]
		console.log(selected_deck)
		var number_array = []
		console.log(range_start + " - " + range)
		for (var i = Number(range_start); i < Number(range); i++) {
			number_array.push(i)
		}
		console.log('number', number_array)
		for (var i = 0; i < length; i++) {
			random_number_one_value = Math.random() * number_array.length
			random_number_one_index = Math.floor(random_number_one_value)
			random_number_one = number_array[random_number_one_index]
			//Number 2
			random_number_two_value = Math.random() * number_array.length
			random_number_two_index = Math.floor(random_number_two_value)
			random_number_two = number_array[random_number_two_index]
			console.log(random_number_one)
			console.log(random_number_two)
			if (selected_deck_position == '0') { //If user chose Addition Deck
				var main_sum = random_number_one + ' + ' + random_number_two
				console.log(main_sum)
				var main_answer = Number(random_number_one) + Number(random_number_two)
				console.log(main_answer)
			} else if (selected_deck_position == '1') { //If user chose Subraction Deck
				if (random_number_one < random_number_two) {
					var main_sum = random_number_two + ' - ' + random_number_one
					console.log(main_sum)
					var main_answer = Number(random_number_two) - Number(random_number_one)
					console.log(main_answer)
				} else if (random_number_one > random_number_two) {
					var main_sum = random_number_one + ' - ' + random_number_two
					console.log(main_sum)
					var main_answer = Number(random_number_one) - Number(random_number_two)
					console.log(main_answer)
				} else if (random_number_one == random_number_two) {
					var main_sum = random_number_one + ' - ' + random_number_two
					console.log(main_sum)
					var main_answer = Number(random_number_one) - Number(random_number_two)
					console.log(main_answer)
				}
			} else if (selected_deck_position == '2') { //If user chose Multiplication Deck
				var main_sum = random_number_one + ' x ' + random_number_two
				console.log(main_sum)
				var main_answer = Number(random_number_one) * Number(random_number_two)
				console.log(main_answer)
			} else if (selected_deck_position == '3') { //If user chose Division Deck
				if (random_number_one < random_number_two) {
					greater_number = random_number_one
					lesser_number = random_number_two
				} else if (random_number_one > random_number_two) {
					greater_number = random_number_two
					lesser_number = random_number_one
				}
				var number_one = lesser_number * greater_number
				main_sum = number_one + '/ ' + lesser_number
				main_answer = number_one / lesser_number
			} else if (selected_deck_position == '4') { //If user chose LCM Deck
				main_sum = random_number_one + ', ' + random_number_two
				main_answer = calculate_LCM(Number(random_number_one), Number(random_number_two));
				console.log(main_answer)
			} else if (selected_deck_position == '5') { //If user chose HCF Deck
				main_sum = random_number_one + ', ' + random_number_two
				main_answer = calculate_HCF(Number(random_number_one), Number(random_number_two));
				console.log(main_answer)
			} else if (selected_deck_position == '6') { //If user chose Exponents Deck
				random_number_two = Math.floor(Math.random() * 2) + 2
				main_sum = random_number_one + '^' + random_number_two
				console.log(random_number_two)
				main_answer = random_number_one ** random_number_two
				console.log(main_answer)
			} else if (selected_deck_position == '7') { //If user chose Square Root Deck
				var squares_till_999 = []
				for (c = 0; c < 31; c++) {
					squares_till_999.push(i + 1)
				}
				var random = Math.floor(Math.random() * range)
				random_number_one = squares_till_999[random]
				console.log(squares_till_999)
				main_answer = random_number_one
				main_sum = 'Square Root of ' + random_number_one * random_number_one
			}
			current_flash_cards_array.push({
				"question": main_sum,
				"answer": main_answer,
				"retries": 0,
				"total_time_spent": '0.00s'
			})
		}
		for (var i = 0; i < current_flash_cards_array.length; i++) {
			var item = current_flash_cards_array[i]
			main_array.push(item)
		}
		console.log('index array', current_flash_cards_array)

		jQuery('#total-questions').text(length);
		correctly_answered_questions = 0;
		jQuery('#correctly-answered-questions').text(correctly_answered_questions)
		showFlashCards()
		interval_set = setInterval(interval, 10);
	}
}

function verifyUserAnswer() { //Check Answer
	var selected_flash_card = current_flash_cards_array[random_index];
	var user_answer = jQuery('#answer').val()
	var current_time = String(selected_flash_card.total_time_spent).substr(0, Number(String(selected_flash_card.total_time_spent).length) - 2)
	var x = current_time.split('.')
	var current_one = x[0]
	var current_two = x[1]
	jQuery('#answer').val("");
	console.log(user_answer)
	console.log('verifying answer ' + selected_flash_card.answer);
	ONE = String(Number(TIME.toString().slice(0, -2)) + Number(current_one))
	TWO = String(Number(TIME.toString().slice(-2)) + Number(current_two))
	RES = ONE + "." + TWO
	console.log(
		"'" + current_time + "'",
		"'" + current_one + "'",
		"'" + current_two + "'",
		"'" + ONE + "'",
		"'" + TWO + "'",
		"'" + RES + "'"
	)
	selected_flash_card.total_time_spent = RES + "s";
	jQuery("#timer-output").text(RES);
	TIME = 0;

	if (user_answer == selected_flash_card.answer) {
		console.log('Correct Answer')
		jQuery('#correct-answer-message').show();
		jQuery('#wrong-answer-message').hide();
		jQuery('#correct-answer-message').fadeOut(2000);
		correctly_answered_questions = correctly_answered_questions + 1
		jQuery('#correctly-answered-questions').text(correctly_answered_questions)

		console.log('before delete', current_flash_cards_array);

		// deleting index from array
		console.log('random_index = ', random_index)
		current_flash_cards_array.splice(random_index, 1);
		console.log(current_flash_cards_array)

		console.log('after delete', current_flash_cards_array);

		// show tick
		showFlashCards()

	} else {
		console.log('Wrong Answer. Correct answer is ' + selected_flash_card.answer)
		jQuery('#correct-answer-message').hide();
		jQuery('#wrong-answer-message').text(`Wrong Answer. Correct answer is "${selected_flash_card.answer}"`).show();
		jQuery('#wrong-answer-message').fadeOut(2000);

		main_array[random_index].retries += 1
		console.log(main_array[random_index].retries)
		shuffle(current_flash_cards_array)

		showFlashCards();
	}
}

function showFlashCards() { //Show random questions
	console.log(`index array length ${current_flash_cards_array.length}`)
	if (current_flash_cards_array.length != 0) {
		console.log("bucket is not empty.selecting a random index ")
		var random_value = Math.random() * current_flash_cards_array.length
		random_index = Math.floor(random_value)
		var selected_flash_card = current_flash_cards_array[random_index];
		console.log('selected_flash_card = ' + selected_flash_card.question)
		jQuery('#question').text(selected_flash_card.question)
		jQuery('#question-retry-number').text(selected_flash_card.retries)
		console.log(selected_flash_card)
		jQuery('#answer').focus();
	} else {
		console.log('Game ends')
		showGameOverscreen()
	}
}

function hideAllScreens() { //Hide all screens
	jQuery('.screen').hide()
}

function showGameSettingsScreen() { //Show Settings Screen
	jQuery('#game-settings').show();
	reset
}

function createDeckOptionsForGameSetting() { //Show user Decks
	for (var i = 0; i < decks.length; i++) {
		var deck = decks[i];
		var checked_attribute = ''
		if (i == 0) {
			checked_attribute = ' checked'
		}
		jQuery('#deck-options').append(
			`<div class="form-check">
			<input class="form-check-input" type="radio"${checked_attribute} value="${i}" name="deck-option" >
			<label class="form-check-label" for="defaultCheck1">
			${deck}
			</label>
			</div>`
		);
	}
}

function showGameOverscreen() { //Show Progress Report

	jQuery('#flash-card').hide()
	jQuery('#game-over').show()
	var tbody = jQuery('#progress-report-table tbody');
	var total_retries = 0;
	var total_time = 0;
	tbody.empty();
	clearInterval(interval_set);

	for (var i = 0; i < length; i++) {
		var flash_card = main_array[i]
		tbody.append(`<tr>
			<td>${flash_card.question}</td>
			<td>${flash_card.answer}</td>
			<td>${flash_card.retries}</td>
			<td>${flash_card.total_time_spent}</td>
			</tr>`)
	}
	for (i = 0; i < length; i++) {
		var flash_card = main_array[i]
		total_retries += Number(flash_card.retries)
		var calculation_time = flash_card.total_time_spent.toString().substring(0, Number(flash_card.total_time_spent.length) - 1)
		console.log(calculation_time)
		if (calculation_time.toString().substring(0, 1) == '.') {
			total_time += Number('0' + calculation_time.toString().substring(-1))
		} else {
			total_time += Number(calculation_time)
		}
	}

	tbody.append(`
		<tr>
			<td colspan='2'>${length} Questions Chosen in Total</td>
			<td>${total_retries} Total Retries Required in Total</td>
			<td>${total_time.toFixed(2)} Seconds Required in Total</td>
		<tr>
	`)
}

function interval() { //Set Interval
	TIME = TIME + 1;
	ONE = TIME.toString().slice(0, -2);
	TWO = TIME.toString().slice(-2);
	RES = ONE + "." + TWO;
	jQuery("#timer-output").text(RES);
}

function shuffle(array) { //Shuffle and array
	var i = 0,
		j = 0,
		temp = null

	for (i = array.length - 1; i > 0; i -= 1) {
		j = Math.floor(Math.random() * (i + 1))
		temp = array[i]
		array[i] = array[j]
		array[j] = temp
	}
}

function reset() { //when the browser loads
	selected_deck_position = null;
	selected_deck = null;
	current_flash_cards_array = [];
	random_index = null
	correctly_answered_questions = null;
	interval_set = null;
	TIME = 0;
	ONE, TWO, RES;
	length, range, range_start = null;
	current_flash_cards_array = [];
	main_array = [];

	jQuery('#correct-answer-message').hide();
	jQuery('#wrong-answer-message').hide();
	hideAllScreens();
	var local_name = localStorage.getItem('flash_cards_user_name');
	console.log(local_name)
	jQuery('#username').val(local_name);
	showGameSettingsScreen();
	createDeckOptionsForGameSetting();
	jQuery('#start-game-btn').focus();

	jQuery('#end-game-btn').on('click', function () {
		hideAllScreens();
		showGameSettingsScreen()
	})

	jQuery('#redo-deck-btn').on('click', function () {
		hideAllScreens();
		startGame();
	});

	jQuery('#start-again-btn').on('click', function () {
		hideAllScreens();
		showGameSettingsScreen();
		current_flash_cards_array = [];
		main_array = [];
	})

	// listen for the users to press `Enter` key. Verify answer onces thats done.
	document.getElementById('answer').addEventListener('keydown', function (e) {
		// if answer key
		if (e.keyCode == 13) {
			verifyUserAnswer();
		}
	});

	jQuery('#start-game-btn').on('click', function () {
		startGame()

	});

	// when verify button is clicked
	jQuery('#verify-btn').on('click', function () {
		verifyUserAnswer();

	});
}

function calculate_LCM(number_1, number_2) { //Return The LCM of two numbes
	var greater_number, lesser_number = 0;
	var array_1 = [];
	var array_2 = [];
	var LCM_array = [];
	var LCM = 0;
	if (Number(number_1) > Number(number_2)) {
		greater_number = Number(number_1)
		lesser_number = Number(number_2)
	} else {
		greater_number = Number(number_2)
		lesser_number = Number(number_1)
	}
	for (var i = 0; i < greater_number; i++) {
		var calculation = Number(greater_number) / Number(i)
		var string_calculation = calculation.toString()
		if (string_calculation.includes('.', 0)) {} else {
			array_1.push(Number(string_calculation))
		}
	}
	for (var i = 0; i < lesser_number; i++) {
		var calculation = Number(lesser_number) / Number(i)
		var string_calculation = calculation.toString()
		if (string_calculation.includes('.', 0)) {} else {
			array_2.push(Number(string_calculation))
		}
	}
	array_1.splice(0, 1)
	array_2.splice(0, 1)
	array_1.push(1)
	array_2.push(1)
	console.log(array_1)
	console.log(array_2)
	for (var i = 0; i < array_1.length; i++) {
		for (var a = 0; a < array_2.length; a++) {
			if (array_2[a] == array_1[i]) {
				LCM_array.push(Number(array_2[a]))
			}
		}
	}
	console.log(LCM_array)
	var main_number = LCM_array[0]
	var first_calculation_number = Number(array_1[0] / main_number)
	var second_calculation_number = Number(array_2[0] / main_number)
	LCM = (main_number * first_calculation_number) * second_calculation_number
	console.log(Number(LCM))
	return Number(LCM)
}

function calculate_HCF(number_1, number_2) { //Return The HCF of two numbes
	var prime_numbers_array = [
		2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97, 101, 103, 107, 109, 113, 127, 131, 137, 139, 149, 151, 157, 163, 167, 173, 179, 181, 191, 193, 197, 199, 211, 223, 227, 229, 233, 239, 241, 251, 257, 263, 269, 271, 277, 281, 283, 293, 307, 311, 313, 317, 331, 337, 347, 349, 353, 359, 367, 373, 379, 383, 389, 397, 401, 409, 419, 421, 431, 433, 439, 443, 449, 457, 461, 463, 467, 479, 487, 491, 499, 503, 509, 521, 523, 541, 547, 557, 563, 569, 571, 577, 587, 593, 599, 601, 607, 613, 617, 619, 631, 641, 643, 647, 653, 659, 661, 673, 677, 683, 691, 701, 709, 719, 727, 733, 739, 743, 751, 757, 761, 769, 773, 787, 797, 809, 811, 821, 823, 827, 829, 839, 853, 857, 859, 863, 877, 881, 883, 887, 907, 911, 919, 929, 937, 941, 947, 953, 967, 971, 977, 983, 991, 997
	]
	console.log(prime_numbers_array)
	var greater_number, lesser_number = 0;
	var array_1 = [];
	var array_2 = [];
	var HCF_array = [];
	var HCF = 0;
	var item_1_HCF, item_2_HCF = null;
	if (Number(number_1) > Number(number_2)) {
		greater_number = Number(number_1)
		lesser_number = Number(number_2)
	} else {
		greater_number = Number(number_2)
		lesser_number = Number(number_1)
	}
	for (var i = 0; i < greater_number; i++) {
		var calculation = Number(greater_number) / Number(i)
		var string_calculation = calculation.toString()
		for (var a = 0; a < prime_numbers_array.length; a++) {
			if (string_calculation.includes(prime_numbers_array[a]) || string_calculation.includes('.')) {
				item_1_HCF = 'includes'
			} else {
				item_1_HCF = Number(string_calculation)
			}
		}
		if (item_1_HCF == 'includes' || item_1_HCF == Infinity) {} else {
			array_1.push(item_1_HCF)
		}
	}
	for (var i = 0; i < lesser_number; i++) {
		var calculation = Number(lesser_number) / Number(i)
		var string_calculation = calculation.toString()
		for (var a = 0; a < prime_numbers_array.length; a++) {
			if (string_calculation.includes(prime_numbers_array[a]) || string_calculation.includes('.')) {
				item_2_HCF = 'includes'
			} else {
				item_2_HCF = Number(string_calculation)
			}
		}
		if (item_2_HCF == 'includes' || item_2_HCF == Infinity) {} else {
			array_2.push(item_2_HCF)
		}
	}
	array_1.push(1)
	array_2.push(1)
	for (var i = 0; i < array_1.length; i++) {
		for (var a = 0; a < array_2.length; a++) {
			if (array_2[a] == array_1[i]) {
				HCF_array.push(Number(array_2[a]))
			}
		}
	}
	console.log(array_1)
	console.log(array_2)
	console.log(HCF_array)
	var main_number = HCF_array[0]
	HCF = main_number
	console.log(Number(HCF))
	return Number(HCF)
}

function reset_username() { //Reset Usrename
	var user_name = jQuery('#username').val();
	localStorage.setItem('flash_cards_user_name', user_name);
}