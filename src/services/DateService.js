const DateService = {
    getDayOfWeek(date) {
        if(date.getDay() === 0) return 7 
        else return date.getDay()
    },
    getStartOfWeek(date) {
        let start = new Date(date)
        start.setDate(((date.getDate() - this.getDayOfWeek(date)) + 1))
        start.setHours(0, 0, 0, 0);
        return start
    },
    getEndOfWeek(date) {
        let end = new Date(date)
        end.setDate(date.getDate() + (7 - this.getDayOfWeek(date)));
        end.setHours(23, 59, 59, 0);
        return end
    }
}

export default DateService