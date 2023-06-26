'use strict'

const logoutBtn = new LogoutButton()

logoutBtn.action = function() {
	ApiConnector.logout(response => {
		if (response.success) {
			location.reload()
		}
	})

}

ApiConnector.current(response => {
	if (response.success) {
		ProfileWidget.showProfile(response.data);
	}
});


const ratesBoard = new RatesBoard()

function getMoneyBoard() {
	ApiConnector.getStocks(response => {
		if (response.success) {
			ratesBoard.clearTable();
			ratesBoard.fillTable(response.data)
		}
	});
}

getMoneyBoard()
setInterval(getMoneyBoard, 60000)


const moneyManager = new MoneyManager()

moneyManager.addMoneyCallback = function(data) {
	ApiConnector.addMoney(data, response => {
		if (response.success) {
			ProfileWidget.showProfile(response.data);
			moneyManager.setMessage(response.success, 'баланс пополнен')
		} else moneyManager.setMessage(response.error, 'ошибка, проверьте правильность заполнения полей')
	})
}

moneyManager.conversionMoneyCallback = function(data) {
	ApiConnector.convertMoney(data, response => {
		if (response.success) {
			ProfileWidget.showProfile(response.data);
			moneyManager.setMessage(response.success, 'конвертирование прошло успешно')
		} else moneyManager.setMessage(response.error, 'ошибка, проверьте правильность заполнения полей')
	})
}

moneyManager.sendMoneyCallback = function(data) {
	ApiConnector.transferMoney(data, response => {
		if (response.success) {
			ProfileWidget.showProfile(response.data);
			moneyManager.setMessage(response.success, 'перевод валюты прошел успешно')
		} else moneyManager.setMessage(response.error, 'ошибка, проверьте правильность заполнения полей')
	})
}

const favoriteWidget = new FavoritesWidget()

ApiConnector.getFavorites(response => {
	if (response.success) {
		favoriteWidget.clearTable();
		favoriteWidget.fillTable(response.data)
		moneyManager.updateUsersList(response.data)
	}
});

favoriteWidget.addUserCallback = function(data) {
	ApiConnector.addUserToFavorites(data, response => {
		if (response.success) {
			favoriteWidget.clearTable();
			favoriteWidget.fillTable(response.data)
			moneyManager.updateUsersList(response.data)
			favoriteWidget.setMessage(response.success, 'пользователь добавлен в избранное')
		} else favoriteWidget.setMessage(response.error, 'ошибка, проверьте правильность заполнения полей')
	})
}

favoriteWidget.removeUserCallback = function(data) {
	ApiConnector.removeUserFromFavorites(data, response => {
		if (response.success) {
			favoriteWidget.clearTable();
			favoriteWidget.fillTable(response.data)
			moneyManager.updateUsersList(response.data)
			favoriteWidget.setMessage(response.success, 'пользователь удален из избранного')
		} else favoriteWidget.setMessage(response.error, 'ошибка, проверьте правильность заполнения полей')
	})
}