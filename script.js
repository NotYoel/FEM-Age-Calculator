// Inputs
const day_input = document.getElementById("input-day")
const month_input = document.getElementById("input-month")
const year_input = document.getElementById("input-year")

// Error Elements
const day_et = document.getElementById("day-et")
const month_et = document.getElementById("month-et")
const year_et = document.getElementById("year-et")

// Display Texts
const days_dt = document.getElementById("dt-days")
const months_dt = document.getElementById("dt-months")
const years_dt = document.getElementById("dt-years")

// Submit Button
const submit_button = document.getElementById("arrow-icon")

function checkInputs() {
    let result

    // Check day input
    if(day_input.value == "") {
        day_et.classList.add("active")
        day_et.innerHTML = "This field is required"
        return false
    }

    let days = Number(day_input.value)
    if(isNaN(days) || (days < 1 || days > 31)) {
        day_et.classList.add("active")
        day_et.innerHTML = "Must be a valid day"
        return false
    } else {
        day_et.classList.remove("active")
    }

    // Check month input
    if(month_input.value == "") {
        month_et.classList.add("active")
        month_et.innerHTML = "This field is required"
        return false
    }

    let months = Number(month_input.value)
    const days_in_months = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
    if(isNaN(months) || (months < 1 || months > 12) || days_in_months[months - 1] < days) {
        month_et.classList.add("active")
        month_et.innerHTML = "Must be a valid month"
        return false
    } else {
        month_et.classList.remove("active")
    }

    // Check year input
    if(year_input.value == "") {
        year_et.classList.add("active")
        year_et.innerHTML = "This field is required"
        return false
    }
    
    let years = Number(year_input.value)
    if(isNaN(years) || years > new Date().getFullYear()) {
        year_et.classList.add("active")
        year_et.innerHTML = "Must be in the past"
        return false
    } else {
        year_et.classList.remove("active")
    }

    return new Date(years, months - 1, days)
}

// not precise
function getTimeBetweenDates(date) {
    let result = []
    let days = 0
    let months = 0
    let years = 0

    const MS_IN_DAY = 86400000
    const MS_IN_MONTH = MS_IN_DAY * 30
    const MS_IN_YEAR = MS_IN_MONTH * 12

    today = new Date()

    // returns time difference in ms
    let t_diff = today.getTime() - date.getTime()

    if(t_diff >= MS_IN_YEAR) {
        years = Math.floor(t_diff / MS_IN_YEAR)
        t_diff -= years * MS_IN_YEAR
    }

    if(t_diff >= MS_IN_MONTH) {
        months = Math.floor(t_diff / MS_IN_MONTH)
        t_diff -= months * MS_IN_MONTH
    }

    if(t_diff >= MS_IN_DAY) {
        days = Math.floor(t_diff / MS_IN_DAY)
        t_diff -= days * MS_IN_DAY
    }

    return [days, months, years]
}

submit_button.onclick = function() {
    date = checkInputs()
    
    // An error has occured
    if(date == false) {
        for(input of [day_input, month_input, year_input]) {
            input.classList.add('active')
        }

        for(dt of [days_dt, months_dt, years_dt]) {
            dt.innerHTML = "- -"
        }
        return
    }

    day_input.classList.remove('active')
    month_input.classList.remove('active')
    year_input.classList.remove('active')
    
    t = getTimeBetweenDates(date)

    days_dt.innerHTML = t[0]
    months_dt.innerHTML = t[1]
    years_dt.innerHTML = t[2]
}
