let button_start = document.querySelector('.start'),
	budget = document.querySelector('.budget-value'),
	level = document.querySelector('.level-value'),
	expenses = document.querySelector('.expenses-value'),
	optionalexpenses = document.querySelector('.optionalexpenses-value'),
	income = document.querySelector('.income-value'),
	monthsavings = document.querySelector('.monthsavings-value'),
	yearsavings = document.querySelector(".yearsavings-value"),
	budyearsavingsget = document.querySelector('.budyearsavingsget-value'),
	expenses_item = document.querySelectorAll('.expenses-item'),
	optionalExpensesItem = document.querySelectorAll(".optionalexpenses-item"),
	dayBudget = document.querySelector(".daybudget-value"),
	button_confirm_expenses = document.getElementsByTagName('button')[0],
	button_confirm_optionalexpenses = document.getElementsByTagName('button')[1],
	button_calc_day_budget = document.getElementsByTagName('button')[2],
	incomeItem = document.querySelector(".choose-income"),
	choose_income = document.querySelector('#income'),
	savings = document.querySelector('#savings'),
	sum = document.querySelector('#sum'),
	percent = document.querySelector('#percent'),
	year = document.querySelector('.year-value'),
	month = document.querySelector('.month-value'),
	day = document.querySelector('.day-value');

let money, time;

button_start.addEventListener("click", () => {
	time = prompt("Введите дату в формате YYYY-MM-DD", "");
	money = +prompt("Ваш бюджет на месяц", "");

	while (isNaN(money) || money =="" || money == null){
		money = +prompt("Ваш бюджет на месяц", "");
	}
	appData.budget = money;
	appData.timeData = time;
	budget.textContent = money.toFixed();
	year.value = new Date(Date.parse(time)).getFullYear();
	month.value = new Date(Date.parse(time)).getMonth() + 1;
	day.value = new Date(Date.parse(time)).getDate();

	button_confirm_expenses.disabled = false;
	button_confirm_optionalexpenses.disabled = false;
	button_calc_day_budget.disabled = false;
});

button_confirm_expenses.addEventListener("click", () => {
	let sum = 0;

	for (let i = 0; i < expenses_item.length; i++){
		let a = expenses_item[i].value;
		let b = expenses_item[++i].value;
		if ( (typeof(a)) != null && (typeof(b)) != null && a != "" && b != "" && a.length < 5){
			appData.expenses[a] = b;
			sum += +b;
		}
		else {
			i = i - 1;
		}
	}
	expenses.textContent = sum;
});

button_confirm_optionalexpenses.addEventListener("click", () => {
	for (let i = 0; i < optionalExpensesItem.length; i++){
		let opt = optionalExpensesItem[i].value;
		appData.optionalExpenses[i] = opt;
		optionalexpenses.textContent += appData.optionalExpenses[i] + " "; 
	}
});

button_calc_day_budget.addEventListener("click", () => {
	if (appData.budget) {
		let expensesCost = +expenses.textContent;
		appData.moneyPerDay = ( (appData.budget - expensesCost) / 30).toFixed();
		dayBudget.textContent = appData.moneyPerDay;

		if (appData.moneyPerDay < 100)
			level.textContent = "Минимальный уровень достатка";
		if (appData.moneyPerDay > 100 && appData.moneyPerDay < 2000)
			level.textContent = "Средний уровень достатка";
		if (appData.moneyPerDay > 2000)
			level.textContent = "Высокий уровень достатка";
	}
	else {
		dayBudget.textContent = "Произошла ошибка";
	}
});

incomeItem.addEventListener("input", () => {
	let item = incomeItem.value;
	appData.income = item.split(",");
	income.textContent = appData.income;
});

savings.addEventListener("click", () => {
	appData.savings = appData.savings ? false : true;
});

sum.addEventListener("input", () => {
	if (appData.savings){
		let suma = +sum.value;
		let procent = +percent.value;
		appData.monthIncome = suma/100/12*procent;
		appData.yearIncome = suma/100*procent;

		monthsavings.textContent = appData.monthIncome.toFixed(1);
		yearsavings.textContent = appData.yearIncome.toFixed(1);
	}
});

percent.addEventListener("input", () => {
	if (appData.savings){
		let suma = +sum.value;
		let procent = +percent.value;
		appData.monthIncome = suma/100/12*procent;
		appData.yearIncome = suma/100*procent;

		monthsavings.textContent = appData.monthIncome.toFixed(1);
		yearsavings.textContent = appData.yearIncome.toFixed(1);
	}
});

let appData = {
	budget: money,
	expenses: {},
	optionalExpenses: {},
	income: [],
	timeData: time,
	savings: false
};

	
