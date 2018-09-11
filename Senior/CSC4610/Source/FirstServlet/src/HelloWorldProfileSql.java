import java.io.IOException;
import java.io.PrintWriter;
import java.sql.DriverManager;
import java.sql.SQLException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.mysql.jdbc.*;

/**
 * Servlet implementation class HelloWorld
 */
public class HelloWorldProfileSql extends HttpServlet {
	private static final long serialVersionUID = 1L;

	/**
	 * @see HttpServlet#HttpServlet()
	 */
	public HelloWorldProfileSql() {
		super();
	}

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse
	 *      response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		String name = request.getParameter("name");

		// JDBC driver name and database URL
		String JDBC_DRIVER = "com.mysql.jdbc.Driver";
		// String DB_URL = "jdbc:mysql://52.26.86.130:3306/testdb";
		String DB_URL = "jdbc:mysql://localhost:3306/testdb";

		// Database credentials
		String USER = "root";
		String PASS = "";

		Connection conn = null;
		Statement stmt = null;
		// STEP 2: Register JDBC driver
		try {
			Class.forName(JDBC_DRIVER);
			// STEP 3: Open a connection
			System.out.println("Connecting to database...");
			conn = (Connection) DriverManager.getConnection(DB_URL, USER, PASS);
			// STEP 4: Execute a query
			System.out.println("Creating statement...");
			stmt = (Statement) conn.createStatement();
			String sql;
			sql = "SELECT * FROM student WHERE name='"+name+"' limit 1";
			ResultSet rs = (ResultSet) stmt.executeQuery(sql);
			// STEP 5: Extract data from result set
			response.setContentType("text/html;Charset=UTF-8");
			final PrintWriter out = response.getWriter();
			while (rs.next()) {
				// Retrieve by column name
				String email = rs.getString("email");
				String location = rs.getString("location");
				String gender = rs.getString("gender");
				String experience = rs.getString("experience");
				
				out.println("<!DOCTYPE html>\n" +
						"<html>\n" +
						"<head>\n" +
						"    <title>User Registration</title>\n" +
						"</head>\n" +
						"<body>\n" +
						"<h1 align=\"center\"><img src=\"http://www.csc.lsu.edu/~qywang/CS6210/HTMLExercise/project/Thanksgiving.gif\"> Welcome " + name + ", the following is your profile info:</h1>" +
						"    <ul>\n" +
						"        <li><b>Welcome back</b>: " + name + "</li>\n" +
						"        <li><b>Your email</b>: " + email + "</li>\n" +
						"        <li><b>Your location</b>: " + location + "</li>\n" +
						"        <li><b>Your gender</b>: " + gender + "</li>\n" +
						"        <li><b>Your experience</b>: " + experience + "</li>\n" +
						"    </ul>\n" +
						"</body>\n" +
						"</html>\n");
				
				return;
			}
			out.println("No record found.");
			return;
		} catch (ClassNotFoundException | SQLException e) {

			// TODO Auto-generated catch block
			e.printStackTrace();
		}	
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse
	 *      response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		doGet(request, response);
	}

}
