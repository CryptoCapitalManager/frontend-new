const dateEquals = (firstDate: Date, secondDate: Date) => {
    return (
        firstDate.getMonth() === secondDate.getMonth() &&
        firstDate.getFullYear() === secondDate.getFullYear()
    );
};

export { dateEquals };
