const modal = {
    open() {
        document.querySelector('.modal-add-transaction').classList.add('-active');
    },
    close() {
        document.querySelector('.modal-add-transaction').classList.remove('-active')
    }
};