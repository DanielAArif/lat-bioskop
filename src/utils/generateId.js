const generateId = (lastId, prefix) => {
    if (!lastId) {
        return `${prefix}001`;
    }

    const number = parseInt(lastId.substring(1), 10);

    const newNumber = number + 1;

    return `${prefix}${String(newNumber).padStart(3, "0")}`;
};

export default generateId;