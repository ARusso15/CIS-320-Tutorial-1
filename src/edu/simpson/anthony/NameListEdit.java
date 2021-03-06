package edu.simpson.anthony;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.regex.Matcher;
import java.util.regex.Pattern;
import java.io.IOException;
import java.io.PrintWriter;

public class NameListEdit extends HttpServlet {

    // This will hold our compiled regular expression
    // You'll need one of these for each field
    // Name it according to the actual field name. Do not use "fieldname"
    private Pattern nameValidationPattern;
    private Pattern emailValidationPattern;
    private Pattern phoneValidationPattern;
    private Pattern birthdayValidationPattern;

    /**
     * Our constructor
     */
    public NameListEdit() {
        // --- Compile and set up all the regular expression patterns here ---
        nameValidationPattern = Pattern.compile("^[A-Za-z]{1,20}$");
        emailValidationPattern = Pattern.compile("^\\w+([\\.-]?\\w+)*@\\w+([\\.-]?\\w+)*(\\.\\w{2,3})+$");
        phoneValidationPattern = Pattern.compile("^[0-9]{3}-[0-9]{3}-[0-9]{4}$");
        birthdayValidationPattern = Pattern.compile("^[0-9]{4}-[0-9]{2}-[0-9]{2}");

    }
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

        // You can output in any format, text/JSON, text/HTML, etc. We'll keep it simple
        response.setContentType("text/plain");
        PrintWriter out = response.getWriter();
        out.println("Hello");

        // Grab the data we got via a parameter
        String id = request.getParameter("id");
        String firstName = request.getParameter("firstName");
        String lastName = request.getParameter("lastName");
        String email = request.getParameter("email");
        String phone_number = request.getParameter("phone_number");
        String birthday = request.getParameter("birthday");


        // Just print the data out to confirm we got it.
        out.println("id='" + id + "'");
        out.println("First Name='" + firstName + "'");
        out.println("Last Name='" + lastName + "'");
        out.println("Email='" + email + "'");
        out.println("Phone Number='" + phone_number + "'");
        out.println("birthday='" + birthday + "'");

        Person person = new Person();
        person.setId (Integer.parseInt(id));
        person.setFirst(firstName);
        person.setLast(lastName);
        person.setEmail(email);
        person.setPhone(phone_number);
        person.setBirthday(birthday);


        boolean valid = true;


        // Now create matcher object.
        Matcher n = nameValidationPattern.matcher(firstName);
        if (n.find()) {
            out.println("Passed validation");
        } else {
            out.println("Did not pass validation");
            valid = false;
        }
        Matcher ln = nameValidationPattern.matcher(lastName);
        if (ln.find()) {
            out.println("Passed validation");
        } else {
            out.println("Did not pass validation");
            valid = false;
        }
        Matcher e = emailValidationPattern.matcher(email);
        if (e.find()) {
            out.println("Passed validation");
        } else {
            out.println("Did not pass validation");
            valid = false;
        }
        Matcher p = phoneValidationPattern.matcher(phone_number);
        if (p.find()) {
            out.println("Passed validation");
        } else {
            out.println("Did not pass validation");
            valid = false;
        }
        Matcher b = birthdayValidationPattern.matcher(birthday);
        if (b.find()) {
            out.println("Passed validation");
        } else {
            out.println("Did not pass validation");
            valid = false;
        }

        if (valid) {
            if (id.length() == 0){
                PersonDAO.addPerson(person);
                out.println("add");
            }
            else {
                PersonDAO.updatePerson(person);
                out.println("update");
            }
        }
    }
}




