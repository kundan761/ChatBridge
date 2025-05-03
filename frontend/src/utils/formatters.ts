export const formatTime = (date: Date): string => {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    
    const messageDate = new Date(date);
    const messageDay = new Date(messageDate.getFullYear(), messageDate.getMonth(), messageDate.getDate());
    
    // Format for hours:minutes
    const hours = messageDate.getHours();
    const minutes = messageDate.getMinutes().toString().padStart(2, '0');
    const timeString = `${hours}:${minutes}`;
    
    if (messageDay.getTime() === today.getTime()) {
      return timeString;
    } else if (messageDay.getTime() === yesterday.getTime()) {
      return `Yesterday`;
    } else {
      // Format for date within the last week
      const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
      const dayDifference = Math.floor((today.getTime() - messageDay.getTime()) / (1000 * 60 * 60 * 24));
      
      if (dayDifference < 7) {
        return daysOfWeek[messageDate.getDay()];
      } else {
        // Format for older messages
        const day = messageDate.getDate().toString().padStart(2, '0');
        const month = (messageDate.getMonth() + 1).toString().padStart(2, '0');
        return `${day}/${month}/${messageDate.getFullYear().toString().substr(2)}`;
      }
    }
  };
  
  export const formatMessageTime = (date: Date): string => {
    const hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
  };