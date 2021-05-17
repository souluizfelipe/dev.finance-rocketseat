const modal = {
    open() {
        document.querySelector('.modal-add-transaction').classList.add('-active');
    },
    close() {
        document.querySelector('.modal-add-transaction').classList.remove('-active')
    }
};

const transaction = [
    {
        id: 1,
        description: 'job',
        amount: 200000,
        date: '17/05/2021',
    },
    {
        id: 2,
        description: 'mercado',
        amount: -12000,
        date: '17/05/2021',
    },

];

const transactions = {
    income() {
        let income = 0; 
        transaction.forEach(transaction => {
            if (transaction.amount > 0) {
                income += transaction.amount;
            };
        });
        return income;
    },

    expense() {
        let expense = 0;
        transaction.forEach(transaction => {
            if (transaction.amount < 0) {
                expense += transaction.amount;
            };
        });
        return expense;
    },

    total() {
        return transactions.income() + transactions.expense();
    }
};

const DOM = {
    transactionContainer: document.querySelector('.data-table .data-table-body'),

    addTransaction(transaction, index) {
        const tr = document.createElement('tr');
        tr.innerHTML = DOM.innerHTMLTransaciton(transaction);
        DOM.transactionContainer.appendChild(tr).classList.add('data-table-row');
    },
    
    innerHTMLTransaciton(transaction) {
        const cssClass = transaction.amount > 0 ? '-income' : '-expense';
        const amount = utils.formatCurrency(transaction.amount);
        const html = `
        <td class="data-table-data -description">${transaction.description}</td>
        <td class="data-table-data ${cssClass}">${amount}</td>
        <td class="data-table-data -date">${transaction.date}</td>
        <td class="data-table-data"><a href="#"><img src="assets/img/minus.svg" alt="remover transação"></a></td>
        `;
        return html;
    },

    updateBalance() {
        document.querySelector('#income').innerHTML = utils.formatCurrency(transactions.income());
        document.querySelector('#expense').innerHTML = utils.formatCurrency(transactions.expense());
        document.querySelector('#total').innerHTML =  utils.formatCurrency(transactions.total());
    },
};

const utils = {
    formatCurrency(value) {
        const signal = Number(value) < 0 ? '-' : '';
        value = String(value).replace(/\D/g, '');
        value = Number(value)/100;
        value = value.toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL',
        }); 
        return signal + value;
    },

};


transaction.forEach(transaction => {
    DOM.addTransaction(transaction);
});

DOM.updateBalance();