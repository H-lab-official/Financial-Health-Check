function calculateTotalAmount(
  initialMonthlyExpense,
  yearlyExpense,
  inflationRate,
  numberOfYears
) {
  let totalAmount = 0;
  let yearlyExpenses = [];

  for (let year = 1; year <= numberOfYears; year++) {
    // Calculate the total monthly expenses for the current year
    let monthlyExpenses = initialMonthlyExpense * 12;

    // Calculate the total yearly expenses for the current year
    let adjustedYearlyExpenses =
      yearlyExpense * Math.pow(1 + inflationRate, year);

    // Calculate the total expenses for the current year
    let totalExpenses = monthlyExpenses + adjustedYearlyExpenses;

    yearlyExpenses.push(totalExpenses);

    totalAmount += totalExpenses;

    console.log(
      `Year ${year}: Total amount needed: ${totalAmount.toFixed(2)} baht`
    );
  }

  // Log the summary of yearly expenses
  console.log("Summary of yearly expenses:");
  for (let i = 0; i < yearlyExpenses.length; i++) {
    console.log(`Year ${i + 1}: ${yearlyExpenses[i].toFixed(2)} baht`);
  }

  return yearlyExpenses;
}

// Initial monthly expense in baht
let initialMonthlyExpense = 40000;

// Yearly expense in baht
let yearlyExpense = 50000;

// Inflation rate
let inflationRate = 0.03;

// Number of years
let numberOfYears = 20;

// Calculate the total amount needed over 20 years
calculateTotalAmount(
  initialMonthlyExpense,
  yearlyExpense,
  inflationRate,
  numberOfYears
);
