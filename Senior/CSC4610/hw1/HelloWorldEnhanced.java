

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * Servlet implementation class HelloWorldEnhanced
 */
public class HelloWorldEnhanced extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public HelloWorldEnhanced() {
        super();
    }

    /**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		String name = request.getParameter("name");
		String email = request.getParameter("email");
		String location = request.getParameter("location");
		String gender = request.getParameter("gender");
		String experience = request.getParameter("experience");

		response.setContentType("text/html;Charset=UTF-8");
		final PrintWriter out = response.getWriter();
		out.println("<!DOCTYPE html>\n" +
				"<html>\n" +
				"<head>\n" +
				"    <title>User Registration</title>\n" +
				"</head>\n" +
				"<body>\n" +
				"    <ul>\n" +
				"        <li><b>Welcome back</b>: " + name + "</li>\n" +
				"        <li><b>Your email</b>: " + email + "</li>\n" +
				"        <li><b>Your location</b>: " + location + "</li>\n" +
				"        <li><b>Your gender</b>: " + gender + "</li>\n" +
				"        <li><b>Your experience</b>: " + experience + "</li>\n" +
				"    </ul>\n" +
				"</body>\n" +
				"</html>\n");
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		doGet(request, response);
	}

}
