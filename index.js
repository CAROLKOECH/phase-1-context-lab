// Helper function to retrieve DOM elements by their IDs
function getElement(id) {
    return document.getElementById(id);
  }
  
  // Create an empty array to store employee records
  let employeeRecords = [];
  
  // Event listener for creating an employee record
  getElement("createEmployeeButton").addEventListener("click", function () {
    const firstName = getElement("firstNameInput").value;
    const lastName = getElement("lastNameInput").value;
    const title = getElement("titleInput").value;
    const payRate = parseFloat(getElement("payRateInput").value);
  
    // Create an employee record using the provided function
    const employeeRecord = createEmployeeRecord([
      firstName,
      lastName,
      title,
      payRate,
    ]);
  
    // Add the employee record to the array
    employeeRecords.push(employeeRecord);
  
    // Clear input fields
    getElement("firstNameInput").value = "";
    getElement("lastNameInput").value = "";
    getElement("titleInput").value = "";
    getElement("payRateInput").value = "";
  
    console.log("Employee record created:", employeeRecord);
  });
  
  // Event listener for adding a time entry
  getElement("addTimeButton").addEventListener("click", function () {
    const date = getElement("dateInput").value;
    const timeIn = getElement("timeInInput").value;
    const timeOut = getElement("timeOutInput").value;
  
    const employeeRecord = employeeRecords[employeeRecords.length - 1];
  
    // Add time entries to the employee record using the provided functions
    createTimeInEvent(employeeRecord, `${date} ${timeIn}`);
    createTimeOutEvent(employeeRecord, `${date} ${timeOut}`);
  
    // Clear input fields
    getElement("dateInput").value = "";
    getElement("timeInInput").value = "";
    getElement("timeOutInput").value = "";
  
    console.log("Time entries added to employee record:", employeeRecord);
  });
  
  // Event listener for calculating wages
  getElement("calculateWagesButton").addEventListener("click", function () {
    const employeeRecord = employeeRecords[employeeRecords.length - 1];
    const date = getElement("dateInput").value;
  
    // Calculate wages for the specified date using the provided function
    const wages = wagesEarnedOnDate(employeeRecord, date);
  
    // Display the result
    getElement("resultDisplay").textContent = `Wages earned on ${date}: $${wages}`;
  });
  
  // Function implementations
  
  function createEmployeeRecord([firstName, lastName, title, payPerHour]) {
    return {
      firstName,
      lastName,
      title,
      payPerHour,
      timeInEvents: [],
      timeOutEvents: [],
    };
  }
  
  function createEmployeeRecords(employeeData) {
    return employeeData.map(createEmployeeRecord);
  }
  
  function createTimeInEvent(employeeRecord, dateStamp) {
    const [date, hour] = dateStamp.split(" ");
  
    employeeRecord.timeInEvents.push({
      type: "TimeIn",
      hour: parseInt(hour),
      date,
    });
  
    return employeeRecord;
  }
  
  function createTimeOutEvent(employeeRecord, dateStamp) {
    const [date, hour] = dateStamp.split(" ");
  
    employeeRecord.timeOutEvents.push({
      type: "TimeOut",
      hour: parseInt(hour),
      date,
    });
  
    return employeeRecord;
  }
  
  function hoursWorkedOnDate(employeeRecord, date) {
    const timeInEvent = employeeRecord.timeInEvents.find(
      (event) => event.date === date
    );
    const timeOutEvent = employeeRecord.timeOutEvents.find(
      (event) => event.date === date
    );
  
    if (timeInEvent && timeOutEvent) {
      return timeOutEvent.hour - timeInEvent.hour;
    }
  
    return 0;
  }
  
  function wagesEarnedOnDate(employeeRecord, date) {
    const hoursWorked = hoursWorkedOnDate(employeeRecord, date);
    const wages = hoursWorked * employeeRecord.payPerHour;
    return wages;
  }
  
  function allWagesFor(employeeRecord) {
    const datesWorked = employeeRecord.timeInEvents.map((event) => event.date);
    const totalWages = datesWorked.reduce(
      (sum, date) => sum + wagesEarnedOnDate(employeeRecord, date),
      0
    );
    return totalWages;
  }
  
  function findEmployeeByFirstName(srcArray, firstName) {
    return srcArray.find((record) => record.firstName === firstName);
  }
  
  function calculatePayroll(employeeRecords) {
    const totalPayroll = employeeRecords.reduce(
      (sum, employeeRecord) => sum + allWagesFor(employeeRecord),
      0
    );
    return totalPayroll;
  }
  