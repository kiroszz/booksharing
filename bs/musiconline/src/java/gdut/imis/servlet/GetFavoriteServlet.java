package gdut.imis.servlet;

import com.fasterxml.jackson.databind.ObjectMapper;
import gdut.imis.DBUtils.MybatisUtils;
import gdut.imis.domain.Favorite;
import org.apache.ibatis.session.SqlSession;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.List;

public class GetFavoriteServlet extends HttpServlet {

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        this.doPost(req, resp);
    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {

        ObjectMapper mapper = new ObjectMapper();
        req.setCharacterEncoding("utf-8");
        SqlSession session = MybatisUtils.getSession();
        String username = req.getParameter("username");

        List<Favorite> favorites = session.selectList("gdut.imis.getFavorite", username);
        session.close();

        String registerJson = mapper.writeValueAsString(favorites);
        resp.setContentType("application/json;charset=utf-8");
        PrintWriter out = resp.getWriter();
        out.write(registerJson);
        out.close();

    }
}
