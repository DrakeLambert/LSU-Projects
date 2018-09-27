# Homework 3

Drake Lambert

1. Get ID and name for employees who are either teachers or project directors.
    ```sql
    select ID, NAME from EM
    where
      exists (select * from PR where ID=EM.ID)
      or
      exists (select * from CR where ID=EM.ID);
    ```
2. For each employee from 'New Orleans', get ID, Name, average grade, and number of courses taken. Order by descending grade.
    ```sql
    select ER.ID, Name, avg(GRADE) as average, count(Cnum) from ER
    right join EM on EM.ID=ER.ID
    group by ER.ID
    order by average desc;
    ```
3. Get departments (DEPT) with a budget ≥ 250000 such that some employee from the department works in a project located in a city different from the employee’s city.
    ```sql
    select distinct CM.DEPT from CM
    inner join EM on EM.DEPT=CM.DEPT
    inner join EP on EP.ID=EM.ID
    inner join PR on EP.Pnum=PR.Pnum
    where CM.BUDGET>=250000 and EM.CITY!=PR.CITY;
    ```
4. For each department, get DEPT, budget, average of employee salary, total number of projects conducted. Arrange the results in descending order of the budget.
    ```sql
    select CM.DEPT, CM.BUDGET, avg(EM.SALARY), count(EP.ID) from CM
    left join EM on EM.DEPT=CM.DEPT
    left join EP on EP.ID=EM.ID
    group by CM.DEPT
    order by CM.BUDGET desc;
    ```
5. Get ID and name for employees from ′Baton Rouge′ who take a course with grade ≥ 90 such that the course is offered by a department different from the employee’s.
    ```sql
    select distinct EM.ID, EM.NAME from EM
    inner join ER on ER.ID=EM.ID
    inner join CR on CR.Cnum=ER.Cnum
    where EM.CITY='Baton Rouge' and ER.GRADE>=90 and EM.DEPT!=CR.DEPT;
    ```
6. Get Pnum for projects which are participated by employees from every department in the company.
    ```sql
    select PR.Pnum from PR
    inner join EP on EP.Pnum=PR.Pnum
    inner join (
      select * from EM
      group by DEPT, ID
    ) as EM on EM.ID=EP.ID
    group by PR.Pnum
    having count(EM.ID)=(select count(DEPT) from CM);
    ```
7. For departments with budget > 200000 and more than 10 employees, get DEPT, budget, number of employees in the department.
    ```sql
    select CM.DEPT, CM.BUDGET, count(EM.ID) from CM
    left join EM on EM.DEPT=CM.DEPT
    group by CM.DEPT
    having CM.BUDGET>200000 and count(EM.ID)>10;
    ```
8. Get ID pairs for employee pairs such that the employees are from the same department, and more over, the first employee in the pair takes a course taught by the second employee in the pair.
    ```sql
    select ER.ID as studentID, teacher.ID as teacherID from ER
    inner join EM on EM.ID=ER.ID
    inner join CR on CR.Cnum=ER.Cnum
    inner join EM as teacher on teacher.ID=CR.TEACHER_ID
    where EM.DEPT=teacher.DEPT;
    ```