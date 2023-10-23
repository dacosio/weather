import { useState, useEffect } from "react";

const useDateTime = (dateTimeEpoch) => {
  const [dateTime, setDateTime] = useState({
    date: "",
    time: "",
    day: "",
  });

  useEffect(() => {
    if (dateTimeEpoch) {
      // Convert the epoch time to milliseconds
      const timestamp = dateTimeEpoch * 1000;

      // Create a Date object from the timestamp
      const date = new Date(timestamp);

      // Extract date and time
      const year = date.getFullYear();
      const month = (date.getMonth() + 1).toString().padStart(2, "0");
      const day = date.getDate().toString().padStart(2, "0");
      const hours = date.getHours().toString().padStart(2, "0");
      const minutes = date.getMinutes().toString().padStart(2, "0");

      const formattedDate = `${year}-${month}-${day}`;
      const formattedTime = `${hours}:${minutes}`;
      const formattedDay = date.toLocaleDateString("en-US", {
        weekday: "long",
      });

      setDateTime({
        date: formattedDate,
        time: formattedTime,
        day: formattedDay,
      });
    }
  }, [dateTimeEpoch]);

  return dateTime;
};

export default useDateTime;
