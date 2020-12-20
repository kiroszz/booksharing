package gdut.imis.servlet;

import com.fasterxml.jackson.databind.ObjectMapper;
import gdut.imis.DBUtils.MybatisUtils;
import gdut.imis.domain.User;
import org.apache.ibatis.session.SqlSession;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.List;

public class UserServlet extends HttpServlet {

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        ObjectMapper mapper = new ObjectMapper();
        req.setCharacterEncoding("utf-8");
//        Integer userid = Integer.valueOf(req.getParameter("userid"));

        SqlSession session = MybatisUtils.getSession();
        List<User> users = session.selectList("gdut.imis.getUser");


        String usersJson = mapper.writeValueAsString(users);
        resp.setContentType("application/json;charset=utf-8");
        PrintWriter out = resp.getWriter();
        out.write(usersJson);
        out.close();
    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {

        this.doGet(req,resp);

    }
}
