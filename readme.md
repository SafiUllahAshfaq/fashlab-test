# Test assignment:

This is a test assigment to test your skills with Angular, Node.js and MySQL.  We will asses your system thinking, 
coding style, and ability to work with the tools that we use in our projects.

### Use following tools

- Backend REST API: Node + Express + MySQL + Jest
- Frontend: Angular 6 + Jest

-----------------------------------------

# Feature: Invoice upload

As a customer, I want to upload a file containing list of invoices and I see totals for each invoice

1. A customer prepares CSV file with invoices: the first column is internal invoice id, the second is invoice amount and "due on" date

```
1,100,2019-05-20
2,200.5,2019-05-10
B,300,2019-05-01
```

The real-life file includes five thousand rows and includes invalid rows.

2. Customer can upload invoice CSV to the system
3. System processes file so that every invoice gets the selling price according to the next logic:
> Invoice sell price depends on amount and days to the due date. The formula is `amount * coefficient`. The coefficient is 0.5 when the invoice uploaded more than 30 days before the due date and 0.3 when less or equal to 30 days.

3. Customer can see invoices uploaded to the system and see their selling price.
4. Customer can see upload report and understand errors related to CSV file row processing.
