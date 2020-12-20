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

public class RegisterServlet extends HttpServlet {

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        this.doPost(req,resp);
    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {

        ObjectMapper mapper = new ObjectMapper();
        req.setCharacterEncoding("utf-8");
        User user = new User();
        user.setNickname(req.getParameter("nickname"));
        user.setArea(req.getParameter("area"));
        user.setTel(req.getParameter("tel"));
        user.setUsername(req.getParameter("username"));
        user.setPassword(req.getParameter("password"));
        SqlSession session = MybatisUtils.getSession();
        int insert = session.insert("gdut.imis.addUser", user);
        //如果没有commit，数据库是不会插入数据的
        session.commit();
        session.close();

        String registerJson = mapper.writeValueAsString(insert);
        resp.setContentType("application/json;charset=utf-8");
        PrintWriter out = resp.getWriter();
        out.write(registerJson);
        out.close();

    }


}
