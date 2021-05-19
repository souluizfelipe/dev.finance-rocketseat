const modal = {
    open() {
        document.querySelector('.modal-add-transaction').classList.add('-active');
    },
    close() {
        document.querySelector('.modal-add-transaction').classList.remove('-active')
    }
};

const transactions = [
    {
        id: 1,
        description: 'job',
        amount: 200000,
        date: '17/05/2021',
    },
    {
        id: 2,
        description: 'aluguel',
        amount: -100000,
        date: '17/05/2021',
    },
    {
        id: 3,
        description: 'trampo',
        amount: 200000,
        date: '17/05/2021',
    },
    {
        id: 4,
        description: 'mercado',
        amount: -20000,
        date: '17/05/2021',
    },
];

const displayTransactions = {
    all: transactions,

    add(transaction) {
        displayTransactions.all.push(transaction);
        App.reload();
    },

    remove(index) {
        displayTransactions.all.splice(index, 1);
        App.reload();
    },

    income() {
        let income = 0; 
        displayTransactions.all.forEach(transaction => {
            if (transaction.amount > 0) {
                income += transaction.amount;
            };
        });
        return income;
    },

    expense() {
        let expense = 0;
        displayTransactions.all.forEach(transaction => {
            if (transaction.amount < 0) {
                expense += transaction.amount;
            };
        });
        return expense;
    },

    total() {
        return displayTransactions.income() + displayTransactions.expense();
    }
};

const DOM = {
    transactionContainer: document.querySelector('.data-table .data-table-body'),

    addTransaction(transaction, index) {
        const tr = document.createElement('tr');
        tr.innerHTML = DOM.innerHTMLTransaciton(transaction, index);
        tr.dataset.index = index;
        DOM.transactionContainer.appendChild(tr).classList.add('data-table-row');
    },
    
    innerHTMLTransaciton(transaction, index) {
        const cssClass = transaction.amount > 0 ? '-income' : '-expense';
        const amount = utils.formatCurrency(transaction.amount);
        const html = `
        <td class="data-table-data -description">${transaction.description}</td>
        <td class="data-table-data ${cssClass}">${amount}</td>
        <td class="data-table-data -date">${transaction.date}</td>
        <td class="data-table-data"><a href="#" onclick="displayTransactions.remove(${index})"><img src="assets/img/minus.svg" alt="remover transação"></a></td>
        `;
        return html;
    },

    updateBalance() {
        document.querySelector('#income').innerHTML = utils.formatCurrency(displayTransactions.income());
        document.querySelector('#expense').innerHTML = utils.formatCurrency(displayTransactions.expense());
        document.querySelector('#total').innerHTML =  utils.formatCurrency(displayTransactions.total());
    },

    clearTransactions() {
        DOM.transactionContainer.innerHTML = '';
    },
};

const utils = {

    formatAmount(value) {
        value = Number(value.replace(/\,\./g, '')) * 100;
        return value;
    },

    formatDate(date) {
        const splitedDate = date.split('-');
        return `${splitedDate[2]}/${splitedDate[1]}/${splitedDate[0]}`;
    },

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

const Form = {
    description: document.querySelector("input#description"),
    amount: document.querySelector('input#amount'),
    date: document.querySelector('input#date'),

    getValues() {
        return {
            description: Form.description.value,
            amount: Form.amount.value,
            date: Form.date.value,
        };
    },

    verifyFields() {
        const {description, amount, date} = Form.getValues();
        if (description.trim() === '' || amount.trim() === '' || date.trim() === '' ) {
            throw new Error('Por favor preencha todos os campos.')  
        };

    },

    formatValues() {
        let {description, amount, date} = Form.getValues();
        amount = utils.formatAmount(amount);
        date = utils.formatDate(date);
        console.log(description, amount, date);
        return {
            description,
            amount,
            date};
    },

    saveTransaction(transaction) {
        displayTransactions.add(transaction, index);
    },

    clearFields() {
        Form.description.value = '';
        Form.amount.value = '';
        Form.date.value = '';
    },

    submit(event){
        event.preventDefault();

        try {
            Form.verifyFields();
            const newTransaction = Form.formatValues();
            Form.saveTransaction(newTransaction);
            Form.clearFields();
            modal.close();           

        } catch (error) {
            alert(error.message);
        }
    },
}

const App = {
    init() {
        displayTransactions.all.forEach(DOM.addTransaction);
        DOM.updateBalance(); 
    },
    reload() {
        DOM.clearTransactions();
        App.init();
    },
};

App.init();
