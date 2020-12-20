package gdut.imis.servlet;

import com.fasterxml.jackson.databind.ObjectMapper;
import gdut.imis.DBUtils.MybatisUtils;
import gdut.imis.domain.Favorite;
import gdut.imis.domain.List;
import org.apache.ibatis.session.SqlSession;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;

public class AddListServlet extends HttpServlet {

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        this.doPost(req, resp);
    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {

        ObjectMapper mapper = new ObjectMapper();
        req.setCharacterEncoding("utf-8");
        List list = new List();
        list.setUsername(req.getParameter("username"));
        list.setListid(req.getParameter("listid"));
        SqlSession session = MybatisUtils.getSession();
        int insert = session.insert("gdut.imis.addList", list);
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
