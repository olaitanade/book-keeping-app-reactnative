export const formatAmount = (num, currency = 'N', noDecimal = false) => {
    if (+num) {
      const formatted = parseFloat(num).toFixed(noDecimal ? 0 : 2).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
  
      return `${currency}${formatted}`
    }
  
    return `${currency}0.00`
  };
  
  export const formatDate = (date, figures) => {
    const newDate = new Date(date)
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
    if (figures) return `${newDate.getDate()}-${newDate.getMonth()}-${newDate.getFullYear()}`
    return `${newDate.getDate()} ${months[newDate.getMonth()]}, ${newDate.getFullYear()}`
  }
  
  export const formatNumber = (num) => {
    return Math.abs(num) > 999999 ? `${Math.sign(num) * ((Math.abs(num) / 1000000).toFixed(1))}M` : Math.sign(num) * Math.abs(num)
  }
  
  export const formatTime = (time) => {
    const newTime = new Date(time)
    const hours = newTime.getHours()
    const minutes = newTime.getMinutes()
  
    return `${hours === 0
      ? 12
      : hours > 12
        ? hours - 12
        : hours}:${minutes < 10 ? `0${minutes}` : minutes} ${hours >= 12 ? 'PM' : 'AM'}`
  }  