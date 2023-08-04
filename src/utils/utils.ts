const isSameYearAndMonth = (firstDate: Date, secondDate: Date) => {
    return (
        firstDate.getFullYear() === secondDate.getFullYear() &&
        firstDate.getMonth() === secondDate.getMonth()
    );
};

export { isSameYearAndMonth };
