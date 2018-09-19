# Homework 2

Drake Lambert

1. Create the tables
    ```sql
    CREATE TABLE Doctor
    (
        Dnum varchar(20) not null,
        Dname varchar(20) not null,
        City varchar(20) not null,
        Street varchar(20) not null,
        Speciality varchar(20) not null,
        Primary key (Dnum)
    );
    CREATE TABLE Patient
    (
        Pnum varchar(20) not null,
        Pname varchar(20) not null,
        City varchar(20) not null,
        Street varchar(20) not null,
        Age smallint not null,
        Primary_Dnum varchar(20),
        Primary key (Pnum),
        FOREIGN KEY (Primary_Dnum) REFERENCES Doctor(Dnum)
    );
    CREATE TABLE Visit
    (
        Pnum varchar(20) not null,
        Dnum varchar(20) not null,
        Date varchar(20) not null,
        Bill_Amount smallint not null,
        Paid_amount smallint not null,
        Primary key (Pnum,Dnum,Date),
        FOREIGN KEY (Pnum) REFERENCES Patient(Pnum),
        FOREIGN KEY (Dnum) REFERENCES Doctor(Dnum)
    );
    ```
2. Table Data
    - Doctor Table
        | Dnum | Dname          | City        | Street            | Speciality
        | ---  | ---            | ---         | ---               | ---
        | 1    | Drake Lambert  | Baton Rouge | 123 Street Drive  | Kidney
        | 2    | Devin Comba    | New Orleans | 456 Avenue Place  | Heart
        | 3    | Remy McConnell | New York    | 789 Boulevard Way | Leg
    - Patient Table
        | Pnum | Pname          | City        | Street            | Age | Primary_Dnum
        | ---  | ---            | ---         | ---               | --- | ---
        | 1    | Robert Ellis   | Baton Rouge | 123 Street Drive  | 21  | 1
        | 2    | Girad Fogle    | New Orleans | 456 Avenue Place  | 22  | 2
        | 3    | Tracy McGuire  | New York    | 789 Boulevard Way | 23  | 3
    - Visit Table
        | Pnum | Dnum | Date     | Bill_Amount | Paid_amount
        | ---  | ---  | ---      | ---         | ---
        | 1    | 1    | 1/1/2019 | 101.34      | 34
        | 2    | 2    | 2/3/2019 | 3434.23     | 55
        | 3    | 3    | 4/3/2018 | 3582.13     | 854
3. SQL Statements
    - Get Dnum and name for doctors from ’Baton Rouge’ with specialty ’Cardiology’.
        ```sql
            select Dnum, Dname from Doctor 
            where city='Baton Rouge' and specialty='Cardiology;'
        ```
    - For patients from ’New Orleans’ with age ≤ 40, get Pnum, Pname, number of distinct doctors the patient has visited, and the total amount of Unpaid bill balance for the patient. Arrange the result in descending order of Unpaid bill balance.
        ```sql
            select patient.Pnum, patient.Pname, count(docs.Dnum), sum(balance.balance) as bal
            from (select * from Patient where Age<=40 and City='New Orleans') as patient
            left join (select distinct Dnum from Visit) as docs ON docs.Pnum=Patient.Pnum
            left join (select *,(Paid_amount - Bill_Amount) as balance from Visit) as balance on balance.Pnum=Patient.Pnum
            order by bal desc;
        ```
    - Get distinct Pnum, Dnum pairs such that the patient has visited the doctor, and and they (the patient and the doctor) are from the same city.
        ```sql
            select distinct Pnum, Dnum
            from Visit
            where exists (select * from Patient inner join Doctor on Patient.City=Doctor.City);
        ```
    - Get Pnum for patients who are either from ’Houston’ or have visted a doctor from ’Houston’ with Bill_Amount > 200 for that visit.
        ```sql
            select Pnum
            from Patient
            where Patient.City='Houston' or exists (select * from (select * from Visit where Paid_amount-Bill_Amount>200) as Visit inner join Doctor on Visit.Dnum=Doctor.Dnum);
        ```
    - Get Dnum and Dname for doctors such that the doctor has been visited at least 3 times by a patient from the doctor’s city.
        ```sql
            select Dnum, Dname
            from Doctor
            where count(select distinct * from Visit inner join Patient on Doctor.City=Patient.City)>=3;
        ```
    - Get Pnum, Pname, and City for patients whose primary physician has a speciality ’Internal Medicine’.
        ```sql
            select Pnum, Pname, City
            from Patient
            inner join (select * from Doctor where Speciality='Internal Medicine') on Patient.Primary_Dnum=Doctor.Dnum;
        ```
    - Get Dnum and Dname for doctors that have NOT been visited by any patient from ’Baton Rouge’.
        ```sql
            select Dnum, Dname
            from Doctor
            where not exists (select * from Visit where Visit.Dnum=Doctor.Dnum inner join (select * from Patient where City='Baton Rouge') on Patient.Pnum=Visit.Pnum);
        ```